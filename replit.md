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
**November 17, 2025**
- ✅ **Services Page Steam Turbine Image Added**: Replaced placeholder with professional cutaway diagram
  - First slide in Steam Turbine section now shows real technical cutaway image (steam-turbine-cutaway.jpg)
  - Updated slide title to "Steam Turbine Engineering" with enhanced description
  - New CSS class .slide-real-image for proper image display in service slides
  - Professional technical diagram showing internal components, blade systems, rotor dynamics, and sealing technology
- ✅ **Core Capabilities Update**: Revised "Steam Turbine Overhaul" to "Steam Turbine Manufacturing"
  - Updated description to emphasize reverse engineering and manufacturing capabilities up to 4 MW
  - Highlights partnership with NTP's manufacturing expertise
  - Showcases end-to-end engineering and production capabilities
- ✅ **About Section Comprehensive Redesign**: Complete rewrite integrating brand philosophy, CSR elements, and restoration-first identity
  - **01. Company Overview**: Enhanced with "restoration-first MRO excellence" positioning and "restore before replace" philosophy
  - **02. Vision & Mission**: 
    - **Vision**: "To be ASEAN's leading restoration-based MRO partner — preserving legacy industrial assets, protecting capital, and enabling a financially and environmentally sustainable future."
    - **Mission**: 6-point mission emphasizing restoration, capital protection, sustainability, and heritage preservation
  - **03. Brand Philosophy - "Old is Gold"**: Expanded messaging honoring industry pioneers, engineering heritage, and industrial stewardship
  - **04. Corporate Social Responsibility**: NEW section with 4 CSR pillars
    - 🔧 Honouring Industry Pioneers (respect for elderly engineers and their knowledge)
    - 🌱 Environmental Stewardship (restoration as natural sustainability)
    - 🤝 Uplifting Communities (local talent development and workforce strengthening)
    - ⚙️ Hands-On Excellence (celebrating craftsmanship and manual precision)
  - **05. Corporate Milestones**: Renumbered (previously 03)
  - **06. Partnership with NTP**: Renumbered (previously unnumbered), highlighting international expertise + local wisdom
  - New CSS grid styling for CSR section with responsive mobile layout
  - Stronger emphasis on restoration-first philosophy, capital protection, and environmental stewardship throughout
- ✅ **Projects Section Size Optimization**: Made all project sections more compact and space-efficient
  - Container width reduced from 1100px to 900px (18% smaller)
  - Image max-width reduced from 900px to 700px (22% smaller)
  - Text max-width reduced from 800px to 650px (19% smaller)
  - Font sizes reduced from base to small throughout all slides
  - Section padding and margins tightened for compact presentation
  - Slide min-height reduced from 350px to 280px (20% smaller)
  - Section titles reduced from 3xl to 2xl font size
- ✅ **Elliot Steam Turbine Photos & Technical Diagrams Added**: Real equipment photos and technical diagrams integrated into Project 3
  - Slide 1: Elliot Steam Turbine in workshop (elliot-steam-turbine.jpg) - full-width display
  - Slide 3: Nozzle Plate Technical Diagram (elliot-nozzle-plate.png) - showing steam pressure specifications and flow analysis
  - Replaced all placeholders with authentic industrial equipment photography and engineering diagrams
  - All 3 projects now use 100% real photos and technical documentation - NO placeholders remaining

**November 16, 2025**
- ✅ **All Projects: Unified 4-Slide Alternating Layout**: All 3 project sections now use the same clean presentation format
  - **Project 1 - Boeing 747 (9M-MPD):**
    - Slide 1: Aircraft photo only (boeing-747-exterior-full.jpg) - full-width display
    - Slide 2: Text - Client, Project Type, Partner, project description
    - Slide 3: Aircraft photo only (boeing-747-tail-9m-mpd.jpg) - full-width display
    - Slide 4: Text - 🔹 Key achievements and closing statement
  - **Project 2 - CQB Project:**
    - Slide 1: Training platform photo (cbq-training-boeing-747.jpg) - full-width display
    - Slide 2: Text - Client, Scope, project description
    - Slide 3: Conversion photo (cbq-aircraft-conversion-side.jpg) - full-width display
    - Slide 4: Text - 🔹 Conversion process, delivery, closing statement
  - **Project 3 - Elliot Steam Turbine (1.6 MW):**
    - Slide 1: Turbine photo (elliot-steam-turbine.jpg) - full-width display
    - Slide 2: Text - Client, Partner, Turbine Type, project description
    - Slide 3: Turbine photo (elliot-steam-turbine.jpg) - full-width display
    - Slide 4: Text - 🔹 Scope, findings, expected outcome, closing statement
  - New CSS classes: project-slide-photo-only, project-slide-text-only, project-text-full, project-image-full
  - Compact, professional layouts with reduced spacing and font sizes
  - Browser console confirms: All 3 sliders with 4 slides each ✓
- ✅ **3 Separate Project Sections Maintained**: Each project has its own dedicated section with independent slider and navigation
- ✅ **CQB Project Photos Added**: Real photos integrated into Close Quarter Battle (CQB) Project section (3 slides)
  - Slide 1: Boeing 747 CQB training platform with military vehicles (cbq-training-boeing-747.jpg)
  - Slide 2: Aircraft undergoing conversion with heavy equipment (cbq-aircraft-conversion-side.jpg)
  - Slide 3: Aerial view of complete conversion setup (cbq-aircraft-aerial.jpg)
  - All photos show authentic project documentation of the actual CQB training platform conversion
  - Replaced all placeholders with real event photography
- ✅ **Navigation Bar Logo Adjustment**: Reduced logo size from 120px to 90px to prevent overlap with menu items
  - Added padding to nav-container for better spacing
  - Logo now displays cleanly without overlapping "Home" menu item
  - Maintains professional appearance on all screen sizes
- ✅ **Boeing 747 Project Photos Added**: Real event photos integrated into Strategic Aviation Asset Procurement section
  - All 3 images properly styled with 4:3 aspect ratio and full responsive support
  - boeing-747-exterior-full.jpg, boeing-747-tail-9m-mpd.jpg, boeing-747-cockpit-interior.jpg
- ✅ **Projects Page Redesign**: Complete overhaul with new content and industrial theme
  - Updated to "Projects & Highlights" with three major project categories
  - Vertical arrangement with horizontal slider for each project (2-3 slides per category)
  - Project 1: Strategic Aviation Asset Procurement – Boeing 747 (9M-MPD)
  - Project 2: Close Quarter Battle (CQB) Project
  - Project 3: Performance Recovery – Elliot Steam Turbine (1.6 MW)
  - Industrial theme with navy, bronze gold, and orange accents
  - Inspirational quote: "Every project tells a story of restoration, precision, and partnership."
  - Closing tagline: "Flysquawk Integrated — Reviving legacy assets. Restoring performance. Protecting capital."
  - Fully responsive with touch/swipe support on mobile
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
