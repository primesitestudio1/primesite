(function () {
  'use strict';

  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const contactForm = document.getElementById('contactForm');
  const cursorGlow = document.getElementById('cursorGlow');
  const yearEl = document.getElementById('year');

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* Header scroll effect */
  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile navigation */
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('active', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Scroll-triggered animations */
  const animatedEls = document.querySelectorAll('.fade-up, .fade-in, .fade-left, .fade-right');

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.delay || 0;
          setTimeout(function () {
            el.classList.add('visible');
          }, Number(delay));
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  animatedEls.forEach(function (el) {
    observer.observe(el);
  });

  /* Hero elements animate on load */
  window.addEventListener('load', function () {
    document.querySelectorAll('.hero .fade-up').forEach(function (el) {
      const delay = el.dataset.delay || 0;
      setTimeout(function () {
        el.classList.add('visible');
      }, 300 + Number(delay));
    });
  });

  /* Counter animation */
  function animateCounter(el) {
    const target = Number(el.dataset.count);
    if (!target) return;
    const duration = 1500;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('[data-count]').forEach(function (el) {
    counterObserver.observe(el);
  });

  /* Parallax hero orbs */
  const orbs = document.querySelectorAll('.hero-orb');
  if (orbs.length) {
    window.addEventListener('scroll', function () {
      const scrollY = window.scrollY;
      orbs.forEach(function (orb, i) {
        const speed = (i + 1) * 0.05;
        orb.style.transform = 'translateY(' + scrollY * speed + 'px)';
      });
    }, { passive: true });
  }

  /* Cursor glow follow */
  if (cursorGlow && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateGlow() {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      cursorGlow.style.left = glowX + 'px';
      cursorGlow.style.top = glowY + 'px';
      requestAnimationFrame(animateGlow);
    }

    animateGlow();
  }

  /* Contact form -> Instagram DM */
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const business = document.getElementById('business').value.trim();
      const message = document.getElementById('message').value.trim();

      let text = 'Hi PrimeSite Studio! I am interested in a website.\n\n';
      text += 'Name: ' + name + '\n';
      if (business) text += 'Business: ' + business + '\n';
      text += '\nProject details:\n' + message;

      const url = 'https://www.instagram.com/primesite_.studio?igsh=YTU2cm05NWRydXFz';
      window.open(url, '_blank', 'noopener,noreferrer');

      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).catch(function () {});
      }
    });
  }

  /* Smooth anchor offset handled by CSS scroll-padding-top */
})();
