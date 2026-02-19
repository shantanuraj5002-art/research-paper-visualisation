# 🚀 Deployment Guide

## Quick Start (Development)

### Windows - Double Click to Start!

Just double-click one of these files:
- **start.bat** - Simple batch file
- **start.ps1** - PowerShell script (right-click → Run with PowerShell)

Both will:
1. Check for .env file
2. Start backend server
3. Start frontend server
4. Open browser automatically

### Manual Start

**Terminal 1 - Backend:**
```powershell
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
cd client
npm run dev
```

## Production Deployment

### Option 1: Build and Serve (Recommended)

1. **Build the frontend:**
```powershell
npm run build
```

2. **Set environment to production:**
Edit `.env`:
```
NODE_ENV=production
```

3. **Start the server:**
```powershell
npm start
```

The server will serve both API and frontend on port 3000.

### Option 2: Deploy to Cloud

#### Deploy to Heroku

1. **Create Heroku app:**
```bash
heroku create your-app-name
```

2. **Set environment variables:**
```bash
heroku config:set GROQ_API_KEY=your-key-here
heroku config:set NODE_ENV=production
```

3. **Deploy:**
```bash
git push heroku main
```

#### Deploy to Vercel

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Deploy:**
```bash
vercel
```

3. **Set environment variables in Vercel dashboard**

#### Deploy to Railway

1. **Connect GitHub repo to Railway**
2. **Add environment variables:**
   - `GROQ_API_KEY`
   - `NODE_ENV=production`
3. **Deploy automatically on push**

### Option 3: Docker Deployment

Create `Dockerfile`:
```dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN cd client && npm install && npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t research-paper-app .
docker run -p 3000:3000 --env-file .env research-paper-app
```

## Environment Variables

Required for all deployments:

```
# LLM Provider (choose one)
GROQ_API_KEY=gsk-your-key
# or
GOOGLE_API_KEY=your-key
# or
OPENAI_API_KEY=sk-your-key

# Server config
PORT=3000
NODE_ENV=production
```

## Auto-Start on System Boot

### Windows - Task Scheduler

1. Open Task Scheduler
2. Create Basic Task
3. Trigger: At startup
4. Action: Start a program
5. Program: `powershell.exe`
6. Arguments: `-File "D:\Paper Visualisation 2\start.ps1"`

### Windows - Startup Folder

1. Press `Win + R`
2. Type `shell:startup`
3. Create shortcut to `start.bat`

### Linux - systemd

Create `/etc/systemd/system/research-paper.service`:
```ini
[Unit]
Description=Research Paper Analyzer
After=network.target

[Service]
Type=simple
User=your-user
WorkingDirectory=/path/to/app
ExecStart=/usr/bin/npm start
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable:
```bash
sudo systemctl enable research-paper
sudo systemctl start research-paper
```

## Performance Tips

1. **Use production build** - Much faster than dev mode
2. **Enable caching** - Add Redis for API responses
3. **Use CDN** - Serve static files from CDN
4. **Optimize PDFs** - Compress before upload
5. **Rate limiting** - Prevent API abuse

## Monitoring

### Check if servers are running:

```powershell
# Check backend
curl http://localhost:3000/health

# Check frontend (dev)
curl http://localhost:5173

# Check frontend (production)
curl http://localhost:3000
```

### View logs:

Development mode shows logs in terminal windows.

Production mode:
```powershell
# Redirect to log file
npm start > app.log 2>&1
```

## Troubleshooting

**Port already in use:**
```powershell
# Find process
netstat -ano | findstr :3000

# Kill it
taskkill /PID <PID> /F
```

**Build fails:**
```powershell
# Clean install
rm -rf node_modules client/node_modules
npm install
cd client && npm install
```

**API not working:**
- Check .env file exists
- Verify API key is valid
- Check backend logs for errors

## Security Checklist

- [ ] Never commit .env file
- [ ] Use environment variables for secrets
- [ ] Enable HTTPS in production
- [ ] Add rate limiting
- [ ] Validate file uploads
- [ ] Sanitize user inputs
- [ ] Keep dependencies updated

## Backup

Important files to backup:
- `data.json` - Your papers database
- `.env` - Your configuration
- `uploads/` - Uploaded PDFs

## Updates

To update the app:
```powershell
git pull
npm install
cd client && npm install
npm run build
```

---

**Quick Commands:**

- Start dev: `start.bat` or `start.ps1`
- Build: `npm run build`
- Deploy: `npm start` (after build)
- Check health: `curl http://localhost:3000/health`
