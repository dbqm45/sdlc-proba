const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { writeBuildInfo } = require('../scripts/build-info');

test('writeBuildInfo writes deployedAt in ISO YYYY-MM-DD format', () => {
    const tmp = path.join(os.tmpdir(), `build-info-test-${Date.now()}.json`);
    try {
        const date = '2026-10-31';
        writeBuildInfo(tmp, date);
        const result = JSON.parse(fs.readFileSync(tmp, 'utf8'));
        assert.equal(result.deployedAt, date, 'deployedAt must match the given date');
        assert.match(result.deployedAt, /^\d{4}-\d{2}-\d{2}$/, 'deployedAt must be YYYY-MM-DD');
    } finally {
        fs.rmSync(tmp, { force: true });
    }
});
