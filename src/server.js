// A static page served by Node's own http module, no dependencies (decision DL4). APP_ENV picks the flags file
// (test or prod, default test); PORT the port (default 8080). GET / is the page, GET /health a JSON check,
// GET /deployments?env=<env> the deployments of an environment from DEPLOYMENTS_DB (default config/deployments.db).
const crypto = require('node:crypto');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { DEFAULT_LIMIT, MAX_LIMIT, listDeployments } = require('./deployments');
const { ENVIRONMENTS, readFlags, isOn } = require('./flags');
const { renderPage } = require('./page');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const DEFAULT_BUILD_FILE = path.join(__dirname, '..', 'config', 'build.json');
const DEFAULT_DEPLOYMENTS_DB = process.env.DEPLOYMENTS_DB || path.join(__dirname, '..', 'config', 'deployments.db');
const VISITOR_COOKIE = 'visitor';

function readBuildInfo(file) {
    try {
        return JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch (_) {
        return {};
    }
}

function visitorOf(req) {
    const match = /(?:^|;\s*)visitor=([A-Za-z0-9_-]{8,64})/.exec(req.headers.cookie || '');
    return match ? { id: match[1], fresh: false } : { id: crypto.randomBytes(12).toString('base64url'), fresh: true };
}

/**
 * @param {{ env?: string, configDir?: string, buildFile?: string, deploymentsDb?: string }} [options]
 * @returns {http.Server}
 */
function createServer({ env = process.env.APP_ENV || 'test', configDir, buildFile = DEFAULT_BUILD_FILE, deploymentsDb = DEFAULT_DEPLOYMENTS_DB } = {}) {
    const { deployedAt = null } = readBuildInfo(buildFile);
    return http.createServer((req, res) => {
        const url = new URL(req.url, 'http://localhost');
        if (req.method !== 'GET') {
            res.writeHead(405, { allow: 'GET' }).end();
            return;
        }
        if (url.pathname === '/health') {
            res.writeHead(200, { 'content-type': 'application/json' }).end(JSON.stringify({ ok: true, env }));
            return;
        }
        if (url.pathname === '/deployments') {
            const target = url.searchParams.get('env');
            if (!target) {
                res.writeHead(400, { 'content-type': 'application/json' }).end(JSON.stringify({ error: 'env is required' }));
                return;
            }
            if (!ENVIRONMENTS.includes(target)) {
                const error = `Unknown environment ${target}; use ${ENVIRONMENTS.join(' or ')}`;
                res.writeHead(400, { 'content-type': 'application/json' }).end(JSON.stringify({ error }));
                return;
            }
            const rawLimit = url.searchParams.get('limit');
            const limit = rawLimit === null ? DEFAULT_LIMIT : /^\d+$/.test(rawLimit) ? Number(rawLimit) : NaN;
            if (!(limit >= 1 && limit <= MAX_LIMIT)) {
                const error = `limit must be an integer from 1 to ${MAX_LIMIT}`;
                res.writeHead(400, { 'content-type': 'application/json' }).end(JSON.stringify({ error }));
                return;
            }
            res.writeHead(200, { 'content-type': 'application/json' }).end(JSON.stringify(listDeployments(deploymentsDb, target, limit)));
            return;
        }
        if (url.pathname === '/style.css') {
            res.writeHead(200, { 'content-type': 'text/css; charset=utf-8' }).end(fs.readFileSync(path.join(PUBLIC_DIR, 'style.css')));
            return;
        }
        if (url.pathname !== '/') {
            res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }).end('Not found');
            return;
        }
        const flags = readFlags(env, configDir);
        const visitor = visitorOf(req);
        const headers = { 'content-type': 'text/html; charset=utf-8', 'content-security-policy': "default-src 'self'" };
        if (visitor.fresh) headers['set-cookie'] = `${VISITOR_COOKIE}=${visitor.id}; Path=/; HttpOnly; SameSite=Lax`;
        res.writeHead(200, headers).end(renderPage({ env, on: (key) => isOn(flags, key, visitor.id), deployedAt }));
    });
}

if (require.main === module) {
    const port = Number(process.env.PORT) || 8080;
    createServer().listen(port, () => console.log(`sdlc-sandbox: http://localhost:${port}/ (${process.env.APP_ENV || 'test'})`));
}

module.exports = { createServer };
