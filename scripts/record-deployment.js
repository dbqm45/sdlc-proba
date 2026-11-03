'use strict';
// Records a deployment in DEPLOYMENTS_DB (default config/deployments.db): npm run record-deployment -- ENV SHA
const path = require('node:path');
const { ENVIRONMENTS } = require('../src/flags');
const { recordDeployment } = require('../src/deployments');

const [env, sha] = process.argv.slice(2);
if (!ENVIRONMENTS.includes(env) || !sha) {
    console.error(`Usage: npm run record-deployment -- ENV SHA (ENV: ${ENVIRONMENTS.join(' or ')})`);
    process.exit(2);
}
const file = process.env.DEPLOYMENTS_DB || path.join(__dirname, '..', 'config', 'deployments.db');
recordDeployment(file, env, sha);
console.log(`Recorded ${env} ${sha} in ${file}`);
