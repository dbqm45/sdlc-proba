const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createServer } = require('../src/server');

async function start(t, env) {
    const server = createServer({ env });
    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
    t.after(() => server.close());
    return `http://127.0.0.1:${server.address().port}`;
}

test('GET / in test shows the banner and sets a visitor cookie; prod hides it', async (t) => {
    const page = await fetch(`${await start(t, 'test')}/`);
    assert.equal(page.status, 200);
    assert.match(await page.text(), /data-flag="welcome_banner"/);
    assert.match(page.headers.get('set-cookie'), /^visitor=[A-Za-z0-9_-]+; Path=\//);
    const prod = await fetch(`${await start(t, 'prod')}/`);
    assert.doesNotMatch(await prod.text(), /welcome_banner/);
});

test('health, the stylesheet, 404 and 405', async (t) => {
    const base = await start(t, 'test');
    assert.deepEqual(await (await fetch(`${base}/health`)).json(), { ok: true, env: 'test' });
    assert.equal((await fetch(`${base}/style.css`)).status, 200);
    assert.equal((await fetch(`${base}/nope`)).status, 404);
    assert.equal((await fetch(`${base}/`, { method: 'POST' })).status, 405);
});
