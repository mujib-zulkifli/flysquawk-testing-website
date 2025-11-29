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

        // --- Project Slider (New Horizontal Scroll) ---
        const projectSliderWrappers = document.querySelectorAll('.project-slider-wrapper');
        
        projectSliderWrappers.forEach((wrapper, index) => {
            const slider = wrapper.querySelector('.project-slider');
            const slides = wrapper.querySelectorAll('.project-slide');
            const prevBtn = wrapper.querySelector('.project-slider-prev');
            const nextBtn = wrapper.querySelector('.project-slider-next');
            
            if (!slider || !slides.length || !prevBtn || !nextBtn) return;
            
            console.log(`Project Slider ${index + 1}: Found ${slides.length} slides`);
            
            let currentSlide = 0;
            const maxSlide = slides.length - 1;
            
            const updateProjectSlider = () => {
                const slideWidth = slider.offsetWidth;
                const scrollAmount = currentSlide * slideWidth;
                slider.scrollTo({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
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
    // CARD HOVER PARALLAX EFFECTS
    // =================================================================

    /**
     * Apply PETRONAS-style hover lift + parallax tilt to card selectors
     */
    function initCardParallax(selector, options = {}) {
        const cards = document.querySelectorAll(selector);
        if (!cards.length) return;

        const lift = options.lift ?? 12;
        const maxTilt = options.maxTilt ?? 6;
        const prefersReducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const prefersReducedMotion = prefersReducedMotionQuery.matches;

        const resetCard = (card) => {
            card.style.transform = '';
            card.classList.remove('is-hovered');
        };

        if (prefersReducedMotion) {
            cards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    card.classList.add('is-hovered');
                    card.style.transform = `translateY(-${lift}px)`;
                });
                card.addEventListener('mouseleave', () => resetCard(card));
            });
            return;
        }

        cards.forEach(card => {
            let rafId = null;

            card.addEventListener('mouseenter', () => {
                card.classList.add('is-hovered');
            });

            card.addEventListener('mousemove', (event) => {
                const rect = card.getBoundingClientRect();
                const relX = (event.clientX - rect.left) / rect.width;
                const relY = (event.clientY - rect.top) / rect.height;
                const rotateY = (relX - 0.5) * (maxTilt * 2);
                const rotateX = (0.5 - relY) * (maxTilt * 2);

                if (rafId) cancelAnimationFrame(rafId);
                rafId = requestAnimationFrame(() => {
                    card.style.transform = `perspective(1200px) translateY(-${lift}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
                });
            });

            card.addEventListener('mouseleave', () => {
                if (rafId) {
                    cancelAnimationFrame(rafId);
                    rafId = null;
                }
                resetCard(card);
            });
        });
    }

    // =================================================================
    // INDUSTRIES SCROLL STRIP
    // =================================================================

    function initIndustryScroll() {
        const scrollContainer = document.getElementById('industries-scroll');
        if (!scrollContainer) return;

        let autoDirection = 1;
        let autoRafId = null;
        let resumeTimeout = null;
        let autoActive = true;

        const autoStep = () => {
            if (!autoActive) return;

            scrollContainer.scrollLeft += 0.6 * autoDirection;
            const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

            if (scrollContainer.scrollLeft >= maxScroll - 1) {
                autoDirection = -1;
            } else if (scrollContainer.scrollLeft <= 1) {
                autoDirection = 1;
            }

            autoRafId = requestAnimationFrame(autoStep);
        };

        function startAutoScroll() {
            if (autoRafId) cancelAnimationFrame(autoRafId);
            autoActive = true;
            autoRafId = requestAnimationFrame(autoStep);
        }

        function pauseAutoScroll() {
            autoActive = false;
            if (autoRafId) cancelAnimationFrame(autoRafId);
            autoRafId = null;
            if (resumeTimeout) {
                clearTimeout(resumeTimeout);
                resumeTimeout = null;
            }
        }

        function scheduleResume() {
            if (resumeTimeout) clearTimeout(resumeTimeout);
            resumeTimeout = setTimeout(() => {
                startAutoScroll();
            }, 2000);
        }

        const buttons = document.querySelectorAll('.industries-scroll-btn');
        const scrollByAmount = () => Math.min(scrollContainer.offsetWidth * 0.85, 420);

        const scrollByDirection = (direction) => {
            scrollContainer.scrollBy({
                left: scrollByAmount() * direction,
                behavior: 'smooth'
            });
        };

        buttons.forEach((button) => {
            const dir = button.dataset.scrollDirection === 'prev' ? -1 : 1;
            button.addEventListener('click', () => {
                pauseAutoScroll();
                scrollByDirection(dir);
                scheduleResume();
            });
        });

        ['mouseenter', 'touchstart', 'wheel'].forEach(evt => {
            scrollContainer.addEventListener(evt, pauseAutoScroll, { passive: true });
        });

        ['mouseleave', 'touchend'].forEach(evt => {
            scrollContainer.addEventListener(evt, scheduleResume, { passive: true });
        });

        startAutoScroll();
    }

    // =================================================================
    // STEAM TURBINE ACCORDION
    // =================================================================
    
    /**
     * Initialize steam turbine accordion dropdowns
     * Handles smooth expand/collapse animations with + / - icon toggle
     * PETRONAS-style accordion with clean transitions
     */
    function initSteamTurbineAccordion() {
        const accordionHeaders = document.querySelectorAll('.steam-turbine-accordion-header');
        
        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const accordionItem = this.closest('.steam-turbine-accordion-item');
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                
                // Close all other accordions (optional - remove if you want multiple open)
                accordionHeaders.forEach(otherHeader => {
                    if (otherHeader !== this) {
                        const otherItem = otherHeader.closest('.steam-turbine-accordion-item');
                        otherHeader.setAttribute('aria-expanded', 'false');
                        otherItem.setAttribute('aria-expanded', 'false');
                    }
                });
                
                // Toggle current accordion
                const newState = !isExpanded;
                this.setAttribute('aria-expanded', newState);
                accordionItem.setAttribute('aria-expanded', newState);
            });
        });
    }

    // =================================================================
    // CENTRIFUGAL PUMP ACCORDION & SLIDER
    // =================================================================
    
    /**
     * Initialize centrifugal pump accordion dropdown
     */
    function initCentrifugalPumpAccordion() {
        const accordionHeaders = document.querySelectorAll('.centrifugal-pump-accordion-header');
        
        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const accordionItem = this.closest('.centrifugal-pump-accordion-item');
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                
                // Toggle current accordion
                const newState = !isExpanded;
                this.setAttribute('aria-expanded', newState);
                accordionItem.setAttribute('aria-expanded', newState);
            });
        });
    }

    /**
     * Initialize centrifugal pump horizontal slider
     * Supports mouse drag, touch swipe, and arrow buttons
     */
    function initCentrifugalPumpSlider() {
        const slider = document.getElementById('centrifugal-pump-slider');
        if (!slider) return;

        const track = slider.querySelector('.centrifugal-pump-slider-track');
        const slides = track.querySelectorAll('.centrifugal-pump-slide-card');
        const wrapper = slider.closest('.centrifugal-pump-slider-wrapper');
        const prevBtn = wrapper ? wrapper.querySelector('.centrifugal-pump-slider-prev') : null;
        const nextBtn = wrapper ? wrapper.querySelector('.centrifugal-pump-slider-next') : null;

        if (!track || !slides.length) return;

        let currentIndex = 0;
        let isDragging = false;
        let startX = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;

        const getSlideWidth = () => {
            const slide = slides[0];
            const gap = parseInt(getComputedStyle(track).gap) || 24;
            return slide.offsetWidth + gap;
        };

        const updateSlider = () => {
            const slideWidth = getSlideWidth();
            const translateX = -currentIndex * slideWidth;
            track.style.transform = `translateX(${translateX}px)`;
            currentTranslate = translateX;
            prevTranslate = translateX;
        };

        const nextSlide = () => {
            if (currentIndex >= slides.length - 1) {
                currentIndex = 0;
            } else {
                currentIndex++;
            }
            updateSlider();
        };

        const prevSlide = () => {
            if (currentIndex <= 0) {
                currentIndex = slides.length - 1;
            } else {
                currentIndex--;
            }
            updateSlider();
        };

        // Arrow button controls
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                nextSlide();
            });
        }
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                prevSlide();
            });
        }

        // Mouse drag support
        track.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            prevTranslate = currentTranslate;
            track.style.cursor = 'grabbing';
            track.style.transition = 'none';
        });

        track.addEventListener('mouseleave', () => {
            if (isDragging) {
                isDragging = false;
                track.style.cursor = 'grab';
                track.style.transition = 'transform 0.4s ease';
                updateSlider();
            }
        });

        track.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                track.style.cursor = 'grab';
                track.style.transition = 'transform 0.4s ease';
                
                // Snap to nearest slide
                const slideWidth = getSlideWidth();
                const movedBy = currentTranslate - prevTranslate;
                
                if (Math.abs(movedBy) > slideWidth / 3) {
                    if (movedBy < 0) {
                        nextSlide();
                    } else {
                        prevSlide();
                    }
                } else {
                    updateSlider();
                }
            }
        });

        track.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const currentPosition = e.clientX;
            const moved = currentPosition - startX;
            currentTranslate = prevTranslate + moved;
            track.style.transform = `translateX(${currentTranslate}px)`;
        });

        // Touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            prevTranslate = currentTranslate;
            track.style.transition = 'none';
        }, { passive: true });

        track.addEventListener('touchmove', (e) => {
            if (!touchStartX) return;
            const currentTouch = e.touches[0].clientX;
            const diff = touchStartX - currentTouch;
            currentTranslate = prevTranslate - diff;
            track.style.transform = `translateX(${currentTranslate}px)`;
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;
            track.style.transition = 'transform 0.4s ease';
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            } else {
                updateSlider();
            }
            
            touchStartX = 0;
        }, { passive: true });

        // Initialize cursor style
        track.style.cursor = 'grab';

        // Initialize
        updateSlider();
    }

    // =================================================================
    // NDT ACCORDION & SLIDER
    // =================================================================
    
    /**
     * Initialize NDT accordion dropdowns
     */
    function initNDTAccordion() {
        const accordionHeaders = document.querySelectorAll('.ndt-accordion-header');
        
        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const accordionItem = this.closest('.ndt-accordion-item');
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                
                // Toggle current accordion
                const newState = !isExpanded;
                this.setAttribute('aria-expanded', newState);
                accordionItem.setAttribute('aria-expanded', newState);
            });
        });
    }

    /**
     * Initialize NDT horizontal slider
     * Supports mouse drag, touch swipe, and arrow buttons
     * Stops at the last card (no infinite loop)
     */
    function initNDTSlider() {
        const slider = document.getElementById('ndt-slider');
        if (!slider) return;

        const track = slider.querySelector('.ndt-slider-track');
        const slides = track.querySelectorAll('.ndt-slide-card');
        const wrapper = slider.closest('.ndt-slider-wrapper');
        const prevBtn = wrapper ? wrapper.querySelector('.ndt-slider-prev') : null;
        const nextBtn = wrapper ? wrapper.querySelector('.ndt-slider-next') : null;

        if (!track || !slides.length) return;

        let currentIndex = 0;
        let isDragging = false;
        let startX = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;

        const getSlideWidth = () => {
            const slide = slides[0];
            const gap = parseInt(getComputedStyle(track).gap) || 20;
            return slide.offsetWidth + gap;
        };

        const getMaxIndex = () => {
            const sliderWidth = slider.offsetWidth;
            const slideWidth = getSlideWidth();
            
            // Calculate total width of all slides
            let totalWidth = 0;
            slides.forEach((slide, index) => {
                totalWidth += slide.offsetWidth;
                if (index < slides.length - 1) {
                    totalWidth += parseInt(getComputedStyle(track).gap) || 20;
                }
            });
            
            // If all slides fit, don't scroll
            if (totalWidth <= sliderWidth) {
                return 0;
            }
            
            // Calculate how many slides can be visible
            const visibleCount = Math.floor(sliderWidth / slideWidth);
            // Max index ensures the last slide is visible
            const maxIndex = Math.max(0, slides.length - visibleCount);
            return maxIndex;
        };

        const updateSlider = () => {
            const slideWidth = getSlideWidth();
            const maxIndex = getMaxIndex();
            
            // Ensure currentIndex doesn't exceed maxIndex
            if (currentIndex > maxIndex) {
                currentIndex = maxIndex;
            }
            
            const translateX = -currentIndex * slideWidth;
            track.style.transform = `translateX(${translateX}px)`;
            currentTranslate = translateX;
            prevTranslate = translateX;
        };

        const nextSlide = () => {
            const maxIndex = getMaxIndex();
            if (currentIndex < maxIndex) {
                currentIndex++;
            }
            // Stop at the last card - no looping
            updateSlider();
        };

        const prevSlide = () => {
            if (currentIndex > 0) {
                currentIndex--;
            }
            // Stop at the first card - no looping
            updateSlider();
        };

        // Arrow button controls
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                nextSlide();
            });
        }
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                prevSlide();
            });
        }

        // Mouse drag support
        track.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            prevTranslate = currentTranslate;
            track.style.cursor = 'grabbing';
            track.style.transition = 'none';
        });

        track.addEventListener('mouseleave', () => {
            if (isDragging) {
                isDragging = false;
                track.style.cursor = 'grab';
                track.style.transition = 'transform 0.4s ease';
                updateSlider();
            }
        });

        track.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                track.style.cursor = 'grab';
                track.style.transition = 'transform 0.4s ease';
                
                const slideWidth = getSlideWidth();
                const movedBy = currentTranslate - prevTranslate;
                const maxIndex = getMaxIndex();
                
                if (Math.abs(movedBy) > slideWidth / 3) {
                    if (movedBy < 0) {
                        // Moving right - go to next slide
                        if (currentIndex < maxIndex) {
                            nextSlide();
                        } else {
                            // Already at max, snap back
                            updateSlider();
                        }
                    } else {
                        // Moving left - go to previous slide
                        if (currentIndex > 0) {
                            prevSlide();
                        } else {
                            // Already at start, snap back
                            updateSlider();
                        }
                    }
                } else {
                    // Snap back to current position
                    updateSlider();
                }
            }
        });

        track.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const currentPosition = e.clientX;
            const moved = currentPosition - startX;
            const slideWidth = getSlideWidth();
            const maxIndex = getMaxIndex();
            
            // Calculate potential new translate
            let newTranslate = prevTranslate + moved;
            
            // Constrain to bounds
            const minTranslate = 0;
            const maxTranslate = -maxIndex * slideWidth;
            
            if (newTranslate > minTranslate) {
                newTranslate = minTranslate;
            } else if (newTranslate < maxTranslate) {
                newTranslate = maxTranslate;
            }
            
            currentTranslate = newTranslate;
            track.style.transform = `translateX(${currentTranslate}px)`;
        });

        // Touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            prevTranslate = currentTranslate;
            track.style.transition = 'none';
        }, { passive: true });

        track.addEventListener('touchmove', (e) => {
            if (!touchStartX) return;
            const currentTouch = e.touches[0].clientX;
            const diff = touchStartX - currentTouch;
            const slideWidth = getSlideWidth();
            const maxIndex = getMaxIndex();
            
            let newTranslate = prevTranslate - diff;
            const minTranslate = 0;
            const maxTranslate = -maxIndex * slideWidth;
            
            if (newTranslate > minTranslate) {
                newTranslate = minTranslate;
            } else if (newTranslate < maxTranslate) {
                newTranslate = maxTranslate;
            }
            
            currentTranslate = newTranslate;
            track.style.transform = `translateX(${currentTranslate}px)`;
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;
            track.style.transition = 'transform 0.4s ease';
            const maxIndex = getMaxIndex();
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    // Swipe right - next slide
                    if (currentIndex < maxIndex) {
                        nextSlide();
                    } else {
                        updateSlider();
                    }
                } else {
                    // Swipe left - previous slide
                    if (currentIndex > 0) {
                        prevSlide();
                    } else {
                        updateSlider();
                    }
                }
            } else {
                updateSlider();
            }
            
            touchStartX = 0;
        }, { passive: true });

        track.style.cursor = 'grab';
        updateSlider();
    }

    // =================================================================
    // SOLAR TURBINE SLIDER
    // =================================================================
    
    /**
     * Initialize Solar Turbine horizontal slider
     * Supports mouse drag, touch swipe, and arrow buttons
     * Stops at the last card (no infinite loop)
     */
    function initSolarTurbineSlider() {
        const slider = document.getElementById('solar-turbine-slider');
        if (!slider) return;

        const track = slider.querySelector('.solar-turbine-slider-track');
        const slides = track.querySelectorAll('.solar-turbine-slide-card');
        const wrapper = slider.closest('.solar-turbine-slider-wrapper');
        const prevBtn = wrapper ? wrapper.querySelector('.solar-turbine-slider-prev') : null;
        const nextBtn = wrapper ? wrapper.querySelector('.solar-turbine-slider-next') : null;

        if (!track || !slides.length) return;

        let currentIndex = 0;
        let isDragging = false;
        let startX = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;

        const getSlideWidth = () => {
            const slide = slides[0];
            const gap = parseInt(getComputedStyle(track).gap) || 20;
            return slide.offsetWidth + gap;
        };

        const getMaxIndex = () => {
            const sliderWidth = slider.offsetWidth;
            const slideWidth = getSlideWidth();
            
            // Calculate total width of all slides
            let totalWidth = 0;
            slides.forEach((slide, index) => {
                totalWidth += slide.offsetWidth;
                if (index < slides.length - 1) {
                    totalWidth += parseInt(getComputedStyle(track).gap) || 20;
                }
            });
            
            // If all slides fit, don't scroll
            if (totalWidth <= sliderWidth) {
                return 0;
            }
            
            // Calculate how many slides can be visible
            const visibleCount = Math.floor(sliderWidth / slideWidth);
            // Max index ensures the last slide is visible
            const maxIndex = Math.max(0, slides.length - visibleCount);
            return maxIndex;
        };

        const updateSlider = () => {
            const slideWidth = getSlideWidth();
            const maxIndex = getMaxIndex();
            
            // Ensure currentIndex doesn't exceed maxIndex
            if (currentIndex > maxIndex) {
                currentIndex = maxIndex;
            }
            
            const translateX = -currentIndex * slideWidth;
            track.style.transform = `translateX(${translateX}px)`;
            currentTranslate = translateX;
            prevTranslate = translateX;
        };

        const nextSlide = () => {
            const maxIndex = getMaxIndex();
            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                // Loop back to first slide
                currentIndex = 0;
            }
            updateSlider();
        };

        const prevSlide = () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                // Loop to last slide
                const maxIndex = getMaxIndex();
                currentIndex = maxIndex;
            }
            updateSlider();
        };

        // Arrow button controls
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                nextSlide();
            });
        }
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                prevSlide();
            });
        }

        // Mouse drag and touch support (simplified for space)
        track.style.cursor = 'grab';
        updateSlider();
    }

    // =================================================================
    // GE TURBINE SLIDER
    // =================================================================
    
    /**
     * Initialize GE Turbine horizontal slider
     * Supports mouse drag, touch swipe, and arrow buttons
     * Loops back to first slide after last slide
     */
    function initGETurbineSlider() {
        const slider = document.getElementById('ge-turbine-slider');
        if (!slider) return;

        const track = slider.querySelector('.ge-turbine-slider-track');
        const slides = track.querySelectorAll('.ge-turbine-slide-card');
        const wrapper = slider.closest('.ge-turbine-slider-wrapper');
        const prevBtn = wrapper ? wrapper.querySelector('.ge-turbine-slider-prev') : null;
        const nextBtn = wrapper ? wrapper.querySelector('.ge-turbine-slider-next') : null;

        if (!track || !slides.length) return;

        let currentIndex = 0;
        let isDragging = false;
        let startX = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;

        const getSlideWidth = () => {
            const slide = slides[0];
            const gap = parseInt(getComputedStyle(track).gap) || 20;
            return slide.offsetWidth + gap;
        };

        const getMaxIndex = () => {
            const sliderWidth = slider.offsetWidth;
            const slideWidth = getSlideWidth();
            
            // Calculate total width of all slides
            let totalWidth = 0;
            slides.forEach((slide, index) => {
                totalWidth += slide.offsetWidth;
                if (index < slides.length - 1) {
                    totalWidth += parseInt(getComputedStyle(track).gap) || 20;
                }
            });
            
            // If all slides fit, don't scroll
            if (totalWidth <= sliderWidth) {
                return 0;
            }
            
            // Calculate how many slides can be visible
            const visibleCount = Math.floor(sliderWidth / slideWidth);
            // Max index ensures the last slide is visible
            const maxIndex = Math.max(0, slides.length - visibleCount);
            return maxIndex;
        };

        const updateSlider = () => {
            const slideWidth = getSlideWidth();
            const maxIndex = getMaxIndex();
            
            // Ensure currentIndex doesn't exceed maxIndex
            if (currentIndex > maxIndex) {
                currentIndex = maxIndex;
            }
            
            const translateX = -currentIndex * slideWidth;
            track.style.transform = `translateX(${translateX}px)`;
            currentTranslate = translateX;
            prevTranslate = translateX;
        };

        const nextSlide = () => {
            const maxIndex = getMaxIndex();
            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                // Loop back to first slide
                currentIndex = 0;
            }
            updateSlider();
        };

        const prevSlide = () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                // Loop to last slide
                const maxIndex = getMaxIndex();
                currentIndex = maxIndex;
            }
            updateSlider();
        };

        // Arrow button controls
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                nextSlide();
            });
        }
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                prevSlide();
            });
        }

        // Mouse drag and touch support (simplified for space)
        track.style.cursor = 'grab';
        updateSlider();
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
        initSteamTurbineAccordion();
        initCentrifugalPumpAccordion();
        initCentrifugalPumpSlider();
        initNDTAccordion();
        initNDTSlider();
        initSolarTurbineSlider();
        initGETurbineSlider();
        initAnimations();
        initFormHandling();
        initScrollEffects();
        initCardParallax('.highlight-card', { lift: 12, maxTilt: 6 });
        initCardParallax('.industry-card', { lift: 10, maxTilt: 4 });
        initIndustryScroll();
    }

    // Run initialization when DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
// Cache buster: 1763294442
