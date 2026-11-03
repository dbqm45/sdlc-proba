const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');
const { createServer } = require('../src/server');

function seededDb(t, rows) {
    const file = path.join(os.tmpdir(), `deployments-test-${Date.now()}-${Math.random().toString(36).slice(2)}.db`);
    const db = new DatabaseSync(file);
    db.exec('CREATE TABLE deployments (env TEXT NOT NULL, sha TEXT NOT NULL, deployed_at TEXT NOT NULL)');
    const insert = db.prepare('INSERT INTO deployments (env, sha, deployed_at) VALUES (?, ?, ?)');
    for (const r of rows) insert.run(r.env, r.sha, r.deployedAt);
    db.close();
    t.after(() => fs.rmSync(file, { force: true }));
    return file;
}

async function start(t, deploymentsDb) {
    const server = createServer({ env: 'test', deploymentsDb });
    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
    t.after(() => server.close());
    return `http://127.0.0.1:${server.address().port}`;
}

const ROWS = [
    { env: 'prod', sha: 'aaa111', deployedAt: '2026-10-31T10:00:00Z' },
    { env: 'test', sha: 'bbb222', deployedAt: '2026-10-31T11:00:00Z' },
    { env: 'prod', sha: 'ccc333', deployedAt: '2026-11-01T09:00:00Z' },
];

test('GET /deployments?env=prod lists only prod deployments, newest first', async (t) => {
    const base = await start(t, seededDb(t, ROWS));
    const res = await fetch(`${base}/deployments?env=prod`);
    assert.equal(res.status, 200);
    assert.match(res.headers.get('content-type'), /^application\/json/);
    assert.deepEqual(await res.json(), [
        { sha: 'ccc333', deployedAt: '2026-11-01T09:00:00Z' },
        { sha: 'aaa111', deployedAt: '2026-10-31T10:00:00Z' },
    ]);
});

test('GET /deployments for an environment without deployments → 200 and []', async (t) => {
    const base = await start(t, seededDb(t, ROWS.filter((r) => r.env === 'prod')));
    const res = await fetch(`${base}/deployments?env=test`);
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), []);
});

test('GET /deployments without env → 400', async (t) => {
    const base = await start(t, seededDb(t, ROWS));
    const res = await fetch(`${base}/deployments`);
    assert.equal(res.status, 400);
});

test('GET /deployments for an unknown environment → 400 naming the known ones', async (t) => {
    const base = await start(t, seededDb(t, ROWS));
    const res = await fetch(`${base}/deployments?env=staging`);
    assert.equal(res.status, 400);
    assert.match(res.headers.get('content-type'), /^application\/json/);
    const { error } = await res.json();
    assert.match(error, /staging/);
    assert.match(error, /\btest\b/);
    assert.match(error, /\bprod\b/);
});

function prodDeployments(n) {
    return Array.from({ length: n }, (_, i) => ({
        env: 'prod',
        sha: `sha${String(i).padStart(2, '0')}`,
        deployedAt: `2026-10-${String(i + 1).padStart(2, '0')}T10:00:00Z`,
    }));
}

test('GET /deployments returns the 20 newest deployments by default', async (t) => {
    const base = await start(t, seededDb(t, prodDeployments(25)));
    const res = await fetch(`${base}/deployments?env=prod`);
    assert.equal(res.status, 200);
    const list = await res.json();
    assert.equal(list.length, 20);
    assert.deepEqual(list[0], { sha: 'sha24', deployedAt: '2026-10-25T10:00:00Z' });
    assert.deepEqual(list[19], { sha: 'sha05', deployedAt: '2026-10-06T10:00:00Z' });
});

test('GET /deployments?limit=3 returns the 3 newest, newest first', async (t) => {
    const base = await start(t, seededDb(t, prodDeployments(25)));
    const res = await fetch(`${base}/deployments?env=prod&limit=3`);
    assert.equal(res.status, 200);
    assert.deepEqual((await res.json()).map((d) => d.sha), ['sha24', 'sha23', 'sha22']);
});

test('GET /deployments with limit outside 1-100 or not an integer → 400', async (t) => {
    const base = await start(t, seededDb(t, prodDeployments(3)));
    for (const limit of ['0', '101', 'abc']) {
        const res = await fetch(`${base}/deployments?env=prod&limit=${limit}`);
        assert.equal(res.status, 400, `limit=${limit}`);
        assert.match(res.headers.get('content-type'), /^application\/json/);
        assert.match((await res.json()).error, /limit/);
    }
});

test('GET /deployments?before=<time> returns the deployments older than that time, newest first', async (t) => {
    const base = await start(t, seededDb(t, prodDeployments(5)));
    const res = await fetch(`${base}/deployments?env=prod&before=2026-10-03T10:00:00Z`);
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), [
        { sha: 'sha01', deployedAt: '2026-10-02T10:00:00Z' },
        { sha: 'sha00', deployedAt: '2026-10-01T10:00:00Z' },
    ]);
});

test('GET /deployments combines before with limit', async (t) => {
    const base = await start(t, seededDb(t, prodDeployments(5)));
    const res = await fetch(`${base}/deployments?env=prod&before=2026-10-03T10:00:00Z&limit=1`);
    assert.equal(res.status, 200);
    assert.deepEqual((await res.json()).map((d) => d.sha), ['sha01']);
});

test('GET /deployments with before that is not an ISO 8601 time → 400', async (t) => {
    const base = await start(t, seededDb(t, prodDeployments(3)));
    for (const before of ['abc', '2026-13-40']) {
        const res = await fetch(`${base}/deployments?env=prod&before=${before}`);
        assert.equal(res.status, 400, `before=${before}`);
        assert.match(res.headers.get('content-type'), /^application\/json/);
        assert.match((await res.json()).error, /before/);
    }
});

test('GET /deployments orders and pages by time across …Z and …000Z timestamps', async (t) => {
    const base = await start(t, seededDb(t, [
        { env: 'prod', sha: 'whole', deployedAt: '2026-10-01T10:00:00Z' },
        { env: 'prod', sha: 'millis', deployedAt: '2026-10-01T10:00:00.500Z' },
    ]));
    const all = await (await fetch(`${base}/deployments?env=prod`)).json();
    assert.deepEqual(all.map((d) => d.sha), ['millis', 'whole']);
    const older = await (await fetch(`${base}/deployments?env=prod&before=2026-10-01T10:00:00.500Z`)).json();
    assert.deepEqual(older.map((d) => d.sha), ['whole']);
});
