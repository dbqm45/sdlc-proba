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
