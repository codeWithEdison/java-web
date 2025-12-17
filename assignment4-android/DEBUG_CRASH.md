# Debug App Crash - Step by Step

## The app is crashing/closing automatically

This guide will help you find and fix the crash.

## Step 1: Check Logcat for Errors

**In Android Studio:**

1. **Open Logcat:**
   - Bottom panel → **Logcat** tab
   - Or: **View → Tool Windows → Logcat**

2. **Filter for errors:**
   - In Logcat search box, type: `FATAL` or `AndroidRuntime`
   - Look for red error messages

3. **Common errors you might see:**
   - `NullPointerException` - Something is null
   - `ClassNotFoundException` - Missing class
   - `ResourceNotFoundException` - Missing resource
   - `InflateException` - Layout error

## Step 2: Common Fixes

### Fix 1: MaterialButton Issue
I've changed `MaterialButton` to regular `Button` to avoid theme issues.

**Rebuild the app:**
- **Build → Clean Project**
- **Build → Rebuild Project**
- **Run** again

### Fix 2: Missing Theme
Add theme to AndroidManifest.xml if missing.

### Fix 3: Null Pointer
Added null checks in MainActivity.

## Step 3: Check the Error Message

**Copy the error from Logcat and look for:**

### If you see: `ResourceNotFoundException`
- Layout file not found
- Solution: Clean and rebuild

### If you see: `NullPointerException`
- Something is null
- Solution: Added null checks (already done)

### If you see: `ClassNotFoundException`
- Missing dependency
- Solution: Sync Gradle

### If you see: `InflateException`
- Layout XML error
- Solution: Check layout file syntax

## Step 4: Quick Fixes to Try

### 1. Clean and Rebuild
```
Build → Clean Project
Build → Rebuild Project
```

### 2. Uninstall Old App
- On device/emulator: **Uninstall** the app
- Then rebuild and run

### 3. Check Dependencies
- **File → Sync Project with Gradle Files**
- Make sure all dependencies are downloaded

### 4. Check Layout File
- Open `activity_main.xml`
- Make sure it's valid XML (no red errors)

## Step 5: Share the Error

**If still crashing, share:**
1. The **full error message** from Logcat
2. The **line number** where it crashes
3. Any **red text** in Logcat

## What I Fixed:

✅ Changed `MaterialButton` to `Button` (avoids theme issues)
✅ Added null checks
✅ Added try-catch for error handling
✅ Added Toast messages for debugging

**Now rebuild and run again!**

