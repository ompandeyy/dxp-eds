import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

const isDesktop = window.matchMedia('(min-width: 900px)');

function toggleMenu(nav, sections, expand = null) {
  const expanded = expand !== null ? expand : nav.getAttribute('aria-expanded') === 'true';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  document.body.style.overflowY = expanded ? '' : 'hidden';
}

function closeDropdowns(sections) {
  sections.querySelectorAll('[aria-expanded="true"]').forEach(el => el.setAttribute('aria-expanded', 'false'));
}

export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);
  if (!fragment) return;

  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  nav.setAttribute('aria-expanded', 'false');
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  // Add hamburger for mobile
  const hamburger = document.createElement('button');
  hamburger.className = 'nav-hamburger';
  hamburger.setAttribute('aria-label', 'Toggle navigation menu');
  hamburger.addEventListener('click', () => {
    const sections = nav.querySelector('.nav-sections');
    toggleMenu(nav, sections);
  });
  nav.prepend(hamburger);

  // Attach dropdown toggles
  const sections = nav.querySelector('.nav-sections');
  sections?.querySelectorAll(':scope > .nav-section').forEach(sec => {
    const btn = sec.querySelector(':scope > button, a');
    const sub = sec.querySelector(':scope > ul');
    if (btn && sub) {
      btn.classList.add('nav-drop');
      btn.setAttribute('aria-expanded', 'false');
      btn.addEventListener('click', e => {
        e.preventDefault();
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        closeDropdowns(sections);
        btn.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
      });
    }
  });

  // Close dropdowns onOutside click/Esc key
  document.addEventListener('click', e => {
    if (!nav.contains(e.target)) closeDropdowns(sections);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeDropdowns(sections);
      nav.setAttribute('aria-expanded', 'false');
      document.body.style.overflowY = '';
    }
  });

  block.append(nav);
}
