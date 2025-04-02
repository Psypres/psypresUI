@echo off
echo ===================================
echo Setting up PsypresUI Component Library
echo ===================================

:: Check if pnpm is installed
where pnpm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo pnpm is not installed!
  echo Installing pnpm globally...
  npm install -g pnpm
)

:: Run the setup-and-start script
echo.
echo Installing dependencies, building packages, and starting the documentation site...
echo This may take a few minutes...
echo.
call pnpm setup-and-start

echo.
if %ERRORLEVEL% NEQ 0 (
  echo There was an error. Please check the output above.
  pause
) else (
  echo ===================================
  echo PsypresUI is now running!
  echo Documentation site should be open in your browser.
  echo Press Ctrl+C to stop the server.
  echo ===================================
) 