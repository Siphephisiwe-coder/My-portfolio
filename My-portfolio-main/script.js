/* ============================================================
   PORTFOLIO — script.js
============================================================ */

// ---------- Theme Toggle ----------
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('portfolio-theme');

if (savedTheme === 'light') document.body.classList.add('light');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('portfolio-theme',
    document.body.classList.contains('light') ? 'light' : 'dark'
  );
});

// ---------- Navbar ----------
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const header = document.getElementById('header');

burger.addEventListener('click', () => {
  nav.classList.toggle('active');
  burger.classList.toggle('toggle');
  document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    burger.classList.remove('toggle');
    document.body.style.overflow = '';
  });
});

document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !burger.contains(e.target) && nav.classList.contains('active')) {
    nav.classList.remove('active');
    burger.classList.remove('toggle');
    document.body.style.overflow = '';
  }
});

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ---------- Project Filtering ----------
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    projectCards.forEach(card => {
      const show = filter === 'all' || card.classList.contains(filter);
      card.style.display = show ? 'block' : 'none';
    });
  });
});

// ---------- Project Modal ----------
const modal = document.getElementById('project-modal');
const modalClose = document.querySelector('.modal-close');
const modalTitle = document.querySelector('.modal-title');
const modalDescription = document.querySelector('.modal-description');
const modalTech = document.querySelector('.modal-tech');
const modalImg = document.querySelector('.modal-img');
const modalDemo = document.querySelector('.modal-demo');
const modalCode = document.querySelector('.modal-code');

document.querySelectorAll('.project-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const card = btn.closest('.project-card');

    modalTitle.textContent = card.dataset.title;
    modalDescription.textContent = card.dataset.solution;
    modalTech.textContent = card.dataset.tech;

    if (card.classList.contains('tech')) {
      const bgImg = card.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
      modalImg.src = bgImg;
      modalImg.style.display = 'block';
      modalDemo.href = card.dataset.live;
      modalCode.href = card.dataset.github;

      // Handle "in progress" links
      if (card.dataset.live === '#') {
        modalDemo.textContent = 'Coming Soon';
        modalDemo.style.pointerEvents = 'none';
        modalDemo.style.opacity = '0.5';
      } else {
        modalDemo.textContent = 'View Live';
        modalDemo.style.pointerEvents = '';
        modalDemo.style.opacity = '';
      }

      if (card.dataset.github === '#') {
        modalCode.textContent = 'Private Repo';
        modalCode.style.pointerEvents = 'none';
        modalCode.style.opacity = '0.5';
      } else {
        modalCode.textContent = 'GitHub';
        modalCode.style.pointerEvents = '';
        modalCode.style.opacity = '';
      }

      modalDemo.style.display = 'inline-flex';
      modalCode.style.display = 'inline-flex';
    } else {
      const images = JSON.parse(card.dataset.images);
      modalImg.src = images[0];
      modalImg.style.display = 'block';
      modalDemo.style.display = 'none';
      modalCode.style.display = 'none';
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('active')) closeModal(); });

// ---------- Tech Stack Filter ----------
document.addEventListener('DOMContentLoaded', () => {
  const techFilterBtns = document.querySelectorAll('.tech-filter-btn');
  const techCards = document.querySelectorAll('.tech-card');

  techFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      techFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      techCards.forEach(card => {
        const show = filter === 'all' || card.classList.contains(filter);
        card.style.display = show ? 'flex' : 'none';
        card.style.flexDirection = show ? 'column' : '';
        card.style.alignItems = show ? 'center' : '';
      });
    });
  });
});

// ---------- Services Accordion ----------
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('click', () => {
    const isActive = card.classList.contains('active');
    document.querySelectorAll('.service-card').forEach(c => c.classList.remove('active'));
    if (!isActive) card.classList.add('active');
  });
});

// ---------- Scroll Reveal ----------
const revealElements = document.querySelectorAll(
  '.about-container, .project-card, .tech-card, .service-card, .info-card, .timeline-item'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.6s ease ${i * 0.04}s, transform 0.6s ease ${i * 0.04}s`;
  observer.observe(el);
});

// ---------- EmailJS Contact Form ----------
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

function showError(inputEl, errorEl, message) {
  inputEl.classList.add('invalid');
  errorEl.textContent = message;
}

function clearError(inputEl, errorEl) {
  inputEl.classList.remove('invalid');
  errorEl.textContent = '';
}

function validateForm(fields) {
  let valid = true;
  const { nameEl, emailEl, subjectEl, messageEl } = fields;
  const nameError    = document.getElementById('name-error');
  const emailError   = document.getElementById('email-error');
  const subjectError = document.getElementById('subject-error');
  const messageError = document.getElementById('message-error');

  if (!nameEl.value.trim()) { showError(nameEl, nameError, 'Please enter your name.'); valid = false; }
  else { clearError(nameEl, nameError); }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailEl.value.trim()) { showError(emailEl, emailError, 'Please enter your email.'); valid = false; }
  else if (!emailRegex.test(emailEl.value.trim())) { showError(emailEl, emailError, 'Please enter a valid email address.'); valid = false; }
  else { clearError(emailEl, emailError); }

  if (!subjectEl.value.trim()) { showError(subjectEl, subjectError, 'Please enter a subject.'); valid = false; }
  else { clearError(subjectEl, subjectError); }

  if (!messageEl.value.trim()) { showError(messageEl, messageError, 'Please write a message.'); valid = false; }
  else { clearError(messageEl, messageError); }

  return valid;
}

document.addEventListener('DOMContentLoaded', function () {
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  const form       = document.getElementById('contactForm');
  if (!form) return;

  const submitBtn  = document.getElementById('submitBtn');
  const btnText    = submitBtn.querySelector('.btn-text');
  const btnIcon    = submitBtn.querySelector('.btn-icon');
  const btnLoading = submitBtn.querySelector('.btn-loading');
  const successMsg = document.getElementById('formSuccess');
  const errorMsg   = document.getElementById('formError');

  const nameEl    = document.getElementById('contact-name');
  const emailEl   = document.getElementById('contact-email');
  const subjectEl = document.getElementById('contact-subject');
  const messageEl = document.getElementById('contact-message');

  [nameEl, emailEl, subjectEl, messageEl].forEach(el => {
    el.addEventListener('input', () => {
      el.classList.remove('invalid');
      const errId = el.id.replace('contact-', '') + '-error';
      const errEl = document.getElementById(errId);
      if (errEl) errEl.textContent = '';
    });
  });

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    successMsg.style.display = 'none';
    errorMsg.style.display   = 'none';

    const fields = { nameEl, emailEl, subjectEl, messageEl };
    if (!validateForm(fields)) return;

    btnText.style.display    = 'none';
    btnIcon.style.display    = 'none';
    btnLoading.style.display = 'inline-flex';
    submitBtn.disabled       = true;

    const templateParams = {
      from_name:  nameEl.value.trim(),
      from_email: emailEl.value.trim(),
      subject:    subjectEl.value.trim(),
      message:    messageEl.value.trim(),
    };

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
      form.reset();
      successMsg.style.display = 'flex';
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (err) {
      console.error('EmailJS error:', err);
      errorMsg.style.display = 'flex';
    } finally {
      btnText.style.display    = 'inline';
      btnIcon.style.display    = 'inline';
      btnLoading.style.display = 'none';
      submitBtn.disabled       = false;
    }
  });
});