// Deployments recorded in a local SQLite file (node:sqlite, no dependencies — decision DL4).
const fs = require('node:fs');
const { DatabaseSync } = require('node:sqlite');

/**
 * @param {string} file SQLite file with a `deployments (env, sha, deployed_at)` table
 * @param {string} env
 * @returns {{ sha: string, deployedAt: string }[]} newest first; [] when the file does not exist
 */
function listDeployments(file, env) {
    if (!fs.existsSync(file)) return [];
    const db = new DatabaseSync(file, { readOnly: true });
    try {
        return db
            .prepare('SELECT sha, deployed_at AS deployedAt FROM deployments WHERE env = ? ORDER BY deployed_at DESC')
            .all(env)
            .map(({ sha, deployedAt }) => ({ sha, deployedAt }));
    } finally {
        db.close();
    }
}

module.exports = { listDeployments };
