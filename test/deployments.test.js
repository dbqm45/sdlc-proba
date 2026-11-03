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
    const base = await start(t, seededDb(t, ROWS));
    const res = await fetch(`${base}/deployments?env=staging`);
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), []);
});

test('GET /deployments without env → 400', async (t) => {
    const base = await start(t, seededDb(t, ROWS));
    const res = await fetch(`${base}/deployments`);
    assert.equal(res.status, 400);
});
