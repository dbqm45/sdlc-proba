const { test } = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const RULE_ID = 'node-sqlite-sql-from-string';

function semgrep() {
    const r = spawnSync('semgrep', ['--version'], { encoding: 'utf8' });
    return r.status === 0 ? r.stdout.trim() : null;
}

test(`the ${RULE_ID} rule in .semgrep.yml passes its examples (semgrep --test)`, (t) => {
    const version = semgrep();
    if (!version) {
        t.skip('semgrep is not installed (pipx install semgrep); the security scan and CI run this rule');
        return;
    }
    // semgrep --test pairs a rule file with an example file of the same base name in one directory
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'semgrep-rule-test-'));
    t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
    fs.copyFileSync(path.join(ROOT, '.semgrep.yml'), path.join(dir, `${RULE_ID}.yml`));
    fs.copyFileSync(path.join(ROOT, 'test', 'semgrep', `${RULE_ID}.js.fixture`), path.join(dir, `${RULE_ID}.js`));
    const r = spawnSync('semgrep', ['scan', '--test', '--metrics=off', dir], { encoding: 'utf8' });
    const out = `${r.stdout}\n${r.stderr}`;
    assert.equal(r.status, 0, out.slice(-1500));
    assert.match(out, /All tests passed/, out.slice(-1500));
});
