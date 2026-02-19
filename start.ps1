# Research Paper Visualization Platform - Auto Start Script

Write-Host "================================" -ForegroundColor Cyan
Write-Host "Starting Research Paper Platform" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env exists
if (!(Test-Path .env)) {
    Write-Host "❌ .env file not found!" -ForegroundColor Red
    Write-Host "Please create .env file with your API key first." -ForegroundColor Yellow
    Write-Host "See FINAL-SETUP-GUIDE.md for instructions." -ForegroundColor Yellow
    exit 1
}

# Kill any existing node processes
Write-Host "Stopping existing processes..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2

# Start backend in background
Write-Host "Starting backend server..." -ForegroundColor Green
$backend = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm run dev" -PassThru -WindowStyle Normal

Start-Sleep -Seconds 3

# Start frontend in background
Write-Host "Starting frontend server..." -ForegroundColor Green
$frontend = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\client'; npm run dev" -PassThru -WindowStyle Normal

Start-Sleep -Seconds 3

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "✅ Servers Started!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend:  http://localhost:3000" -ForegroundColor White
Write-Host "Frontend: http://localhost:5173" -ForegroundColor White
Write-Host ""
Write-Host "Opening browser..." -ForegroundColor Yellow
Start-Sleep -Seconds 2

# Open browser
Start-Process "http://localhost:5173"

Write-Host ""
Write-Host "Press Ctrl+C in each terminal window to stop the servers" -ForegroundColor Yellow
Write-Host ""
