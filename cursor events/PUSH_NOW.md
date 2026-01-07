# 🚀 Push to GitHub - Quick Guide

## Option 1: Use the Script (Easiest)

Run this command:
```bash
cd "/Users/nurdikbazylbekov/cursor events"
./push-to-github.sh
```

The script will:
- Ask for your GitHub username
- Add the remote
- Push your code

---

## Option 2: Manual Push

### Step 1: Create GitHub Repository (if not done)

1. Go to: **https://github.com/new**
2. Repository name: `cursor-community-events`
3. **Don't check** README, .gitignore, or license
4. Click **"Create repository"**

### Step 2: Add Remote and Push

Replace `YOUR_USERNAME` with your GitHub username:

```bash
cd "/Users/nurdikbazylbekov/cursor events"

# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/cursor-community-events.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**If asked for password:**
- Use a Personal Access Token (not your GitHub password)
- Get one: https://github.com/settings/tokens
- Click "Generate new token (classic)"
- Select scope: `repo`
- Copy and paste as password

---

## After Pushing

1. Vercel will automatically detect the push
2. It will redeploy your site with the latest changes
3. Your Slack webhook fixes will be live!

---

## Quick Check

After pushing, verify:
```bash
git remote -v
```

Should show your GitHub URL.

