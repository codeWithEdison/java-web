#!/bin/bash
# Clean Android Build Script

echo "Cleaning Android build cache..."

# Remove build directories
rm -rf app/build
rm -rf app/.cxx
rm -rf .gradle
rm -rf build
rm -rf .idea/caches

echo "Build cache cleaned!"
echo "Now in Android Studio:"
echo "1. File -> Sync Project with Gradle Files"
echo "2. Build -> Rebuild Project"
echo "3. Run the app"

