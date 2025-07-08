import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 900px)');

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('nav');
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      toggleAllNavSections(navSections);
      navSectionExpanded.focus();
    } else if (!isDesktop.matches) {
      toggleMenu(nav, navSections);
      nav.querySelector('button').focus();
    }
  }
}

function closeOnFocusLost(e) {
  const nav = e.currentTarget;
  if (!nav.contains(e.relatedTarget)) {
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      toggleAllNavSections(navSections, false);
    } else if (!isDesktop.matches) {
      toggleMenu(nav, navSections, false);
    }
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.className === 'nav-drop';
  if (isNavDrop && (e.code === 'Enter' || e.code === 'Space')) {
    const dropExpanded = focused.getAttribute('aria-expanded') === 'true';
    toggleAllNavSections(focused.closest('.nav-sections'));
    focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
  }
}

function focusNavSection() {
  document.activeElement.addEventListener('keydown', openOnKeydown);
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
  sections.querySelectorAll('.nav-sections .default-content-wrapper > ul > li').forEach((section) => {
    section.setAttribute('aria-expanded', expanded);
  });
}

/**
 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  toggleAllNavSections(navSections, expanded || isDesktop.matches ? 'false' : 'true');
  button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  // enable nav dropdown keyboard accessibility
  const navDrops = navSections.querySelectorAll('.nav-drop');
  if (isDesktop.matches) {
    navDrops.forEach((drop) => {
      if (!drop.hasAttribute('tabindex')) {
        drop.setAttribute('tabindex', 0);
        drop.addEventListener('focus', focusNavSection);
      }
    });
  } else {
    navDrops.forEach((drop) => {
      drop.removeAttribute('tabindex');
      drop.removeEventListener('focus', focusNavSection);
    });
  }

  // enable menu collapse on escape keypress
  if (!expanded || isDesktop.matches) {
    // collapse menu on escape press
    window.addEventListener('keydown', closeOnEscape);
    // collapse menu on focus lost
    nav.addEventListener('focusout', closeOnFocusLost);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
    nav.removeEventListener('focusout', closeOnFocusLost);
  }
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // load nav as fragment
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  // decorate nav DOM
  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  const classes = ['brand', 'sections', 'tools'];
  classes.forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  const navBrand = nav.querySelector('.nav-brand');
  const brandLink = navBrand.querySelector('.button');
  if (brandLink) {
    brandLink.className = '';
    brandLink.closest('.button-container').className = '';
  }

  const navSections = nav.querySelector('.nav-sections');
  if (navSections) {
    navSections.querySelectorAll(':scope .default-content-wrapper > ul > li').forEach((navSection) => {
      if (navSection.querySelector('ul')) navSection.classList.add('nav-drop');
      navSection.addEventListener('click', () => {
        if (isDesktop.matches) {
          const expanded = navSection.getAttribute('aria-expanded') === 'true';
          toggleAllNavSections(navSections);
          navSection.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        }
      });
    });
  }

  // Move "Anmeldung am Kundenportal" to the right
  const navUtilities = document.createElement('div');
  navUtilities.classList.add('header-utilities');
  const navSectionsList = navSections.querySelector('ul');
  const customerPortalItem = navSectionsList.querySelector('li:last-child');
  navUtilities.appendChild(customerPortalItem);
  nav.appendChild(navUtilities);

  // hamburger for mobile
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>`;
  hamburger.addEventListener('click', () => toggleMenu(nav, navSections));
  nav.prepend(hamburger);
  nav.setAttribute('aria-expanded', 'false');
  // prevent mobile nav behavior on window resize
  toggleMenu(nav, navSections, isDesktop.matches);
  isDesktop.addEventListener('change', () => toggleMenu(nav, navSections, isDesktop.matches));

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);
}

// Apply CSS styles
const style = document.createElement('style');
style.textContent = `
/* DHL Header Styles */
.header {
  background-color: #FFCC00;
  padding: 0;
  position: relative;
  z-index: 1000;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
}

/* Logo Section */
.header-logo {
  display: flex;
  align-items: center;
}

.header-logo a {
  text-decoration: none;
  color: #D40511;
  font-weight: bold;
  font-size: 24px;
  font-family: 'Arial', sans-serif;
  letter-spacing: 0.5px;
}

/* Utility Navigation (Search, Language, Login) */
.header-utilities {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: auto;
}

.header-search {
  position: relative;
}

.header-search input {
  padding: 8px 35px 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 200px;
}

.header-search button {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.header-language {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-language select {
  background: none;
  border: none;
  color: #333;
  font-weight: 500;
  cursor: pointer;
  padding: 5px;
}

.header-language a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  padding: 5px 10px;
  border-radius: 3px;
  transition: background-color 0.2s;
}

.header-language a:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

/* Main Navigation */
.header-nav {
  background-color: #FFCC00;
  border-top: 1px solid #e6b800;
}

.header-nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
}

.header-nav > ul > li {
  position: relative;
}

.header-nav > ul > li > a,
.header-nav > ul > li > span {
  display: block;
  padding: 15px 20px;
  text-decoration: none;
  color: #333;
  font-weight: 500;
  font-size: 14px;
  transition: background-color 0.2s;
  cursor: pointer;
}

.header-nav > ul > li:hover > a,
.header-nav > ul > li:hover > span {
  background-color: rgba(0, 0, 0, 0.1);
}

/* Dropdown Menus */
.header-nav ul ul {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  min-width: 200px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  z-index: 1001;
}

.header-nav li:hover ul {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.header-nav ul ul li {
  border-bottom: 1px solid #f0f0f0;
}

.header-nav ul ul li:last-child {
  border-bottom: none;
}

.header-nav ul ul a {
  padding: 12px 20px;
  color: #333;
  font-size: 13px;
  font-weight: normal;
  display: block;
  transition: background-color 0.2s;
}

.header-nav ul ul a:hover {
  background-color: #f8f8f8;
  color: #D40511;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .header-container {
    padding: 0 15px;
    height: 50px;
  }
  
  .header-logo a {
    font-size: 20px;
  }
  
  .header-utilities {
    gap: 15px;
  }
  
  .header-search input {
    width: 150px;
  }
  
  .header-nav > ul {
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #FFCC00;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: none;
  }
  
  .header-nav.mobile-open > ul {
    display: flex;
  }
  
  .header-nav > ul > li {
    width: 100%;
  }
  
  .header-nav ul ul {
    position: static;
    opacity: 1;
    visibility: visible;
    transform: none;
    box-shadow: none;
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .mobile-menu-toggle {
    display: block;
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    padding: 10px;
  }
}

@media (min-width: 769px) {
  .mobile-menu-toggle {
    display: none;
  }
}

/* Dropdown Arrow Indicators */
.header-nav > ul > li > span:after {
  content: '▼';
  font-size: 10px;
  margin-left: 8px;
  color: #666;
}

/* Accessibility */
.header-nav a:focus,
.header-nav span:focus {
  outline: 2px solid #D40511;
  outline-offset: 2px;
}

/* Search Icon */
.search-icon {
  width: 16px;
  height: 16px;
  fill: #666;
}

.globe-icon {
  width: 16px;
  height: 16px;
  fill: #666;
  margin-right: 5px;
}
`;
document.head.appendChild(style);
