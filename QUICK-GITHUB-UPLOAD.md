# 🚀 Quick GitHub Upload (5 Minutes)

## Option 1: Automated Script (Easiest!)

Just run this:
```powershell
.\upload-to-github.ps1
```

The script will:
- ✅ Check if .env is protected
- ✅ Initialize Git
- ✅ Show what will be uploaded
- ✅ Ask for your GitHub username
- ✅ Create commit
- ✅ Push to GitHub
- ✅ Open browser to your repo

## Option 2: Manual Steps

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `research-paper-analyzer`
3. Description: "AI-powered research paper analysis platform"
4. Choose Public or Private
5. DON'T check "Initialize with README"
6. Click "Create repository"

### Step 2: Upload Your Code

```powershell
# Initialize Git (if not done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Research Paper Visualization Platform"

# Connect to GitHub (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/research-paper-analyzer.git

# Set main branch
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 3: Verify

Go to your GitHub repository and check:
- ✅ All code files are there
- ✅ .env is NOT there (protected)
- ✅ .env.example IS there
- ✅ README.md looks good

## ⚠️ IMPORTANT: Security Check

Before uploading, verify:

```powershell
# Check what will be uploaded
git status

# Check what's ignored
git status --ignored
```

Make sure `.env` appears in the ignored list!

## What Gets Uploaded?

### ✅ Safe to Upload:
- All source code (.js, .jsx files)
- Documentation (.md files)
- Configuration files (package.json, etc.)
- .env.example (template only)
- .gitignore

### ❌ Protected (NOT uploaded):
- .env (your API keys) 🔒
- node_modules/
- data.json (your papers)
- uploads/ (PDF files)
- dist/ (build files)

## After Upload

### 1. Add Repository Details

On GitHub, click "About" gear icon:
- Description: "AI-powered research paper analysis and visualization"
- Website: (if deployed)
- Topics: `research`, `ai`, `pdf`, `visualization`, `react`, `nodejs`

### 2. Enable Features

Go to Settings → Features:
- ✅ Issues
- ✅ Discussions
- ✅ Projects (optional)

### 3. Add Topics

Click gear icon next to "About" and add:
- research-papers
- ai-analysis
- pdf-parser
- visualization
- llm
- groq
- react
- nodejs

### 4. Create First Release

1. Go to "Releases"
2. Click "Create a new release"
3. Tag: `v1.0.0`
4. Title: "Initial Release"
5. Description: List main features
6. Click "Publish release"

## Share Your Project

Your repository URL:
```
https://github.com/YOUR-USERNAME/research-paper-analyzer
```

Share it:
- 📱 Social media
- 💼 LinkedIn
- 🐦 Twitter
- 📧 Email to colleagues

## Update Your Project Later

```powershell
# Make changes to your code
# Then:

git add .
git commit -m "Description of changes"
git push
```

## Clone on Another Computer

```powershell
git clone https://github.com/YOUR-USERNAME/research-paper-analyzer.git
cd research-paper-analyzer
npm install
cd client && npm install
copy .env.example .env
# Edit .env with your API key
npm run init-db
```

## Common Issues

**"Permission denied"**
- Use HTTPS URL: `https://github.com/...`
- Or set up SSH keys

**".env was uploaded"**
- Remove it: `git rm --cached .env`
- Commit: `git commit -m "Remove .env"`
- Push: `git push`
- Create new API key!

**"Repository not found"**
- Make sure you created it on GitHub first
- Check the URL is correct

## Quick Commands Reference

```powershell
# Check status
git status

# See what's ignored
git status --ignored

# Add files
git add .

# Commit
git commit -m "Your message"

# Push
git push

# Pull latest
git pull

# View history
git log --oneline
```

## Need Help?

- 📖 Full guide: [GITHUB-UPLOAD-GUIDE.md](GITHUB-UPLOAD-GUIDE.md)
- 🔒 Security: Make sure .env is in .gitignore
- 💬 Issues: Create an issue on GitHub

---

**Remember:** Never upload your .env file! It contains your API keys! 🔒

**Quick Start:** Just run `.\upload-to-github.ps1` and follow the prompts! 🚀
