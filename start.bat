@echo off
echo ================================
echo Starting Research Paper Platform
echo ================================
echo.

REM Check if .env exists
if not exist .env (
    echo ERROR: .env file not found!
    echo Please create .env file with your API key first.
    echo See FINAL-SETUP-GUIDE.md for instructions.
    pause
    exit /b 1
)

echo Starting backend server...
start "Backend Server" cmd /k "npm run dev"

timeout /t 3 /nobreak >nul

echo Starting frontend server...
start "Frontend Server" cmd /k "cd client && npm run dev"

timeout /t 3 /nobreak >nul

echo.
echo ================================
echo Servers Started!
echo ================================
echo.
echo Backend:  http://localhost:3000
echo Frontend: http://localhost:5173
echo.
echo Opening browser...
timeout /t 2 /nobreak >nul

start http://localhost:5173

echo.
echo Close the terminal windows to stop the servers
echo.
pause
