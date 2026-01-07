# Complete Setup & Deployment Guide

## 🎯 Quick Start

Your project is ready to deploy! Here are your options:

## Option 1: Deploy via Vercel Dashboard (Easiest - No CLI needed)

1. **Go to [vercel.com](https://vercel.com)** and sign in (or create an account)

2. **Click "Add New Project"**

3. **Upload your project**:
   - Option A: Drag and drop the entire `cursor events` folder
   - Option B: Import from GitHub (see Option 2 below)

4. **Vercel will automatically**:
   - Detect it's a static site
   - Deploy it
   - Give you a live URL!

5. **Done!** Your site will be live at `https://your-project.vercel.app`

## Option 2: Deploy via GitHub + Vercel (Recommended for updates)

### Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** icon → **"New repository"**
3. Name it: `cursor-community-events`
4. Make it **Public** (or Private if you prefer)
5. **Don't** initialize with README, .gitignore, or license (we already have these)
6. Click **"Create repository"**

### Step 2: Push Your Code to GitHub

Open Terminal and run:

```bash
cd "/Users/nurdikbazylbekov/cursor events"

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/cursor-community-events.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. Select your `cursor-community-events` repository
5. Click **"Import"**
6. Vercel will auto-detect settings and deploy!

**Now every time you push to GitHub, Vercel will automatically redeploy!**

## Option 3: Deploy via Vercel CLI

### Step 1: Install Node.js (if not installed)

1. Visit: https://nodejs.org/
2. Download and install the **LTS version**
3. Verify installation:
   ```bash
   node --version
   npm --version
   ```

### Step 2: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 3: Deploy

```bash
cd "/Users/nurdikbazylbekov/cursor events"
vercel
```

Follow the prompts:
- Log in to Vercel (or create account)
- Use default settings
- Your site will be deployed!

### Step 4: Deploy to Production

```bash
vercel --prod
```

## 🎉 What You Get

After deployment, you'll have:
- ✅ Live website URL (e.g., `https://cursor-community-events.vercel.app`)
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Free hosting
- ✅ Custom domain support (optional)

## 📝 Updating Your Site

### If using GitHub + Vercel:
1. Make changes to your files
2. Commit and push:
   ```bash
   git add .
   git commit -m "Update events"
   git push
   ```
3. Vercel automatically redeploys!

### If using Vercel Dashboard:
1. Make changes to your files
2. Drag and drop the folder again, or
3. Use Vercel CLI: `vercel --prod`

## 🔧 Project Files

- `index.html` - Main page
- `styles.css` - Styling
- `app.js` - Map functionality
- `events-data.js` - Event data (update this to add/modify events)
- `vercel.json` - Vercel configuration
- `package.json` - Project metadata

## 🆘 Troubleshooting

**Issue: "Node.js not found"**
- Install Node.js from https://nodejs.org/

**Issue: "Vercel CLI not found"**
- Run: `npm install -g vercel`

**Issue: "Git not initialized"**
- Run: `git init && git add . && git commit -m "Initial commit"`

**Issue: Map not showing**
- Check browser console (F12) for errors
- Ensure you're using `https://` (not `http://`) on Vercel

## 📞 Need Help?

- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support

