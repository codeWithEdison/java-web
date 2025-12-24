@echo off
echo ========================================
echo Installing APK to Physical Device
echo ========================================
echo.
echo Make sure:
echo 1. USB Debugging is enabled on your phone
echo 2. Phone is connected via USB
echo 3. You've authorized this computer on your phone
echo.
pause

echo.
echo Checking for connected devices...
adb devices
echo.

echo Installing APK...
adb install -r "app\build\outputs\apk\debug\app-debug.apk"

echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo If installation failed, make sure:
echo - ADB is installed (part of Android SDK)
echo - USB Debugging is enabled on phone
echo - Phone is connected and authorized
echo.
pause

