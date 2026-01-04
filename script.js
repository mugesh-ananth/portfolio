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
const text = "Web Developer";
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
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
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
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.8)';
        navbar.style.backdropFilter = 'none';
    }
});

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

// Contact form validation and submission
document.getElementById('contactForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const message = document.getElementById('message');
    const successAlert = document.getElementById('successAlert');
    const errorAlert = document.getElementById('errorAlert');
    const submitBtn = document.querySelector('.btn-submit');

    // Reset alerts
    if (successAlert) successAlert.style.display = 'none';
    if (errorAlert) errorAlert.style.display = 'none';

    // Remove previous validation classes
    [name, email, phone, message].forEach(field => {
        if (field) field.classList.remove('is-invalid', 'is-valid');
    });

    let isValid = true;

    // Validate name
    if (!name || name.value.trim() === '') {
        name && name.classList.add('is-invalid');
        isValid = false;
    } else {
        name.classList.add('is-valid');
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.value.trim())) {
        email && email.classList.add('is-invalid');
        isValid = false;
    } else {
        email.classList.add('is-valid');
    }

    // Validate phone (simple numeric/length check)
    const phoneVal = phone ? phone.value.trim() : '';
    const phoneDigits = phoneVal.replace(/\D/g, '');
    if (!phone || phoneDigits.length < 7) {
        phone && phone.classList.add('is-invalid');
        isValid = false;
    } else {
        phone.classList.add('is-valid');
    }

    // Validate message
    if (!message || message.value.trim() === '') {
        message && message.classList.add('is-invalid');
        isValid = false;
    } else {
        message.classList.add('is-valid');
    }

    if (isValid) {
        // Disable submit button and show loading state
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        }

        // Prepare email parameters
        const templateParams = {
            from_name: name.value,
            from_email: email.value,
            phone: phone.value,
            message: message.value,
            to_email: 'amugeshananth@gmail.com'
        };

        // Send email using EmailJS
        emailjs.send('service_txzexdh', 'template_gcewj0a', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                if (successAlert) {
                    successAlert.style.display = 'block';
                    successAlert.style.animation = 'slideInDown 0.5s ease';
                }

                // Reset form
                document.getElementById('contactForm').reset();
                [name, email, phone, message].forEach(field => {
                    field && field.classList.remove('is-valid');
                });

                // Re-enable submit button
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Send Message';
                }
            })
            .catch(function(error) {
                console.log('FAILED...', error);
                if (errorAlert) {
                    errorAlert.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Sorry, there was an error sending your message. Please try again later.';
                    errorAlert.style.display = 'block';
                    errorAlert.style.animation = 'slideInDown 0.5s ease';
                }

                // Re-enable submit button
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Send Message';
                }
            });
    } else {
        if (errorAlert) {
            errorAlert.style.display = 'block';
            errorAlert.style.animation = 'slideInDown 0.5s ease';
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