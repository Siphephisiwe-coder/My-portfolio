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
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      projectCards.forEach(card => {
        if (filter === "all" || card.classList.contains(filter)) {
          card.style.display = "block";
          card.style.opacity = "1";
        } else {
          card.style.display = "none";
          card.style.opacity = "0";
        }
      });
    });
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
