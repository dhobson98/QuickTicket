@echo off
echo Setting up QuickTicket Database...
echo.

set PSQL_PATH="C:\Program Files\PostgreSQL\18\bin\psql.exe"

echo 1. Connecting to PostgreSQL as postgres user...
echo Please enter the postgres user password when prompted.
echo.

%PSQL_PATH% -U postgres -c "CREATE DATABASE quickticket;" 2>nul
if %errorlevel% equ 0 (
    echo ✓ Database 'quickticket' created successfully
) else (
    echo ℹ Database 'quickticket' may already exist
)

echo.
echo 2. Running schema setup...
%PSQL_PATH% -U postgres -d quickticket -f database/schema.sql

if %errorlevel% equ 0 (
    echo ✓ Database schema created successfully
    echo.
    echo 3. Testing connection...
    node test-db-connection.js
) else (
    echo ❌ Failed to create schema
    echo Please check the error messages above
)

echo.
echo Setup complete! You can now start the application with: npm run dev
pause