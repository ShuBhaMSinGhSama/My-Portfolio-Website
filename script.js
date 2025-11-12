document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('nav ul');

    hamburger.addEventListener('click', () => {
        navUl.classList.toggle('nav-active');
    });

    // Close mobile nav when a link is clicked
    navUl.querySelectorAll('li a').forEach(link => {
        link.addEventListener('click', () => {
            if (navUl.classList.contains('nav-active')) {
                navUl.classList.remove('nav-active');
            }
        });
    });

    // --- Typed.js for Auto-Typing Effect ---
    const typeElement = document.querySelector('.auto-type');
    if (typeElement) {
        new Typed(typeElement, {
            // Strings updated to reflect diverse skill set
            strings: ["Python Developer", "Cyber Security Enthusiast", "Frontend Developer", "Problem Solver"],
            typeSpeed: 75,
            backSpeed: 50,
            loop: true
        });
    }

    // --- SCROLL SPY IMPLEMENTATION (IntersectionObserver) ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    // Options for the Intersection Observer: triggers when 50% of the section is visible
    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.5 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentSectionId = entry.target.id;
                
                // 1. Remove 'active-link' from all links
                navLinks.forEach(link => {
                    link.classList.remove('active-link');
                });

                // 2. Add 'active-link' to the link corresponding to the visible section
                const activeLink = document.querySelector(`nav ul li a[href="#${currentSectionId}"]`);
                if (activeLink) {
                     activeLink.classList.add('active-link');
                }
            }
        });
    }, observerOptions);

    // Attach the observer to all section elements
    sections.forEach(section => {
        if (section.id) {
            observer.observe(section);
        }
    });
});