// A static page served by Node's own http module, no dependencies (decision DL4). APP_ENV picks the flags file
// (test or prod, default test); PORT the port (default 8080). GET / is the page, GET /health a JSON check.
const crypto = require('node:crypto');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { readFlags, isOn } = require('./flags');
const { renderPage } = require('./page');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const DEFAULT_BUILD_FILE = path.join(__dirname, '..', 'config', 'build.json');
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
 * @param {{ env?: string, configDir?: string, buildFile?: string }} [options]
 * @returns {http.Server}
 */
function createServer({ env = process.env.APP_ENV || 'test', configDir, buildFile = DEFAULT_BUILD_FILE } = {}) {
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
