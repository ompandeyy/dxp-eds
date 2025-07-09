export default function decorate(block) {
  const [meta, content] = block.children;

  const img = content.querySelector('picture');
  const title = content.querySelector('h2');
  const subtitle = content.children[2];
  const description = content.children[3];

  // Clear the block
  block.innerHTML = '';

  // Build image column
  const imageCol = document.createElement('div');
  imageCol.className = 'teaser-image';
  if (img) imageCol.appendChild(img);

  // Build content column
  const contentCol = document.createElement('div');
  contentCol.className = 'teaser-content';

  if (title) {
    const h2 = document.createElement('h2');
    h2.textContent = title.textContent;
    contentCol.appendChild(h2);
  }

  if (subtitle) {
    const sub = document.createElement('div');
    sub.className = 'teaser-subtitle';
    sub.textContent = subtitle.textContent;
    contentCol.appendChild(sub);
  }

  if (description) {
    const p = document.createElement('p');
    p.textContent = description.textContent;
    contentCol.appendChild(p);
  }

  // Add DHL service cards
  const cardsWrapper = document.createElement('div');
  cardsWrapper.className = 'teaser-cards';

  // Card 1: DHL eCommerce
  const card1 = document.createElement('div');
  card1.className = 'teaser-card';
  card1.innerHTML = `
    <div class="card-icon">🚚</div>
    <div class="card-content">
      <strong>DHL eCommerce</strong>
      <p>Unsere Lösungen wurden von den E-Commerce-Spezialisten von DHL entwickelt und ermöglichen einen mühelosen Versand in europäische Länder.</p>
    </div>
  `;

  // Card 2: DHL Express
  const card2 = document.createElement('div');
  card2.className = 'teaser-card';
  card2.innerHTML = `
    <div class="card-icon">✈️</div>
    <div class="card-content">
      <strong>DHL Express</strong>
      <p>Schnell, Door-to-Door, Zustellung per Kurier. Time-Definite-Zustellung in über 220 Ländern</p>
    </div>
  `;

  cardsWrapper.appendChild(card1);
  cardsWrapper.appendChild(card2);
  contentCol.appendChild(cardsWrapper);

  // Append both columns to the block
  block.appendChild(imageCol);
  block.appendChild(contentCol);

  // Add class
  block.classList.add('teaser');
}
