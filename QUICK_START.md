# 🚀 Quick Start - GitHub + Vercel

## Follow These 3 Simple Steps:

### 1️⃣ Create GitHub Repository (2 minutes)

1. Go to: **https://github.com/new**
2. Repository name: `cursor-community-events`
3. **Don't check** README, .gitignore, or license
4. Click **"Create repository"**

### 2️⃣ Push Your Code (1 minute)

**Option A: Use the script** (easiest):
```bash
cd "/Users/nurdikbazylbekov/cursor events"
./push-to-github.sh
```

**Option B: Manual commands**:
```bash
cd "/Users/nurdikbazylbekov/cursor events"
git remote add origin https://github.com/YOUR_USERNAME/cursor-community-events.git
git branch -M main
git push -u origin main
```
*(Replace `YOUR_USERNAME` with your GitHub username)*

**If asked for password**: Use a [Personal Access Token](https://github.com/settings/tokens)

### 3️⃣ Deploy to Vercel (2 minutes)

1. Go to: **https://vercel.com**
2. Sign in (you can use GitHub!)
3. Click **"Add New Project"**
4. Click **"Import Git Repository"**
5. Select **`cursor-community-events`**
6. Click **"Import"**
7. Click **"Deploy"**

## ✅ Done!

Your site will be live at: `https://cursor-community-events.vercel.app`

**Every time you push to GitHub, Vercel automatically redeploys!**

---

## 📝 Need More Details?

See `GITHUB_SETUP.md` for detailed instructions.

