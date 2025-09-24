// === Sidebar Toggle Functionality ===
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const overlay = document.querySelector('.menu-overlay');
const closeBtn = document.querySelector('.close-sidebar');
const links = document.querySelectorAll('.nav-links a');

// Toggle sidebar
function toggleSidebar(show) {
  navLinks.classList.toggle('show', show);
  overlay.classList.toggle('show', show);
  document.body.classList.toggle('sidebar-open', show);
}

// Event listeners
hamburger.addEventListener('click', () => toggleSidebar(true));
closeBtn.addEventListener('click', () => toggleSidebar(false));
overlay.addEventListener('click', () => toggleSidebar(false));

links.forEach(link => {
  link.addEventListener('click', () => toggleSidebar(false));
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
document.querySelectorAll('nav.nav-links a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    const headerOffset = 80; // Match header height
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  });
});

