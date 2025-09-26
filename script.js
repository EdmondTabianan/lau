document.addEventListener("DOMContentLoaded", () => {
  // === Sidebar Toggle Functionality ===
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const overlay = document.querySelector('.menu-overlay');
  const closeSidebarBtn = document.querySelector('.close-sidebar');
  const links = document.querySelectorAll('.nav-links a');

  function toggleSidebar(show) {
    navLinks.classList.toggle('show', show);
    overlay.classList.toggle('show', show);
    document.body.classList.toggle('sidebar-open', show);
  }

  hamburger.addEventListener('click', () => toggleSidebar(true));
  closeSidebarBtn.addEventListener('click', () => toggleSidebar(false));
  overlay.addEventListener('click', () => toggleSidebar(false));

  links.forEach(link => {
    link.addEventListener('click', () => toggleSidebar(false));
  });

  // === Login Modal ===
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const modal = document.getElementById("loginModal");
  const closeModalBtn = modal.querySelector(".close");

  // Function to update login/logout visibility
  function updateAuthButtons(isLoggedIn) {
    loginBtn.style.display = isLoggedIn ? "none" : "block";
    logoutBtn.style.display = isLoggedIn ? "block" : "none";
  }

  // Assume user starts logged out
  updateAuthButtons(false);

  // Open login modal
  loginBtn.addEventListener("click", function (e) {
    e.preventDefault();
    modal.style.display = "block";
  });

  // Close modal with X
  closeModalBtn.addEventListener("click", function () {
    modal.style.display = "none";
    updateAuthButtons(true); // Simulate successful login
  });

  // Close modal by clicking outside
  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
      updateAuthButtons(true); // Simulate successful login
    }
  });

  // Logout
  logoutBtn.addEventListener("click", function (e) {
    e.preventDefault();
    updateAuthButtons(false); // User is now logged out
  });

  // === Smooth Scroll to Section ===
  document.querySelectorAll('nav.nav-links a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    });
  });

  // === Active Link Highlight on Scroll ===
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 80;
      if (pageYOffset >= sectionTop) {
        currentSectionId = section.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(currentSectionId)) {
        link.classList.add('active');
      }
    });
  });

  // === Carousel ===
  const slides = document.querySelectorAll(".carousel-slide");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  });

  // Swipe support (mobile)
  let touchStartX = 0;
  const carouselContainer = document.querySelector(".carousel-container");

  if (carouselContainer) {
    carouselContainer.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
    });

    carouselContainer.addEventListener("touchend", (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      if (touchStartX - touchEndX > 50) nextBtn.click();
      if (touchEndX - touchStartX > 50) prevBtn.click();
    });
  }

  // Initialize first slide
  showSlide(currentIndex);
});
