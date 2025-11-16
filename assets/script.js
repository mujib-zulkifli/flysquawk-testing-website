/**
 * Flysquawk Integrated Website - Main JavaScript
 * Handles navigation, sliders, animations, form submission, and scroll effects
 */

(function() {
    'use strict';

    // =================================================================
    // ELEMENT SDK INTEGRATION
    // =================================================================
    
    const defaultConfig = {
        hero_headline: "Rejuvenate Your Industrial Power",
        hero_subtext: "Malaysia's trusted MRO partner restoring turbines, compressors, and pumps.",
        cta_button_text: "Discover Our Capabilities",
        tagline: "Preserving Power. Protecting Capital.",
        phone_number: "+60 19 986 9487",
        email_address: "enquiry@flysquawk.com.my"
    };

    async function onConfigChange(config) {
        const heroHeadline = document.getElementById('hero-headline');
        const heroSubtext = document.getElementById('hero-subtext');
        const tagline = document.getElementById('tagline');
        
        if (heroHeadline) heroHeadline.textContent = config.hero_headline || defaultConfig.hero_headline;
        if (heroSubtext) heroSubtext.textContent = config.hero_subtext || defaultConfig.hero_subtext;
        if (tagline) tagline.textContent = config.tagline || defaultConfig.tagline;
        
        const ctaButtons = [
            document.getElementById('cta-button-1'),
            document.getElementById('cta-button-2'),
            document.getElementById('cta-button-3')
        ];
        ctaButtons.forEach(btn => {
            if (btn) btn.textContent = config.cta_button_text || defaultConfig.cta_button_text;
        });
        
        const phoneElements = document.querySelectorAll('.phone-number');
        phoneElements.forEach(el => el.textContent = config.phone_number || defaultConfig.phone_number);
        
        const emailElements = document.querySelectorAll('.email-address');
        emailElements.forEach(el => el.textContent = config.email_address || defaultConfig.email_address);
    }

    function mapToCapabilities(config) {
        return {
            recolorables: [],
            borderables: [],
            fontEditable: undefined,
            fontSizeable: undefined
        };
    }

    function mapToEditPanelValues(config) {
        return new Map([
            ["hero_headline", config.hero_headline || defaultConfig.hero_headline],
            ["hero_subtext", config.hero_subtext || defaultConfig.hero_subtext],
            ["cta_button_text", config.cta_button_text || defaultConfig.cta_button_text],
            ["tagline", config.tagline || defaultConfig.tagline],
            ["phone_number", config.phone_number || defaultConfig.phone_number],
            ["email_address", config.email_address || defaultConfig.email_address]
        ]);
    }

    // Initialize Element SDK if available
    if (window.elementSdk) {
        window.elementSdk.init({
            defaultConfig,
            onConfigChange,
            mapToCapabilities,
            mapToEditPanelValues
        });
    }

    // =================================================================
    // NAVIGATION SYSTEM
    // =================================================================
    
    /**
     * Initialize page navigation and active states
     */
    function initNavigation() {
        let currentPage = 'home';

        // Main page switching function
        window.showPage = function(pageName) {
            // Hide all pages
            const allPages = document.querySelectorAll('.page');
            allPages.forEach(page => {
                page.style.display = 'none';
            });

            // Show selected page
            const selectedPage = document.getElementById(`page-${pageName}`);
            if (selectedPage) {
                selectedPage.style.display = 'block';
                currentPage = pageName;
                
                // Update active nav link
                const navLinks = document.querySelectorAll('.nav-links a');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                const activeLink = document.querySelector(`.nav-links a[data-page="${pageName}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }

                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });

                // Trigger animations for visible elements
                setTimeout(() => {
                    const visibleElements = selectedPage.querySelectorAll('.fade-in');
                    visibleElements.forEach(el => {
                        el.classList.add('visible');
                    });
                }, 100);
            }
        };

        // Navigation link click handlers
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const pageName = this.getAttribute('data-page');
                if (pageName) {
                    window.showPage(pageName);
                }
            });
        });

        // Mobile menu link click handlers
        const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const pageName = this.getAttribute('data-page');
                if (pageName) {
                    window.showPage(pageName);
                    closeMobileMenu();
                }
            });
        });

        // CTA button handlers
        const ctaButton1 = document.getElementById('cta-button-1');
        const ctaButton2 = document.getElementById('cta-button-2');
        const ctaButton3 = document.getElementById('cta-button-3');
        
        if (ctaButton1) {
            ctaButton1.addEventListener('click', function(e) {
                e.preventDefault();
                window.showPage('services');
            });
        }
        
        if (ctaButton2) {
            ctaButton2.addEventListener('click', function(e) {
                e.preventDefault();
                window.showPage('projects');
            });
        }
        
        if (ctaButton3) {
            ctaButton3.addEventListener('click', function(e) {
                e.preventDefault();
                window.showPage('contact');
            });
        }
    }

    // =================================================================
    // MOBILE MENU TOGGLE
    // =================================================================
    
    /**
     * Initialize mobile menu functionality
     */
    function initMobileMenu() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (!mobileMenuToggle || !mobileMenu) return;
        
        // Toggle menu open/close
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = mobileMenu.contains(event.target);
            const isClickOnToggle = mobileMenuToggle.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnToggle && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }
    
    /**
     * Close mobile menu
     */
    function closeMobileMenu() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
        if (mobileMenu) mobileMenu.classList.remove('active');
    }

    // =================================================================
    // SLIDER FUNCTIONALITY
    // =================================================================
    
    /**
     * Initialize all slider components
     * Handles capability sliders, gas turbine slider, project slider, and industries slider
     */
    function initSliders() {
        // --- Capability Sliders ---
        const capabilitySliders = document.querySelectorAll('.capability-slider');
        
        capabilitySliders.forEach(slider => {
            const container = slider.querySelector('.slider-container');
            const slides = slider.querySelectorAll('.slide-card');
            const prevBtn = slider.querySelector('.slider-prev');
            const nextBtn = slider.querySelector('.slider-next');
            
            if (!container || !slides.length || !prevBtn || !nextBtn) return;
            
            let currentSlide = 0;
            const slideWidth = 320;
            const visibleSlides = Math.floor(slider.offsetWidth / slideWidth);
            const maxSlide = Math.max(0, slides.length - visibleSlides);
            
            const updateSlider = () => {
                const translateX = -currentSlide * slideWidth;
                container.style.transform = `translateX(${translateX}px)`;
            };
            
            const nextSlide = () => {
                currentSlide = Math.min(currentSlide + 1, maxSlide);
                updateSlider();
            };
            
            const prevSlide = () => {
                currentSlide = Math.max(currentSlide - 1, 0);
                updateSlider();
            };
            
            nextBtn.addEventListener('click', nextSlide);
            prevBtn.addEventListener('click', prevSlide);
            
            // Auto-advance slides every 8 seconds
            setInterval(() => {
                if (currentSlide >= maxSlide) {
                    currentSlide = 0;
                } else {
                    currentSlide++;
                }
                updateSlider();
            }, 8000);
            
            // Touch/swipe support for mobile
            let startX = 0;
            let endX = 0;
            
            slider.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });
            
            slider.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                const diff = startX - endX;
                
                if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                        nextSlide();
                    } else {
                        prevSlide();
                    }
                }
            });
        });

        // --- Gas Turbine Slider ---
        const gasTurbineSlider = document.querySelector('.gas-turbine-slider');
        if (gasTurbineSlider) {
            const container = gasTurbineSlider.querySelector('.gas-turbine-container');
            const slides = gasTurbineSlider.querySelectorAll('.gas-turbine-slide');
            const prevBtn = gasTurbineSlider.querySelector('.gas-turbine-prev');
            const nextBtn = gasTurbineSlider.querySelector('.gas-turbine-next');
            
            if (container && slides.length && prevBtn && nextBtn) {
                let currentSlide = 0;
                const maxSlide = slides.length - 1;
                
                const updateGasTurbineSlider = () => {
                    const translateX = -currentSlide * 100;
                    container.style.transform = `translateX(${translateX}%)`;
                };
                
                const nextGasTurbineSlide = () => {
                    currentSlide = currentSlide >= maxSlide ? 0 : currentSlide + 1;
                    updateGasTurbineSlider();
                };
                
                const prevGasTurbineSlide = () => {
                    currentSlide = currentSlide <= 0 ? maxSlide : currentSlide - 1;
                    updateGasTurbineSlider();
                };
                
                nextBtn.addEventListener('click', nextGasTurbineSlide);
                prevBtn.addEventListener('click', prevGasTurbineSlide);
                
                // Auto-advance slides every 10 seconds
                setInterval(() => {
                    nextGasTurbineSlide();
                }, 10000);
                
                // Touch/swipe support for mobile
                let startX = 0;
                let endX = 0;
                
                gasTurbineSlider.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                });
                
                gasTurbineSlider.addEventListener('touchend', (e) => {
                    endX = e.changedTouches[0].clientX;
                    const diff = startX - endX;
                    
                    if (Math.abs(diff) > 50) {
                        if (diff > 0) {
                            nextGasTurbineSlide();
                        } else {
                            prevGasTurbineSlide();
                        }
                    }
                });
            }
        }

        // --- Project Slider ---
        const projectSliders = document.querySelectorAll('.project-slider');
        
        projectSliders.forEach(slider => {
            const container = slider.querySelector('.project-slider-container');
            const slides = slider.querySelectorAll('.project-slide-card');
            const prevBtn = slider.querySelector('.project-slider-prev');
            const nextBtn = slider.querySelector('.project-slider-next');
            
            if (!container || !slides.length || !prevBtn || !nextBtn) return;
            
            let currentSlide = 0;
            const maxSlide = slides.length - 1;
            
            const updateProjectSlider = () => {
                const translateX = -currentSlide * 100;
                container.style.transform = `translateX(${translateX}%)`;
            };
            
            const nextProjectSlide = () => {
                currentSlide = currentSlide >= maxSlide ? 0 : currentSlide + 1;
                updateProjectSlider();
            };
            
            const prevProjectSlide = () => {
                currentSlide = currentSlide <= 0 ? maxSlide : currentSlide - 1;
                updateProjectSlider();
            };
            
            nextBtn.addEventListener('click', nextProjectSlide);
            prevBtn.addEventListener('click', prevProjectSlide);
            
            // Auto-advance slides every 12 seconds
            setInterval(() => {
                nextProjectSlide();
            }, 12000);
            
            // Touch/swipe support for mobile
            let startX = 0;
            let endX = 0;
            
            slider.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });
            
            slider.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                const diff = startX - endX;
                
                if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                        nextProjectSlide();
                    } else {
                        prevProjectSlide();
                    }
                }
            });
        });

        // --- Industries Slider ---
        const industriesSlider = document.querySelector('.industries-slider');
        if (industriesSlider) {
            const container = industriesSlider.querySelector('.industries-slider-container');
            const slides = industriesSlider.querySelectorAll('.industry-slide-card');
            const prevBtn = industriesSlider.querySelector('.industries-slider-prev');
            const nextBtn = industriesSlider.querySelector('.industries-slider-next');
            
            if (container && slides.length && prevBtn && nextBtn) {
                let currentSlide = 0;
                const slideWidth = 370;
                const visibleSlides = Math.floor(industriesSlider.offsetWidth / slideWidth);
                const maxSlide = Math.max(0, slides.length - visibleSlides);
                
                const updateIndustriesSlider = () => {
                    const translateX = -currentSlide * slideWidth;
                    container.style.transform = `translateX(${translateX}px)`;
                };
                
                const nextIndustriesSlide = () => {
                    currentSlide = Math.min(currentSlide + 1, maxSlide);
                    updateIndustriesSlider();
                };
                
                const prevIndustriesSlide = () => {
                    currentSlide = Math.max(currentSlide - 1, 0);
                    updateIndustriesSlider();
                };
                
                nextBtn.addEventListener('click', nextIndustriesSlide);
                prevBtn.addEventListener('click', prevIndustriesSlide);
                
                // Auto-advance slides every 6 seconds
                setInterval(() => {
                    if (currentSlide >= maxSlide) {
                        currentSlide = 0;
                    } else {
                        currentSlide++;
                    }
                    updateIndustriesSlider();
                }, 6000);
                
                // Touch/swipe support for mobile
                let startX = 0;
                let endX = 0;
                
                industriesSlider.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                });
                
                industriesSlider.addEventListener('touchend', (e) => {
                    endX = e.changedTouches[0].clientX;
                    const diff = startX - endX;
                    
                    if (Math.abs(diff) > 50) {
                        if (diff > 0) {
                            nextIndustriesSlide();
                        } else {
                            prevIndustriesSlide();
                        }
                    }
                });
            }
        }
    }

    // =================================================================
    // SCROLL ANIMATIONS
    // =================================================================
    
    /**
     * Initialize fade-in animations using IntersectionObserver
     */
    function initAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        const fadeInElements = document.querySelectorAll('.fade-in');
        fadeInElements.forEach(el => {
            observer.observe(el);
        });
    }

    // =================================================================
    // FORM HANDLING
    // =================================================================
    
    /**
     * Initialize contact form submission with success message
     */
    function initFormHandling() {
        const enquiryForm = document.getElementById('enquiry-form');
        
        if (!enquiryForm) return;
        
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name')?.value,
                email: document.getElementById('email')?.value,
                company: document.getElementById('company')?.value,
                message: document.getElementById('message')?.value
            };

            // Create success message
            const successMessage = document.createElement('div');
            successMessage.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #2E005C, #4B1D8C);
                color: white;
                padding: 2rem 3rem;
                border-radius: 12px;
                box-shadow: 0 20px 60px rgba(46, 0, 92, 0.4);
                z-index: 10000;
                text-align: center;
                font-family: 'Montserrat', sans-serif;
            `;
            successMessage.innerHTML = `
                <div style="font-size: 3rem; margin-bottom: 1rem;">✓</div>
                <h3 style="margin-bottom: 0.5rem; font-size: 1.5rem;">Thank You!</h3>
                <p style="opacity: 0.9;">Your enquiry has been received. We'll contact you shortly.</p>
            `;
            document.body.appendChild(successMessage);

            // Reset form
            this.reset();

            // Remove message after 3 seconds
            setTimeout(() => {
                successMessage.style.opacity = '0';
                successMessage.style.transition = 'opacity 0.3s ease';
                setTimeout(() => successMessage.remove(), 300);
            }, 3000);
        });
    }

    // =================================================================
    // SCROLL EFFECTS
    // =================================================================
    
    /**
     * Initialize navbar scroll effects
     */
    function initScrollEffects() {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('nav');
            if (!nav) return;
            
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                nav.style.boxShadow = '0 2px 30px rgba(46, 0, 92, 0.15)';
            } else {
                nav.style.boxShadow = '0 2px 20px rgba(46, 0, 92, 0.08)';
            }
            
            lastScroll = currentScroll;
        });
    }

    // =================================================================
    // INITIALIZATION
    // =================================================================
    
    /**
     * Initialize all components when DOM is ready
     */
    function init() {
        initNavigation();
        initMobileMenu();
        initSliders();
        initAnimations();
        initFormHandling();
        initScrollEffects();
    }

    // Run initialization when DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
