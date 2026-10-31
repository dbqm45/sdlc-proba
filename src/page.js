// The page. Everything interpolated is escaped; the only behaviour behind a flag today is `welcome_banner`.
const escape = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/**
 * @param {{ env: string, on: (key: string) => boolean, deployedAt?: string|null }} input
 *   `on` says whether a flag is on for this visitor; `deployedAt` is the ISO date from config/build.json
 * @returns {string} HTML
 */
function renderPage({ env, on, deployedAt }) {
    const banner = on('welcome_banner')
        ? '<p class="banner" data-flag="welcome_banner">Witaj w sdlc-sandbox — repo próbnym całego przepływu.</p>'
        : '';
    const footer = (on('show_last_deployed') && deployedAt)
        ? `<footer><p data-flag="show_last_deployed">Ostatnie wdrożenie: ${escape(deployedAt)}</p></footer>`
        : '';
    return `<!doctype html>
<html lang="pl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>sdlc-sandbox</title>
<link rel="stylesheet" href="/style.css"></head>
<body>
<main>
<h1>sdlc-sandbox</h1>
${banner}
<p>Środowisko: <strong>${escape(env)}</strong></p>
</main>
${footer}
</body>
</html>
`;
}

module.exports = { renderPage, escape };
