# Flysquawk Integrated Sdn Bhd - Corporate Website

## Overview
This is a professional corporate website for Flysquawk Integrated Sdn Bhd, a Malaysian MRO (Maintenance, Repair, and Overhaul) partner specializing in rotating equipment such as turbines, compressors, and pumps.

## Project Structure
```
.
├── index.html          # Clean, semantic HTML (no inline styles)
├── assets/
│   ├── styles.css      # Organized CSS with design tokens and components
│   ├── script.js       # Modular JavaScript with proper scope isolation
│   ├── img/            # Directory for your images
│   └── video/          # Directory for video assets
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
<img src="assets/img/hero-background.jpg" alt="Description of image" class="hero-image">

<!-- Add a team photo in the About section -->
<img src="assets/img/team-photo.jpg" alt="Flysquawk team" class="about-image">

<!-- Add project images -->
<img src="assets/img/project-1.jpg" alt="Project showcase" class="project-image">
```

### Common Image Locations
- **Hero section**: Background images for the purple gradient hero area
- **About section**: Company photos, team pictures, facility images
- **Services section**: Equipment photos, service process images
- **Projects section**: Project showcase photos and results
- **Industries section**: Industry-specific imagery

## Current State
- **Clean, production-ready code** with proper separation of concerns
- **Fully functional** single-page application with multiple sections
- **Responsive design** that works on mobile and desktop
- **Ready for image uploads** with organized folder structure

## Recent Changes
**November 16, 2025**
- ✅ **Navigation Menu Centered**: Repositioned navigation links to center for desktop view
  - Logo remains on the left
  - Navigation menu (Home, About, Services, Projects, Contact) centered in navbar
  - Mobile view unchanged - hamburger menu still works perfectly
  - Professional, balanced desktop layout
- ✅ **Authentic Brand Color Implementation**: Extracted and applied exact colors from Flysquawk logo
  - Primary Deep Purple: #1E1253 (RGB 30, 18, 83) - Main brand color
  - Vibrant Purple: #4B007F (RGB 75, 0, 127) - Accent brand color
  - Updated all CSS variables, gradients, and shadows throughout entire website
  - Hero video overlay now uses authentic brand color
  - Consistent brand identity across all pages and elements
- ✅ **Footer Branding Update**: Replaced text logo with actual Flysquawk logo image
  - Footer now displays the full spiral logo with white color for maximum contrast
  - Desktop size: 140px height for highly prominent visibility
  - Mobile/tablet size: 100px height for excellent recognition
  - Removed "Partner: NTP" text - clean Flysquawk branding only
  - White inverted color with scale and glow hover effect
- ✅ **Hero Video Background**: Replaced SVG turbine animation with custom video
  - Autoplay, looping video background on hero section
  - Semi-transparent purple overlay for text readability
  - Fully responsive and mobile-optimized
  - Video file: `assets/video/hero-background.mp4`
- ✅ **Mobile Responsive Menu**: Added hamburger menu for phones and tablets
  - Appears on screens ≤768px (tablets and phones) in top right corner
  - Animated 3-bar icon transforms to X when active
  - Smooth dropdown menu with all navigation links
  - Auto-closes when clicking a link or clicking outside
  - Purple gradient hover effect on menu items
- ✅ **Logo Replacement**: Updated navigation bar with company's purple spiral logo
  - Optimized sizing: 120px height (desktop), 83px (mobile)
  - Clearly visible "FlySquawk INTEGRATED" branding with spiral icon
  - Hover effect with smooth scale animation
- ✅ **Code Refactoring**: Separated messy 2,367-line HTML into clean, organized files
  - Extracted ALL CSS into `assets/styles.css` (70+ variables, semantic organization)
  - Extracted ALL JavaScript into `assets/script.js` (modular functions, proper scope)
  - Created clean HTML with NO inline styles, only CSS classes
- ✅ **Cleaned Up Dependencies**: Removed unnecessary Element SDK reference
- ✅ **Architect Approved**: Code quality verified and production-ready
- Initial setup: Extracted website from cleaned_website.zip
- Created assets/img/ directory for user images
- Set up Python HTTP server workflow

## Technical Details
- **Server**: Python HTTP server on port 5000
- **Framework**: Static HTML/CSS/JavaScript (single-page application)
- **Workflow**: Auto-starts on project load
- **Preview**: Available in the webview panel
- **CSS Organization**: Variables, Base, Layout, Components, Utilities, Responsive
- **JavaScript Modules**: Navigation, Sliders, Animations, Forms, Scroll Effects

## Code Quality
- ✅ Clean separation of HTML, CSS, and JavaScript
- ✅ No inline styles (all styling via CSS classes)
- ✅ Modular JavaScript with proper scope isolation
- ✅ Semantic HTML5 markup
- ✅ CSS variables for design tokens (colors, spacing, fonts)
- ✅ Responsive design with mobile breakpoints
- ✅ Production-ready and maintainable

## User Preferences
- User wants professional, clean code structure
- User needs to replace placeholder graphics with real photos
- Static website structure with single-page navigation
