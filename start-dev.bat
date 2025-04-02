@echo off
echo ===================================
echo PsypresUI Development Environment
echo ===================================

:: Check if pnpm is installed
where pnpm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo pnpm is not installed!
  echo Installing pnpm globally...
  npm install -g pnpm
)

echo.
echo Step 1: Installing dependencies...
call pnpm install

if %ERRORLEVEL% NEQ 0 (
  echo.
  echo Error installing dependencies.
  echo Please try running 'pnpm clean:all' and then try again.
  pause
  exit /b 1
)

echo.
echo Step 2: Building packages in order...

echo Building shared-ui package...
call pnpm build:shared

if %ERRORLEVEL% NEQ 0 (
  echo.
  echo Error building shared-ui.
  echo Please check the errors above.
  pause
  exit /b 1
)

echo Building React package...
call pnpm build:react

if %ERRORLEVEL% NEQ 0 (
  echo.
  echo Error building React package.
  echo Please check the errors above.
  pause
  exit /b 1
)

echo Building Vue package...
call pnpm build:vue

if %ERRORLEVEL% NEQ 0 (
  echo.
  echo Error building Vue package.
  echo Please check the errors above.
  pause
  exit /b 1
)

echo.
echo Step 3: Starting documentation site...
echo.
echo ===================================
echo Documentation site is starting up!
echo Press Ctrl+C to stop the server when done.
echo ===================================
echo.

call pnpm dev:docs 