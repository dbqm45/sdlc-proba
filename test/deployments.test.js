const { test } = require('node:test');
const assert = require('node:assert/strict');
const os = require('node:os');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');
const { createServer } = require('../src/server');

function seedDb(rows) {
    const file = path.join(os.tmpdir(), `deployments-test-${Date.now()}-${Math.random().toString(36).slice(2)}.db`);
    const db = new DatabaseSync(file);
    db.exec('CREATE TABLE deployments (env TEXT NOT NULL, sha TEXT NOT NULL, deployed_at TEXT NOT NULL)');
    const insert = db.prepare('INSERT INTO deployments (env, sha, deployed_at) VALUES (?, ?, ?)');
    for (const [env, sha, deployedAt] of rows) insert.run(env, sha, deployedAt);
    db.close();
    return file;
}

async function start(t, deploymentsDb) {
    const server = createServer({ deploymentsDb });
    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
    t.after(() => server.close());
    return `http://127.0.0.1:${server.address().port}`;
}

test('GET /deployments?env=prod lists prod deployments only, newest first', async (t) => {
    const db = seedDb([
        ['prod', 'aaa111', '2026-11-01T10:00:00Z'],
        ['test', 'bbb222', '2026-11-02T10:00:00Z'],
        ['prod', 'ccc333', '2026-11-03T10:00:00Z'],
    ]);
    const res = await fetch(`${await start(t, db)}/deployments?env=prod`);
    assert.equal(res.status, 200);
    assert.match(res.headers.get('content-type'), /application\/json/);
    assert.deepEqual(await res.json(), [
        { sha: 'ccc333', deployedAt: '2026-11-03T10:00:00Z' },
        { sha: 'aaa111', deployedAt: '2026-11-01T10:00:00Z' },
    ]);
});

test('GET /deployments for an environment without deployments → 200 and []', async (t) => {
    const db = seedDb([['test', 'bbb222', '2026-11-02T10:00:00Z']]);
    const res = await fetch(`${await start(t, db)}/deployments?env=prod`);
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), []);
});

test('GET /deployments without env → 400', async (t) => {
    const db = seedDb([]);
    const res = await fetch(`${await start(t, db)}/deployments`);
    assert.equal(res.status, 400);
});
