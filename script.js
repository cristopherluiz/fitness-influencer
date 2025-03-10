// Navigation Toggle
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });
};

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
        });

        // Close mobile menu if it's open
        const nav = document.querySelector('.nav-links');
        const burger = document.querySelector('.burger');
        if (nav.classList.contains('nav-active')) {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
        }
    });
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Progress Bar Animation on Scroll
const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                progressBar.style.width = `${width}%`;
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.1 });

    progressBars.forEach(bar => {
        observer.observe(bar);
    });
};

// Lazy Load Sections and Images
const lazyLoadSections = () => {
    const lazySections = document.querySelectorAll('.lazy-section');
    const lazyImages = document.querySelectorAll('.lazy-image');

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
                observer.unobserve(section);
            }
        });
    }, { threshold: 0.1 });

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const image = entry.target;
                const src = image.getAttribute('data-src');
                image.style.backgroundImage = `url(${src})`;
                observer.unobserve(image);
            }
        });
    }, { threshold: 0.1 });

    lazySections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });

    lazyImages.forEach(image => {
        imageObserver.observe(image);
    });
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    navSlide();
    animateProgressBars();
    lazyLoadSections(); // Initialize lazy loading for sections and images
});