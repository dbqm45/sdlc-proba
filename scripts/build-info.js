'use strict';
const fs = require('node:fs');
const path = require('node:path');

function writeBuildInfo(file, date) {
    const dir = path.dirname(file);
    if (dir && dir !== '.') fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(file, JSON.stringify({ deployedAt: date }, null, 2) + '\n');
}

if (require.main === module) {
    const file = process.argv[2] || 'config/build.json';
    const date = new Date().toISOString().slice(0, 10);
    writeBuildInfo(file, date);
}

module.exports = { writeBuildInfo };
