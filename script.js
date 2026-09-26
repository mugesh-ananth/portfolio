// Particle effect for hero section
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 6 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Typing effect for hero section
const text = "Web & Full Stack Developer";
const typingText = document.getElementById('typing-text');
let index = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeWriter() {
    const currentText = text.substring(0, index);
    typingText.innerHTML = currentText + '<span class="typing"></span>';

    if (!isDeleting) {
        index++;
        if (index > text.length) {
            isDeleting = true;
            typingSpeed = 50;
            setTimeout(typeWriter, 1000);
            return;
        }
    } else {
        index--;
        if (index < 0) {
            isDeleting = false;
            typingSpeed = 100;
            setTimeout(typeWriter, 500);
            return;
        }
    }

    setTimeout(typeWriter, typingSpeed);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Prevent multiple rapid clicks
            if (this.classList.contains('scrolling')) return;
            this.classList.add('scrolling');

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Remove the scrolling class after animation completes
            setTimeout(() => {
                this.classList.remove('scrolling');
            }, 1000);
        }
    });
});

// Smooth scroll for scroll-down arrow
document.querySelector('.scroll-down')?.addEventListener('click', () => {
    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    });
});

// Intersection Observer for about section animations
const aboutObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, aboutObserverOptions);

// Observe about section animated elements
document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
    aboutObserver.observe(el);
});

// Intersection Observer for scroll animations
const scrollObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, scrollObserverOptions);

// Observe elements for scroll animations
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    scrollObserver.observe(el);
});

// Animated counters for skills
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target + '%';
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + '%';
            }
        }, 16);
    });
}

// Trigger counter animation when skills section is visible
const skillsSection = document.getElementById('skills');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax-element');

    parallaxElements.forEach(element => {
        const rate = element.getAttribute('data-rate') || 0.5;
        element.style.transform = `translateY(${scrolled * rate}px)`;
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.classList.add('scrolled');
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.8)';
        navbar.style.backdropFilter = 'none';
        navbar.classList.remove('scrolled');
    }
});

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const scrollPosition = window.scrollY + 100; // Offset for navbar height

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Update active nav link on scroll
window.addEventListener('scroll', updateActiveNavLink);

// Update active nav link on page load
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNavLink();
    createParticles();
    typeWriter();
});

// Scroll-to-top button functionality
function createScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollButton);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });

    // Scroll to top when clicked
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll-to-top button
document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Alt + number keys for quick navigation
    if (e.altKey && !e.ctrlKey && !e.shiftKey) {
        const sections = ['home', 'about', 'skills', 'projects', 'certifications', 'contact'];
        const key = parseInt(e.key);
        if (key >= 1 && key <= sections.length) {
            e.preventDefault();
            const targetSection = document.getElementById(sections[key - 1]);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    }

    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                hide: true
            });
        }
    }
});

// Enhanced mobile navigation
document.addEventListener('DOMContentLoaded', () => {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) { // Bootstrap lg breakpoint
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    hide: true
                });
            }
        });
    });

    // Add focus trap for mobile menu
    navbarToggler.addEventListener('click', () => {
        setTimeout(() => {
            if (navbarCollapse.classList.contains('show')) {
                const firstLink = navbarCollapse.querySelector('.nav-link');
                if (firstLink) {
                    firstLink.focus();
                    // Add keyboard navigation within menu
                    setupMobileMenuKeyboardNav(navbarCollapse);
                }
            }
        }, 300); // Wait for collapse animation
    });

    function setupMobileMenuKeyboardNav(menu) {
        const links = menu.querySelectorAll('.nav-link');
        const lastLink = links[links.length - 1];

        menu.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    // Shift+Tab on first link should go to toggler
                    if (document.activeElement === links[0]) {
                        e.preventDefault();
                        navbarToggler.focus();
                    }
                } else {
                    // Tab on last link should close menu and focus on next element
                    if (document.activeElement === lastLink) {
                        e.preventDefault();
                        navbarToggler.click(); // Close menu
                        // Focus will move to next element naturally
                    }
                }
            }
        });
    }
});

// Scroll progress indicator
function createScrollProgressIndicator() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress indicator
document.addEventListener('DOMContentLoaded', createScrollProgressIndicator);

// Mobile-specific enhancements
function initializeMobileEnhancements() {
    // Detect if device is mobile
    const isMobile = window.innerWidth <= 991;

    if (isMobile) {
        // Add touch-friendly interactions
        document.querySelectorAll('.skill-card, .project-card, .certification-card').forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });

            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });

        // Improve form interactions on mobile
        document.querySelectorAll('.form-control').forEach(input => {
            input.addEventListener('focus', function() {
                // Smooth scroll to keep input in view
                setTimeout(() => {
                    this.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 300);
            });
        });

        // Add swipe gesture for project cards (optional enhancement)
        let touchStartX = 0;
        let touchEndX = 0;

        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            });

            card.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe(this, touchStartX, touchEndX);
            });
        });

        function handleSwipe(element, startX, endX) {
            const swipeThreshold = 50;
            const diff = startX - endX;

            if (Math.abs(diff) > swipeThreshold) {
                // Add subtle feedback for swipe gestures
                element.style.transform = diff > 0 ? 'translateX(-10px)' : 'translateX(10px)';
                setTimeout(() => {
                    element.style.transform = '';
                }, 200);
            }
        }

        // Optimize animations for mobile performance
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '50px 0px'
        };

        const mobileObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Use requestAnimationFrame for smoother animations on mobile
                    requestAnimationFrame(() => {
                        entry.target.classList.add('animate');
                    });
                }
            });
        }, observerOptions);

        // Observe elements for mobile-optimized animations
        document.querySelectorAll('.skill-card, .project-card, .certification-card').forEach(card => {
            mobileObserver.observe(card);
        });

        // Add viewport height fix for mobile browsers
        function setVH() {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        setVH();
        window.addEventListener('resize', setVH);
        window.addEventListener('orientationchange', () => {
            setTimeout(setVH, 100);
        });
    }
}

// Initialize mobile enhancements
document.addEventListener('DOMContentLoaded', initializeMobileEnhancements);

// Performance optimizations for mobile
function optimizeMobilePerformance() {
    // Reduce motion for users who prefer it
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        // Disable complex animations
        document.documentElement.style.setProperty('--animation-duration', '0s');
        document.querySelectorAll('.animate__animated, .floating-element, .particle').forEach(el => {
            el.style.animation = 'none';
        });
    }

    // Lazy load images on mobile
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        // Add lazy loading to images
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add passive event listeners for better scroll performance
    document.addEventListener('touchstart', () => {}, { passive: true });
    document.addEventListener('touchmove', () => {}, { passive: true });

    // Optimize particle effects on low-end devices
    const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
    if (isLowEndDevice && window.innerWidth <= 768) {
        // Reduce particle count on low-end devices
        const particlesContainer = document.getElementById('particles');
        if (particlesContainer) {
            particlesContainer.style.display = 'none';
        }
    }
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizeMobilePerformance);

// Progress bars animation for skills section
const progressObserverOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const width = progressBar.getAttribute('data-width');
            progressBar.style.width = width + '%';
        }
    });
}, progressObserverOptions);

// Observe all progress bars
document.querySelectorAll('.progress-bar').forEach(bar => {
    progressObserver.observe(bar);
});

// Skills card hover animations
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02) rotateY(5deg)';
        card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
        card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    });
});

// Projects card hover animations
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02) rotateX(5deg)';
        card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
        card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    });
});

// Tech stack tag hover animations
document.querySelectorAll('.tech-stack span').forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        tag.style.background = '#007bff';
        tag.style.color = 'white';
        tag.style.transform = 'scale(1.1) rotate(2deg)';
        tag.style.boxShadow = '0 5px 15px rgba(0,123,255,0.3)';
    });
    tag.addEventListener('mouseleave', () => {
        tag.style.background = '#e9ecef';
        tag.style.color = 'black';
        tag.style.transform = 'scale(1) rotate(0deg)';
        tag.style.boxShadow = 'none';
    });
});

// Form field focus animations
document.querySelectorAll('.form-control').forEach(field => {
    field.addEventListener('focus', () => {
        field.style.transform = 'scale(1.02) translateY(-2px)';
        field.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.2)';
    });
    field.addEventListener('blur', () => {
        field.style.transform = 'scale(1) translateY(0)';
        field.style.boxShadow = 'none';
    });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const message = document.getElementById('message');
    const successAlert = document.getElementById('successAlert');
    const errorAlert = document.getElementById('errorAlert');
    const submitBtn = document.querySelector('.btn-submit');

    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    }

    if (!contactForm.checkValidity()) {
        if (errorAlert) {
            errorAlert.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Please fill in all required fields correctly before sending.';
            errorAlert.style.display = 'block';
            errorAlert.style.animation = 'slideInDown 0.5s ease';
        }
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Send Message';
        }
        contactForm.classList.add('was-validated');
        return;
    }

    const templateParams = {
        subject: 'You have a message from your portfolio',
        from_name: name ? name.value : '',
        reply_to: email ? email.value : '',
        phone: phone ? phone.value : '',
        message: message ? message.value : ''
    };

    const serviceId = 'service_tknzrsg';
    const templateId = 'template_j6wxrfi';

    if (window.emailjs) {
        emailjs.send(serviceId, templateId, templateParams)
            .then(function(response) {
                if (successAlert) {
                    successAlert.innerHTML = '<i class="fas fa-check-circle"></i> Your message has been sent successfully.';
                    successAlert.style.display = 'block';
                    successAlert.style.animation = 'slideInDown 0.5s ease';
                }
                contactForm.reset();
                contactForm.classList.remove('was-validated');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Send Message';
                }
            }, function(error) {
                if (errorAlert) {
                    errorAlert.innerHTML = '<i class="fas fa-exclamation-triangle"></i> There was an error sending your message. Please try again later.';
                    errorAlert.style.display = 'block';
                    errorAlert.style.animation = 'slideInDown 0.5s ease';
                }
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Send Message';
                }
                console.error('EmailJS error:', error);
            });
    } else {
        if (errorAlert) {
            errorAlert.innerHTML = '<i class="fas fa-exclamation-triangle"></i> EmailJS is not loaded. Please check your integration.';
            errorAlert.style.display = 'block';
            errorAlert.style.animation = 'slideInDown 0.5s ease';
        }
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Send Message';
        }
    }
});

// Navbar active link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// Update active nav link on scroll
window.addEventListener('scroll', updateActiveNavLink);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create particles
    createParticles();

    // Start typing effect
    setTimeout(typeWriter, 1000);

    // Update active nav link initially
    updateActiveNavLink();

    // Add animate-on-scroll class to elements
    document.querySelectorAll('.skill-card, .project-card, .about-content').forEach(el => {
        el.classList.add('animate-on-scroll');
    });
});
