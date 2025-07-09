# Quick Deploy Script for Render

Write-Host "🚀 Deploying to Render.com..." -ForegroundColor Green

# Check if this is a git repository
if (!(Test-Path ".git")) {
    Write-Host "❌ This is not a git repository. Initializing..." -ForegroundColor Red
    git init
    git add .
    git commit -m "Initial commit for Render deployment"
}

# Check for uncommitted changes
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "📝 Committing changes..." -ForegroundColor Yellow
    git add .
    git commit -m "Update for Render deployment"
}

# Push to GitHub (assumes origin is already set up)
Write-Host "📤 Pushing to GitHub..." -ForegroundColor Blue
git push origin main

Write-Host "✅ Code pushed to GitHub!" -ForegroundColor Green
Write-Host "🌐 Now go to Render.com to create your services:" -ForegroundColor Cyan
Write-Host "   1. Create Web Service for backend (Python)" -ForegroundColor White
Write-Host "   2. Create Static Site for frontend (Node.js)" -ForegroundColor White
Write-Host "   3. Set environment variables as described in RENDER_DEPLOYMENT_GUIDE.md" -ForegroundColor White

Write-Host "📖 Full instructions: See RENDER_DEPLOYMENT_GUIDE.md" -ForegroundColor Magenta
