'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');

const DEFAULT_DB = path.join(__dirname, '..', 'config', 'deployments.db');

/** Deployments of one environment, newest first; a missing DB file means no deployments. */
function listDeployments(env, dbFile = process.env.DEPLOYMENTS_DB || DEFAULT_DB) {
    if (!fs.existsSync(dbFile)) return [];
    const db = new DatabaseSync(dbFile, { readOnly: true });
    try {
        return db.prepare('SELECT sha, deployed_at AS deployedAt FROM deployments WHERE env = ? ORDER BY deployed_at DESC').all(env);
    } finally {
        db.close();
    }
}

module.exports = { listDeployments };
