# Quick Start Guide

## ✅ Installation Complete!

Your Research Paper Visualization Platform is ready to use.

## 🚀 Start the Application

Open **TWO** PowerShell terminals:

### Terminal 1 - Backend
```powershell
npm run dev
```
Wait for: "Server running on http://localhost:3000"

### Terminal 2 - Frontend  
```powershell
cd client
npm run dev
```
Wait for: "Local: http://localhost:5173"

## 🌐 Open the App

Navigate to: **http://localhost:5173**

## 📄 Test with Sample Data

Since we can't include a PDF file, you have two options:

### Option 1: Use Any Research Paper PDF
- Download any research paper PDF from the internet
- Upload it through the web interface

### Option 2: Convert Sample Text to PDF
1. Open `test-data/sample-paper.txt`
2. Copy the content
3. Use an online tool like:
   - https://www.ilovepdf.com/txt_to_pdf
   - https://www.online-convert.com/
4. Convert to PDF and upload

## 🎨 Features to Try

1. **Upload Paper** - Click "Upload & Process" 
2. **Visual Abstract** - Generate an infographic visualization
3. **Plain Summary** - Get a 6th-grade reading level summary
4. **Literature Review** - Enter a topic and generate a review
5. **Citation Network** - Explore the interactive citation graph

## 🔑 API Key Required (CRITICAL!)

**Before starting, you MUST configure your API key:**

1. Create .env file:
```powershell
copy .env.example .env
```

2. Get your Anthropic API key:
   - Visit https://console.anthropic.com/
   - Sign up/login → API Keys → Create Key
   - Copy the key (starts with `sk-ant-`)

3. Edit .env and add your key:
```powershell
notepad .env
```
```
ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
PORT=3000
NODE_ENV=development
```

**Without this, nothing will generate!**

## ❓ Need Help?

- Backend not starting? Check if port 3000 is available
- Frontend not starting? Check if port 5173 is available
- API errors? Verify your Anthropic API key is valid
- PDF upload fails? Make sure the file is a valid PDF

Enjoy exploring research papers! 🎓
