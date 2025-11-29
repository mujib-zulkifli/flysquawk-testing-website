# 🚀 Complete Guide: Deploy Flysquawk Website to GitHub Pages

This guide will walk you through deploying your website to GitHub Pages step by step.

---

## 📋 Prerequisites Checklist

Before starting, you need:
- ✅ A GitHub account (free)
- ✅ Git installed on your computer
- ✅ Your website files ready (index.html, assets folder, etc.)

---

## Step 1: Install Git (If Not Already Installed)

### For Windows:

1. **Download Git:**
   - Visit: https://git-scm.com/download/win
   - Download the latest version for Windows

2. **Install Git:**
   - Run the installer
   - **Important:** During installation, make sure to check:
     - ✅ "Git from the command line and also from 3rd-party software"
     - ✅ "Use bundled OpenSSH"
   - Click "Next" through the rest (defaults are fine)
   - Click "Install"

3. **Verify Installation:**
   - Close and reopen PowerShell/Command Prompt
   - Run: `git --version`
   - You should see something like: `git version 2.x.x`

---

## Step 2: Create a GitHub Repository

1. **Go to GitHub:**
   - Visit: https://github.com
   - Sign in (or create an account if needed)

2. **Create New Repository:**
   - Click the **"+"** icon in the top right corner
   - Select **"New repository"**

3. **Repository Settings:**
   - **Repository name:** `flysquawk-website` (or any name you prefer)
   - **Description:** (Optional) "Flysquawk Integrated Website"
   - **Visibility:** Select **Public** ⚠️ (Required for free GitHub Pages)
   - **DO NOT** check:
     - ❌ Add a README file
     - ❌ Add .gitignore
     - ❌ Choose a license
   - Click **"Create repository"**

4. **Copy Repository URL:**
   - After creating, GitHub will show you a page with commands
   - **Copy the repository URL** (looks like: `https://github.com/YOUR_USERNAME/flysquawk-website.git`)
   - You'll need this in Step 4

---

## Step 3: Prepare Your Local Files

1. **Open PowerShell in your project folder:**
   - Press `Windows Key + X`
   - Select "Windows PowerShell" or "Terminal"
   - Navigate to your project:
     ```powershell
     cd "C:\Users\User\Documents\flysquawk website 2.0\flysquawk-website"
     ```

2. **Verify you're in the right folder:**
   - You should see `index.html` when you run: `dir`

---

## Step 4: Initialize Git and Push to GitHub

Run these commands **one by one** in PowerShell:

### 4.1 Initialize Git Repository
```powershell
git init
```
Expected output: `Initialized empty Git repository in...`

### 4.2 Add All Files
```powershell
git add .
```
This adds all your website files to Git.

### 4.3 Create First Commit
```powershell
git commit -m "Initial commit: Flysquawk website"
```
Expected output: `[main (or master) xxxxxxx] Initial commit...`

### 4.4 Rename Branch to Main (if needed)
```powershell
git branch -M main
```

### 4.5 Connect to GitHub Repository
```powershell
git remote add origin https://github.com/YOUR_USERNAME/flysquawk-website.git
```
⚠️ **Replace `YOUR_USERNAME`** with your actual GitHub username!

### 4.6 Push Files to GitHub
```powershell
git push -u origin main
```

**Authentication:**
- You'll be prompted for your GitHub username (enter it)
- For password, you need a **Personal Access Token** (see below)

---

## Step 5: Create Personal Access Token (For Authentication)

GitHub requires a token instead of password:

1. **Go to GitHub Settings:**
   - Click your profile picture (top right)
   - Click **"Settings"**

2. **Navigate to Developer Settings:**
   - Scroll down in left sidebar
   - Click **"Developer settings"**
   - Click **"Personal access tokens"**
   - Click **"Tokens (classic)"**

3. **Generate New Token:**
   - Click **"Generate new token"** → **"Generate new token (classic)"**
   - **Note:** Give it a name like "Flysquawk Website"
   - **Expiration:** Choose "90 days" or "No expiration"
   - **Select scopes:** Check ✅ **`repo`** (this includes all repo permissions)
   - Scroll down and click **"Generate token"**

4. **Copy the Token:**
   - ⚠️ **IMPORTANT:** Copy the token immediately (you won't see it again!)
   - It looks like: `ghp_xxxxxxxxxxxxxxxxxxxx`
   - Save it somewhere safe

5. **Use Token as Password:**
   - When `git push` asks for password, **paste the token** (not your GitHub password)

---

## Step 6: Enable GitHub Pages

1. **Go to Your Repository:**
   - Visit: `https://github.com/YOUR_USERNAME/flysquawk-website`
   - Click the **"Settings"** tab (top menu)

2. **Navigate to Pages:**
   - In the left sidebar, scroll down and click **"Pages"**

3. **Configure Pages:**
   - Under **"Source"**, select:
     - **Branch:** `main`
     - **Folder:** `/ (root)`
   - Click **"Save"**

4. **Wait for Deployment:**
   - GitHub will show: "Your site is ready to be published..."
   - Wait 2-5 minutes for the first deployment
   - Refresh the page to see your site URL

5. **Your Website URL:**
   - Your site will be live at:
   - `https://YOUR_USERNAME.github.io/flysquawk-website/`
   - Example: `https://johnsmith.github.io/flysquawk-website/`

---

## Step 7: Verify Your Website is Live

1. **Visit your URL:**
   - Open: `https://YOUR_USERNAME.github.io/flysquawk-website/`
   - Your website should load!

2. **Check for Issues:**
   - If you see a 404, wait a few more minutes
   - Check the repository Settings → Pages for any errors

---

## 🔄 Updating Your Website

Whenever you make changes to your website:

1. **Open PowerShell in your project folder**

2. **Run these commands:**
   ```powershell
   git add .
   git commit -m "Updated website content"
   git push
   ```

3. **Wait 2-5 minutes:**
   - GitHub Pages automatically rebuilds your site
   - Refresh your website URL to see changes

---

## 🛠️ Troubleshooting

### ❌ "git is not recognized"
- **Solution:** Git is not installed or not in PATH
- Restart PowerShell after installing Git
- Or use Git Bash instead

### ❌ "Authentication failed" or "Permission denied"
- **Solution:** Use Personal Access Token instead of password
- Make sure token has `repo` permissions
- Token might have expired (generate a new one)

### ❌ "Repository not found"
- **Solution:** Check that:
  - Repository name is correct
  - Repository is Public (not Private)
  - You're using the correct GitHub username

### ❌ Website shows 404 or doesn't load
- **Solution:**
  - Wait 5-10 minutes for initial deployment
  - Check Settings → Pages to ensure it's enabled
  - Verify `index.html` is in the root folder
  - Check Actions tab for build errors

### ❌ Images or assets not loading
- **Solution:**
  - Make sure all paths use forward slashes: `assets/img/logo.png`
  - Check that all files are committed and pushed
  - Verify file names match exactly (case-sensitive)

---

## 🌐 Using a Custom Domain (Optional)

If you have your own domain (e.g., `flysquawk.com`):

1. **Create CNAME file:**
   - In your project root, create a file named `CNAME` (no extension)
   - Add your domain: `flysquawk.com`

2. **Commit and push:**
   ```powershell
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```

3. **Configure DNS:**
   - In your domain provider's DNS settings, add:
     - Type: `CNAME`
     - Name: `@` or `www`
     - Value: `YOUR_USERNAME.github.io`

4. **Update GitHub Pages:**
   - Go to Settings → Pages
   - Enter your custom domain
   - Wait for DNS propagation (can take up to 48 hours)

---

## 📝 Quick Reference Commands

```powershell
# Check Git status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Your message here"

# Push to GitHub
git push

# View commit history
git log

# Check remote repository
git remote -v
```

---

## ✅ Success Checklist

- [ ] Git installed and working
- [ ] GitHub account created
- [ ] Repository created on GitHub (Public)
- [ ] Files committed locally
- [ ] Files pushed to GitHub
- [ ] GitHub Pages enabled
- [ ] Website accessible at `https://YOUR_USERNAME.github.io/flysquawk-website/`

---

## 🆘 Need Help?

If you encounter issues:
1. Check the Troubleshooting section above
2. Visit GitHub Docs: https://docs.github.com/en/pages
3. Check GitHub Community: https://github.community

---

**🎉 Congratulations!** Your website is now live on GitHub Pages!

