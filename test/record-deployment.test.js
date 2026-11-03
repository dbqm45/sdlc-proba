const { test } = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');
const { createServer } = require('../src/server');
const { LIST_SQL } = require('../src/deployments');

const ROOT = path.join(__dirname, '..');

function tmpDb(t) {
    const file = path.join(os.tmpdir(), `record-deployment-${Date.now()}-${Math.random().toString(36).slice(2)}.db`);
    t.after(() => fs.rmSync(file, { force: true }));
    return file;
}

function record(file, ...args) {
    return spawnSync('npm', ['run', '--silent', 'record-deployment', '--', ...args], {
        cwd: ROOT, encoding: 'utf8', env: { ...process.env, DEPLOYMENTS_DB: file },
    });
}

function rows(file) {
    if (!fs.existsSync(file)) return [];
    const db = new DatabaseSync(file, { readOnly: true });
    try {
        return db.prepare('SELECT env, sha, deployed_at AS deployedAt FROM deployments').all().map((r) => ({ ...r }));
    } finally {
        db.close();
    }
}

test('record-deployment prod <sha> stores the deployment and the list shows it first', async (t) => {
    const file = tmpDb(t);
    const db = new DatabaseSync(file);
    db.exec('CREATE TABLE deployments (env TEXT NOT NULL, sha TEXT NOT NULL, deployed_at TEXT NOT NULL)');
    db.prepare('INSERT INTO deployments VALUES (?, ?, ?)').run('prod', 'old0001', '2026-01-01T00:00:00.000Z');
    db.close();
    const before = Date.now();
    const r = record(file, 'prod', 'abc1234');
    assert.equal(r.status, 0, r.stderr);
    const stored = rows(file).find((row) => row.sha === 'abc1234');
    assert.equal(stored.env, 'prod');
    assert.match(stored.deployedAt, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    assert.ok(Date.parse(stored.deployedAt) >= before - 1000 && Date.parse(stored.deployedAt) <= Date.now());

    const server = createServer({ env: 'test', deploymentsDb: file });
    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
    t.after(() => server.close());
    const res = await fetch(`http://127.0.0.1:${server.address().port}/deployments?env=prod`);
    assert.equal((await res.json())[0].sha, 'abc1234');
});

test('record-deployment creates the DB file and the table when the file does not exist', (t) => {
    const file = tmpDb(t);
    assert.equal(fs.existsSync(file), false);
    const r = record(file, 'test', 'def5678');
    assert.equal(r.status, 0, r.stderr);
    assert.deepEqual(rows(file).map(({ env, sha }) => ({ env, sha })), [{ env: 'test', sha: 'def5678' }]);
});

test('record-deployment with an unknown environment or no commit fails and stores nothing', (t) => {
    const file = tmpDb(t);
    for (const args of [['staging', 'abc1234'], ['prod']]) {
        const r = record(file, ...args);
        assert.notEqual(r.status, 0, `args ${args.join(' ')}`);
        assert.match(r.stderr, /\S/, `an error message for ${args.join(' ')}`);
    }
    assert.deepEqual(rows(file), []);
});

test('record-deployment adds the (env, time) index, also to a DB created without it', (t) => {
    const file = tmpDb(t);
    const db = new DatabaseSync(file);
    db.exec('CREATE TABLE deployments (env TEXT NOT NULL, sha TEXT NOT NULL, deployed_at TEXT NOT NULL)');
    db.close();
    const r = record(file, 'prod', 'abc1234');
    assert.equal(r.status, 0, r.stderr);
    const check = new DatabaseSync(file, { readOnly: true });
    t.after(() => check.close());
    const index = check.prepare("SELECT sql FROM sqlite_master WHERE type = 'index' AND tbl_name = 'deployments'").all();
    assert.equal(index.length, 1, JSON.stringify(index));
    assert.match(index[0].sql, /\(\s*env\s*,\s*julianday\(deployed_at\)\s*\)/);
});

test('the deployments list query searches by the index and does not sort separately', (t) => {
    const file = tmpDb(t);
    assert.equal(record(file, 'prod', 'abc1234').status, 0);
    const db = new DatabaseSync(file, { readOnly: true });
    t.after(() => db.close());
    const plan = db.prepare(`EXPLAIN QUERY PLAN ${LIST_SQL}`).all('prod', null, null, null, null, null, null, 21)
        .map((row) => row.detail).join(' | ');
    assert.match(plan, /USING INDEX/, plan);
    assert.doesNotMatch(plan, /TEMP B-TREE/, plan);
});
