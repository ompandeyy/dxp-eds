export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length !== 2) return;

  const [labels, values] = rows;

  const teaserData = {};
  [...labels.children].forEach((child, i) => {
    const key = child.textContent.trim().toLowerCase().replace(/\s+/g, '-');
    teaserData[key] = values.children[i]?.innerHTML || '';
  });

  block.innerHTML = `
    <div class="teaser-content">
      <div>
        <h2>${teaserData['title'] || ''}</h2>
        <p class="short-title">${teaserData['short-title'] || ''}</p>
        <p class="description">${teaserData['description'] || ''}</p>
        <div class="icon-list">${teaserData['verfuegbare-service'] || ''}</div>
        <a class="button" href="${teaserData['cta-link'] || '#'}">${teaserData['cta-title'] || 'Mehr erfahren'}</a>
      </div>
    </div>
    <div class="teaser-image">
      <img src="${teaserData['image-url'] || '/placeholder.jpg'}" alt="${teaserData['title'] || ''}">
    </div>
  `;
}
