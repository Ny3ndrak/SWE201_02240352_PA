# TaskRemind - Setup Verification Script

Write-Host "TaskRemind Setup Verification" -ForegroundColor Cyan
Write-Host "=============================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
Write-Host "Checking Node.js..." -ForegroundColor Yellow
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node --version
    Write-Host "✓ Node.js installed: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "✗ Node.js not found. Please install Node.js 16+" -ForegroundColor Red
    exit 1
}

# Check npm
Write-Host "Checking npm..." -ForegroundColor Yellow
if (Get-Command npm -ErrorAction SilentlyContinue) {
    $npmVersion = npm --version
    Write-Host "✓ npm installed: $npmVersion" -ForegroundColor Green
} else {
    Write-Host "✗ npm not found" -ForegroundColor Red
    exit 1
}

# Check if in correct directory
Write-Host ""
Write-Host "Checking directory structure..." -ForegroundColor Yellow
if (Test-Path "package.json") {
    Write-Host "✓ Found package.json" -ForegroundColor Green
} else {
    Write-Host "✗ package.json not found. Are you in TaskRemind directory?" -ForegroundColor Red
    exit 1
}

if (Test-Path "backend/server.js") {
    Write-Host "✓ Found backend/server.js" -ForegroundColor Green
} else {
    Write-Host "✗ backend/server.js not found" -ForegroundColor Red
    exit 1
}

# Check node_modules
Write-Host ""
Write-Host "Checking dependencies..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "✓ App dependencies installed" -ForegroundColor Green
} else {
    Write-Host "! App dependencies not installed" -ForegroundColor Yellow
    Write-Host "  Run: npm install" -ForegroundColor Gray
}

if (Test-Path "backend/node_modules") {
    Write-Host "✓ Backend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "! Backend dependencies not installed" -ForegroundColor Yellow
    Write-Host "  Run: cd backend && npm install" -ForegroundColor Gray
}

# Check .env file
Write-Host ""
Write-Host "Checking configuration..." -ForegroundColor Yellow
if (Test-Path ".env") {
    Write-Host "✓ .env file exists" -ForegroundColor Green
    $envContent = Get-Content ".env" -Raw
    if ($envContent -match "BACKEND_URL") {
        Write-Host "✓ BACKEND_URL configured" -ForegroundColor Green
    } else {
        Write-Host "! BACKEND_URL not set in .env" -ForegroundColor Yellow
    }
} else {
    Write-Host "! .env file not found" -ForegroundColor Yellow
    Write-Host "  Copy .env.example to .env and configure" -ForegroundColor Gray
}

# Get local IP
Write-Host ""
Write-Host "Network Information:" -ForegroundColor Yellow
try {
    $ipAddresses = Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.InterfaceAlias -notlike "*Loopback*"} | Select-Object -First 1
    if ($ipAddresses) {
        Write-Host "Your local IP: $($ipAddresses.IPAddress)" -ForegroundColor Cyan
        Write-Host "Use this in BACKEND_URL: http://$($ipAddresses.IPAddress):3000" -ForegroundColor Gray
    }
} catch {
    Write-Host "Could not determine local IP" -ForegroundColor Yellow
}

# Final status
Write-Host ""
Write-Host "=============================" -ForegroundColor Cyan
Write-Host "Setup Status Summary" -ForegroundColor Cyan
Write-Host "=============================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Install dependencies if needed:" -ForegroundColor White
Write-Host "   npm install" -ForegroundColor Gray
Write-Host "   cd backend && npm install" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Configure .env file with your IP" -ForegroundColor White
Write-Host ""
Write-Host "3. Start backend:" -ForegroundColor White
Write-Host "   cd backend && npm start" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Start app (in new terminal):" -ForegroundColor White
Write-Host "   npm start" -ForegroundColor Gray
Write-Host ""
Write-Host "For detailed instructions, see QUICKSTART.md" -ForegroundColor Cyan
