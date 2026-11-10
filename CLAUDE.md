# crootjs.github.io — Project Instructions

This repo is the CrootJS landing page, published at https://croot.js.org/ (GitHub org page, served from the `main` branch).

## Mandatory conventions

HTML, CSS, and JS live in separate files: `index.html`, `style.css`, `script.js`. No inline `<style>`/`<script>` blocks, no `onclick`/`style=""` attributes. `script.js` is loaded as `<script type="module" src="script.js">`. Full rules: https://croot.js.org/docs/conventions

Exception: third-party library CDN tags are fine as classic scripts — that's an external dependency, not this page's own logic. The JSON-LD `<script type="application/ld+json">` block in `<head>` is structured data for search engines, not logic, and stays inline (search engines only read it there).

## Icons

Icons are an inline SVG sprite at the top of `<body>` (Lucide v0.469.0, ISC), used as `<svg class="icon" width="20" height="20" aria-hidden="true"><use href="#i-NAME"/></svg>`. Don't load the Lucide library again (it was 700 KB, and `@latest` silently dropped the `github` icon). For a new icon, copy its paths from `https://unpkg.com/lucide-static@0.469.0/icons/NAME.svg` into a new `<symbol id="i-NAME">`.

## SEO and agent files

`sitemap.xml` and `llms-full.txt` are generated — run `sh tools/build.sh` after docs or examples change (part of every release), with the `docs` and `examples` repos checked out next to this one. `llms.txt` is hand-written. `og.png` (1200×630) is the social preview image.

## Testing changes

`type="module"` scripts do not load over `file://` in Chromium (CORS restriction on local files) — always test via a local HTTP server (`python3 -m http.server`), not by opening `index.html` directly, or you'll see false failures (module scripts not running) that don't reproduce once deployed.

## Content

- No unverifiable marketing claims ("thousands of developers", vague "security" claims). Every feature listed must map to something real in `crootjs/lib`.
- Links to hosting/docs pages must be checked live (`curl -o /dev/null -w '%{http_code}'`) before committing — several previously pointed at repos/paths that returned 404.
