#!/bin/bash
set -e

VITE_DIR="./elite-interiors"
PUBLIC_DIR="./public"

# Build Vite project if dist doesn't exist  
if [ ! -f "$VITE_DIR/dist/index.html" ]; then
  echo "📦 Building Vite project..."
  cd "$VITE_DIR" && npm install --silent 2>/dev/null && npm run build && cd ..
fi

# Copy assets
mkdir -p "$PUBLIC_DIR/assets" "$PUBLIC_DIR/images"
cp "$VITE_DIR/dist/assets/"* "$PUBLIC_DIR/assets/" 2>/dev/null || true
cp "$VITE_DIR/dist/images/"* "$PUBLIC_DIR/images/" 2>/dev/null || true
cp "$VITE_DIR/dist/favicon.svg" "$PUBLIC_DIR/" 2>/dev/null || true

echo "🚀 Starting Elite Interiors..."
exec npx next dev -p 3000
