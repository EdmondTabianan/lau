document.addEventListener("DOMContentLoaded", () => {
  // === Sidebar Menu ===
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

  hamburger?.addEventListener('click', () => toggleSidebar(true));
  closeSidebarBtn?.addEventListener('click', () => toggleSidebar(false));
  overlay?.addEventListener('click', () => toggleSidebar(false));
  links.forEach(link => link.addEventListener('click', () => toggleSidebar(false)));

  // === Smooth Scroll ===
  const navLinksArray = Array.from(document.querySelectorAll('nav.nav-links a[href^="#"]'));
  const sectionIds = navLinksArray.map(link => link.getAttribute('href').substring(1));
  const sections = sectionIds.map(id => document.getElementById(id));

  navLinksArray.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      const headerOffset = 80;
      const offsetTop = targetSection.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    });
  });

  // === Scroll-based Active Highlight using IntersectionObserver ===
  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const navLink = document.querySelector(`nav.nav-links a[href="#${id}"]`);
      if (entry.isIntersecting) {
        navLinksArray.forEach(link => link.classList.remove('active'));
        navLink?.classList.add('active');
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    if (section) observer.observe(section);
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

  prevBtn?.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });

  nextBtn?.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  });

  // Swipe Support
  let touchStartX = 0;
  const carouselContainer = document.querySelector(".carousel-container");

  if (carouselContainer) {
    carouselContainer.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
    });

    carouselContainer.addEventListener("touchend", (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      if (touchStartX - touchEndX > 50) nextBtn?.click(); // swipe left
      if (touchEndX - touchStartX > 50) prevBtn?.click(); // swipe right
    });
  }

  showSlide(currentIndex);

  // === Modal ===
  const modal = document.getElementById("franchiseModal");
  const openBtn = document.getElementById("openFranchiseModal");
  const closeBtn = modal?.querySelector(".close");

  const openModal = () => {
    modal?.classList.add("show");
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    modal?.classList.remove("show");
    document.body.classList.remove("modal-open");
  };

  openBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    openModal();
  });

  closeBtn?.addEventListener("click", closeModal);

  window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal?.classList.contains("show")) {
      closeModal();
    }
  });
});
