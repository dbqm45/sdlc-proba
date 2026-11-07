const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { renderPage } = require('../src/page');
const { readFlags, isOn } = require('../src/flags');
const { createServer } = require('../src/server');

const badgeOn = (k) => k === 'env_badge';
const frozenOff = (env) => `<!doctype html>
<html lang="pl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>sdlc-sandbox</title>
<link rel="stylesheet" href="/style.css"></head>
<body>
<main>
<h1>sdlc-sandbox</h1>

<p>Środowisko: <strong>${env}</strong></p>
</main>

</body>
</html>
`;

test('env_badge on: TEST badge for test, PROD badge for prod (E-01A, E-01B)', () => {
    const t = renderPage({ env: 'test', on: badgeOn });
    assert.match(t, /<span class="env-badge env-badge--test" data-flag="env_badge">TEST<\/span>/);
    assert.doesNotMatch(t, /PROD/);
    const p = renderPage({ env: 'prod', on: badgeOn });
    assert.match(p, /<span class="env-badge env-badge--prod" data-flag="env_badge">PROD<\/span>/);
});

test('env_badge on: badge sits after h1 and before the Środowisko paragraph (E-01D)', () => {
    const html = renderPage({ env: 'test', on: badgeOn });
    assert.ok(html.indexOf('</h1>') < html.indexOf('env-badge--test') && html.indexOf('env-badge--test') < html.indexOf('Środowisko'));
});

test('env_badge on: title is prefixed (E-02A, E-02B); off: unchanged (E-02C)', () => {
    assert.match(renderPage({ env: 'test', on: badgeOn }), /<title>\[TEST\] sdlc-sandbox<\/title>/);
    assert.match(renderPage({ env: 'prod', on: badgeOn }), /<title>\[PROD\] sdlc-sandbox<\/title>/);
    assert.match(renderPage({ env: 'test', on: () => false }), /<title>sdlc-sandbox<\/title>/);
});

test('env_badge off: HTML identical to the frozen pre-change page and without trace (E-03A, E-03B)', () => {
    for (const env of ['test', 'prod']) {
        const html = renderPage({ env, on: () => false });
        assert.equal(html, frozenOff(env));
        assert.doesNotMatch(html, /env-badge|data-flag="env_badge"/);
    }
});

test('env_badge on: no inline style, style or script (E-04C)', () => {
    assert.doesNotMatch(renderPage({ env: 'test', on: badgeOn }), /style=|<style|<script/);
});

test('env_badge on: the environment name is escaped in badge and title (NF-001)', () => {
    const html = renderPage({ env: '<i>', on: badgeOn });
    assert.doesNotMatch(html, /<i>/);
    assert.match(html, /<title>\[&lt;I&gt;\] sdlc-sandbox<\/title>/);
});

test('style.css: badge colours differ and contrast is at least 4.5:1 (E-04A, E-04B)', () => {
    const css = fs.readFileSync(path.join(__dirname, '..', 'public', 'style.css'), 'utf8');
    const lum = (hex) => {
        const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
            .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
    const colours = {};
    for (const v of ['test', 'prod']) {
        const rule = css.match(new RegExp(`\\.env-badge--${v}\\s*\\{([^}]*)\\}`));
        assert.ok(rule, `rule for ${v}`);
        const bg = rule[1].match(/background:\s*(#[0-9a-f]{6})/i)[1];
        const fg = rule[1].match(/(?:^|[\s;])color:\s*(#[0-9a-f]{6})/i)[1];
        assert.ok(ratio(bg, fg) >= 4.5, `${v} contrast ${ratio(bg, fg)}`);
        colours[v] = bg;
    }
    assert.notEqual(colours.test, colours.prod);
    assert.match(css, /\.env-badge\s*\{/);
});

test('env_badge flag: on in test, off in prod; other flags unchanged (E-05A, E-05B)', () => {
    assert.deepEqual(readFlags('test').env_badge, { enabled: true, rollout: 100 });
    assert.deepEqual(readFlags('prod').env_badge, { enabled: false, rollout: 0 });
    assert.deepEqual(readFlags('test').welcome_banner, { enabled: true, rollout: 100 });
    assert.deepEqual(readFlags('prod').deploy_counter, { enabled: false, rollout: 0 });
});

test('env_badge flag: a flags file without the key means off (E-05C)', () => {
    assert.equal(isOn({ welcome_banner: { enabled: true, rollout: 100 } }, 'env_badge', 'v1'), false);
});

test('env_badge follows APP_ENV, not the request (E-01C)', async (t) => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'badge-'));
    t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
    fs.writeFileSync(path.join(dir, 'flags.prod.json'), JSON.stringify({ env_badge: { enabled: true, rollout: 100 } }));
    const server = createServer({ env: 'prod', configDir: dir });
    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
    t.after(() => server.close());
    const res = await fetch(`http://127.0.0.1:${server.address().port}/?env=test`);
    assert.equal(res.status, 200);
    const html = await res.text();
    assert.match(html, /env-badge--prod[^>]*>PROD</);
    assert.doesNotMatch(html, /TEST/);
});
