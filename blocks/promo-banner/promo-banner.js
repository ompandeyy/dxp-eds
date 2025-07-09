export default function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const content = rows[0].children;
  const image = content[0]?.querySelector('picture')?.outerHTML || '';
  const title = content[1]?.textContent || '';
  const body = content[2]?.textContent || '';
  const ctaText = content[3]?.textContent || '';
  const ctaLink = content[4]?.textContent || '#';

  block.innerHTML = `
    <div class="promo-banner-inner">
      <div class="promo-banner-image">
        ${image}
      </div>
      <div class="promo-banner-content">
        <h2>${title}</h2>
        <p>${body}</p>
        <a class="eds-btn eds-btn--primary" href="${ctaLink}">${ctaText}</a>
      </div>
    </div>
  `;
}
