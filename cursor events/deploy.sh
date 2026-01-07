#!/bin/bash

# Cursor Community Events - Deployment Script
echo "🚀 Cursor Community Events Deployment Script"
echo "============================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed."
    echo ""
    echo "Please install Node.js first:"
    echo "1. Visit: https://nodejs.org/"
    echo "2. Download and install the LTS version"
    echo "3. Run this script again"
    echo ""
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
    echo ""
fi

echo "✅ Vercel CLI ready"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: Cursor Community Events Map"
    echo ""
fi

echo "🌐 Deploying to Vercel..."
echo ""
vercel

echo ""
echo "✨ Deployment complete!"
echo ""
echo "To deploy to production, run: vercel --prod"

