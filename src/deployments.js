// Deployments recorded in a local SQLite file (node:sqlite, no dependencies — decision DL4).
const fs = require('node:fs');
const { DatabaseSync } = require('node:sqlite');

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

/**
 * @param {string} file SQLite file with a `deployments (env, sha, deployed_at)` table
 * @param {string} env
 * @param {number} [limit] newest deployments to return (default 20)
 * @param {string|null} [before] only deployments older than this ISO 8601 time (a page cursor)
 * @returns {{ sha: string, deployedAt: string }[]} newest first; [] when the file does not exist
 */
function listDeployments(file, env, limit = DEFAULT_LIMIT, before = null) {
    if (!fs.existsSync(file)) return [];
    const db = new DatabaseSync(file, { readOnly: true });
    try {
        return db
            // julianday(): deployed_at comes as …:00Z and …:00.000Z, which do not compare correctly as text
            .prepare('SELECT sha, deployed_at AS deployedAt FROM deployments WHERE env = ? '
                + 'AND (? IS NULL OR julianday(deployed_at) < julianday(?)) ORDER BY julianday(deployed_at) DESC LIMIT ?')
            .all(env, before, before, limit)
            .map(({ sha, deployedAt }) => ({ sha, deployedAt }));
    } finally {
        db.close();
    }
}

/**
 * Records one deployment; creates the file and the `deployments` table when missing.
 *
 * @param {string} file SQLite file
 * @param {string} env
 * @param {string} sha
 * @param {Date} [at] deployment time (default: now)
 */
function recordDeployment(file, env, sha, at = new Date()) {
    const db = new DatabaseSync(file);
    try {
        db.exec('CREATE TABLE IF NOT EXISTS deployments (env TEXT NOT NULL, sha TEXT NOT NULL, deployed_at TEXT NOT NULL)');
        db.prepare('INSERT INTO deployments (env, sha, deployed_at) VALUES (?, ?, ?)').run(env, sha, at.toISOString());
    } finally {
        db.close();
    }
}

module.exports = { DEFAULT_LIMIT, MAX_LIMIT, listDeployments, recordDeployment };
