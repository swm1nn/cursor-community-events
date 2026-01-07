#!/bin/bash

# Complete Setup Script for Cursor Community Events
# This script will guide you through the entire deployment process

echo "🚀 Cursor Community Events - Complete Setup"
echo "==========================================="
echo ""
echo "This script will help you deploy your site to GitHub + Vercel"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo -e "${RED}❌ Error: Please run this script from the project directory${NC}"
    echo "   cd '/Users/nurdikbazylbekov/cursor events'"
    exit 1
fi

echo -e "${GREEN}✅ Project files found${NC}"
echo ""

# Step 1: Check Git status
echo "📦 Step 1: Checking Git repository..."
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}⚠️  Git not initialized. Initializing...${NC}"
    git init
    git add .
    git commit -m "Initial commit: Cursor Community Events Map"
fi

echo -e "${GREEN}✅ Git repository ready${NC}"
echo ""

# Step 2: GitHub Setup
echo "🐙 Step 2: GitHub Repository Setup"
echo "===================================="
echo ""
echo "You need to create a GitHub repository first."
echo ""
echo "1. Open this link in your browser:"
echo -e "${GREEN}   https://github.com/new${NC}"
echo ""
echo "2. Fill in:"
echo "   - Repository name: ${GREEN}cursor-community-events${NC}"
echo "   - Description: Interactive map of Cursor Community events"
echo "   - Visibility: Public or Private (your choice)"
echo ""
echo "3. ${RED}IMPORTANT:${NC} Do NOT check:"
echo "   ❌ Add a README file"
echo "   ❌ Add .gitignore"
echo "   ❌ Choose a license"
echo ""
echo "4. Click 'Create repository'"
echo ""
read -p "Press Enter when you've created the repository..."

echo ""
echo "Enter your GitHub username:"
read GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo -e "${RED}❌ Username cannot be empty${NC}"
    exit 1
fi

REPO_URL="https://github.com/${GITHUB_USERNAME}/cursor-community-events.git"

echo ""
echo -e "${GREEN}📝 Repository URL: ${REPO_URL}${NC}"
echo ""

# Check if remote already exists
if git remote get-url origin &>/dev/null; then
    echo -e "${YELLOW}⚠️  Remote 'origin' already exists${NC}"
    CURRENT_URL=$(git remote get-url origin)
    echo "   Current: $CURRENT_URL"
    read -p "Update it to the new URL? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git remote set-url origin "$REPO_URL"
        echo -e "${GREEN}✅ Remote updated${NC}"
    else
        echo "Keeping existing remote"
        REPO_URL="$CURRENT_URL"
    fi
else
    echo "➕ Adding remote origin..."
    git remote add origin "$REPO_URL"
    echo -e "${GREEN}✅ Remote added${NC}"
fi

echo ""
echo "📤 Pushing to GitHub..."
echo ""

# Ensure we're on main branch
git branch -M main

# Try to push
echo "Attempting to push..."
if git push -u origin main 2>&1; then
    echo ""
    echo -e "${GREEN}✅ Successfully pushed to GitHub!${NC}"
    GITHUB_SUCCESS=true
else
    echo ""
    echo -e "${YELLOW}⚠️  Push failed. This might be due to:${NC}"
    echo "   1. Authentication needed (you'll need to enter credentials)"
    echo "   2. Repository doesn't exist yet"
    echo ""
    echo "Let's try again with authentication..."
    echo ""
    echo -e "${YELLOW}If asked for password, use a Personal Access Token:${NC}"
    echo "   Get one at: https://github.com/settings/tokens"
    echo "   Click 'Generate new token (classic)'"
    echo "   Select scope: repo"
    echo ""
    read -p "Press Enter to try pushing again..."
    
    if git push -u origin main 2>&1; then
        echo ""
        echo -e "${GREEN}✅ Successfully pushed to GitHub!${NC}"
        GITHUB_SUCCESS=true
    else
        echo ""
        echo -e "${RED}❌ Push failed. Please push manually:${NC}"
        echo "   git push -u origin main"
        GITHUB_SUCCESS=false
    fi
fi

echo ""
echo "=========================================="
echo ""

# Step 3: Vercel Setup
echo "▲ Step 3: Vercel Deployment"
echo "==========================="
echo ""

if [ "$GITHUB_SUCCESS" = true ]; then
    echo -e "${GREEN}✅ GitHub repository is ready!${NC}"
    echo ""
    echo "Now let's deploy to Vercel:"
    echo ""
    echo "1. Open this link in your browser:"
    echo -e "${GREEN}   https://vercel.com/new${NC}"
    echo ""
    echo "2. Sign in (you can use your GitHub account!)"
    echo ""
    echo "3. Click 'Import Git Repository'"
    echo ""
    echo "4. Find and select: ${GREEN}cursor-community-events${NC}"
    echo ""
    echo "5. Click 'Import'"
    echo ""
    echo "6. Configure (usually defaults are fine):"
    echo "   - Framework Preset: Other"
    echo "   - Root Directory: ./"
    echo "   - Build Command: (leave empty)"
    echo "   - Output Directory: (leave empty)"
    echo ""
    echo "7. Click 'Deploy'"
    echo ""
    echo -e "${GREEN}Your site will be live in about 30 seconds!${NC}"
    echo ""
    echo "After deployment, you'll get a URL like:"
    echo -e "${GREEN}   https://cursor-community-events.vercel.app${NC}"
    echo ""
else
    echo -e "${YELLOW}⚠️  Please push to GitHub first, then:${NC}"
    echo ""
    echo "1. Go to: https://vercel.com/new"
    echo "2. Import your GitHub repository"
    echo "3. Deploy!"
    echo ""
fi

echo ""
echo "=========================================="
echo ""
echo -e "${GREEN}✨ Setup Complete!${NC}"
echo ""
echo "📚 Helpful files:"
echo "   - QUICK_START.md - Quick reference"
echo "   - GITHUB_SETUP.md - Detailed GitHub instructions"
echo "   - SETUP.md - Complete deployment guide"
echo ""
echo "🔄 To update your site:"
echo "   git add ."
echo "   git commit -m 'Update events'"
echo "   git push"
echo "   (Vercel will auto-deploy!)"
echo ""

