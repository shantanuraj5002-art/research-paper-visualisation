# Research Paper Visualization Platform - Setup Script

Write-Host "================================" -ForegroundColor Cyan
Write-Host "Research Paper Platform Setup" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env exists
if (!(Test-Path .env)) {
    Write-Host "❌ .env file not found!" -ForegroundColor Red
    Write-Host "Creating .env from template..." -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host "✅ .env file created" -ForegroundColor Green
    Write-Host ""
    Write-Host "⚠️  IMPORTANT: Edit .env and add your Anthropic API key!" -ForegroundColor Yellow
    Write-Host "   Get your key at: https://console.anthropic.com/" -ForegroundColor Yellow
    Write-Host ""
    
    # Open .env in notepad
    $response = Read-Host "Open .env file now? (y/n)"
    if ($response -eq 'y') {
        notepad .env
        Write-Host "Waiting for you to add your API key..." -ForegroundColor Yellow
        Read-Host "Press Enter when you've added your API key"
    }
} else {
    Write-Host "✅ .env file exists" -ForegroundColor Green
    
    # Check if API key is set
    $envContent = Get-Content .env -Raw
    if ($envContent -match 'ANTHROPIC_API_KEY=sk-ant-') {
        Write-Host "✅ API key appears to be configured" -ForegroundColor Green
    } else {
        Write-Host "⚠️  API key might not be set correctly" -ForegroundColor Yellow
        Write-Host "   Make sure ANTHROPIC_API_KEY=sk-ant-your-key-here" -ForegroundColor Yellow
    }
}

Write-Host ""

# Check if data.json exists
if (Test-Path data.json) {
    Write-Host "✅ Database file exists" -ForegroundColor Green
} else {
    Write-Host "⚠️  Database not initialized" -ForegroundColor Yellow
    Write-Host "Initializing database..." -ForegroundColor Yellow
    npm run init-db
    Write-Host "✅ Database initialized" -ForegroundColor Green
}

Write-Host ""

# Check for processes on ports
Write-Host "Checking ports..." -ForegroundColor Cyan

$port3000 = netstat -ano | findstr :3000
$port5173 = netstat -ano | findstr :5173

if ($port3000) {
    Write-Host "⚠️  Port 3000 is in use" -ForegroundColor Yellow
    Write-Host "   You may need to kill the process first" -ForegroundColor Yellow
    $response = Read-Host "Kill process on port 3000? (y/n)"
    if ($response -eq 'y') {
        $pid = ($port3000 -split '\s+')[-1]
        taskkill /PID $pid /F
        Write-Host "✅ Process killed" -ForegroundColor Green
    }
} else {
    Write-Host "✅ Port 3000 is available" -ForegroundColor Green
}

if ($port5173) {
    Write-Host "⚠️  Port 5173 is in use" -ForegroundColor Yellow
    $response = Read-Host "Kill process on port 5173? (y/n)"
    if ($response -eq 'y') {
        $pid = ($port5173 -split '\s+')[-1]
        taskkill /PID $pid /F
        Write-Host "✅ Process killed" -ForegroundColor Green
    }
} else {
    Write-Host "✅ Port 5173 is available" -ForegroundColor Green
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Open TWO PowerShell terminals" -ForegroundColor White
Write-Host ""
Write-Host "   Terminal 1 - Backend:" -ForegroundColor Yellow
Write-Host "   npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "   Terminal 2 - Frontend:" -ForegroundColor Yellow
Write-Host "   cd client" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "2. Open http://localhost:5173 in your browser" -ForegroundColor White
Write-Host ""
Write-Host "Need help? Check TROUBLESHOOTING.md" -ForegroundColor Cyan
Write-Host ""
