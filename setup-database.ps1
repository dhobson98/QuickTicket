# QuickTicket Database Setup Script
Write-Host "Setting up QuickTicket Database..." -ForegroundColor Green
Write-Host ""

$psqlPath = "C:\Program Files\PostgreSQL\18\bin\psql.exe"

if (!(Test-Path $psqlPath)) {
    Write-Host "❌ PostgreSQL psql not found at $psqlPath" -ForegroundColor Red
    Write-Host "Please install PostgreSQL or update the path in this script" -ForegroundColor Yellow
    exit 1
}

Write-Host "1. Creating database 'quickticket'..." -ForegroundColor Yellow
Write-Host "Please enter the postgres user password when prompted." -ForegroundColor Cyan
Write-Host ""

# Create database
& $psqlPath -U postgres -c "CREATE DATABASE quickticket;" 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Database 'quickticket' created successfully" -ForegroundColor Green
} else {
    Write-Host "ℹ Database 'quickticket' may already exist (this is okay)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "2. Running schema setup..." -ForegroundColor Yellow

# Run schema
& $psqlPath -U postgres -d quickticket -f "database/schema.sql"
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Database schema created successfully" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "3. Testing connection..." -ForegroundColor Yellow
    node test-db-connection.js
    
    Write-Host ""
    Write-Host "✅ Setup complete! You can now start the application with: npm run dev" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to create schema" -ForegroundColor Red
    Write-Host "Please check the error messages above" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Gray
Read-Host