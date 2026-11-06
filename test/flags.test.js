const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { readFlags, isOn } = require('../src/flags');

test('the shipped flags files: welcome_banner on in test, off in prod', () => {
    assert.deepEqual(readFlags('test').welcome_banner, { enabled: true, rollout: 100 });
    assert.deepEqual(readFlags('prod').welcome_banner, { enabled: false, rollout: 0 });
    assert.throws(() => readFlags('staging'), /Unknown environment/);
});

test('isOn: off when not enabled or unknown, on at 100%, a stable bucket in between', () => {
    const flags = { a: { enabled: true, rollout: 100 }, b: { enabled: false, rollout: 100 }, c: { enabled: true, rollout: 50 } };
    assert.equal(isOn(flags, 'a', 'v1'), true);
    assert.equal(isOn(flags, 'b', 'v1'), false);
    assert.equal(isOn(flags, 'missing', 'v1'), false);
    const visitors = Array.from({ length: 400 }, (_, i) => `visitor-${i}`);
    const on = visitors.filter((v) => isOn(flags, 'c', v)).length;
    assert.ok(on > 140 && on < 260, `about half of 400 visitors, got ${on}`);
    assert.equal(isOn(flags, 'c', 'visitor-7'), isOn(flags, 'c', 'visitor-7'), 'the same visitor, the same answer');
});

test('readFlags: a missing rollout means 100, values are clamped', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'flags-'));
    fs.writeFileSync(path.join(dir, 'flags.test.json'), JSON.stringify({ x: { enabled: true }, y: { enabled: true, rollout: 250 }, z: { rollout: 30 } }));
    assert.deepEqual(readFlags('test', dir), { x: { enabled: true, rollout: 100 }, y: { enabled: true, rollout: 100 }, z: { enabled: false, rollout: 30 } });
    fs.rmSync(dir, { recursive: true, force: true });
});

test('deploy_counter: on in test, off in prod; other flags unchanged (E-05A, E-05B)', () => {
    assert.deepEqual(readFlags('test').deploy_counter, { enabled: true, rollout: 100 });
    assert.deepEqual(readFlags('prod').deploy_counter, { enabled: false, rollout: 0 });
    assert.deepEqual(readFlags('test').show_last_deployed, { enabled: true, rollout: 100 });
    assert.deepEqual(readFlags('prod').welcome_banner, { enabled: false, rollout: 0 });
});
