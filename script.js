document.addEventListener('DOMContentLoaded', () => {
  // Set current year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile Nav Toggle
  const menuBtn = document.getElementById('menu-btn');
  const nav = document.querySelector('nav ul');
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('show');
    if (nav.classList.contains('show')) {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.position = 'absolute';
      nav.style.right = '16px';
      nav.style.top = '62px';
      nav.style.background = 'rgba(255,255,255,0.05)';
      nav.style.padding = '10px';
      nav.style.borderRadius = '10px';
    } else {
      nav.style.display = '';
    }
  });

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
      if (nav.classList.contains('show')) menuBtn.click();
    });
  });

  // Portfolio Filter
  const filters = document.querySelectorAll('.filter');
  const cards = document.querySelectorAll('.grid .card');
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(f => f.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      cards.forEach(card => {
        card.style.display = (filter === 'all' || card.dataset.category === filter) ? '' : 'none';
      });
    });
  });

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxVideo = document.getElementById('lightboxVideo');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const closeLightbox = document.getElementById('closeLightbox');

  document.querySelectorAll('.grid .card').forEach(card => {
    const videoEl = card.querySelector('video');
    const title = card.querySelector('h3').textContent;
    card.addEventListener('click', () => {
      lightbox.style.display = 'flex';
      lightboxVideo.src = videoEl.currentSrc || videoEl.src;
      lightboxVideo.play();
      lightboxTitle.textContent = title;
    });
  });

  closeLightbox.addEventListener('click', () => {
    lightboxVideo.pause();
    lightbox.style.display = 'none';
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightboxVideo.pause();
      lightbox.style.display = 'none';
    }
  });

  // Contact Form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for contacting Editkaro.in! We’ll get back to you soon.');
      contactForm.reset();
    });
  }

  // Scroll Animation for Vision & Mission
  const fadeElements = document.querySelectorAll('.fade-on-scroll');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.3 });

  fadeElements.forEach(el => observer.observe(el));
});
