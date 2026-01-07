# 🔐 Authentication Setup Guide

To allow full automation, you need to authenticate with GitHub and Vercel. Here's how:

## Step 1: Install Required Tools

### Install Homebrew (if not installed)
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Install Node.js (if not installed)
1. Visit: https://nodejs.org/
2. Download and install the LTS version
3. Verify: `node --version`

### Install GitHub CLI
```bash
brew install gh
```

### Install Vercel CLI
```bash
npm install -g vercel
```

---

## Step 2: Authenticate with GitHub

Run this command:
```bash
gh auth login
```

**Follow the prompts:**
1. **What account do you want to log into?** → GitHub.com
2. **What is your preferred protocol?** → HTTPS (recommended)
3. **Authenticate Git with your GitHub credentials?** → Yes
4. **How would you like to authenticate?** → Login with a web browser (easiest)
5. A browser window will open → Click "Authorize"
6. Enter your one-time code when prompted

**Alternative (if browser doesn't work):**
- Choose "Paste an authentication token"
- Get token from: https://github.com/settings/tokens
- Click "Generate new token (classic)"
- Select scope: `repo` (full control)
- Copy and paste the token

**Verify authentication:**
```bash
gh auth status
```

---

## Step 3: Authenticate with Vercel

Run this command:
```bash
vercel login
```

**Follow the prompts:**
1. A browser window will open
2. Sign in with GitHub (or create account)
3. Authorize Vercel
4. Return to terminal

**Verify authentication:**
```bash
vercel whoami
```

---

## Step 4: Run Auto-Deploy!

Once authenticated, run:
```bash
cd "/Users/nurdikbazylbekov/cursor events"
./AUTO_DEPLOY.sh
```

This will automatically:
- ✅ Create GitHub repository
- ✅ Push your code
- ✅ Deploy to Vercel
- ✅ Give you the live URL!

---

## Quick Install Script

Or run this to install everything at once:
```bash
cd "/Users/nurdikbazylbekov/cursor events"
./INSTALL_TOOLS.sh
```

Then authenticate:
```bash
gh auth login
vercel login
```

Then deploy:
```bash
./AUTO_DEPLOY.sh
```

---

## What Permissions Are Needed?

### GitHub:
- **Read/Write access to repositories** - To create repo and push code
- This is granted when you authenticate with `gh auth login`

### Vercel:
- **Access to your GitHub repositories** - To import and deploy
- **Deploy permissions** - To publish your site
- This is granted when you authenticate with `vercel login`

---

## Troubleshooting

**"gh: command not found"**
→ Install GitHub CLI: `brew install gh`

**"vercel: command not found"**
→ Install Vercel CLI: `npm install -g vercel`

**"node: command not found"**
→ Install Node.js from https://nodejs.org/

**Authentication fails**
→ Try the token method instead of browser login

**"Permission denied"**
→ Make sure you authorized the app in the browser

