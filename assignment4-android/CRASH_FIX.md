# Fix App Crash - "Product Manager keeps stopping"

## ✅ Fixed Issues:

1. **Added Material Theme** - MaterialButton and MaterialCardView require a Material theme
2. **Added Null Checks** - Prevent crashes from null views
3. **Added Error Handling** - Better crash prevention

## Steps to Fix:

### 1. In Android Studio:

1. **File → Sync Project with Gradle Files**
   - Wait for sync to complete

2. **Build → Clean Project**

3. **Build → Rebuild Project**

4. **Uninstall the old app:**
   - On your device/emulator: Long press app icon → Uninstall
   - Or: **Run → Uninstall 'app'**

5. **Run the app again:**
   - Click green play button (▶️)

## What I Fixed:

### ✅ Added Theme File
Created `app/src/main/res/values/themes.xml` with Material theme

### ✅ Updated AndroidManifest
Added `android:theme="@style/Theme.Assignment4"` to application tag

### ✅ Added Null Checks
Added safety checks in NetworkActivity to prevent crashes

## Check Logcat for Errors:

If it still crashes:

1. **Open Logcat** (bottom panel in Android Studio)
2. **Filter by:** `FATAL` or `AndroidRuntime`
3. **Look for red error messages**
4. **Copy the full error** and share it

## Common Crash Causes (Now Fixed):

- ❌ Missing Material theme → ✅ Added theme
- ❌ Null pointer exceptions → ✅ Added null checks
- ❌ Layout inflation errors → ✅ Fixed layout references

## If Still Crashing:

Share the **exact error message** from Logcat, including:
- The exception type (e.g., `NullPointerException`)
- The line number
- The full stack trace

The app should work now after rebuilding! 🚀

