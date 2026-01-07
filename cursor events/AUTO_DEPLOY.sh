#!/bin/bash

# Auto-Deploy Script - Does Everything Possible Automatically
# You'll only need to authenticate for GitHub and Vercel

set -e  # Exit on error

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}╔═══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  CURSOR COMMUNITY EVENTS - AUTO DEPLOYMENT SCRIPT        ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check directory
if [ ! -f "index.html" ]; then
    echo -e "${RED}❌ Error: Run this from the project directory${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Step 1/5: Verifying project files...${NC}"
if [ ! -d ".git" ]; then
    git init
    git add .
    git commit -m "Initial commit: Cursor Community Events Map" || true
fi
echo -e "${GREEN}✅ Project ready${NC}"
echo ""

# Check for GitHub CLI
echo -e "${YELLOW}📦 Step 2/5: Checking for GitHub CLI...${NC}"
if command -v gh &> /dev/null; then
    echo -e "${GREEN}✅ GitHub CLI found${NC}"
    if gh auth status &>/dev/null; then
        echo -e "${GREEN}✅ GitHub authenticated${NC}"
        GITHUB_USER=$(gh api user --jq .login 2>/dev/null || echo "")
        if [ ! -z "$GITHUB_USER" ]; then
            echo -e "${GREEN}✅ Logged in as: $GITHUB_USER${NC}"
            GITHUB_READY=true
        else
            GITHUB_READY=false
        fi
    else
        echo -e "${YELLOW}⚠️  GitHub CLI not authenticated${NC}"
        GITHUB_READY=false
    fi
else
    echo -e "${YELLOW}⚠️  GitHub CLI not installed${NC}"
    GITHUB_READY=false
fi
echo ""

# Try to create repo if GitHub CLI is ready
if [ "$GITHUB_READY" = true ]; then
    echo -e "${GREEN}🚀 Step 3/5: Creating GitHub repository...${NC}"
    REPO_NAME="cursor-community-events"
    
    # Check if repo already exists
    if gh repo view "$GITHUB_USER/$REPO_NAME" &>/dev/null; then
        echo -e "${YELLOW}⚠️  Repository already exists${NC}"
    else
        echo "Creating repository: $REPO_NAME"
        if gh repo create "$REPO_NAME" --public --source=. --remote=origin --push 2>&1; then
            echo -e "${GREEN}✅ Repository created and code pushed!${NC}"
            GITHUB_DONE=true
        else
            echo -e "${YELLOW}⚠️  Could not create repo automatically${NC}"
            GITHUB_DONE=false
        fi
    fi
else
    echo -e "${YELLOW}📝 Step 3/5: Manual GitHub setup needed${NC}"
    echo ""
    echo "To authenticate GitHub CLI, run:"
    echo -e "${BLUE}   gh auth login${NC}"
    echo ""
    echo "Or create repository manually at:"
    echo -e "${BLUE}   https://github.com/new${NC}"
    echo ""
    echo "Then run this script again, or push manually:"
    echo -e "${BLUE}   git remote add origin https://github.com/YOUR_USERNAME/cursor-community-events.git${NC}"
    echo -e "${BLUE}   git push -u origin main${NC}"
    GITHUB_DONE=false
fi
echo ""

# Check for Vercel CLI
echo -e "${YELLOW}📦 Step 4/5: Checking for Vercel CLI...${NC}"
if command -v vercel &> /dev/null; then
    echo -e "${GREEN}✅ Vercel CLI found${NC}"
    if vercel whoami &>/dev/null; then
        echo -e "${GREEN}✅ Vercel authenticated${NC}"
        VERCEL_READY=true
    else
        echo -e "${YELLOW}⚠️  Vercel CLI not authenticated${NC}"
        VERCEL_READY=false
    fi
else
    echo -e "${YELLOW}⚠️  Vercel CLI not installed${NC}"
    VERCEL_READY=false
fi
echo ""

# Deploy to Vercel if ready
if [ "$VERCEL_READY" = true ] && [ "$GITHUB_DONE" = true ]; then
    echo -e "${GREEN}🚀 Step 5/5: Deploying to Vercel...${NC}"
    if vercel --prod --yes 2>&1; then
        echo ""
        echo -e "${GREEN}╔═══════════════════════════════════════════════════════════╗${NC}"
        echo -e "${GREEN}║  ✅ DEPLOYMENT COMPLETE!                                 ║${NC}"
        echo -e "${GREEN}╚═══════════════════════════════════════════════════════════╝${NC}"
        echo ""
        echo "Your site is live! Check the URL above."
    else
        echo -e "${YELLOW}⚠️  Deployment failed. Try manually:${NC}"
        echo -e "${BLUE}   vercel --prod${NC}"
    fi
elif [ "$GITHUB_DONE" = true ]; then
    echo -e "${YELLOW}📝 Step 5/5: Manual Vercel deployment needed${NC}"
    echo ""
    echo "To authenticate Vercel CLI, run:"
    echo -e "${BLUE}   npm install -g vercel${NC}"
    echo -e "${BLUE}   vercel login${NC}"
    echo ""
    echo "Or deploy via web:"
    echo -e "${BLUE}   https://vercel.com/new${NC}"
    echo "   → Import your GitHub repository"
    echo "   → Deploy!"
else
    echo -e "${YELLOW}📝 Step 5/5: Setup needed first${NC}"
    echo ""
    echo "Complete GitHub setup first, then:"
    echo "1. Install Vercel CLI: ${BLUE}npm install -g vercel${NC}"
    echo "2. Login: ${BLUE}vercel login${NC}"
    echo "3. Deploy: ${BLUE}vercel --prod${NC}"
    echo ""
    echo "Or use web interface: ${BLUE}https://vercel.com/new${NC}"
fi

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""

