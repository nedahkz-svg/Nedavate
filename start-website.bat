@echo off
REM ============================================================
REM  Nedavate website - one-click local launcher
REM  Double-click this file to open your website in the browser.
REM  Leave the window open while you browse. Close it (or press
REM  Ctrl+C) to stop the site.
REM ============================================================

title Nedavate website (close this window to stop)

REM Run from this script's folder, wherever it's launched from.
cd /d "%~dp0"

REM Make sure Node/npm can be found even if not on the global PATH.
set "PATH=C:\Program Files\nodejs;%PATH%"

REM Install dependencies the first time (skipped once node_modules exists).
if not exist "node_modules" (
  echo Setting up for the first time - this can take a minute...
  call npm install
)

REM Open the browser a few seconds after the server starts compiling.
start "" cmd /c "timeout /t 8 >nul & start """" http://localhost:3000"

echo.
echo  Starting your website... a browser tab will open at http://localhost:3000
echo  Keep this window open while you view the site. Close it to stop.
echo.

REM Start the dev server in THIS window (closing the window stops it).
call npm run dev
