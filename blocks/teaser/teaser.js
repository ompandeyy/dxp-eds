export default function decorate(block) {
  const rows = [...block.children];
  const content = rows[1]?.children;

  if (!content || content.length < 6) return;

  const [title, subtitle, description, servicesBlock, ctaText, ctaLink] = content;

  // Extract services as array
  const services = [...servicesBlock.querySelectorAll('li')];

  // Extract image from first column
  const imageWrapper = rows[0];
  const imageEl = imageWrapper.querySelector('img');

  block.innerHTML = `
    <div class="teaser-wrapper">
      <div class="teaser-left">
        <div class="teaser-content">
          <h2>${title.textContent}</h2>
          <p class="subtitle">${subtitle.textContent}</p>
          <div class="divider"></div>
          <p class="description">${description.textContent}</p>
          <div class="services">
            <p class="services-title">${servicesBlock.querySelector('strong')?.textContent || ''}</p>
            <ul class="icon-list">
              ${services.map((li, index) => `
                <li>
                  <span class="icon icon-${index + 1}"></span>
                  <span>${li.textContent.replace(/^.*?:/, '').trim()}</span>
                </li>
              `).join('')}
            </ul>
          </div>
          <div class="cta-container">
            <a href="${ctaLink.textContent}" class="cta-button">${ctaText.textContent}</a>
          </div>
        </div>
      </div>
      <div class="teaser-right">
        ${imageEl ? `<img src="${imageEl.src}" alt="${imageEl.alt}">` : ''}
      </div>
    </div>
  `;
}
