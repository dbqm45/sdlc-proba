// Feature flags from config/flags.<env>.json, the file ShipScope reads at the deployed commit (a code source with
// file "config/flags.{env}.json", valuePath "enabled", rolloutPath "rollout"). Each flag is
// { "enabled": true|false, "rollout": 0-100 }: off when not enabled, otherwise on for `rollout` percent of visitors.
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const ENVIRONMENTS = ['test', 'prod'];
const CONFIG_DIR = path.join(__dirname, '..', 'config');

/**
 * @param {string} env test or prod
 * @param {string} [dir] the config directory (tests use their own)
 * @returns {Record<string, { enabled: boolean, rollout: number }>}
 */
function readFlags(env, dir = CONFIG_DIR) {
    if (!ENVIRONMENTS.includes(env)) throw new Error(`Unknown environment ${env}; use ${ENVIRONMENTS.join(' or ')}`);
    const raw = JSON.parse(fs.readFileSync(path.join(dir, `flags.${env}.json`), 'utf8'));
    const flags = {};
    for (const [key, value] of Object.entries(raw)) {
        const rollout = Number.isInteger(value?.rollout) ? Math.min(100, Math.max(0, value.rollout)) : 100;
        flags[key] = { enabled: value?.enabled === true, rollout };
    }
    return flags;
}

/**
 * Whether a flag is on for one visitor: the same visitor always lands in the same bucket (0-99).
 *
 * @param {Record<string, { enabled: boolean, rollout: number }>} flags
 * @param {string} key
 * @param {string} visitor any stable id, e.g. a cookie value
 * @returns {boolean}
 */
function isOn(flags, key, visitor) {
    const flag = flags[key];
    if (!flag || !flag.enabled) return false;
    if (flag.rollout >= 100) return true;
    const bucket = crypto.createHash('sha256').update(`${key}:${visitor}`).digest().readUInt32BE(0) % 100;
    return bucket < flag.rollout;
}

module.exports = { ENVIRONMENTS, readFlags, isOn };
