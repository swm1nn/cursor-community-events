# 🔗 Slack Integration Setup Guide

This guide will help you connect your Slack channel to automatically update the events map.

## How It Works

1. **Slack Webhook** → When a new event is posted in Slack
2. **Vercel API** → Receives the webhook and parses event data
3. **Auto Geocoding** → Gets coordinates for the event location
4. **Storage** → Saves event to JSON file
5. **Map Updates** → Frontend automatically refreshes every 5 minutes

## Setup Steps

### Step 1: Create Slack App

1. Go to: https://api.slack.com/apps
2. Click **"Create New App"**
3. Choose **"From scratch"**
4. Name: `Cursor Events Bot`
5. Workspace: Select your workspace
6. Click **"Create App"**

### Step 2: Enable Webhooks

1. In your app settings, go to **"Incoming Webhooks"**
2. Toggle **"Activate Incoming Webhooks"** to ON
3. Click **"Add New Webhook to Workspace"**
4. Select the channel where events are posted
5. Click **"Allow"**
6. **Copy the Webhook URL** (you'll need this)

### Step 3: Set Up Event Subscriptions (Optional but Recommended)

1. Go to **"Event Subscriptions"**
2. Toggle **"Enable Events"** to ON
3. **Request URL**: `https://your-site.vercel.app/api/slack-webhook`
4. **Subscribe to bot events**:
   - `message.channels` - Listen to messages in channels
5. Click **"Save Changes"**

### Step 4: Configure Vercel Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add these variables:

```
SLACK_WEBHOOK_SECRET=your_secret_here
SLACK_CHANNEL_ID=your_channel_id_here
```

**To get your channel ID:**
- In Slack, right-click the channel → **View channel details**
- The Channel ID is at the bottom

### Step 5: Deploy

Push your code to GitHub and Vercel will auto-deploy:

```bash
git add .
git commit -m "Add Slack integration"
git push
```

## Using the Integration

### Option A: Automatic Detection

The webhook automatically detects new events from Slack messages. Format your messages like:

```
New Event: Cursor Meetup in San Francisco, USA on 2024-03-15
```

Or use structured format:
```
Event: Cursor Workshop
City: New York
Country: United States
Date: 2024-03-20
```

### Option B: Slack Slash Command (Advanced)

1. In Slack App settings, go to **"Slash Commands"**
2. Click **"Create New Command"**
3. Command: `/add-event`
4. Request URL: `https://your-site.vercel.app/api/slack-webhook`
5. Description: `Add a new event to the map`
6. Click **"Save"**

**Usage:**
```
/add-event "Cursor Meetup" "San Francisco" "USA" "2024-03-15"
```

## Message Format Examples

The webhook parser looks for these patterns:

### Simple Format:
```
New Event: Cursor Meetup in San Francisco, USA on 2024-03-15
```

### Structured Format:
```
Event: Cursor Workshop
Location: New York, United States
Date: 2024-03-20
Organizers: John Doe, Jane Smith
```

### JSON Format (Advanced):
```json
{
  "title": "Cursor Meetup",
  "city": "San Francisco",
  "country": "United States",
  "date": "2024-03-15",
  "organizers": ["John Doe"]
}
```

## Testing

1. Post a test message in your Slack channel:
   ```
   New Event: Test Event in San Francisco, USA on 2024-03-15
   ```

2. Check your Vercel function logs:
   - Go to Vercel Dashboard → Your Project → Functions
   - Check `/api/slack-webhook` logs

3. Verify the event appears on your map:
   - Wait up to 5 minutes for auto-refresh
   - Or refresh the page manually

## Troubleshooting

### Events not appearing
- Check Vercel function logs for errors
- Verify webhook URL is correct
- Check environment variables are set
- Ensure channel ID matches

### Geocoding fails
- The system uses OpenStreetMap Nominatim (free but rate-limited)
- If location isn't found, coordinates will be 0,0
- You can manually update coordinates in the data file

### Webhook not receiving events
- Verify Slack app is installed in your workspace
- Check Event Subscriptions are enabled
- Verify Request URL is accessible
- Check Slack app permissions

## Advanced: Custom Parser

You can customize the event parser in `/api/slack-webhook.js`:

```javascript
function parseEventFromSlack(message) {
  // Add your custom parsing logic here
  // Return event object with: title, city, country, date, etc.
}
```

## Security Notes

- The webhook secret helps verify requests are from Slack
- Consider adding IP whitelisting for production
- Rate limiting is recommended for production use
- Store sensitive data in Vercel environment variables

## Support

If you need help:
1. Check Vercel function logs
2. Test webhook with: https://api.slack.com/events-api
3. Verify Slack app permissions
4. Check network connectivity

