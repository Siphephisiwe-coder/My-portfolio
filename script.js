const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const header = document.querySelector('header');

// Toggle mobile menu
burger.addEventListener('click', () => {
  nav.classList.toggle('active');
  burger.classList.toggle('toggle'); // animate burger
});

// Close mobile menu when clicking a nav link
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    burger.classList.remove('toggle');
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !burger.contains(e.target) && nav.classList.contains('active')) {
    nav.classList.remove('active');
    burger.classList.remove('toggle');
  }
});

// Change navbar style on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// projects filtering
  // Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    projectCards.forEach(card => {
      if (filter === 'all' || card.classList.contains(filter)) {
        card.style.display = 'block';
        setTimeout(() => card.style.opacity = '1', 50);
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Modal
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

    // Determine which buttons to show
    if (card.classList.contains('tech')) {
      modalImg.src = card.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
      modalDemo.href = card.dataset.live;
      modalCode.href = card.dataset.github;
      modalDemo.style.display = 'inline-block';
      modalCode.style.display = 'inline-block';
    } else {
      // design project
      const images = JSON.parse(card.dataset.images);
      modalImg.src = images[0]; // show first image, could add slider later
      modalDemo.style.display = 'none';
      modalCode.style.display = 'none';
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

modalClose.addEventListener('click', () => {
  modal.classList.remove('active');
  document.body.style.overflow = '';
});

modal.addEventListener('click', e => {
  if (e.target === modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
});


// --- Tech Stack Filter ---
document.addEventListener("DOMContentLoaded", () => {
  const techFilterButtons = document.querySelectorAll(".tech-filter-btn");
  const techCards = document.querySelectorAll(".tech-card");

  techFilterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Remove active state from all buttons
      techFilterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      techCards.forEach(card => {
        if (filter === "all" || card.classList.contains(filter)) {
          card.style.display = "block";
          card.style.opacity = "1";
          card.style.transform = "scale(1)";
        } else {
          card.style.display = "none";
          card.style.opacity = "0";
          card.style.transform = "scale(0.95)";
        }
      });
    });
  });
});

// Expand/collapse service pricing
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('active');
  });
});

// contact section
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // e.g. "abc123XYZ"
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // e.g. "service_xxxxxx"
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // e.g. "template_xxxxxx"
 
// ---- validation helpers ----
 
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
 
  // Name
  if (!nameEl.value.trim()) {
    showError(nameEl, nameError, 'Please enter your name.');
    valid = false;
  } else {
    clearError(nameEl, nameError);
  }
 
  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailEl.value.trim()) {
    showError(emailEl, emailError, 'Please enter your email.');
    valid = false;
  } else if (!emailRegex.test(emailEl.value.trim())) {
    showError(emailEl, emailError, 'Please enter a valid email address.');
    valid = false;
  } else {
    clearError(emailEl, emailError);
  }
 
  // Subject
  if (!subjectEl.value.trim()) {
    showError(subjectEl, subjectError, 'Please enter a subject.');
    valid = false;
  } else {
    clearError(subjectEl, subjectError);
  }
 
  // Message
  if (!messageEl.value.trim().length < 10) {
    showError(messageEl, messageError, 'Message is too short.');
    valid = false;
  } else if (!messageEl.value.trim()) {
    showError(messageEl, messageError, 'Please write a message.');
    valid = false;
  } else {
    clearError(messageEl, messageError);
  }
 
  return valid;
}
 
// ---- main init ----
 
document.addEventListener('DOMContentLoaded', function () {
 
  // Initialise EmailJS
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  } else {
    console.warn('EmailJS not loaded. Add the SDK to your <head>:\n<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"><\/script>');
  }
 
  const form       = document.getElementById('contactForm');
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
 
  // Clear errors on input
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
 
    // Loading state
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

  // Select popup and image
  const popup = document.getElementById("popup");
  const popupImg = popup.querySelector("img");

  // When clicking a project image
  document.querySelectorAll(".project-card img").forEach(img => {
    img.addEventListener("click", () => {
      popup.style.display = "flex";
      popupImg.src = img.src; // Show clicked image
    });
  });

  // Close popup when clicking anywhere
  popup.addEventListener("click", () => {
    popup.style.display = "none";
  });
