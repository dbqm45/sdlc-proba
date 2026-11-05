const { test } = require('node:test');
const assert = require('node:assert/strict');
const { renderPage, escape } = require('../src/page');

test('the banner shows only when welcome_banner is on', () => {
    assert.match(renderPage({ env: 'test', on: (k) => k === 'welcome_banner' }), /data-flag="welcome_banner"/);
    assert.doesNotMatch(renderPage({ env: 'prod', on: () => false }), /welcome_banner/);
});

test('interpolated values are escaped', () => {
    assert.equal(escape('<a href="x">&</a>'), '&lt;a href=&quot;x&quot;&gt;&amp;&lt;/a&gt;');
    assert.match(renderPage({ env: '<b>', on: () => false }), /&lt;b&gt;/);
});

test('the footer shows deployedAt when show_last_deployed is on', () => {
    const html = renderPage({ env: 'test', on: (k) => k === 'show_last_deployed', deployedAt: '2026-10-31' });
    assert.match(html, /data-flag="show_last_deployed"/);
    assert.match(html, /2026-10-31/);
});

test('the footer is absent when show_last_deployed is off or deployedAt is missing', () => {
    assert.doesNotMatch(renderPage({ env: 'test', on: () => false, deployedAt: '2026-10-31' }), /show_last_deployed/);
    assert.doesNotMatch(renderPage({ env: 'test', on: (k) => k === 'show_last_deployed', deployedAt: null }), /show_last_deployed/);
});

test('the deploy counter shows only when deploy_counter is on, zero included (E-02A, E-02C, E-02D)', () => {
    const on = (k) => k === 'deploy_counter';
    const html = renderPage({ env: 'test', on, deployCount: 150 });
    assert.match(html, /<p data-flag="deploy_counter">Wdrożenia w ostatnich 7 dniach: 150<\/p>/);
    assert.ok(html.indexOf('Środowisko') < html.indexOf('deploy_counter') && html.indexOf('deploy_counter') < html.indexOf('</main>'));
    assert.match(renderPage({ env: 'test', on, deployCount: 0 }), /dniach: 0<\/p>/);
});

test('flag off: the page is byte for byte as before (E-02B)', () => {
    const html = renderPage({ env: 'test', on: () => false, deployCount: 5 });
    assert.equal(html, renderPage({ env: 'test', on: () => false }));
    assert.ok(html.includes('<p>Środowisko: <strong>test</strong></p>\n</main>'));
});
