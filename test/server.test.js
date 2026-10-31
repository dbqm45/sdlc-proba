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
