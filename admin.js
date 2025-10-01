document.addEventListener('DOMContentLoaded', () => {

    // ====== Admin Page Editable Data Keys ======
    const STORAGE_KEYS = {
      HERO_BG: 'kofiKaze_heroBg',
      MENU_ITEMS: 'kofiKaze_menuItems',
      ABOUT_SECTION: 'kofiKaze_aboutSection',
      CUSTOM_SECTIONS: 'kofiKaze_customSections',
    };
  
    // ====== DOM References ======
    const heroSection = document.querySelector('.hero');
    const menuCarouselContainer = document.getElementById('menuCarouselContainer');
    const aboutSection = document.getElementById('about');
    const customSectionsContainer = document.getElementById('customSectionsContainer');
  
    // Admin modal inputs and lists
    const heroBgInput = document.getElementById('heroBgInput');
    const saveHeroBgBtn = document.getElementById('saveHeroBgBtn');
  
    const menuCategorySelect = document.getElementById('menuCategorySelect');
    const menuItemNameInput = document.getElementById('menuItemName');
    const menuPrice12Input = document.getElementById('menuPrice12');
    const menuPrice16Input = document.getElementById('menuPrice16');
    const menuPrice22Input = document.getElementById('menuPrice22');
    const addMenuItemBtn = document.getElementById('addMenuItemBtn');
    const adminMenuList = document.getElementById('adminMenuList');
  
    const customSectionTitleInput = document.getElementById('customSectionTitle');
    const customSectionContentInput = document.getElementById('customSectionContent');
    const addCustomSectionBtn = document.getElementById('addCustomSectionBtn');
  
    const aboutTitleInput = document.getElementById('aboutTitleInput');
    const aboutContentInput = document.getElementById('aboutContentInput');
    const saveAboutBtn = document.getElementById('saveAboutBtn');
  
    const adminModal = document.getElementById('adminModal');
    const franchiseModal = document.getElementById('franchiseModal');
  
    const openAdminBtn = document.getElementById('openAdminModal');
    const openFranchiseBtn = document.getElementById('openFranchiseModal');
  
    const adminCloseBtn = adminModal.querySelector('.close-modal');
    const franchiseCloseBtn = franchiseModal.querySelector('.close');
  
    // ====== Initialize Data ======
    let menuItems = JSON.parse(localStorage.getItem(STORAGE_KEYS.MENU_ITEMS)) || {
      "Coffee Series": [],
      "Soda Series": [],
      "Matcha Series": [],
      "Non-Coffee Series": [],
      "Add-ons": []
    };
  
    let customSections = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_SECTIONS)) || [];
  
    let aboutContent = JSON.parse(localStorage.getItem(STORAGE_KEYS.ABOUT_SECTION)) || {
      title: 'About Us',
      content: 'At Kofi Kaze, we’re passionate about delivering exceptional coffee experiences for every kind of craving...'
    };
  
    let heroBg = localStorage.getItem(STORAGE_KEYS.HERO_BG) || '';
  
    // ====== Helper Functions ======
  
    // Render hero background image
    function renderHeroBg() {
      if (heroBg) {
        heroSection.style.backgroundImage = `url(${heroBg})`;
        heroSection.style.backgroundSize = 'cover';
        heroSection.style.backgroundPosition = 'center';
      } else {
        heroSection.style.backgroundImage = '';
      }
    }
  
    // Render menu carousel content grouped by category with prices
    function renderMenuCarousel() {
      menuCarouselContainer.innerHTML = ''; // clear
  
      for (const category in menuItems) {
        const catDiv = document.createElement('div');
        catDiv.classList.add('menu-category');
        const title = document.createElement('h3');
        title.textContent = category;
        catDiv.appendChild(title);
  
        if (menuItems[category].length === 0) {
          const emptyMsg = document.createElement('p');
          emptyMsg.textContent = 'No items yet.';
          catDiv.appendChild(emptyMsg);
        } else {
          const ul = document.createElement('ul');
          ul.classList.add('menu-list');
          menuItems[category].forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
              <strong>${item.name}</strong> - 
              12oz: ₱${item.price12.toFixed(2)} | 
              16oz: ₱${item.price16.toFixed(2)} | 
              22oz: ₱${item.price22.toFixed(2)}
            `;
            ul.appendChild(li);
          });
          catDiv.appendChild(ul);
        }
  
        menuCarouselContainer.appendChild(catDiv);
      }
    }
  
    // Render About section content
    function renderAbout() {
      aboutSection.querySelector('h2').textContent = aboutContent.title;
      aboutSection.querySelector('p').textContent = aboutContent.content;
    }
  
    // Render custom sections on main page
    function renderCustomSections() {
      customSectionsContainer.innerHTML = '';
      customSections.forEach(section => {
        const sec = document.createElement('section');
        sec.classList.add('custom-section');
        const h3 = document.createElement('h3');
        h3.textContent = section.title;
        const p = document.createElement('p');
        p.textContent = section.content;
        sec.appendChild(h3);
        sec.appendChild(p);
        customSectionsContainer.appendChild(sec);
      });
    }
  
    // Render existing menu items in admin list with delete option
    function renderAdminMenuList() {
      adminMenuList.innerHTML = '';
      for (const category in menuItems) {
        if (menuItems[category].length === 0) continue;
        const catHeader = document.createElement('h4');
        catHeader.textContent = category;
        adminMenuList.appendChild(catHeader);
  
        const ul = document.createElement('ul');
        menuItems[category].forEach((item, index) => {
          const li = document.createElement('li');
          li.textContent = `${item.name} - 12oz: ₱${item.price12}, 16oz: ₱${item.price16}, 22oz: ₱${item.price22}`;
  
          // Delete button
          const delBtn = document.createElement('button');
          delBtn.textContent = 'Delete';
          delBtn.style.marginLeft = '10px';
          delBtn.addEventListener('click', () => {
            if (confirm(`Delete ${item.name} from ${category}?`)) {
              menuItems[category].splice(index, 1);
              saveMenuItems();
              renderAdminMenuList();
              renderMenuCarousel();
            }
          });
  
          li.appendChild(delBtn);
          ul.appendChild(li);
        });
        adminMenuList.appendChild(ul);
      }
    }
  
    // Save functions
    function saveHeroBg() {
      heroBg = heroBgInput.value.trim();
      localStorage.setItem(STORAGE_KEYS.HERO_BG, heroBg);
      renderHeroBg();
      alert('Hero background updated!');
    }
  
    function saveMenuItems() {
      localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(menuItems));
    }
  
    function saveAbout() {
      aboutContent = {
        title: aboutTitleInput.value.trim(),
        content: aboutContentInput.value.trim()
      };
      localStorage.setItem(STORAGE_KEYS.ABOUT_SECTION, JSON.stringify(aboutContent));
      renderAbout();
      alert('About section saved!');
    }
  
    function saveCustomSections() {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_SECTIONS, JSON.stringify(customSections));
      renderCustomSections();
    }
  
    // Center modal helper
    function centerModal(modal) {
      if (!modal) return;
  
      const modalContent = modal.querySelector('.modal-content');
      if (!modalContent) return;
  
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
  
      const rect = modalContent.getBoundingClientRect();
  
      const top = Math.max((viewportHeight - rect.height) / 2, 20);
      const left = Math.max((viewportWidth - rect.width) / 2, 20);
  
      modalContent.style.position = 'fixed';
      modalContent.style.top = `${top}px`;
      modalContent.style.left = `${left}px`;
    }
  
    // Open modal
    function openModal(modal) {
      modal.style.display = 'block';
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
  
      centerModal(modal);
    }
  
    // Close modal
    function closeModal(modal) {
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
  
      const modalContent = modal.querySelector('.modal-content');
      if (modalContent) {
        modalContent.style.position = '';
        modalContent.style.top = '';
        modalContent.style.left = '';
      }
    }
  
    // ====== Event Listeners ======
  
    // Populate inputs with saved data
    heroBgInput.value = heroBg;
    aboutTitleInput.value = aboutContent.title;
    aboutContentInput.value = aboutContent.content;
  
    renderHeroBg();
    renderMenuCarousel();
    renderAbout();
    renderCustomSections();
    renderAdminMenuList();
  
    saveHeroBgBtn.addEventListener('click', saveHeroBg);
  
    addMenuItemBtn.addEventListener('click', () => {
      const category = menuCategorySelect.value;
      const name = menuItemNameInput.value.trim();
      const price12 = parseFloat(menuPrice12Input.value);
      const price16 = parseFloat(menuPrice16Input.value);
      const price22 = parseFloat(menuPrice22Input.value);
  
      if (!name || isNaN(price12) || isNaN(price16) || isNaN(price22)) {
        alert('Please enter valid name and prices for all sizes.');
        return;
      }
  
      menuItems[category].push({ name, price12, price16, price22 });
      saveMenuItems();
      renderMenuCarousel();
      renderAdminMenuList();
  
      menuItemNameInput.value = '';
      menuPrice12Input.value = '';
      menuPrice16Input.value = '';
      menuPrice22Input.value = '';
    });
  
    addCustomSectionBtn.addEventListener('click', () => {
      const title = customSectionTitleInput.value.trim();
      const content = customSectionContentInput.value.trim();
  
      if (!title || !content) {
        alert('Please enter both title and content for the custom section.');
        return;
      }
  
      customSections.push({ title, content });
      saveCustomSections();
  
      customSectionTitleInput.value = '';
      customSectionContentInput.value = '';
    });
  
    saveAboutBtn.addEventListener('click', saveAbout);
  
    // Modal open buttons
    openAdminBtn.addEventListener('click', e => {
      e.preventDefault();
      openModal(adminModal);
    });
  
    openFranchiseBtn.addEventListener('click', () => {
      openModal(franchiseModal);
    });
  
    // Modal close buttons
    adminCloseBtn.addEventListener('click', () => closeModal(adminModal));
    franchiseCloseBtn.addEventListener('click', () => closeModal(franchiseModal));
  
    // Clicking outside modal content closes modal
    [adminModal, franchiseModal].forEach(modal => {
      modal.addEventListener('click', e => {
        if (e.target === modal) closeModal(modal);
      });
    });
  
    // Close modals with Escape key
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        if (adminModal.style.display === 'block') closeModal(adminModal);
        if (franchiseModal.style.display === 'block') closeModal(franchiseModal);
      }
    });
  
    // Re-center modals on window resize
    window.addEventListener('resize', () => {
      if (adminModal.style.display === 'block') centerModal(adminModal);
      if (franchiseModal.style.display === 'block') centerModal(franchiseModal);
    });
  
  });
  