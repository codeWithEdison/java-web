@echo off
REM Clean Android Build Script for Windows

echo Cleaning Android build cache...

REM Remove build directories
if exist app\build rmdir /s /q app\build
if exist app\.cxx rmdir /s /q app\.cxx
if exist .gradle rmdir /s /q .gradle
if exist build rmdir /s /q build
if exist .idea\caches rmdir /s /q .idea\caches

echo Build cache cleaned!
echo.
echo Now in Android Studio:
echo 1. File -^> Sync Project with Gradle Files
echo 2. Build -^> Rebuild Project
echo 3. Run the app

pause

