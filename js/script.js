document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hero carousel autoplay
    const heroCarousel = document.getElementById('heroCarousel');
    if (heroCarousel) {
        const carousel = new bootstrap.Carousel(heroCarousel, {
            interval: 5000,
            pause: 'hover'
        });
    }

    // Testimonial carousel
    const testimonialCarousel = document.getElementById('testimonialCarousel');
    if (testimonialCarousel) {
        const carousel = new bootstrap.Carousel(testimonialCarousel, {
            interval: 7000,
            pause: 'hover'
        });
    }

    // Current year for footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

// Form validation
(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.getElementsByClassName('needs-validation');
        
        // Loop over them and prevent submission
        const validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

// Animate elements when they come into view
const animateOnScroll = function() {
    const elements = document.querySelectorAll('.feature-card, .program-card, .event-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
};

window.addEventListener('load', animateOnScroll);

// Islamic-Themed 10-Second Page Loader
document.addEventListener('DOMContentLoaded', function() {
    const pageLoader = document.getElementById('pageLoader');
    const progressBar = document.getElementById('loaderProgress');
    const percentage = document.getElementById('percentage');
    const letters = document.querySelectorAll('.letter');
    
    // Start the 10-second countdown
    let progress = 0;
    const duration = 1000; // 10 seconds in milliseconds
    const intervalTime = 50; // Update every 50ms for smooth progress
    const increments = 100 / (duration / intervalTime);
    
    // Animate letters one by one
    letters.forEach((letter, index) => {
        setTimeout(() => {
            letter.style.animation = `letterAppear 0.5s forwards ${index * 0.1}s`;
        }, index * 150);
    });
    
    // Update progress bar
    const progressInterval = setInterval(() => {
        progress += increments;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            
            // Hide loader after completion
            setTimeout(() => {
                pageLoader.classList.add('loader-hidden');
                
                // Remove loader from DOM after animation completes
                pageLoader.addEventListener('transitionend', function() {
                    if (pageLoader.classList.contains('loader-hidden')) {
                        pageLoader.style.display = 'none';
                    }
                });
            }, 500);
        }
        
        progressBar.style.width = progress + '%';
        percentage.textContent = Math.round(progress) + '%';
    }, intervalTime);
    
    // Ensure loader stays for at least 10 seconds even if page loads faster
    setTimeout(() => {
        if (progress < 100) {
            progress = 100;
            progressBar.style.width = '100%';
            percentage.textContent = '100%';
        }
    }, duration);
});
