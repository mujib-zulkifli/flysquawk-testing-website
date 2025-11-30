# 🌐 Deploy Flysquawk Website to flysquawk.com.my

This guide covers multiple methods to deploy your website to your custom domain `flysquawk.com.my`.

---

## 📋 Files to Deploy

The following files and folders need to be uploaded to your web server:

**Required Files:**
- `index.html` (main page)
- `assets/` folder (contains all CSS, JavaScript, images, and videos)
  - `assets/styles.css`
  - `assets/script.js`
  - `assets/img/` (all images)
  - `assets/video/` (hero-background.mp4)

**Files to EXCLUDE (not needed on web server):**
- `main.py` (Python development server)
- `pyproject.toml`
- `uv.lock`
- `README.md`
- `DEPLOYMENT_GUIDE.md`
- `GITHUB_DEPLOYMENT.md`
- `FIX_IMAGES_GITHUB.md`
- `verify-images.ps1`
- `.git/` folder (if present)

---

## 🚀 Method 1: GitHub Pages with Custom Domain (Recommended)

This is the easiest method - host on GitHub Pages and point your domain to it.

### Step 1: Create CNAME File

1. In your project root, create a file named `CNAME` (no extension, all caps)
2. Add this single line to the file:
   ```
   flysquawk.com.my
   ```

3. Commit and push:
   ```powershell
   git add CNAME
   git commit -m "Add custom domain CNAME"
   git push
   ```

### Step 2: Configure GitHub Pages

1. Go to your GitHub repository: `https://github.com/mujib-zulkifli/flysquawk-testing-website`
2. Click **Settings** → **Pages**
3. Under **Custom domain**, enter: `flysquawk.com.my`
4. Check **"Enforce HTTPS"** (recommended)
5. Click **Save**

### Step 3: Configure DNS at Your Domain Provider

Go to your domain registrar (where you bought `flysquawk.com.my`) and add these DNS records:

**Option A: Using A Records (Recommended)**
```
Type: A
Name: @
Value: 185.199.108.153
TTL: 3600

Type: A
Name: @
Value: 185.199.109.153
TTL: 3600

Type: A
Name: @
Value: 185.199.110.153
TTL: 3600

Type: A
Name: @
Value: 185.199.111.153
TTL: 3600
```

**Option B: Using CNAME (Alternative)**
```
Type: CNAME
Name: @
Value: mujib-zulkifli.github.io
TTL: 3600
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: mujib-zulkifli.github.io
TTL: 3600
```

### Step 4: Wait for DNS Propagation

- DNS changes can take 24-48 hours to propagate
- Check status at: https://dnschecker.org/#A/flysquawk.com.my
- Once DNS is updated, GitHub will automatically enable HTTPS

### Step 5: Verify

Visit `https://flysquawk.com.my` - your website should load!

---

## 📤 Method 2: Traditional Web Hosting (FTP/SFTP)

If you have a traditional web hosting account (cPanel, Plesk, etc.), upload files via FTP.

### Step 1: Get Your FTP Credentials

From your hosting provider, you need:
- **FTP Host/Server:** (e.g., `ftp.flysquawk.com.my` or `your-server-ip`)
- **FTP Username:** (your hosting username)
- **FTP Password:** (your hosting password)
- **FTP Port:** (usually 21 for FTP, 22 for SFTP)
- **Remote Directory:** (usually `public_html` or `www` or `htdocs`)

### Step 2: Choose FTP Client

**Option A: FileZilla (Free, Recommended)**
1. Download: https://filezilla-project.org/download.php?type=client
2. Install and open FileZilla

**Option B: WinSCP (Windows)**
1. Download: https://winscp.net/eng/download.php
2. Install and open WinSCP

**Option C: Command Line (PowerShell with WinSCP module)**
```powershell
# Install WinSCP module
Install-Module -Name WinSCP -Force

# Connect and upload
$sessionOptions = New-Object WinSCP.SessionOptions -Property @{
    Protocol = [WinSCP.Protocol]::Ftp
    HostName = "ftp.flysquawk.com.my"
    UserName = "your-username"
    Password = "your-password"
}
```

### Step 3: Connect and Upload

**Using FileZilla:**

1. **Connect:**
   - Enter Host, Username, Password, Port
   - Click "Quickconnect"

2. **Navigate to web root:**
   - On the right (Remote site), go to `public_html` or `www` folder
   - This is where your website files should be

3. **Backup existing files (if any):**
   - Create a folder named `backup_YYYYMMDD`
   - Move existing files there (if you want to keep them)

4. **Upload files:**
   - On the left (Local site), navigate to your project folder
   - Select these files/folders:
     - `index.html`
     - `assets/` folder (entire folder)
   - Drag and drop to the right side (Remote site)
   - Wait for upload to complete

5. **Verify file structure on server:**
   ```
   public_html/
   ├── index.html
   └── assets/
       ├── styles.css
       ├── script.js
       ├── img/
       │   └── (all image files)
       └── video/
           └── hero-background.mp4
   ```

### Step 4: Set Permissions (if needed)

Some servers require specific file permissions:
- **Files:** 644 (read/write for owner, read for others)
- **Folders:** 755 (read/write/execute for owner, read/execute for others)

In FileZilla: Right-click file → File permissions → Set to 644 or 755

### Step 5: Test Your Website

Visit `https://flysquawk.com.my` and verify everything works.

---

## 🔄 Method 3: Automated Deployment Script (PowerShell)

Create a script to automate FTP uploads.

### Create Deployment Script

Create a file `deploy.ps1` in your project root:

```powershell
# deploy.ps1 - Automated FTP Deployment Script

param(
    [Parameter(Mandatory=$true)]
    [string]$FtpHost,
    
    [Parameter(Mandatory=$true)]
    [string]$FtpUsername,
    
    [Parameter(Mandatory=$true)]
    [string]$FtpPassword,
    
    [string]$RemotePath = "/public_html",
    [int]$FtpPort = 21
)

# Install WinSCP module if not present
if (-not (Get-Module -ListAvailable -Name WinSCP)) {
    Write-Host "Installing WinSCP PowerShell module..." -ForegroundColor Yellow
    Install-Module -Name WinSCP -Force -Scope CurrentUser
}

Import-Module WinSCP

# Set up session
$sessionOptions = New-Object WinSCP.SessionOptions -Property @{
    Protocol = [WinSCP.Protocol]::Ftp
    HostName = $FtpHost
    UserName = $FtpUsername
    Password = $FtpPassword
    PortNumber = $FtpPort
}

$session = New-Object WinSCP.Session

try {
    Write-Host "Connecting to FTP server..." -ForegroundColor Cyan
    $session.Open($sessionOptions)
    
    Write-Host "Uploading files..." -ForegroundColor Cyan
    
    # Upload index.html
    $session.PutFiles("$PSScriptRoot\index.html", "$RemotePath/index.html").Check()
    Write-Host "✓ Uploaded index.html" -ForegroundColor Green
    
    # Upload assets folder
    $transferOptions = New-Object WinSCP.TransferOptions
    $transferOptions.TransferMode = [WinSCP.TransferMode]::Binary
    
    $session.PutFiles("$PSScriptRoot\assets\*", "$RemotePath/assets/", $False, $transferOptions).Check()
    Write-Host "✓ Uploaded assets folder" -ForegroundColor Green
    
    Write-Host "`n✅ Deployment completed successfully!" -ForegroundColor Green
    Write-Host "Visit: https://flysquawk.com.my" -ForegroundColor Cyan
    
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
    exit 1
} finally {
    $session.Dispose()
}
```

### Use the Script

```powershell
# Run the deployment script
.\deploy.ps1 -FtpHost "ftp.flysquawk.com.my" -FtpUsername "your-username" -FtpPassword "your-password"
```

---

## 🔧 Method 4: Using cPanel File Manager

If your hosting uses cPanel:

1. **Login to cPanel:**
   - Go to `https://flysquawk.com.my:2083` (or your cPanel URL)
   - Login with your credentials

2. **Open File Manager:**
   - Find "File Manager" in cPanel
   - Navigate to `public_html` folder

3. **Backup existing files:**
   - Select all existing files
   - Click "Compress" → Create a ZIP backup
   - Or create a `backup` folder and move files there

4. **Upload new files:**
   - Click "Upload" button
   - Select `index.html` and upload
   - Create `assets` folder if it doesn't exist
   - Upload entire `assets` folder contents

5. **Verify structure:**
   - Ensure `index.html` is in `public_html/`
   - Ensure `assets/` folder is in `public_html/`

---

## ✅ Post-Deployment Checklist

After deploying, verify:

- [ ] Website loads at `https://flysquawk.com.my`
- [ ] All images display correctly
- [ ] CSS styling is applied
- [ ] JavaScript functionality works (navigation, sliders, etc.)
- [ ] Video plays (hero background)
- [ ] Mobile responsive design works
- [ ] All pages/sections are accessible
- [ ] Contact form works (if applicable)
- [ ] HTTPS is enabled (SSL certificate)

---

## 🔄 Updating Your Website

### If using GitHub Pages:
```powershell
git add .
git commit -m "Update website content"
git push
```
Changes appear in 2-5 minutes.

### If using FTP:
1. Make changes locally
2. Upload only changed files via FTP
3. Refresh website to see changes

### If using deployment script:
```powershell
.\deploy.ps1 -FtpHost "ftp.flysquawk.com.my" -FtpUsername "your-username" -FtpPassword "your-password"
```

---

## 🛠️ Troubleshooting

### ❌ Website shows "Index of /" or directory listing
**Solution:** Make sure `index.html` is in the web root directory (usually `public_html`)

### ❌ Images not loading
**Solution:**
- Check file paths use forward slashes: `assets/img/logo.png`
- Verify all image files are uploaded
- Check file permissions (should be 644)

### ❌ CSS/JavaScript not working
**Solution:**
- Verify `assets/styles.css` and `assets/script.js` are uploaded
- Check browser console for 404 errors
- Ensure file paths are correct

### ❌ HTTPS not working
**Solution:**
- Install SSL certificate from your hosting provider
- Or use Let's Encrypt (free SSL)
- Enable HTTPS redirect in cPanel or .htaccess

### ❌ Domain not pointing to website
**Solution:**
- Check DNS settings at domain registrar
- Verify DNS propagation: https://dnschecker.org
- Wait 24-48 hours for DNS changes

---

## 📞 Need Help?

If you encounter issues:
1. Check browser console (F12) for errors
2. Verify all files are uploaded correctly
3. Check file permissions on server
4. Contact your hosting provider for assistance

---

## 🎯 Quick Reference

**Files to upload:**
- `index.html`
- `assets/` (entire folder with all subfolders)

**Files to exclude:**
- Python files (`main.py`, `pyproject.toml`, etc.)
- Documentation files (`.md` files)
- Git files (`.git/` folder)

**Web root directory:**
- Usually: `public_html`, `www`, or `htdocs`
- Check with your hosting provider

---

**🎉 Once deployed, your website will be live at https://flysquawk.com.my!**

