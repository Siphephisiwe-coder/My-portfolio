const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const header = document.querySelector('header');

// Toggle mobile menu
burger.addEventListener('click', () => {
  nav.classList.toggle('active');
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
const modalProblem = document.querySelector('.modal-problem');
const modalSolution = document.querySelector('.modal-solution');
const modalTech = document.querySelector('.modal-tech');
const modalRole = document.querySelector('.modal-role');
const modalImg = document.querySelector('.modal-img');
const modalDemo = document.querySelector('.modal-demo');
const modalCode = document.querySelector('.modal-code');

document.querySelectorAll('.project-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const card = btn.closest('.project-card');

    modalTitle.textContent = card.dataset.title;
    modalProblem.textContent = card.dataset.problem;
    modalSolution.textContent = card.dataset.solution;
    modalTech.textContent = card.dataset.tech;
    modalRole.textContent = card.dataset.role;

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


// contact form submission
document.addEventListener("DOMContentLoaded", function() {
  const showFormLink = document.getElementById('showForm');
  const contactForm = document.getElementById('contactForm');

  showFormLink.addEventListener('click', function(e) {
    e.preventDefault(); // prevent scrolling to top
    if (contactForm.style.display === "none" || contactForm.style.display === "") {
      contactForm.style.display = "block";
      contactForm.scrollIntoView({ behavior: "smooth" });
    } else {
      contactForm.style.display = "none";
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
