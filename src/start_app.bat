@echo off
title Social Sentiment App Launcher
color 0A
echo ---------------------------------------------
echo   Starting Social Sentiment Analyzer Project
echo ---------------------------------------------
echo.

:: Change directory to backend and start FastAPI
cd backend
echo [BACKEND] Activating virtual environment...
call venv\Scripts\activate
echo [BACKEND] Running FastAPI server...
start cmd /k "uvicorn main:app --reload"

:: Change directory to frontend and start React
cd ..
cd frontend
echo [FRONTEND] Starting React app...
start cmd /k "npm start"

echo.
echo Both servers have been launched!
echo You can close this window now if you want.
pause
