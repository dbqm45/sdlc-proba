const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

test('config/build.json has deployedAt string field', () => {
    const buildJson = require(path.join(__dirname, '..', 'config', 'build.json'));
    assert.equal(typeof buildJson.deployedAt, 'string', 'deployedAt must be a string');
    assert.ok(buildJson.deployedAt.length > 0, 'deployedAt must not be empty');
});
