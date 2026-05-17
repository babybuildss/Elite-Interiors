#!/bin/bash
set -e

VITE_DIR="./elite-interiors"
PUBLIC_DIR="./public"

echo "🔧 Checking Elite Interiors build..."

# Build Vite project if dist doesn't exist
if [ ! -f "$VITE_DIR/dist/index.html" ]; then
  echo "📦 Building Vite project..."
  cd "$VITE_DIR"
  npm install --silent
  npm run build
  cd ..
  echo "✅ Vite build complete"
fi

# Copy assets to Next.js public directory
echo "📋 Copying assets..."
mkdir -p "$PUBLIC_DIR/assets"
cp "$VITE_DIR/dist/assets/"* "$PUBLIC_DIR/assets/" 2>/dev/null || true
mkdir -p "$PUBLIC_DIR/images"
cp "$VITE_DIR/dist/images/"* "$PUBLIC_DIR/images/" 2>/dev/null || true
cp "$VITE_DIR/dist/favicon.svg" "$PUBLIC_DIR/" 2>/dev/null || true

echo "🚀 Starting Next.js dev server..."
exec npx next dev -p 3000
