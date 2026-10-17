#!/bin/sh
# Renders scripts/social-card.html to public/social-card.png (1200x630) with headless Chrome.
cd "$(dirname "$0")/.." && "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars \
  --window-size=1200,630 --virtual-time-budget=5000 --screenshot="$PWD/public/social-card.png" "file://$PWD/scripts/social-card.html"
