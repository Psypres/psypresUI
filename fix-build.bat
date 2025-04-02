@echo off
echo ===================================
echo PsypresUI Build Troubleshooter
echo ===================================

echo This script will attempt to fix build issues by:
echo 1. Cleaning all dist directories
echo 2. Rebuilding packages in the correct order
echo 3. Ensuring all dependencies are properly linked

echo.
echo Step 1: Cleaning build artifacts...
if exist "packages\shared-ui\dist" rmdir /s /q packages\shared-ui\dist
if exist "packages\react\dist" rmdir /s /q packages\react\dist
if exist "packages\vue\dist" rmdir /s /q packages\vue\dist
if exist "packages\docs\dist" rmdir /s /q packages\docs\dist

echo.
echo Step 2: Building shared-ui package...
call pnpm --filter="@psypres/shared-ui" run build

if %ERRORLEVEL% NEQ 0 (
  echo.
  echo Error building shared-ui package.
  echo Check for errors above and try to resolve them.
  pause
  exit /b 1
)

echo.
echo Step 3: Building React package...
call pnpm --filter="@psypres/react" run build

if %ERRORLEVEL% NEQ 0 (
  echo.
  echo Error building React package.
  echo Check for errors above and try to resolve them.
  pause
  exit /b 1
)

echo.
echo Step 4: Building Vue package...
call pnpm --filter="@psypres/vue" run build

if %ERRORLEVEL% NEQ 0 (
  echo.
  echo Error building Vue package.
  echo Check for errors above and try to resolve them.
  pause
  exit /b 1
)

echo.
echo All packages built successfully!
echo.
echo Would you like to start the documentation site now? (Y/N):
set /p answer=

if /i "%answer%"=="Y" (
  echo.
  echo Starting documentation site...
  call pnpm dev:docs
) else (
  echo.
  echo You can start the documentation site later with 'pnpm dev:docs'.
  pause
) 