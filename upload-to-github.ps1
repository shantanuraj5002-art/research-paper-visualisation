# Upload to GitHub - Interactive Script

Write-Host "================================" -ForegroundColor Cyan
Write-Host "GitHub Upload Helper" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env exists and warn
if (Test-Path .env) {
    Write-Host "⚠️  WARNING: .env file detected!" -ForegroundColor Yellow
    Write-Host "Checking if it's in .gitignore..." -ForegroundColor Yellow
    
    $gitignoreContent = Get-Content .gitignore -Raw
    if ($gitignoreContent -match "\.env") {
        Write-Host "✅ .env is in .gitignore (safe)" -ForegroundColor Green
    } else {
        Write-Host "❌ .env is NOT in .gitignore!" -ForegroundColor Red
        Write-Host "Adding .env to .gitignore..." -ForegroundColor Yellow
        Add-Content .gitignore "`n.env"
        Write-Host "✅ Added .env to .gitignore" -ForegroundColor Green
    }
}

Write-Host ""

# Check if git is initialized
if (!(Test-Path .git)) {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Git initialized" -ForegroundColor Green
} else {
    Write-Host "✅ Git already initialized" -ForegroundColor Green
}

Write-Host ""

# Show what will be committed
Write-Host "Files to be uploaded:" -ForegroundColor Cyan
git status --short

Write-Host ""
Write-Host "Files that will be IGNORED:" -ForegroundColor Cyan
git status --ignored --short | Select-String "!!"

Write-Host ""

# Confirm
$confirm = Read-Host "Do you want to continue? (y/n)"
if ($confirm -ne 'y') {
    Write-Host "Cancelled." -ForegroundColor Yellow
    exit
}

Write-Host ""

# Get GitHub username and repo name
Write-Host "GitHub Setup:" -ForegroundColor Cyan
$username = Read-Host "Enter your GitHub username"
$reponame = Read-Host "Enter repository name (e.g., research-paper-analyzer)"

Write-Host ""

# Add all files
Write-Host "Adding files..." -ForegroundColor Yellow
git add .

# Create commit
Write-Host "Creating commit..." -ForegroundColor Yellow
$commitMessage = Read-Host "Enter commit message (or press Enter for default)"
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $commitMessage = "Initial commit: Research Paper Visualization Platform"
}
git commit -m $commitMessage

Write-Host ""

# Add remote
Write-Host "Adding GitHub remote..." -ForegroundColor Yellow
$remoteUrl = "https://github.com/$username/$reponame.git"
git remote add origin $remoteUrl 2>$null

if ($LASTEXITCODE -ne 0) {
    Write-Host "Remote already exists, updating..." -ForegroundColor Yellow
    git remote set-url origin $remoteUrl
}

Write-Host "✅ Remote added: $remoteUrl" -ForegroundColor Green

Write-Host ""

# Set main branch
Write-Host "Setting main branch..." -ForegroundColor Yellow
git branch -M main

Write-Host ""

# Final confirmation
Write-Host "================================" -ForegroundColor Cyan
Write-Host "Ready to push to GitHub!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Repository: $remoteUrl" -ForegroundColor White
Write-Host "Branch: main" -ForegroundColor White
Write-Host ""

$pushConfirm = Read-Host "Push to GitHub now? (y/n)"
if ($pushConfirm -eq 'y') {
    Write-Host ""
    Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "================================" -ForegroundColor Cyan
        Write-Host "✅ Successfully uploaded to GitHub!" -ForegroundColor Green
        Write-Host "================================" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "View your repository at:" -ForegroundColor White
        Write-Host "https://github.com/$username/$reponame" -ForegroundColor Cyan
        Write-Host ""
        
        $openBrowser = Read-Host "Open in browser? (y/n)"
        if ($openBrowser -eq 'y') {
            Start-Process "https://github.com/$username/$reponame"
        }
    } else {
        Write-Host ""
        Write-Host "❌ Push failed!" -ForegroundColor Red
        Write-Host "Make sure you've created the repository on GitHub first:" -ForegroundColor Yellow
        Write-Host "https://github.com/new" -ForegroundColor Cyan
    }
} else {
    Write-Host ""
    Write-Host "Skipped push. You can push later with:" -ForegroundColor Yellow
    Write-Host "git push -u origin main" -ForegroundColor White
}

Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Go to https://github.com/$username/$reponame" -ForegroundColor White
Write-Host "2. Add description and topics" -ForegroundColor White
Write-Host "3. Enable Issues and Discussions" -ForegroundColor White
Write-Host "4. Share with others!" -ForegroundColor White
Write-Host ""
