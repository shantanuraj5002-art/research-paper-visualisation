# Troubleshooting Guide

## Issue: "Not generating anything"

This usually means one of these problems:

### 1. ❌ Missing API Key (MOST COMMON)

**Check if `.env` file exists:**
```powershell
Test-Path .env
```

If it returns `False`, create the file:
```powershell
copy .env.example .env
```

Then edit `.env` and add your Anthropic API key:
```
ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
PORT=3000
NODE_ENV=development
```

**Get your API key:**
1. Go to https://console.anthropic.com/
2. Sign up or log in
3. Go to API Keys section
4. Create a new key
5. Copy it to your `.env` file

### 2. ❌ Port Already in Use

If you see "EADDRINUSE" error:

**Kill the process on port 3000:**
```powershell
# Find the process
netstat -ano | findstr :3000

# Kill it (replace XXXX with the PID number)
taskkill /PID XXXX /F
```

**Kill the process on port 5173:**
```powershell
# Find the process
netstat -ano | findstr :5173

# Kill it (replace XXXX with the PID number)
taskkill /PID XXXX /F
```

### 3. ❌ Servers Not Running

Make sure BOTH servers are running:

**Terminal 1 - Backend:**
```powershell
npm run dev
```
You should see: `Server running on http://localhost:3000`

**Terminal 2 - Frontend:**
```powershell
cd client
npm run dev
```
You should see: `Local: http://localhost:5173`

### 4. ❌ Browser Console Errors

Open browser DevTools (F12) and check:

**Console tab** - Look for errors like:
- "Failed to fetch" → Backend not running
- "Network Error" → Wrong API endpoint
- "401 Unauthorized" → Invalid API key
- "429 Too Many Requests" → API rate limit

**Network tab** - Check if API calls are being made:
- Should see calls to `/api/upload`, `/api/papers`, etc.
- Check the response status codes

### 5. ❌ PDF Upload Issues

**Make sure:**
- File is actually a PDF (not .txt renamed to .pdf)
- File size is reasonable (< 10MB)
- PDF contains extractable text (not just images)

**Test with a real research paper PDF:**
- Download from arXiv.org
- Download from Google Scholar
- Use any academic paper PDF

### 6. ❌ API Key Issues

**Test your API key:**
```powershell
# Check if .env file has the key
Get-Content .env
```

**Common API key problems:**
- Key doesn't start with `sk-ant-`
- Extra spaces or quotes around the key
- Key is expired or invalid
- No credits remaining on your Anthropic account

### 7. ❌ Database Issues

**Reset the database:**
```powershell
# Delete the database file
Remove-Item data.json -ErrorAction SilentlyContinue

# Reinitialize
npm run init-db
```

## Step-by-Step Debugging

1. **Check .env file exists and has valid API key**
   ```powershell
   Get-Content .env
   ```

2. **Kill any existing processes**
   ```powershell
   Get-Process node | Stop-Process -Force
   ```

3. **Start backend and check for errors**
   ```powershell
   npm run dev
   ```
   Wait for "Server running on http://localhost:3000"

4. **In a new terminal, start frontend**
   ```powershell
   cd client
   npm run dev
   ```
   Wait for "Local: http://localhost:5173"

5. **Open browser to http://localhost:5173**

6. **Open DevTools (F12) → Console tab**

7. **Upload a PDF and watch for errors**

8. **Check backend terminal for error messages**

## Still Not Working?

**Check these logs:**

1. Backend terminal - Shows API errors
2. Browser Console (F12) - Shows frontend errors
3. Browser Network tab (F12) - Shows failed requests

**Common error messages and fixes:**

| Error | Fix |
|-------|-----|
| "API key not found" | Add ANTHROPIC_API_KEY to .env |
| "Failed to fetch" | Backend not running on port 3000 |
| "CORS error" | Backend and frontend on different ports |
| "Invalid API key" | Check your Anthropic API key is correct |
| "Rate limit exceeded" | Wait a few minutes or upgrade API plan |
| "PDF parsing failed" | Use a different PDF file |

## Quick Reset

If nothing works, start fresh:

```powershell
# Stop all Node processes
Get-Process node | Stop-Process -Force

# Delete database
Remove-Item data.json -ErrorAction SilentlyContinue

# Reinitialize
npm run init-db

# Create .env if missing
if (!(Test-Path .env)) { copy .env.example .env }

# Start backend
npm run dev
```

Then in a new terminal:
```powershell
cd client
npm run dev
```

**Don't forget to add your API key to .env!**
