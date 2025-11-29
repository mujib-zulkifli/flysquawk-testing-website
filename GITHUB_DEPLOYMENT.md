# GitHub Pages Deployment Guide

This guide will help you deploy your Flysquawk website to GitHub Pages.

## Prerequisites

1. **Install Git** (if not already installed):
   - Download from: https://git-scm.com/download/win
   - Follow the installation wizard
   - Restart your terminal/command prompt after installation

2. **Create a GitHub Account** (if you don't have one):
   - Go to: https://github.com
   - Sign up for a free account

## Step-by-Step Deployment

### Step 1: Initialize Git Repository

Open PowerShell or Command Prompt in your project directory and run:

```bash
# Navigate to your project directory
cd "C:\Users\User\Documents\flysquawk website 2.0\flysquawk-website"

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Flysquawk website"
```

### Step 2: Create GitHub Repository

1. Go to https://github.com and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name it: `flysquawk-website` (or any name you prefer)
5. Make it **Public** (required for free GitHub Pages)
6. **DO NOT** initialize with README, .gitignore, or license
7. Click "Create repository"

### Step 3: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Run these in your terminal:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/flysquawk-website.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

You'll be prompted for your GitHub username and password (use a Personal Access Token if 2FA is enabled).

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** (top menu)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**
6. Wait a few minutes for GitHub to build your site
7. Your site will be available at: `https://YOUR_USERNAME.github.io/flysquawk-website/`

## Updating Your Site

Whenever you make changes:

```bash
# Add changed files
git add .

# Commit changes
git commit -m "Description of your changes"

# Push to GitHub
git push
```

GitHub Pages will automatically rebuild your site within a few minutes.

## Troubleshooting

### If Git is not recognized:
- Make sure Git is installed and added to your PATH
- Restart your terminal after installation
- Try using Git Bash instead of PowerShell

### If you need a Personal Access Token:
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` permissions
3. Use this token as your password when pushing

### If the site doesn't load:
- Check the repository Settings → Pages to ensure it's enabled
- Wait 5-10 minutes for the initial build
- Check the Actions tab for any build errors

## Custom Domain (Optional)

If you have a custom domain:
1. Add a `CNAME` file in the root with your domain name
2. Configure DNS settings with your domain provider
3. Update GitHub Pages settings with your custom domain

