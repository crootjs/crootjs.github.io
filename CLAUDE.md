# crootjs.github.io — Project Instructions

This repo is the CrootJS landing page, published at https://croot.js.org/ (GitHub org page, served from the `main` branch).

## Mandatory conventions

HTML, CSS, and JS live in separate files: `index.html`, `style.css`, `script.js`. No inline `<style>`/`<script>` blocks, no `onclick`/`style=""` attributes. `script.js` is loaded as `<script type="module" src="script.js">`. Full rules: https://croot.js.org/docs/conventions

Exception: third-party library CDN tags (e.g. the Lucide icons `<script src="https://unpkg.com/...">`) are fine as classic scripts — that's an external dependency, not this page's own logic.

## Testing changes

`type="module"` scripts do not load over `file://` in Chromium (CORS restriction on local files) — always test via a local HTTP server (`python3 -m http.server`), not by opening `index.html` directly, or you'll see false failures (icons/images not rendering) that don't reproduce once deployed.

## Content

- No unverifiable marketing claims ("thousands of developers", vague "security" claims). Every feature listed must map to something real in `crootjs/lib`.
- Links to hosting/docs pages must be checked live (`curl -o /dev/null -w '%{http_code}'`) before committing — several previously pointed at repos/paths that returned 404.
