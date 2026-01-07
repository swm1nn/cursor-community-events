# 🚀 Slack Integration - Quick Start

## What You Get

✅ **Automatic Updates** - New events in Slack automatically appear on the map  
✅ **Auto Geocoding** - Locations are automatically converted to coordinates  
✅ **Real-time Sync** - Map refreshes every 5 minutes  
✅ **No Manual Work** - Just post in Slack, it appears on the map!

## Complete Setup Guide

### Step 1: Create Slack App and Get Webhook URL

1. Go to: **https://api.slack.com/apps**
2. Click **"Create New App"** → **"From scratch"**
3. Name it: `Cursor Events Bot`
4. Select your workspace → **"Create App"**
5. In left sidebar: **"Incoming Webhooks"**
6. Toggle **"Activate Incoming Webhooks"** to **ON**
7. Click **"Add New Webhook to Workspace"**
8. Select your events channel → **"Allow"**
9. **Copy the Webhook URL** (save it for later)

### Step 2: Enable Event Subscriptions

1. In left sidebar: **"Event Subscriptions"**
2. Toggle **"Enable Events"** to **ON**
3. **Request URL**: `https://your-site.vercel.app/api/slack-webhook`
   - ⚠️ **Deploy first!** (See Step 4)
4. Under **"Subscribe to bot events"**: Click **"Add Bot User Event"**
5. Add: **`message.channels`**
6. Click **"Save Changes"**
7. Go to **"Install App"** → **"Install to Workspace"** → **"Allow"**

### Step 3: Get Channel ID

1. In Slack, go to your events channel
2. Right-click channel name → **"View channel details"**
3. Scroll down, find **"Channel ID"** (looks like: `C01234ABCDE`)
4. **Copy this ID**

### Step 4: Deploy Your Site First

```bash
git add .
git commit -m "Add Slack integration"
git push
```

Wait for Vercel to deploy (about 1-2 minutes)

### Step 5: Configure Vercel

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Add:
   - **Name**: `SLACK_WEBHOOK_SECRET` | **Value**: `any-secret-string-123`
   - **Name**: `SLACK_CHANNEL_ID` | **Value**: (the Channel ID from Step 3)
3. Check all environments (Production, Preview, Development)
4. Click **"Save"**
5. **Redeploy**: Go to Deployments → Click "..." → "Redeploy"

### Step 6: Complete Slack Setup

1. Go back to Slack App settings
2. **Event Subscriptions** → **Request URL**: Enter your Vercel URL
3. Slack will verify (should see ✅ green checkmark)
4. If verification fails, check:
   - Site is deployed
   - URL is correct: `https://your-site.vercel.app/api/slack-webhook`
   - API endpoint is accessible

**See `SLACK_STEP_BY_STEP.md` for detailed instructions!**

## How to Use

Just post in your Slack channel:

```
New Event: Cursor Meetup in San Francisco, USA on 2024-03-15
```

The event will appear on the map within 5 minutes (or refresh the page)!

## Message Formats

**Simple:**
```
New Event: Cursor Workshop in New York, USA on 2024-03-20
```

**With details:**
```
Event: Cursor Meetup
City: London
Country: United Kingdom
Date: 2024-03-25
Organizers: John Doe, Jane Smith
```

## Full Documentation

See `SLACK_SETUP.md` for detailed setup instructions.

