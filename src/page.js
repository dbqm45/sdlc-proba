// The page. Everything interpolated is escaped; the only behaviour behind a flag today is `welcome_banner`.
const escape = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/**
 * @param {{ env: string, on: (key: string) => boolean, deployedAt?: string|null, deployCount?: number }} input
 *   `on` says whether a flag is on for this visitor; `deployedAt` is the ISO date from config/build.json;
 *   `deployCount` is the deployments of the last 7 days (shown behind `deploy_counter`)
 * @returns {string} HTML
 */
function renderPage({ env, on, deployedAt, deployCount = 0 }) {
    const counter = on('deploy_counter')
        ? `\n<p data-flag="deploy_counter">Wdrożenia w ostatnich 7 dniach: ${escape(deployCount)}</p>`
        : '';
    const banner = on('welcome_banner')
        ? '<p class="banner" data-flag="welcome_banner">Witaj w sdlc-sandbox — repo próbnym całego przepływu.</p>'
        : '';
    const footer = (on('show_last_deployed') && deployedAt)
        ? `<footer><p data-flag="show_last_deployed">Ostatnie wdrożenie: ${escape(deployedAt)}</p></footer>`
        : '';
    const badgeOn = on('env_badge');
    const label = escape(String(env).toUpperCase());
    const badge = badgeOn
        ? `\n<span class="env-badge env-badge--${escape(env)}" data-flag="env_badge">${label}</span>`
        : '';
    const title = badgeOn ? `[${label}] sdlc-sandbox` : 'sdlc-sandbox';
    return `<!doctype html>
<html lang="pl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title>
<link rel="stylesheet" href="/style.css"></head>
<body>
<main>
<h1>sdlc-sandbox</h1>${badge}
${banner}
<p>Środowisko: <strong>${escape(env)}</strong></p>${counter}
</main>
${footer}
</body>
</html>
`;
}

module.exports = { renderPage, escape };
