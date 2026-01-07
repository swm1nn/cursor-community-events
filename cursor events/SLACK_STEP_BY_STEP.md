# 📋 Slack Integration - Step-by-Step Guide

## Step 1: Create Slack App and Get Webhook URL

### 1.1 Create the App
1. Go to: **https://api.slack.com/apps**
2. Click **"Create New App"** button (top right)
3. Choose **"From scratch"**
4. Fill in:
   - **App Name**: `Cursor Events Bot` (or any name)
   - **Pick a workspace**: Select your Slack workspace
5. Click **"Create App"**

### 1.2 Enable Incoming Webhooks
1. In the left sidebar, click **"Incoming Webhooks"**
2. Toggle **"Activate Incoming Webhooks"** to **ON** (green)
3. Scroll down and click **"Add New Webhook to Workspace"**
4. Select the channel where events are posted (e.g., `#events`, `#cursor-community`)
5. Click **"Allow"**
6. **Copy the Webhook URL** - it looks like:
   ```
   https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX
   ```
   ⚠️ **SAVE THIS URL** - you'll need it in Step 2!

---

## Step 2: Set Up Event Subscriptions (To Listen to Messages)

### 2.1 Enable Event Subscriptions
1. In the left sidebar, click **"Event Subscriptions"**
2. Toggle **"Enable Events"** to **ON**

### 2.2 Set Request URL
1. **Request URL**: Enter your Vercel site URL + `/api/slack-webhook`
   - Example: `https://cursor-community-events.vercel.app/api/slack-webhook`
   - ⚠️ **You need to deploy first!** (See Step 3)
2. Slack will verify the URL - you should see a green checkmark ✅
3. If verification fails, make sure:
   - Your site is deployed on Vercel
   - The URL is correct
   - The API endpoint is accessible

### 2.3 Subscribe to Events
1. Scroll down to **"Subscribe to bot events"**
2. Click **"Add Bot User Event"**
3. Add: **`message.channels`** (to listen to messages in channels)
4. Click **"Save Changes"**

### 2.4 Install App to Workspace
1. In the left sidebar, click **"Install App"** (or "OAuth & Permissions")
2. Click **"Install to Workspace"**
3. Review permissions and click **"Allow"**
4. You'll see a success message

---

## Step 3: Get Your Channel ID

1. In Slack, go to your events channel
2. Right-click the channel name → **"View channel details"** (or click channel name → "About")
3. Scroll to the bottom
4. You'll see **"Channel ID"** - it looks like: `C01234ABCDE`
5. **Copy this ID** - you'll need it for Step 4

---

## Step 4: Configure Vercel Environment Variables

### 4.1 Go to Vercel Dashboard
1. Go to: **https://vercel.com/dashboard**
2. Click on your project: **cursor-community-events**
3. Go to **Settings** tab
4. Click **"Environment Variables"** in the left sidebar

### 4.2 Add Variables
Add these two variables:

**Variable 1:**
- **Name**: `SLACK_WEBHOOK_SECRET`
- **Value**: Any random string (e.g., `my-secret-key-12345`)
- **Environment**: Production, Preview, Development (check all)
- Click **"Save"**

**Variable 2:**
- **Name**: `SLACK_CHANNEL_ID`
- **Value**: The Channel ID you copied in Step 3 (e.g., `C01234ABCDE`)
- **Environment**: Production, Preview, Development (check all)
- Click **"Save"**

### 4.3 Redeploy
After adding variables, you need to redeploy:
1. Go to **"Deployments"** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**
4. Or just push a new commit to trigger auto-deploy

---

## Step 5: Test It!

### 5.1 Post a Test Event
In your Slack channel, post:
```
New Event: Cursor Meetup in San Francisco, USA on 2024-03-15
```

### 5.2 Check if It Works
1. Wait 1-2 minutes
2. Go to your map website
3. Refresh the page
4. The new event should appear on the map!

### 5.3 Check Logs (if not working)
1. Go to Vercel Dashboard → Your Project
2. Click **"Functions"** tab
3. Click on **`/api/slack-webhook`**
4. Check the logs for any errors

---

## Troubleshooting

### "URL verification failed"
- Make sure your site is deployed first
- Check the URL is exactly: `https://your-site.vercel.app/api/slack-webhook`
- The endpoint must return the challenge value (code handles this)

### "Events not appearing"
- Check Vercel function logs for errors
- Verify `SLACK_CHANNEL_ID` matches your channel
- Make sure the app is installed in your workspace
- Check that Event Subscriptions are enabled

### "Geocoding failed"
- The system uses OpenStreetMap (free but rate-limited)
- If location isn't found, coordinates will be 0,0
- You can manually update coordinates later

---

## Quick Checklist

- [ ] Slack app created
- [ ] Incoming Webhook URL copied
- [ ] Event Subscriptions enabled
- [ ] `message.channels` event subscribed
- [ ] App installed to workspace
- [ ] Channel ID copied
- [ ] Vercel environment variables set
- [ ] Site redeployed
- [ ] Test event posted
- [ ] Event appears on map

---

## Need Help?

1. Check Vercel function logs
2. Verify Slack app permissions
3. Test webhook URL manually
4. Check environment variables are set correctly

