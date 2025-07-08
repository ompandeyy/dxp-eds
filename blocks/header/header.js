/**
 * DHL Header Component for AEM EDS
 * Transforms the basic HTML structure into a functional header
 */

export default function decorate(block) {
  // Get the header container
  const headerContainer = block;
  
  // Create the main header structure
  const header = document.createElement('header');
  header.className = 'header';
  
  // Create top bar with logo and utilities
  const topBar = document.createElement('div');
  topBar.className = 'header-container';
  
  // Extract logo from the first div
  const logoDiv = headerContainer.querySelector('div:first-child');
  const logoLink = logoDiv.querySelector('a');
  if (!logoLink) {
  console.error('logoLink not found');
  return;
}
  if (!logoDiv) {
  console.error('logoDiv not found');
  return;
}
  
  // Create logo section
  const logoSection = document.createElement('div');
  logoSection.className = 'header-logo';
  logoSection.appendChild(logoLink);
  
  // Create utilities section (search, language, login)
  const utilitiesSection = document.createElement('div');
  utilitiesSection.className = 'header-utilities';
  
  // Add search
  const searchDiv = document.createElement('div');
  searchDiv.className = 'header-search';
  searchDiv.innerHTML = `
    <input type="text" placeholder="Suche" aria-label="Suche">
    <button type="submit" aria-label="Suchen">
      <svg class="search-icon" viewBox="0 0 24 24">
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
      </svg>
    </button>
  `;
  
  // Add language selector
  const languageDiv = document.createElement('div');
  languageDiv.className = 'header-language';
  languageDiv.innerHTML = `
    <svg class="globe-icon" viewBox="0 0 24 24">
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/>
    </svg>
    <span>Deutschland</span>
    <a href="#" aria-label="Switch to English">EN</a>
    <a href="#" aria-label="Switch to German">DE</a>
  `;
  
  // Add mobile menu toggle
  const mobileToggle = document.createElement('button');
  mobileToggle.className = 'mobile-menu-toggle';
  mobileToggle.innerHTML = '☰';
  mobileToggle.setAttribute('aria-label', 'Toggle navigation menu');
  
  // Assemble top bar
  topBar.appendChild(logoSection);
  topBar.appendChild(utilitiesSection);
  utilitiesSection.appendChild(searchDiv);
  utilitiesSection.appendChild(languageDiv);
  utilitiesSection.appendChild(mobileToggle);
  
  // Create navigation section
  const navSection = document.createElement('nav');
  navSection.className = 'header-nav';
  
  const navContainer = document.createElement('div');
  navContainer.className = 'header-nav-container';
  
  // Extract the navigation from the second div
  const navDiv = headerContainer.querySelector('div:nth-child(2)');
  const navList = navDiv.querySelector('ul');
  
  // Transform navigation items
  const navItems = navList.querySelectorAll('> li');
  navItems.forEach(item => {
    const text = item.childNodes[0].textContent.trim();
    const subMenu = item.querySelector('ul');
    
    // Create main nav item
    const navItem = document.createElement('li');
    
    if (subMenu) {
      // Has dropdown
      const span = document.createElement('span');
      span.textContent = text;
      span.setAttribute('tabindex', '0');
      span.setAttribute('role', 'button');
      span.setAttribute('aria-haspopup', 'true');
      span.setAttribute('aria-expanded', 'false');
      
      navItem.appendChild(span);
      navItem.appendChild(subMenu);
      
      // Add keyboard support
      span.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const expanded = span.getAttribute('aria-expanded') === 'true';
          span.setAttribute('aria-expanded', !expanded);
        }
      });
    } else {
      // Simple link
      const link = document.createElement('a');
      link.href = '#';
      link.textContent = text;
      navItem.appendChild(link);
    }
    
    navList.appendChild(navItem);
  });
  
  navContainer.appendChild(navList);
  navSection.appendChild(navContainer);
  
  // Assemble final header
  header.appendChild(topBar);
  header.appendChild(navSection);
  
  // Replace the original content
  headerContainer.innerHTML = '';
  headerContainer.appendChild(header);
  
  // Add event listeners
  addEventListeners(header);
  
  return header;
}

function addEventListeners(header) {
  // Mobile menu toggle
  const mobileToggle = header.querySelector('.mobile-menu-toggle');
  const nav = header.querySelector('.header-nav');
  
  mobileToggle.addEventListener('click', () => {
    nav.classList.toggle('mobile-open');
    const isOpen = nav.classList.contains('mobile-open');
    mobileToggle.setAttribute('aria-expanded', isOpen);
  });
  
  // Search functionality
  const searchForm = header.querySelector('.header-search');
  const searchInput = searchForm.querySelector('input');
  const searchButton = searchForm.querySelector('button');
  
  searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
      // Implement search functionality
      console.log('Search query:', query);
      // window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  });
  
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchButton.click();
    }
  });
  
  // Dropdown keyboard navigation
  const dropdownTriggers = header.querySelectorAll('[aria-haspopup="true"]');
  dropdownTriggers.forEach(trigger => {
    trigger.addEventListener('keydown', (e) => {
      const dropdown = trigger.nextElementSibling;
      if (!dropdown) return;
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const firstLink = dropdown.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    });
  });
  
  // Dropdown menu item navigation
  const dropdownMenus = header.querySelectorAll('.header-nav ul ul');
  dropdownMenus.forEach(menu => {
    const links = menu.querySelectorAll('a');
    links.forEach((link, index) => {
      link.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const nextLink = links[index + 1];
          if (nextLink) nextLink.focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (index === 0) {
            const trigger = menu.previousElementSibling;
            if (trigger) trigger.focus();
          } else {
            const prevLink = links[index - 1];
            if (prevLink) prevLink.focus();
          }
        } else if (e.key === 'Escape') {
          const trigger = menu.previousElementSibling;
          if (trigger) trigger.focus();
        }
      });
    });
  });
  
  // Close dropdowns on outside click
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) {
      dropdownTriggers.forEach(trigger => {
        trigger.setAttribute('aria-expanded', 'false');
      });
      nav.classList.remove('mobile-open');
    }
  });
  
  // Language selector functionality
  const languageLinks = header.querySelectorAll('.header-language a');
  languageLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = link.textContent.trim();
      console.log('Language changed to:', lang);
      // Implement language switching logic
    });
  });
}
