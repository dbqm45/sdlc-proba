const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { createServer } = require('../src/server');

async function start(t, options) {
    const server = createServer(typeof options === 'string' ? { env: options } : options);
    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
    t.after(() => server.close());
    return `http://127.0.0.1:${server.address().port}`;
}

function tmpFile(content) {
    const file = path.join(os.tmpdir(), `server-test-${Date.now()}-${Math.random().toString(36).slice(2)}.json`);
    if (content !== undefined) fs.writeFileSync(file, content);
    return file;
}

test('GET / in test shows the banner and sets a visitor cookie; prod hides it', async (t) => {
    const page = await fetch(`${await start(t, 'test')}/`);
    assert.equal(page.status, 200);
    assert.match(await page.text(), /data-flag="welcome_banner"/);
    assert.match(page.headers.get('set-cookie'), /^visitor=[A-Za-z0-9_-]+; Path=\//);
    const prod = await fetch(`${await start(t, 'prod')}/`);
    assert.doesNotMatch(await prod.text(), /welcome_banner/);
});

test('show_last_deployed: missing build file → 200 without footer', async (t) => {
    const base = await start(t, { env: 'test', buildFile: '/nonexistent/build.json' });
    const res = await fetch(`${base}/`);
    assert.equal(res.status, 200);
    assert.doesNotMatch(await res.text(), /show_last_deployed/);
});

test('show_last_deployed: invalid JSON in build file → 200 without footer', async (t) => {
    const file = tmpFile('not-json{');
    t.after(() => fs.rmSync(file, { force: true }));
    const base = await start(t, { env: 'test', buildFile: file });
    const res = await fetch(`${base}/`);
    assert.equal(res.status, 200);
    assert.doesNotMatch(await res.text(), /show_last_deployed/);
});

test('show_last_deployed: missing deployedAt field → 200 without footer', async (t) => {
    const file = tmpFile(JSON.stringify({ other: 'value' }));
    t.after(() => fs.rmSync(file, { force: true }));
    const base = await start(t, { env: 'test', buildFile: file });
    const res = await fetch(`${base}/`);
    assert.equal(res.status, 200);
    assert.doesNotMatch(await res.text(), /show_last_deployed/);
});

test('show_last_deployed: valid build file → footer with date', async (t) => {
    const file = tmpFile(JSON.stringify({ deployedAt: '2026-10-31' }));
    t.after(() => fs.rmSync(file, { force: true }));
    const base = await start(t, { env: 'test', buildFile: file });
    const res = await fetch(`${base}/`);
    assert.equal(res.status, 200);
    assert.match(await res.text(), /data-flag="show_last_deployed"/);
    assert.match(await (await fetch(`${base}/`)).text(), /2026-10-31/);
});

test('health, the stylesheet, 404 and 405', async (t) => {
    const base = await start(t, 'test');
    assert.deepEqual(await (await fetch(`${base}/health`)).json(), { ok: true, env: 'test' });
    assert.equal((await fetch(`${base}/style.css`)).status, 200);
    assert.equal((await fetch(`${base}/nope`)).status, 404);
    assert.equal((await fetch(`${base}/`, { method: 'POST' })).status, 405);
});

// --- CHG-3 TSK-1: deploy counter on GET / (E-02, E-03, E-04A) ---
const { DatabaseSync: CounterDb } = require('node:sqlite');

function counterDb(t, rows) {
    const file = tmpFile();
    const db = new CounterDb(file);
    db.exec('CREATE TABLE deployments (env TEXT NOT NULL, sha TEXT NOT NULL, deployed_at TEXT NOT NULL)');
    const insert = db.prepare('INSERT INTO deployments (env, sha, deployed_at) VALUES (?, ?, ?)');
    for (const [env, age] of rows) insert.run(env, 'sha', new Date(Date.now() - age).toISOString());
    db.close();
    t.after(() => fs.rmSync(file, { force: true }));
    return file;
}
const HOUR = 3600e3;
const pageOf = async (t, options, query = '') => fetch((await start(t, options)) + '/' + query);

test('GET / counts the deployments of the server env from the last 7 days (E-02A, E-03A)', async (t) => {
    const db = counterDb(t, [['test', HOUR], ['test', 24 * HOUR], ['test', 8 * 24 * HOUR], ['prod', HOUR]]);
    const html = await (await pageOf(t, { env: 'test', deploymentsDb: db })).text();
    assert.match(html, /<p data-flag="deploy_counter">Wdrożenia w ostatnich 7 dniach: 2<\/p>/);
});

test('GET /?env=prod counts prod; an unknown env falls back to the server env (E-03B, E-03C, E-03D)', async (t) => {
    const db = counterDb(t, [['test', HOUR], ['test', 2 * HOUR], ['prod', HOUR], ['prod', 2 * HOUR], ['prod', 3 * HOUR]]);
    const options = { env: 'test', deploymentsDb: db };
    assert.match(await (await pageOf(t, options, '?env=prod')).text(), /dniach: 3</);
    const staging = await pageOf(t, options, '?env=staging');
    assert.equal(staging.status, 200);
    const text = await staging.text();
    assert.match(text, /dniach: 2</);
    assert.doesNotMatch(text, /staging/);
    const xss = await pageOf(t, options, '?env=' + encodeURIComponent('<xss>'));
    assert.equal(xss.status, 200);
    assert.doesNotMatch(await xss.text(), /<xss>/);
});

test('GET / counts more than 100 deployments (E-02D)', async (t) => {
    const db = counterDb(t, Array.from({ length: 150 }, (_, i) => ['test', (i + 1) * 60e3]));
    assert.match(await (await pageOf(t, { env: 'test', deploymentsDb: db })).text(), /dniach: 150</);
});

test('GET / shows 0 when the database file is missing (E-04A, E-02C)', async (t) => {
    const res = await pageOf(t, { env: 'test', deploymentsDb: '/nonexistent/deployments.db' });
    assert.match(await res.text(), /dniach: 0</);
});

test('flag off (prod): no counter and the database is not opened (E-02B, E-02E)', async (t) => {
    const bad = tmpFile('not a database\n'.repeat(200));
    t.after(() => fs.rmSync(bad, { force: true }));
    const res = await pageOf(t, { env: 'prod', deploymentsDb: bad });
    assert.equal(res.status, 200);
    assert.doesNotMatch(await res.text(), /deploy_counter/);
});
