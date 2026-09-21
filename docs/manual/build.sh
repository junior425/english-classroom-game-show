#!/usr/bin/env sh
# Regenerates public/manual-english-game-show.pdf from docs/manual/manual.html (needs Chrome/Chromium).
set -e
cd "$(dirname "$0")/../.."
CHROME="${CHROME:-$(command -v google-chrome || command -v chromium || command -v chromium-browser)}"
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer --no-sandbox \
  --print-to-pdf="public/manual-english-game-show.pdf" "file://$PWD/docs/manual/manual.html"
