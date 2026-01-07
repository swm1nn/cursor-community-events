#!/bin/bash

# Quick Authentication Setup Script

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}╔═══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  AUTHENTICATION SETUP FOR AUTO-DEPLOYMENT                ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check for Homebrew
if ! command -v brew &> /dev/null; then
    echo -e "${YELLOW}⚠️  Homebrew not found${NC}"
    echo "Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
else
    echo -e "${GREEN}✅ Homebrew installed${NC}"
fi

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found${NC}"
    echo ""
    echo "Please install Node.js:"
    echo "1. Visit: https://nodejs.org/"
    echo "2. Download and install the LTS version"
    echo "3. Run this script again"
    exit 1
else
    echo -e "${GREEN}✅ Node.js: $(node --version)${NC}"
fi

# Install GitHub CLI
if ! command -v gh &> /dev/null; then
    echo -e "${YELLOW}Installing GitHub CLI...${NC}"
    brew install gh
else
    echo -e "${GREEN}✅ GitHub CLI: $(gh --version | head -1)${NC}"
fi

# Install Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}Installing Vercel CLI...${NC}"
    npm install -g vercel
else
    echo -e "${GREEN}✅ Vercel CLI: $(vercel --version)${NC}"
fi

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""

# Check GitHub authentication
echo -e "${YELLOW}Checking GitHub authentication...${NC}"
if gh auth status &>/dev/null; then
    GITHUB_USER=$(gh api user --jq .login 2>/dev/null || echo "")
    echo -e "${GREEN}✅ GitHub authenticated as: $GITHUB_USER${NC}"
    GITHUB_AUTH=true
else
    echo -e "${YELLOW}⚠️  GitHub not authenticated${NC}"
    echo ""
    echo "Authenticating with GitHub..."
    echo -e "${BLUE}Follow the prompts in your browser...${NC}"
    gh auth login
    GITHUB_AUTH=true
fi

echo ""

# Check Vercel authentication
echo -e "${YELLOW}Checking Vercel authentication...${NC}"
if vercel whoami &>/dev/null; then
    VERCEL_USER=$(vercel whoami 2>/dev/null || echo "")
    echo -e "${GREEN}✅ Vercel authenticated as: $VERCEL_USER${NC}"
    VERCEL_AUTH=true
else
    echo -e "${YELLOW}⚠️  Vercel not authenticated${NC}"
    echo ""
    echo "Authenticating with Vercel..."
    echo -e "${BLUE}Follow the prompts in your browser...${NC}"
    vercel login
    VERCEL_AUTH=true
fi

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""

if [ "$GITHUB_AUTH" = true ] && [ "$VERCEL_AUTH" = true ]; then
    echo -e "${GREEN}╔═══════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║  ✅ AUTHENTICATION COMPLETE!                              ║${NC}"
    echo -e "${GREEN}╚═══════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo "Now you can run the auto-deploy script:"
    echo -e "${BLUE}   ./AUTO_DEPLOY.sh${NC}"
    echo ""
    echo "This will automatically:"
    echo "  ✅ Create GitHub repository"
    echo "  ✅ Push your code"
    echo "  ✅ Deploy to Vercel"
    echo "  ✅ Give you the live URL!"
else
    echo -e "${YELLOW}⚠️  Authentication incomplete${NC}"
    echo "Please run authentication manually:"
    echo "  gh auth login"
    echo "  vercel login"
fi

echo ""

