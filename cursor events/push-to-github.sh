#!/bin/bash

# GitHub Push Script for Cursor Community Events
echo "🚀 GitHub Push Script"
echo "===================="
echo ""

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: Please run this script from the project directory"
    echo "   cd '/Users/nurdikbazylbekov/cursor events'"
    exit 1
fi

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git not initialized. Run: git init"
    exit 1
fi

# Get GitHub username
echo "📝 Enter your GitHub username:"
read GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ Username cannot be empty"
    exit 1
fi

REPO_URL="https://github.com/${GITHUB_USERNAME}/cursor-community-events.git"

echo ""
echo "🔗 Repository URL: $REPO_URL"
echo ""
echo "⚠️  Make sure you've created the repository on GitHub first!"
echo "   Go to: https://github.com/new"
echo "   Name it: cursor-community-events"
echo ""
read -p "Press Enter to continue or Ctrl+C to cancel..."

# Check if remote already exists
if git remote get-url origin &>/dev/null; then
    echo "⚠️  Remote 'origin' already exists"
    read -p "Do you want to update it? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git remote set-url origin "$REPO_URL"
    else
        echo "Keeping existing remote"
    fi
else
    echo "➕ Adding remote origin..."
    git remote add origin "$REPO_URL"
fi

echo ""
echo "📤 Pushing to GitHub..."
echo ""

# Ensure we're on main branch
git branch -M main

# Push to GitHub
if git push -u origin main; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "🌐 Next steps:"
    echo "   1. Go to https://vercel.com"
    echo "   2. Click 'Add New Project'"
    echo "   3. Import your 'cursor-community-events' repository"
    echo "   4. Click 'Deploy'"
    echo ""
else
    echo ""
    echo "❌ Push failed!"
    echo ""
    echo "Common issues:"
    echo "   - Repository doesn't exist on GitHub (create it first!)"
    echo "   - Authentication failed (use Personal Access Token)"
    echo "   - Network issues"
    echo ""
    echo "Get help: https://docs.github.com/en/get-started/getting-started-with-git"
    exit 1
fi

