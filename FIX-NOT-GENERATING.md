# Fix: "Not Generating Anything" Issue

## Most Common Cause: Missing API Key ❌

The #1 reason the app doesn't generate anything is a missing or invalid Anthropic API key.

## Quick Fix (5 steps)

### Step 1: Create .env file
```powershell
copy .env.example .env
```

### Step 2: Get your Anthropic API key
1. Go to https://console.anthropic.com/
2. Sign up or log in
3. Click "API Keys" in the left sidebar
4. Click "Create Key"
5. Copy the key (starts with `sk-ant-`)

### Step 3: Add key to .env file
Open `.env` in notepad:
```powershell
notepad .env
```

Add your key:
```
ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
PORT=3000
NODE_ENV=development
```

Save and close.

### Step 4: Kill existing processes
```powershell
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
```

### Step 5: Restart servers

**Terminal 1:**
```powershell
npm run dev
```
Wait for: "Server running on http://localhost:3000"

**Terminal 2:**
```powershell
cd client
npm run dev
```
Wait for: "Local: http://localhost:5173"

## Verify It's Working

1. Open http://localhost:5173
2. You should see a green status box at the top:
   - ✅ Backend: connected
   - ✅ API Key: Configured

3. If you see red ❌ boxes, the issue is still there

## Still Not Working?

### Check Backend Terminal

Look for these errors:

**"API key not found"**
→ .env file doesn't exist or API key not set

**"Invalid API key format"**
→ API key doesn't start with `sk-ant-`

**"Authentication failed"**
→ API key is wrong or expired

**"EADDRINUSE"**
→ Port 3000 already in use, kill the process:
```powershell
netstat -ano | findstr :3000
# Note the PID (last number)
taskkill /PID XXXX /F
```

### Check Browser Console (F12)

**"Failed to fetch"**
→ Backend not running

**"Network Error"**
→ Backend on wrong port

**"401 Unauthorized"**
→ Invalid API key

**"500 Internal Server Error"**
→ Check backend terminal for error details

### Test API Key Manually

Visit: http://localhost:3000/api/check-config

You should see:
```json
{
  "hasApiKey": true,
  "apiKeyPrefix": "sk-ant-...",
  "nodeEnv": "development",
  "port": 3000
}
```

If `hasApiKey` is `false`, your API key isn't being loaded.

## Common Mistakes

1. ❌ Forgot to create .env file
2. ❌ Added API key to .env.example instead of .env
3. ❌ Extra spaces or quotes around API key
4. ❌ Didn't restart backend after adding API key
5. ❌ Backend not running at all
6. ❌ Using an expired or invalid API key

## Automated Setup

Run this script to check everything:
```powershell
.\setup.ps1
```

It will:
- Create .env if missing
- Check if API key is set
- Initialize database
- Check if ports are available
- Guide you through setup

## Test with Sample Data

1. Go to https://arxiv.org/
2. Download any PDF paper
3. Upload it in the app
4. Click "Generate Visual Abstract"
5. Should see "Generating..." then a visualization

## Need More Help?

1. Check TROUBLESHOOTING.md for detailed debugging
2. Make sure you have credits in your Anthropic account
3. Try a different API key
4. Check if your firewall is blocking connections

## Success Checklist

- [ ] .env file exists
- [ ] ANTHROPIC_API_KEY is set in .env
- [ ] API key starts with `sk-ant-`
- [ ] Backend running on port 3000
- [ ] Frontend running on port 5173
- [ ] Green status indicators in browser
- [ ] Can upload PDF successfully
- [ ] Generate buttons work and show results

If all checked ✅, the app should work perfectly!
