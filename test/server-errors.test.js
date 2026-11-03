const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { createServer } = require('../src/server');

function corruptDb(t) {
    const file = path.join(os.tmpdir(), `corrupt-${Date.now()}-${Math.random().toString(36).slice(2)}.db`);
    fs.writeFileSync(file, 'not a database at all\n'.repeat(200));
    t.after(() => fs.rmSync(file, { force: true }));
    return file;
}

async function start(t, deploymentsDb) {
    const server = createServer({ env: 'test', deploymentsDb });
    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
    t.after(() => server.close());
    return `http://127.0.0.1:${server.address().port}`;
}

test('an unexpected error answers 500 without internals, logs the details and keeps the server running', async (t) => {
    const logged = [];
    t.mock.method(console, 'error', (...args) => logged.push(args.map(String).join(' ')));
    const file = corruptDb(t);
    const base = await start(t, file);

    const res = await fetch(`${base}/deployments?env=prod`, { signal: AbortSignal.timeout(3000) });
    assert.equal(res.status, 500);
    assert.match(res.headers.get('content-type'), /^application\/json/);
    const body = await res.text();
    assert.ok(JSON.parse(body).error);
    assert.doesNotMatch(body, /not a database|\.db|\/tmp|at /, 'no internal details in the response');

    const health = await fetch(`${base}/health`, { signal: AbortSignal.timeout(3000) });
    assert.equal(health.status, 200);

    assert.ok(logged.some((line) => /not a database/.test(line)), `details logged: ${logged.join(' | ')}`);
});
