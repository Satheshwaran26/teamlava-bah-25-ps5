# PowerShell Deployment Script for Vercel + Render

Write-Host "🚀 Starting deployment process..." -ForegroundColor Green

# Check if we're in the right directory
if (!(Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found. Please run this script from the project root." -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

# Build the project
Write-Host "🔨 Building project..." -ForegroundColor Yellow
npm run build

# Check if build was successful
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!" -ForegroundColor Green
} else {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

# Deploy to Vercel
Write-Host "🌐 Deploying to Vercel..." -ForegroundColor Yellow
npx vercel --prod
Write-Host "✅ Deployment completed!" -ForegroundColor Green
Write-Host "📝 Don't forget to:" -ForegroundColor Cyan
Write-Host "   1. Deploy your backend to Render" -ForegroundColor White
Write-Host "   2. Update environment variables" -ForegroundColor White
Write-Host "   3. Test the live application" -ForegroundColor White
