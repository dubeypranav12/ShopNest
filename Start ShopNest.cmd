@echo off
setlocal
cd /d "%~dp0"
title ShopNest Development Server

if not exist "node_modules\vite\bin\vite.js" (
  echo ShopNest dependencies are missing.
  echo Please ask Codex to repair the project setup.
  pause
  exit /b 1
)

echo Starting ShopNest...
echo The browser will open automatically on an available local address.
echo Keep this window open while using the website.
echo.

call npm run dev

echo.
echo ShopNest has stopped. Double-click this file to start it again.
pause
