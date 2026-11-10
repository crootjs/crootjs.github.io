#!/bin/sh
# Membangun ulang sitemap.xml dan llms-full.txt dari repo docs dan examples.
# Jalankan dari mana saja setelah docs/examples berubah (setiap rilis):
#   sh tools/build.sh [folder-docs] [folder-examples]
# Bawaan: ../docs dan ../examples di sebelah repo ini (struktur /home/.../crootjs/).
set -e
SITE=$(cd "$(dirname "$0")/.." && pwd)
DOCS=${1:-$SITE/../docs}
EXAMPLES=${2:-$SITE/../examples}
BASE=https://croot.js.org

# Tanggal commit terakhir sebuah file (YYYY-MM-DD), atau hari ini kalau belum di-commit.
lastmod() {
    date=$(git -C "$(dirname "$1")" log -1 --format=%cs -- "$(basename "$1")" 2>/dev/null)
    echo "${date:-$(date +%F)}"
}

url() {
    printf '  <url>\n    <loc>%s</loc>\n    <lastmod>%s</lastmod>\n    <priority>%s</priority>\n  </url>\n' "$1" "$2" "$3"
}

{
    echo '<?xml version="1.0" encoding="UTF-8"?>'
    echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    url "$BASE/" "$(lastmod "$SITE/index.html")" 1.00
    url "$BASE/docs/" "$(lastmod "$DOCS/README.md")" 0.90
    for file in "$DOCS"/*.md; do
        name=$(basename "$file" .md)
        case $name in README|CLAUDE) continue ;; esac
        url "$BASE/docs/$name" "$(lastmod "$file")" 0.80
    done
    for file in "$DOCS"/*/README.md; do
        name=$(basename "$(dirname "$file")")
        url "$BASE/docs/$name/" "$(lastmod "$file")" 0.80
    done
    url "$BASE/lib/" "$(lastmod "$SITE/index.html")" 0.60
    url "$BASE/examples/" "$(lastmod "$EXAMPLES/README.md")" 0.70
    find "$EXAMPLES" -name index.html -not -path '*/.git/*' | sort | while read -r file; do
        dir=$(dirname "$file")
        [ "$dir" = "$EXAMPLES" ] && continue
        url "$BASE/examples/${dir#"$EXAMPLES"/}/" "$(lastmod "$file")" 0.60
    done
    echo '</urlset>'
} > "$SITE/sitemap.xml"

# llms-full.txt: ringkasan llms.txt, lalu isi lengkap setiap halaman docs, urut seperti
# daftar di docs/README.md.
{
    cat "$SITE/llms.txt"
    printf '\n\n# Full module documentation\n\nEvery page below is also served as Markdown at %s/docs/<module>.md.\n' "$BASE"
    grep -o '](\([a-z0-9]*\)/\{0,1\})' "$DOCS/README.md" | sed 's/](\([a-z0-9]*\).*/\1/' | awk '!seen[$0]++' | while read -r name; do
        if [ -f "$DOCS/$name.md" ]; then file="$DOCS/$name.md" page=$name; else file="$DOCS/$name/README.md" page=$name/; fi
        [ -f "$file" ] || continue
        printf '\n\n---\n\nSource: %s/docs/%s\n\n' "$BASE" "$page"
        cat "$file"
    done
} > "$SITE/llms-full.txt"

echo "sitemap.xml: $(grep -c '<loc>' "$SITE/sitemap.xml") URL; llms-full.txt: $(wc -c < "$SITE/llms-full.txt") byte"
