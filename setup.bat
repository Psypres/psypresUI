@echo off
echo ===================================
echo PsypresUI First-Time Setup
echo ===================================

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo Node.js is not installed!
  echo Please install Node.js from https://nodejs.org/
  echo Press any key to exit...
  pause > nul
  exit /b 1
)

:: Check if pnpm is installed
where pnpm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo pnpm is not installed!
  echo Installing pnpm globally...
  npm install -g pnpm
)

:: Clean up any existing installation
echo.
echo Cleaning up any existing installation...
call pnpm cleanup 2>nul || (
  echo No previous installation found, continuing...
)

:: Install dependencies
echo.
echo Installing dependencies...
call pnpm install

if %ERRORLEVEL% NEQ 0 (
  echo There was an error installing dependencies.
  echo Please check the output above.
  pause
  exit /b 1
)

:: Build shared-ui package first
echo.
echo Building shared-ui package...
call pnpm build:shared

if %ERRORLEVEL% NEQ 0 (
  echo There was an error building the shared-ui package.
  echo Please check the output above.
  pause
  exit /b 1
)

:: Build React package
echo.
echo Building React package...
call pnpm build:react

if %ERRORLEVEL% NEQ 0 (
  echo There was an error building the React package.
  echo Please check the output above.
  pause
  exit /b 1
)

:: Build Vue package
echo.
echo Building Vue package...
call pnpm build:vue

if %ERRORLEVEL% NEQ 0 (
  echo There was an error building the Vue package.
  echo Please check the output above.
  pause
  exit /b 1
)

echo.
echo ===================================
echo Setup completed successfully!
echo.
echo To start the documentation site, run:
echo   pnpm dev:docs
echo.
echo Or simply double-click the start-ui.bat file.
echo ===================================

:: Ask if user wants to start the documentation site
echo.
set /p answer=Would you like to start the documentation site now? (Y/N): 
if /i "%answer%"=="Y" (
  echo.
  echo Starting documentation site...
  call pnpm dev:docs
) else (
  echo.
  echo Setup completed. You can start the documentation site later with 'pnpm dev:docs'.
  pause
) 