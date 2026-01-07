# GitHub + Vercel Setup - Step by Step

## Step 1: Create GitHub Repository

1. **Go to GitHub**: https://github.com/new
2. **Repository name**: `cursor-community-events`
3. **Description** (optional): "Interactive map of Cursor Community events"
4. **Visibility**: Choose Public or Private
5. **IMPORTANT**: Do NOT check any of these:
   - ❌ Add a README file
   - ❌ Add .gitignore
   - ❌ Choose a license
6. **Click "Create repository"**

## Step 2: Copy Your Repository URL

After creating the repo, GitHub will show you a page with setup instructions. 

**Copy the repository URL** - it will look like:
- `https://github.com/YOUR_USERNAME/cursor-community-events.git`

## Step 3: Run These Commands

Open Terminal and run these commands (replace `YOUR_USERNAME` with your actual GitHub username):

```bash
cd "/Users/nurdikbazylbekov/cursor events"

# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/cursor-community-events.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Note**: If you're asked for credentials:
- **Username**: Your GitHub username
- **Password**: Use a Personal Access Token (not your GitHub password)
  - Get one at: https://github.com/settings/tokens
  - Click "Generate new token (classic)"
  - Give it a name like "Vercel Deploy"
  - Select scope: `repo` (full control)
  - Generate and copy the token

## Step 4: Connect to Vercel

1. **Go to Vercel**: https://vercel.com
2. **Sign in** (or create account - you can use GitHub to sign in!)
3. **Click "Add New Project"**
4. **Click "Import Git Repository"**
5. **Find and select** `cursor-community-events`
6. **Click "Import"**
7. **Configure Project**:
   - Framework Preset: Other
   - Root Directory: `./`
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
8. **Click "Deploy"**

## Step 5: Wait for Deployment

Vercel will:
- ✅ Clone your repository
- ✅ Detect it's a static site
- ✅ Deploy it
- ✅ Give you a live URL!

**Your site will be live at**: `https://cursor-community-events.vercel.app` (or similar)

## 🎉 Done!

Now every time you:
1. Make changes to your files
2. Run: `git add . && git commit -m "Update" && git push`
3. Vercel will automatically redeploy!

## Quick Commands Reference

```bash
# Make changes, then:
git add .
git commit -m "Your commit message"
git push

# Vercel automatically deploys!
```

