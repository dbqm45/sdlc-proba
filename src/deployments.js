// Deployments recorded in a local SQLite file (node:sqlite, no dependencies — decision DL4).
const fs = require('node:fs');
const { DatabaseSync } = require('node:sqlite');

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

// julianday(): deployed_at comes as …:00Z and …:00.000Z, which do not compare correctly as text.
// The index below has the same expression, so a page is an index range with no separate sort.
const LIST_SQL = 'SELECT rowid AS id, sha, deployed_at AS deployedAt FROM deployments WHERE env = ? '
    + 'AND (? IS NULL OR julianday(deployed_at) < julianday(?)) '
    + 'AND (? IS NULL OR julianday(deployed_at) < julianday(?) '
    + 'OR (julianday(deployed_at) = julianday(?) AND rowid < ?)) '
    + 'ORDER BY julianday(deployed_at) DESC, rowid DESC LIMIT ?';

/**
 * One page of an environment's deployments, newest first; ties in time are ordered by rowid.
 *
 * @param {string} file SQLite file with a `deployments (env, sha, deployed_at)` table
 * @param {string} env
 * @param {number} [limit] deployments per page (default 20)
 * @param {{ before?: string|null, after?: { t: string, id: number }|null }} [from] start below an ISO 8601
 *   time (`before`) or below the last item of the previous page (`after`, from `next`)
 * @returns {{ items: { sha: string, deployedAt: string }[], next: { t: string, id: number }|null }}
 *   `next` is set only when more deployments follow; no file means no deployments
 */
function listDeployments(file, env, limit = DEFAULT_LIMIT, { before = null, after = null } = {}) {
    if (!fs.existsSync(file)) return { items: [], next: null };
    const db = new DatabaseSync(file, { readOnly: true });
    try {
        const rows = db
            .prepare(LIST_SQL)
            .all(env, before, before, after?.t ?? null, after?.t ?? null, after?.t ?? null, after?.id ?? null, limit + 1);
        const page = rows.slice(0, limit);
        const last = page[page.length - 1];
        return {
            items: page.map(({ sha, deployedAt }) => ({ sha, deployedAt })),
            next: rows.length > limit ? { t: last.deployedAt, id: last.id } : null,
        };
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
        db.exec('CREATE INDEX IF NOT EXISTS deployments_env_time ON deployments (env, julianday(deployed_at))');
        db.prepare('INSERT INTO deployments (env, sha, deployed_at) VALUES (?, ?, ?)').run(env, sha, at.toISOString());
    } finally {
        db.close();
    }
}

const COUNT_SQL = 'SELECT COUNT(*) AS n FROM deployments WHERE env = ? AND julianday(deployed_at) >= julianday(?)';

/**
 * Number of an environment's deployments at or after `since` (all of them, no paging); no file means 0.
 *
 * @param {string} file SQLite file with a `deployments (env, sha, deployed_at)` table
 * @param {string} env
 * @param {string} since ISO 8601 UTC time, inclusive lower bound
 * @returns {number}
 */
function countDeployments(file, env, since) {
    if (!fs.existsSync(file)) return 0;
    const db = new DatabaseSync(file, { readOnly: true });
    try {
        return db.prepare(COUNT_SQL).get(env, since).n;
    } finally {
        db.close();
    }
}

module.exports = { DEFAULT_LIMIT, MAX_LIMIT, LIST_SQL, listDeployments, recordDeployment, countDeployments };
