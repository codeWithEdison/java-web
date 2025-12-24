# Backend Server Setup for Physical Device

## ⚠️ IMPORTANT: Configure Your Backend Server

For your phone to access the database on your PC, your backend server MUST be configured to accept network connections.

## Step 1: Update Your Backend Server Configuration

### If you're using Node.js/Express:

Open your server file (e.g., `server.js`, `app.js`, or `index.js`) and make sure it binds to `0.0.0.0`:

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

// ... your middleware and routes ...

// IMPORTANT: Bind to 0.0.0.0, not localhost or 127.0.0.1
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
    console.log(`Access from network: http://172.20.10.5:${PORT}`);
});
```

**Change FROM:**
```javascript
app.listen(3000);  // ❌ Only accessible from localhost
app.listen(3000, 'localhost');  // ❌ Only accessible from localhost
app.listen(3000, '127.0.0.1');  // ❌ Only accessible from localhost
```

**Change TO:**
```javascript
app.listen(3000, '0.0.0.0');  // ✅ Accessible from network
```

### If you're using MySQL:

Edit `my.ini` or `my.cnf`:
```ini
[mysqld]
bind-address = 0.0.0.0
port = 3306
```

Grant network access to your database user:
```sql
GRANT ALL PRIVILEGES ON your_database.* TO 'your_user'@'%' IDENTIFIED BY 'your_password';
FLUSH PRIVILEGES;
```

### If you're using PostgreSQL:

Edit `postgresql.conf`:
```
listen_addresses = '*'
```

Edit `pg_hba.conf`:
```
host    all    all    0.0.0.0/0    md5
```

## Step 2: Configure Windows Firewall

### Option A: PowerShell (Run as Administrator)
```powershell
New-NetFirewallRule -DisplayName "Node.js Server" -Direction Inbound -Protocol TCP -LocalPort 3000 -Action Allow
```

### Option B: Manual
1. Open Windows Defender Firewall
2. Click "Advanced settings"
3. Click "Inbound Rules" → "New Rule"
4. Select "Port" → Next
5. Select "TCP" → Enter "3000" → Next
6. Select "Allow the connection" → Next
7. Check all profiles → Next
8. Name: "Backend Server" → Finish

## Step 3: Verify Server is Accessible

### On Your PC:
Open browser and test:
- http://localhost:3000/api
- http://172.20.10.5:3000/api (both should work)

### From Your Phone (same Wi-Fi):
1. Open Chrome browser on phone
2. Navigate to: http://172.20.10.5:3000/api
3. You should see API response

## Step 4: Test the Android App

1. Make sure backend server is running
2. Make sure phone is on same Wi-Fi as PC
3. Install and open the Android app
4. The app should now connect to your PC's database!

## Troubleshooting

### "Connection Refused"
- Server is not bound to 0.0.0.0
- Server is not running
- Wrong port number

### "Unable to resolve host" / "Network Error"
- Phone is not on same Wi-Fi network
- Firewall is blocking connections
- Wrong IP address in NetworkConfig.java

### "Timeout"
- Antivirus blocking connections
- Router has AP isolation enabled
- Server is running but not responding

### Test Connection from Command Line:
```bash
# From phone (use Termux or similar app):
curl http://172.20.10.5:3000/api

# From PC:
curl http://localhost:3000/api
```

## Current Configuration

- **Your PC IP**: 172.20.10.5
- **Backend Port**: 3000
- **API Base URL**: http://172.20.10.5:3000/api
- **Android App**: Configured to use above URL

## Quick Start Commands

```bash
# 1. Navigate to your backend project
cd path/to/your/backend

# 2. Start your backend server
npm start
# or
node server.js

# 3. Verify it's accessible
curl http://172.20.10.5:3000/api
```

Remember: Every time your PC's IP changes (new network, reconnect), you'll need to update `NetworkConfig.java` and rebuild the APK!

