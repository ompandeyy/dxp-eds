import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

const isDesktop = window.matchMedia('(min-width: 900px)');

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('dhl-nav');
    const expandedSection = nav.querySelector('[aria-expanded="true"]');
    if (expandedSection) {
      toggleDropdowns(nav, false);
      expandedSection.focus();
    }
  }
}

function toggleDropdowns(nav, expand = false) {
  nav.querySelectorAll('.dhl-nav-sections .nav-drop').forEach((item) => {
    item.setAttribute('aria-expanded', expand);
  });
}

function toggleMenu(nav, forceOpen = null) {
  const isOpen = nav.getAttribute('aria-expanded') === 'true';
  const expanded = forceOpen !== null ? forceOpen : !isOpen;

  nav.setAttribute('aria-expanded', expanded);
  document.body.style.overflowY = expanded ? 'hidden' : '';
  toggleDropdowns(nav, false);

  const button = nav.querySelector('.nav-hamburger button');
  if (button) {
    button.setAttribute('aria-label', expanded ? 'Close navigation' : 'Open navigation');
  }

  if (expanded) {
    window.addEventListener('keydown', closeOnEscape);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
  }
}

export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/dhl-nav';
  const fragment = await loadFragment(navPath);

  // Build nav structure
  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'dhl-nav';
  nav.setAttribute('aria-expanded', 'false');

  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  // Apply section classes
  const [brand, sections, tools] = nav.children;
  if (brand) brand.classList.add('dhl-nav-brand');
  if (sections) sections.classList.add('dhl-nav-sections');
  if (tools) tools.classList.add('dhl-nav-tools');

  // Setup dropdowns
  if (sections) {
    sections.querySelectorAll(':scope > .default-content-wrapper > ul > li').forEach((item) => {
      const hasSubmenu = item.querySelector('ul');
      if (hasSubmenu) {
        item.classList.add('nav-drop');
        item.setAttribute('aria-expanded', 'false');

        item.addEventListener('click', () => {
          if (isDesktop.matches) {
            const expanded = item.getAttribute('aria-expanded') === 'true';
            toggleDropdowns(nav);
            item.setAttribute('aria-expanded', expanded ? 'false' : 'true');
          }
        });
      }
    });
  }

  // Hamburger (mobile)
  const hamburger = document.createElement('div');
  hamburger.className = 'nav-hamburger';
  hamburger.innerHTML = `
    <button type="button" aria-label="Open navigation" aria-controls="dhl-nav">
      <span class="nav-hamburger-icon"></span>
    </button>
  `;
  hamburger.addEventListener('click', () => toggleMenu(nav));
  nav.prepend(hamburger);

  // Responsive adjustment
  isDesktop.addEventListener('change', () => toggleMenu(nav, false));

  // Wrap and inject
  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);
}
