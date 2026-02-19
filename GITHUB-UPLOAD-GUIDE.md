# 📤 GitHub Upload Guide

## ⚠️ IMPORTANT: Protect Your API Keys!

Before uploading to GitHub, make sure your `.env` file is NOT included (it contains your API keys).

## Step-by-Step Guide

### Step 1: Verify .gitignore

Check that `.gitignore` includes `.env`:

```powershell
Get-Content .gitignore
```

Should include:
```
node_modules/
.env
data.json
uploads/
dist/
.DS_Store
```

✅ This prevents your API keys from being uploaded!

### Step 2: Initialize Git (if not already done)

```powershell
git init
```

### Step 3: Add All Files

```powershell
git add .
```

### Step 4: Create First Commit

```powershell
git commit -m "Initial commit: Research Paper Visualization Platform"
```

### Step 5: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `research-paper-analyzer` (or your choice)
3. Description: "AI-powered research paper analysis and visualization platform"
4. Choose: Public or Private
5. DON'T initialize with README (we already have one)
6. Click "Create repository"

### Step 6: Connect to GitHub

Copy the commands from GitHub, or use these (replace YOUR-USERNAME):

```powershell
git remote add origin https://github.com/YOUR-USERNAME/research-paper-analyzer.git
git branch -M main
git push -u origin main
```

### Step 7: Verify Upload

1. Go to your GitHub repository
2. Check that `.env` is NOT there ✅
3. Check that `.env.example` IS there ✅
4. Check that all code files are uploaded ✅

## Alternative: Using GitHub Desktop

### Step 1: Install GitHub Desktop
Download from: https://desktop.github.com/

### Step 2: Add Repository
1. Open GitHub Desktop
2. File → Add Local Repository
3. Choose your project folder
4. Click "Create Repository"

### Step 3: Publish to GitHub
1. Click "Publish repository"
2. Choose name and description
3. Select Public or Private
4. Click "Publish repository"

## What Gets Uploaded?

### ✅ Uploaded (Safe):
- All source code
- README.md and documentation
- package.json files
- .env.example (template)
- .gitignore
- Configuration files

### ❌ NOT Uploaded (Protected):
- .env (your API keys) 🔒
- node_modules/ (dependencies)
- data.json (your papers database)
- uploads/ (uploaded PDFs)
- dist/ (build files)

## Security Checklist

Before pushing to GitHub:

- [ ] `.env` is in `.gitignore`
- [ ] No API keys in code files
- [ ] `.env.example` has placeholder values only
- [ ] No sensitive data in commits
- [ ] Test with `git status` to see what will be uploaded

## Check What Will Be Uploaded

```powershell
# See what files will be committed
git status

# See what's ignored
git status --ignored
```

If you see `.env` in the list to be committed, STOP and add it to `.gitignore`!

## If You Accidentally Uploaded .env

### Remove from Git (but keep locally):

```powershell
# Remove from Git tracking
git rm --cached .env

# Commit the removal
git commit -m "Remove .env from tracking"

# Push changes
git push
```

### If API key was exposed:
1. Go to your API provider (Groq, OpenAI, etc.)
2. Delete the exposed API key
3. Create a new API key
4. Update your local `.env` file

## Update README for GitHub

Add this badge to your README.md:

```markdown
# Research Paper Visualization Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)

AI-powered research paper analysis and visualization platform.

## 🚀 Quick Start

1. Clone the repository
2. Install dependencies: `npm install && cd client && npm install`
3. Copy `.env.example` to `.env` and add your API key
4. Run: `npm run dev` (backend) and `cd client && npm run dev` (frontend)

## 📖 Documentation

- [Setup Guide](FINAL-SETUP-GUIDE.md)
- [Deployment Guide](DEPLOYMENT-GUIDE.md)
- [Customization Guide](CUSTOMIZATION-GUIDE.md)

## 🔑 API Keys

Get free API keys from:
- [Groq](https://console.groq.com/) (Recommended - Fast & Free)
- [Google Gemini](https://aistudio.google.com/app/apikey)
- [OpenAI](https://platform.openai.com/api-keys)

## 📝 License

MIT License - see LICENSE file for details
```

## Create LICENSE File

```powershell
# Create MIT License
@"
MIT License

Copyright (c) 2024 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
"@ | Out-File -FilePath LICENSE -Encoding UTF8
```

## Useful Git Commands

```powershell
# Check status
git status

# See what's ignored
git status --ignored

# View commit history
git log --oneline

# Create a new branch
git checkout -b feature-name

# Push to GitHub
git push origin main

# Pull latest changes
git pull origin main

# Undo last commit (keep changes)
git reset --soft HEAD~1

# See differences
git diff
```

## GitHub Repository Settings

After uploading, configure:

1. **About section:**
   - Add description
   - Add website URL (if deployed)
   - Add topics: `research`, `ai`, `pdf`, `visualization`, `react`, `nodejs`

2. **Enable Issues:**
   - Settings → Features → Issues ✅

3. **Add Topics:**
   - Click gear icon next to "About"
   - Add: `research-papers`, `ai-analysis`, `pdf-parser`, `visualization`

4. **Create Releases:**
   - Go to Releases
   - Create new release
   - Tag: `v1.0.0`
   - Title: "Initial Release"

## Collaborate with Others

### Clone Your Repository:
```powershell
git clone https://github.com/YOUR-USERNAME/research-paper-analyzer.git
cd research-paper-analyzer
npm install
cd client && npm install
```

### Keep Fork Updated:
```powershell
git fetch origin
git merge origin/main
```

## Common Issues

**Problem: "Permission denied"**
- Solution: Set up SSH keys or use HTTPS with token

**Problem: ".env uploaded by mistake"**
- Solution: See "If You Accidentally Uploaded .env" section above

**Problem: "Large files rejected"**
- Solution: Don't commit node_modules or uploads folder

**Problem: "Merge conflicts"**
- Solution: `git pull` before `git push`

## Best Practices

1. ✅ Commit often with clear messages
2. ✅ Never commit API keys or secrets
3. ✅ Use branches for new features
4. ✅ Write good commit messages
5. ✅ Keep README updated
6. ✅ Add documentation
7. ✅ Use .gitignore properly

## Example Commit Messages

```
✅ Good:
- "Add drag and drop file upload"
- "Fix citation network rendering bug"
- "Update README with deployment instructions"

❌ Bad:
- "update"
- "fix stuff"
- "changes"
```

## Quick Reference

```powershell
# First time setup
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/repo.git
git push -u origin main

# Regular updates
git add .
git commit -m "Your message"
git push

# Check before pushing
git status
git diff
```

---

**Remember:** Always check that `.env` is NOT being uploaded! Your API keys must stay private! 🔒
