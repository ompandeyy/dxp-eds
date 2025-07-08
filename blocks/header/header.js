import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

export default function decorate(block) {
  const dropdownLinks = block.querySelectorAll('a.dropdown');

  dropdownLinks.forEach(link => {
    const submenu = link.parentElement.querySelector('.dropdown-menu');
    if (!submenu) return;

    link.addEventListener('click', (e) => {
      e.preventDefault();
      // Close all others
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        if (menu !== submenu) menu.classList.remove('active');
      });
      submenu.classList.toggle('active');
    });
  });

  // Close dropdowns on outside click
  document.addEventListener('click', (e) => {
    if (!block.contains(e.target)) {
      block.querySelectorAll('.dropdown-menu').forEach(menu => menu.classList.remove('active'));
    }
  });

  // Optional: add class to active nav link
  const currentPath = window.location.pathname;
  block.querySelectorAll('nav a').forEach((a) => {
    if (a.href.includes(currentPath)) {
      a.classList.add('active');
    }
  });
}

