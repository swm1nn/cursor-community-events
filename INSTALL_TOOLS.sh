#!/bin/bash

# Install Required Tools for Full Automation

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}Installing tools for full automation...${NC}"
echo ""

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}⚠️  Node.js not found${NC}"
    echo "Please install Node.js from: https://nodejs.org/"
    echo "Then run this script again."
    exit 1
else
    echo -e "${GREEN}✅ Node.js: $(node --version)${NC}"
fi

# Install GitHub CLI
if ! command -v gh &> /dev/null; then
    echo -e "${YELLOW}Installing GitHub CLI...${NC}"
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        if command -v brew &> /dev/null; then
            brew install gh
        else
            echo "Please install Homebrew first: https://brew.sh/"
            echo "Then run: brew install gh"
        fi
    else
        echo "Please install GitHub CLI manually: https://cli.github.com/"
    fi
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
echo -e "${GREEN}✅ Tools installed!${NC}"
echo ""
echo "Next steps:"
echo "1. Authenticate GitHub: ${BLUE}gh auth login${NC}"
echo "2. Authenticate Vercel: ${BLUE}vercel login${NC}"
echo "3. Run: ${BLUE}./AUTO_DEPLOY.sh${NC}"

