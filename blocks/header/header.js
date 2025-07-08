export default function decorate(block) {
  // Find inner container (first div inside the header block)
  const wrapper = block.querySelector('.logo > div');
  if (!wrapper) return;

  wrapper.classList.add('header-main');
  const items = wrapper.querySelectorAll('div');

  items.forEach((item) => {
    item.classList.add('header-item');
    if (item.textContent.includes('↓')) {
      item.classList.add('dropdown');
    }
    if (item.textContent.includes('🌍')) {
      item.classList.add('locale-switch');
    }
    if (item.textContent.includes('🔐')) {
      item.classList.add('login-link');
    }
  });

  // Style the rest of the menus below the logo section
  const menus = block.querySelectorAll('p + ul');
  menus.forEach((ul) => {
    const title = ul.previousElementSibling;
    if (title && title.tagName === 'P') {
      title.classList.add('menu-title');
      ul.classList.add('menu-section');
    }
  });
}
