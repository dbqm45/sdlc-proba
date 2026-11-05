// A static page served by Node's own http module, no dependencies (decision DL4). APP_ENV picks the flags file
// (test or prod, default test); PORT the port (default 8080). GET / is the page, GET /health a JSON check,
// GET /deployments?env=<env> the deployments of an environment from DEPLOYMENTS_DB (default config/deployments.db).
const crypto = require('node:crypto');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { DEFAULT_LIMIT, MAX_LIMIT, countDeployments, listDeployments } = require('./deployments');
const { ENVIRONMENTS, readFlags, isOn } = require('./flags');
const { renderPage } = require('./page');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const DEFAULT_BUILD_FILE = path.join(__dirname, '..', 'config', 'build.json');
const DEFAULT_DEPLOYMENTS_DB = process.env.DEPLOYMENTS_DB || path.join(__dirname, '..', 'config', 'deployments.db');
const VISITOR_COOKIE = 'visitor';
const COUNTER_WINDOW_MS = 7 * 24 * 3600 * 1000;   // the deploy counter window, UTC
const ISO_TIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z$/;   // ?before= (UTC)

function isIsoTime(value) {
    return ISO_TIME.test(value) && !Number.isNaN(Date.parse(value));
}

/** Page cursor: base64url JSON of the last item's time and rowid. */
function encodeCursor({ t, id }) {
    return Buffer.from(JSON.stringify({ t, id })).toString('base64url');
}

/** @returns {{ t: string, id: number }|undefined} undefined when the cursor is broken */
function decodeCursor(raw) {
    try {
        const { t, id } = JSON.parse(Buffer.from(raw, 'base64url').toString('utf8'));
        return typeof t === 'string' && isIsoTime(t) && Number.isInteger(id) && id > 0 ? { t, id } : undefined;
    } catch {
        return undefined;
    }
}

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
    const handle = (req, res) => {
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
            const before = url.searchParams.get('before');
            if (before !== null && !isIsoTime(before)) {
                const error = 'before must be an ISO 8601 UTC time, e.g. 2026-11-01T10:00:00Z';
                res.writeHead(400, { 'content-type': 'application/json' }).end(JSON.stringify({ error }));
                return;
            }
            const rawCursor = url.searchParams.get('cursor');
            const after = rawCursor === null ? null : decodeCursor(rawCursor);
            if (after === undefined || (after && before !== null)) {
                const error = after ? 'use either cursor or before' : 'cursor is not valid; use the Link rel="next" URL';
                res.writeHead(400, { 'content-type': 'application/json' }).end(JSON.stringify({ error }));
                return;
            }
            const { items, next } = listDeployments(deploymentsDb, target, limit, { before, after });
            const headers = { 'content-type': 'application/json' };
            if (next) {
                const query = new URLSearchParams({ env: target, limit: String(limit), cursor: encodeCursor(next) });
                const nextUrl = `/deployments?${query}`;   // URLSearchParams encodes every value
                headers.link = '<' + nextUrl + '>; rel="next"';   // RFC 8288
            }
            res.writeHead(200, headers).end(JSON.stringify(items));
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
        const on = (key) => isOn(flags, key, visitor.id);
        let deployCount;
        if (on('deploy_counter')) {   // the database is opened only when the flag is on
            const requested = url.searchParams.get('env');
            const since = new Date(Date.now() - COUNTER_WINDOW_MS).toISOString();
            deployCount = countDeployments(deploymentsDb, ENVIRONMENTS.includes(requested) ? requested : env, since);
        }
        res.writeHead(200, headers).end(renderPage({ env, on, deployedAt, deployCount }));
    };
    // An unexpected error (e.g. a corrupt deployments DB) answers 500 instead of crashing the process;
    // details go to the server log only, never to the client.
    return http.createServer((req, res) => {
        try {
            handle(req, res);
        } catch (err) {
            console.error('%s %s failed:', req.method, req.url, err);   // constant format: the URL is data
            if (res.headersSent) {
                res.destroy();
                return;
            }
            res.writeHead(500, { 'content-type': 'application/json' }).end(JSON.stringify({ error: 'internal error' }));
        }
    });
}

if (require.main === module) {
    const port = Number(process.env.PORT) || 8080;
    createServer().listen(port, () => console.log(`sdlc-sandbox: http://localhost:${port}/ (${process.env.APP_ENV || 'test'})`));
}

module.exports = { createServer };
