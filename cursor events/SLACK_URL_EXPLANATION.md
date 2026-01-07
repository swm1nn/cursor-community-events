# 🔗 Slack Webhook URL - Where to Enter It

## Important: Two Different URLs!

There are **two different URLs** in Slack setup. Don't confuse them!

---

## URL #1: Incoming Webhook URL (FROM Slack)
**What it is:** A URL that Slack gives you to send messages TO Slack  
**Where you get it:** Slack App → Incoming Webhooks  
**Where to use it:** You DON'T need this for our integration!  
**What it looks like:** `https://hooks.slack.com/services/T00000000/B00000000/XXXXX`

---

## URL #2: Request URL (TO Your Server) ⭐ THIS IS WHAT YOU NEED
**What it is:** Your Vercel API endpoint where Slack sends events  
**Where to enter it:** Slack App → Event Subscriptions → Request URL  
**What it looks like:** `https://your-site.vercel.app/api/slack-webhook`

---

## Step-by-Step: Where to Enter Your Vercel URL

### Step 1: Deploy Your Site First
```bash
git push
```
Wait for Vercel to deploy (1-2 minutes). You'll get a URL like:
`https://cursor-community-events.vercel.app`

### Step 2: Go to Slack App Settings
1. Go to: **https://api.slack.com/apps**
2. Click on your app: **"Cursor Events Bot"**

### Step 3: Event Subscriptions
1. In the left sidebar, click **"Event Subscriptions"**
2. Toggle **"Enable Events"** to **ON** (green)

### Step 4: Enter Your Vercel URL
1. Find the **"Request URL"** field
2. Enter your Vercel URL + `/api/slack-webhook`:
   ```
   https://cursor-community-events.vercel.app/api/slack-webhook
   ```
   (Replace `cursor-community-events` with your actual Vercel project name)

3. Slack will automatically verify the URL
   - You should see: ✅ **"Verified"** in green
   - If you see ❌ "Not verified", check:
     - Your site is deployed
     - The URL is correct
     - The `/api/slack-webhook` endpoint exists

### Step 5: Subscribe to Events
1. Scroll down to **"Subscribe to bot events"**
2. Click **"Add Bot User Event"**
3. Type: `message.channels`
4. Click **"Save Changes"**

### Step 6: Install App
1. In left sidebar, click **"Install App"** (or "OAuth & Permissions")
2. Click **"Install to Workspace"**
3. Click **"Allow"**

---

## Visual Guide

```
Slack App Settings
├── Incoming Webhooks
│   └── Webhook URL (you copied this, but don't need it for our setup)
│
└── Event Subscriptions ⭐ GO HERE
    ├── Enable Events: ON
    ├── Request URL: https://your-site.vercel.app/api/slack-webhook ⬅️ ENTER HERE
    └── Subscribe to bot events
        └── message.channels
```

---

## Quick Checklist

- [ ] Site deployed on Vercel
- [ ] Got your Vercel URL (e.g., `https://cursor-community-events.vercel.app`)
- [ ] Went to Slack App → Event Subscriptions
- [ ] Enabled Events
- [ ] Entered: `https://your-site.vercel.app/api/slack-webhook`
- [ ] Saw ✅ "Verified" checkmark
- [ ] Added `message.channels` event
- [ ] Installed app to workspace

---

## Common Mistakes

❌ **Wrong:** Entering the Incoming Webhook URL in Event Subscriptions  
✅ **Right:** Entering your Vercel API URL in Event Subscriptions

❌ **Wrong:** Using `http://` instead of `https://`  
✅ **Right:** Always use `https://`

❌ **Wrong:** Forgetting `/api/slack-webhook` at the end  
✅ **Right:** Full URL: `https://your-site.vercel.app/api/slack-webhook`

---

## Still Not Working?

1. **Check your Vercel deployment:**
   - Go to Vercel Dashboard → Deployments
   - Make sure latest deployment is successful

2. **Test the endpoint:**
   - Visit: `https://your-site.vercel.app/api/slack-webhook`
   - Should return an error (that's OK, it means endpoint exists)

3. **Check Vercel function logs:**
   - Vercel Dashboard → Your Project → Functions
   - Click on `/api/slack-webhook`
   - Check for any errors

4. **Verify URL format:**
   - Must be: `https://` (not `http://`)
   - Must end with: `/api/slack-webhook`
   - No trailing slash

