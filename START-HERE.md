# 🚀 START HERE - Research Paper Visualization Platform

## ⚡ Quick Start (3 Minutes)

### 1️⃣ Setup API Key (REQUIRED!)

```powershell
# Create .env file
copy .env.example .env

# Open it
notepad .env
```

Add your Anthropic API key:
```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

**Get your key:** https://console.anthropic.com/ → API Keys → Create Key

### 2️⃣ Initialize Database

```powershell
npm run init-db
```

### 3️⃣ Start Servers

**Terminal 1 - Backend:**
```powershell
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
cd client
npm run dev
```

### 4️⃣ Open Browser

Go to: **http://localhost:5173**

Look for green checkmarks at the top:
- ✅ Backend: connected
- ✅ API Key: Configured

If you see ❌ red marks, see troubleshooting below.

## 📝 Test It

1. Download a research paper PDF from https://arxiv.org/
2. Upload it in the app
3. Try each feature:
   - 🎨 Visual Abstract
   - 📝 Plain Summary
   - 📚 Literature Review
   - 🔗 Citation Network

## ❌ Not Working?

### Problem: "Not generating anything"

**Solution:** Check FIX-NOT-GENERATING.md

Most common issues:
1. Missing API key in .env
2. Backend not running
3. Invalid API key

### Problem: Port already in use

```powershell
# Kill all node processes
Get-Process node | Stop-Process -Force

# Then restart servers
```

### Problem: Can't see status indicators

Make sure both servers are running and refresh the browser.

## 📚 Documentation

- **FIX-NOT-GENERATING.md** - Solve generation issues
- **TROUBLESHOOTING.md** - Detailed debugging guide
- **QUICK-START.md** - Full setup instructions
- **README.md** - Technical documentation

## 🔧 Automated Setup

Run this for guided setup:
```powershell
.\setup.ps1
```

## ✅ Success Checklist

Before asking for help, verify:

- [ ] .env file exists with valid API key
- [ ] Backend shows "Server running on http://localhost:3000"
- [ ] Frontend shows "Local: http://localhost:5173"
- [ ] Browser shows green ✅ status indicators
- [ ] Can upload PDF without errors
- [ ] Backend terminal shows no errors

## 🆘 Still Stuck?

1. Run: `.\setup.ps1` for automated checks
2. Check: FIX-NOT-GENERATING.md
3. Read: TROUBLESHOOTING.md
4. Verify: API key is valid and has credits

## 🎯 What This App Does

- **Upload PDFs** - Extract text from research papers
- **Visual Abstracts** - AI-generated infographics
- **Plain Summaries** - 6th-grade reading level summaries
- **Literature Reviews** - Structured academic reviews
- **Citation Networks** - Interactive citation graphs

All powered by Claude AI! 🤖

---

**Ready?** Follow steps 1-4 above and you'll be analyzing papers in minutes! 🚀
