# 🔧 Slack URL Verification Troubleshooting

## Common Issues and Fixes

### Issue: "URL verification failed" or "Not verified"

#### Fix 1: Check the Endpoint is Accessible
1. Open your browser
2. Visit: `https://your-site.vercel.app/api/slack-webhook`
3. You should see: `{"message":"Slack webhook endpoint is active",...}`
4. If you get 404 or error, the endpoint doesn't exist

#### Fix 2: Check Vercel Function Logs
1. Go to Vercel Dashboard → Your Project
2. Click **"Functions"** tab
3. Click on **`/api/slack-webhook`**
4. Check the **"Logs"** tab
5. Look for errors when Slack tries to verify

#### Fix 3: Verify Code is Deployed
1. Make sure you've pushed the latest code:
   ```bash
   git push
   ```
2. Wait for Vercel to finish deploying (check Deployments tab)
3. Make sure the latest deployment is successful

#### Fix 4: Check Request Format
The endpoint must:
- Accept POST requests
- Return JSON with `{ challenge: "..." }` for verification
- Return 200 status code
- Have correct Content-Type header

#### Fix 5: Test Manually
You can test the endpoint with curl:

```bash
curl -X POST https://your-site.vercel.app/api/slack-webhook \
  -H "Content-Type: application/json" \
  -d '{"type":"url_verification","challenge":"test123"}'
```

Should return: `{"challenge":"test123"}`

### Issue: "Challenge not returned"

This means Slack sent the challenge but didn't get it back.

**Check:**
1. Function logs in Vercel
2. Make sure the code handles `body.type === 'url_verification'`
3. Make sure it returns `{ challenge: body.challenge }`

### Issue: "Timeout" or "Connection refused"

**Possible causes:**
1. Vercel function is cold (first request takes longer)
2. Network issues
3. Function timeout

**Fix:**
- Try again (Slack will retry)
- Check Vercel function timeout settings
- Make sure function is deployed

### Issue: "405 Method Not Allowed"

**Fix:**
- Make sure endpoint accepts POST requests
- Check CORS headers are set correctly
- Verify OPTIONS requests return 200

### Issue: "500 Internal Server Error"

**Check Vercel logs:**
1. Go to Functions → `/api/slack-webhook` → Logs
2. Look for error messages
3. Common issues:
   - Missing environment variables
   - File system errors (Vercel is read-only)
   - Syntax errors in code

### Issue: Function Not Found (404)

**Fix:**
1. Make sure file is at: `api/slack-webhook.js`
2. Make sure it exports the handler correctly
3. Redeploy:
   ```bash
   git push
   ```

## Step-by-Step Debugging

### 1. Verify Deployment
```bash
# Check if code is pushed
git status

# Push if needed
git add .
git commit -m "Fix Slack webhook"
git push
```

### 2. Check Vercel Deployment
1. Go to Vercel Dashboard
2. Check latest deployment is successful
3. Check deployment logs for errors

### 3. Test Endpoint
Visit in browser:
```
https://your-site.vercel.app/api/slack-webhook
```

Should return JSON (not 404)

### 4. Check Function Logs
1. Vercel Dashboard → Functions → `/api/slack-webhook`
2. Click "Logs" tab
3. Try verifying URL in Slack
4. Watch logs for errors

### 5. Verify Code
Make sure `api/slack-webhook.js` has:
```javascript
if (body && body.type === 'url_verification') {
  return res.status(200).json({ challenge: body.challenge });
}
```

## Quick Test Script

Save this as `test-webhook.js` and run: `node test-webhook.js`

```javascript
const https = require('https');

const data = JSON.stringify({
  type: 'url_verification',
  challenge: 'test-challenge-123'
});

const options = {
  hostname: 'your-site.vercel.app',
  path: '/api/slack-webhook',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = https.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  res.on('data', (d) => {
    console.log('Response:', d.toString());
  });
});

req.on('error', (e) => {
  console.error('Error:', e);
});

req.write(data);
req.end();
```

## Still Not Working?

1. **Check Vercel function logs** - Most errors show up here
2. **Verify URL format** - Must be exact: `https://your-site.vercel.app/api/slack-webhook`
3. **Try redeploying** - Sometimes fixes caching issues
4. **Check Slack app permissions** - Make sure app is installed
5. **Verify environment variables** - Not needed for verification, but check anyway

## Contact Support

If still not working:
1. Share Vercel function logs
2. Share the exact error message from Slack
3. Share your Vercel deployment URL
4. Check if endpoint is accessible from browser

