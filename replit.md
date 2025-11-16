# Flysquawk Integrated Sdn Bhd - Corporate Website

## Overview
This is a static corporate website for Flysquawk Integrated Sdn Bhd, a Malaysian MRO (Maintenance, Repair, and Overhaul) partner specializing in rotating equipment such as turbines, compressors, and pumps.

## Project Structure
```
.
├── index.html          # Main website file
├── assets/
│   ├── styles.css      # Website styling
│   ├── script.js       # Interactive features
│   └── img/            # Directory for your images
├── README.txt          # Original setup notes
└── .gitignore          # Git ignore file
```

## How to Add Your Images

### Step 1: Upload Your Images
1. Click on the `assets/img/` folder in the file tree
2. Upload your images (recommended formats: JPG, PNG, WebP)
3. Give them descriptive names like `hero-background.jpg`, `team-photo.png`, etc.

### Step 2: Add Images to Your Website
Edit the `index.html` file and add `<img>` tags where you want images to appear. For example:

```html
<!-- Add a hero image -->
<img src="assets/img/hero-background.jpg" alt="Description of image">

<!-- Add a team photo in the About section -->
<img src="assets/img/team-photo.jpg" alt="Flysquawk team">

<!-- Add project images -->
<img src="assets/img/project-1.jpg" alt="Project showcase">
```

### Common Image Locations
- **Hero section** (line 29): Add a background image or featured photo
- **About section** (line 95): Add company photos, team pictures
- **Projects section** (line 119): Add project photos and results
- **Services section** (line 107): Add service-related images

## Current State
- Static website extracted and organized
- Local web server running on port 5000
- Image directory created at `assets/img/`
- Ready for you to upload and add your real photos

## Recent Changes
**November 16, 2025**
- Extracted website from cleaned_website.zip
- Created assets/img/ directory for user images
- Set up Python HTTP server workflow
- Added project documentation

## Technical Details
- **Server**: Python HTTP server on port 5000
- **Framework**: Static HTML/CSS/JavaScript
- **Workflow**: Auto-starts on project load
- **Preview**: Available in the webview panel

## User Preferences
- User wants to replace placeholder/dummy images with real photos
- Static website structure preferred
