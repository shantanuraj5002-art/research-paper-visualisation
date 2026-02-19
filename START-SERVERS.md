# Starting the Application

## Option 1: Two Separate Terminals (Recommended)

### Terminal 1 - Backend Server
```powershell
npm run dev
```

### Terminal 2 - Frontend Server
```powershell
cd client
npm run dev
```

Then open http://localhost:5173 in your browser

## Option 2: Using PowerShell Background Jobs

Run this command to start both servers:
```powershell
Start-Job -ScriptBlock { Set-Location "D:\Paper Visualisation 2"; npm run dev }
Start-Job -ScriptBlock { Set-Location "D:\Paper Visualisation 2\client"; npm run dev }
```

To stop the servers:
```powershell
Get-Job | Stop-Job
Get-Job | Remove-Job
```

## Troubleshooting

If you see "Port already in use" errors:
- Backend (port 3000): Find and kill the process using `netstat -ano | findstr :3000`
- Frontend (port 5173): Find and kill the process using `netstat -ano | findstr :5173`

## Testing the Application

1. Make sure both servers are running
2. Open http://localhost:5173
3. Upload a PDF research paper (or convert test-data/sample-paper.txt to PDF)
4. Try each feature:
   - Visual Abstract
   - Plain Summary
   - Literature Review
   - Citation Network
