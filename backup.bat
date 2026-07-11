@echo off

cd /d D:\quiz_backup

echo ===========================
echo Exporting Firestore quizzes...
echo ===========================

node export.js

if errorlevel 1 (
    echo Export failed.
    exit /b 1
)

echo ===========================
echo Syncing GitHub...
echo ===========================

git add .

git diff --cached --quiet

if %errorlevel%==0 (
    echo No changes found.
    exit /b 0
)

git commit -m "Automatic quiz backup"

git push origin master

echo ===========================
echo Backup Complete
echo ===========================

pause