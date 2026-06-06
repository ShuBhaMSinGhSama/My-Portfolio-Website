document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Particle Background Animation ---
  const particleContainer = document.querySelector('#particles-canvas');

  if (particleContainer) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    particleContainer.appendChild(canvas);

    const PARTICLE_COUNT = 80;
    const CONNECTION_DISTANCE = 120;
    let particles = [];
    let animationId = null;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (randomY = false) => ({
      x: Math.random() * canvas.width,
      y: randomY ? Math.random() * canvas.height : canvas.height + Math.random() * 20,
      radius: Math.random() * 1.5 + 1,
      speed: Math.random() * 0.6 + 0.2,
      opacity: Math.random() * 0.4 + 0.1,
    });

    const initParticles = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => createParticle(true));
    };

    const drawParticle = (p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 229, 255, ${p.opacity})`;
      ctx.fill();
    };

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = 'rgba(0, 229, 255, 0.05)';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    };

    const updateParticles = () => {
      particles.forEach((p, i) => {
        p.y -= p.speed;

        if (p.y + p.radius < 0) {
          particles[i] = createParticle(false);
        }
      });
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawConnections();
      particles.forEach(drawParticle);
      updateParticles();
      animationId = requestAnimationFrame(animateParticles);
    };

    resizeCanvas();
    initParticles();
    animateParticles();

    window.addEventListener('resize', () => {
      resizeCanvas();
      // Re-clamp particles that ended up outside the new bounds
      particles.forEach((p) => {
        if (p.x > canvas.width) p.x = Math.random() * canvas.width;
        if (p.y > canvas.height) p.y = Math.random() * canvas.height;
      });
    });
  }

  // --- 2. Mobile Navigation ---
  const hamburger = document.querySelector('.hamburger');
  const navUl = document.querySelector('nav ul');

  if (hamburger && navUl) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      hamburger.classList.toggle('active');
      navUl.classList.toggle('nav-active');
    });

    navUl.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navUl.classList.remove('nav-active');
      });
    });

    document.addEventListener('click', (e) => {
      const isNavActive = navUl.classList.contains('nav-active');
      if (isNavActive && !navUl.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navUl.classList.remove('nav-active');
      }
    });
  }

  // --- 3. Typed.js Initialization ---
  const autoTypeEl = document.querySelector('.auto-type');

  if (autoTypeEl && typeof Typed !== 'undefined') {
    new Typed('.auto-type', {
      strings: [
        'Full-Stack Developer',
        'Cybersecurity Enthusiast',
        'IoT Innovator',
        'Problem Solver',
      ],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 2000,
      loop: true,
    });
  }

  // --- 4. Navbar Scroll Effect ---
  const header = document.querySelector('header');

  const handleNavbarScroll = () => {
    if (!header) return;
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  // --- 5. Scroll Spy (Active Nav Link) ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav ul a');

  if (sections.length > 0 && navLinks.length > 0) {
    const scrollSpyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targetId = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              link.classList.toggle(
                'active-link',
                link.getAttribute('href') === `#${targetId}`
              );
            });
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-100px 0px -50% 0px',
      }
    );

    sections.forEach((section) => scrollSpyObserver.observe(section));
  }

  // --- 6. Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  }

  // --- 7. Animated Counters (About Section Stats) ---
  const statNumbers = document.querySelectorAll('.stat-number');

  if (statNumbers.length > 0) {
    const animateCounter = (el) => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      if (isNaN(target)) return;

      const duration = 2000; // ~2 seconds
      const startTime = performance.now();

      const step = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease-out quad for a smooth deceleration
        const easedProgress = 1 - (1 - progress) * (1 - progress);
        const currentValue = Math.ceil(easedProgress * target);

        el.textContent = currentValue;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target; // Ensure exact final value
        }
      };

      requestAnimationFrame(step);
    };

    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    statNumbers.forEach((el) => counterObserver.observe(el));
  }

  // --- 8. Back to Top Button ---
  const backToTopBtn = document.querySelector('#back-to-top');

  const handleBackToTopVisibility = () => {
    if (!backToTopBtn) return;
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  };

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Unified Scroll Listener (Navbar + Back-to-Top) ---
  window.addEventListener('scroll', () => {
    handleNavbarScroll();
    handleBackToTopVisibility();
  }, { passive: true });

  // Fire once on load so state is correct if page is already scrolled
  handleNavbarScroll();
  handleBackToTopVisibility();

  // --- 9. Smooth Scroll for All Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const targetSection = document.querySelector(href);
      if (targetSection) {
        e.preventDefault();
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});