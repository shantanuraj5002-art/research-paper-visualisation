# 🆓 Setup Google Gemini (100% FREE!)

## Why Gemini?
- ✅ Completely FREE
- ✅ No credit card required
- ✅ 60 requests per minute
- ✅ Excellent quality
- ✅ Fast responses

## 5-Minute Setup

### Step 1: Get Your Free API Key

1. Go to: **https://aistudio.google.com/app/apikey**

2. Sign in with your Google account

3. Click **"Create API Key"**

4. Click **"Create API key in new project"**

5. Copy the key (looks like: `AIzaSy...`)

### Step 2: Add to .env File

Open your `.env` file:
```powershell
notepad .env
```

Replace the content with:
```
LLM_PROVIDER=auto
GOOGLE_API_KEY=AIzaSy-your-actual-key-here
PORT=3000
NODE_ENV=development
```

Save and close.

### Step 3: Restart Servers

Kill existing processes:
```powershell
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
```

Start backend (Terminal 1):
```powershell
npm run dev
```

Start frontend (Terminal 2):
```powershell
cd client
npm run dev
```

### Step 4: Test It!

1. Open http://localhost:5173

2. You should see:
   - ✅ Backend: connected
   - ✅ API Key: Configured
   - Provider: **gemini**

3. Upload a PDF and generate!

## ✅ Done!

You now have a fully working research paper analyzer with:
- Zero cost
- No credit card needed
- Unlimited usage (within rate limits)

## Rate Limits

Google Gemini Free Tier:
- 60 requests per minute
- 1,500 requests per day
- More than enough for personal use!

## Troubleshooting

**"API key not configured"**
→ Make sure you added `GOOGLE_API_KEY=...` to .env

**"Invalid API key"**
→ Check you copied the full key from Google AI Studio

**"Rate limit exceeded"**
→ Wait a minute, you're making too many requests

## Other Free Options

If you want to try others, check **FREE-ALTERNATIVES.md** for:
- OpenAI ($5 free credits)
- Groq (free & super fast)
- Together AI ($25 free credits)

But Gemini is the best for completely free unlimited use! 🎉
