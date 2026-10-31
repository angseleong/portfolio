#!/usr/bin/env bash
# /cv → public/cv.pdf with headless Chrome (ARCHITECTURE.md §6).
set -euo pipefail
cd "$(dirname "$0")/.."

CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
PORT="${PORT:-3123}" # not 3000, so it runs next to `npm run dev`

npx next build
npx next start -p "$PORT" >/dev/null 2>&1 &
SERVER=$!
trap 'kill $SERVER' EXIT

for _ in $(seq 60); do
  curl -sf "http://localhost:$PORT/cv" >/dev/null && break
  sleep 0.5
done

"$CHROME" --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=public/cv.pdf "http://localhost:$PORT/cv" 2>/dev/null
echo "Wrote public/cv.pdf"
