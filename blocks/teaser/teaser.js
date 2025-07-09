export default function decorate(block) {
  const [left, right] = block.children;

  // Apply class to the block
  block.classList.add('volumenversand');

  // Extract meaningful elements from right-hand side
  const imageWrapper = left.children[0];
  const title = right.children[1]?.querySelector('h2') || document.createElement('h2');
  const subtitle = right.children[2]?.textContent || '';
  const description = right.children[3]?.textContent || '';

  // Clear right column and rebuild
  right.innerHTML = '';
  right.appendChild(title);

  const subtitleEl = document.createElement('div');
  subtitleEl.className = 'subtitle';
  subtitleEl.textContent = subtitle;
  right.appendChild(subtitleEl);

  const descriptionEl = document.createElement('div');
  descriptionEl.className = 'description';
  descriptionEl.textContent = description;
  right.appendChild(descriptionEl);

  // Cards (hardcoded for now – could be extended to parse them from Helix table)
  const cardsWrapper = document.createElement('div');
  cardsWrapper.className = 'volumenversand-cards';

  const card1 = document.createElement('a');
  card1.className = 'volumenversand-card';
  card1.href = 'https://www.dhl.com/ecommerce';
  card1.innerHTML = `
    <div class="icon">📦</div>
    <div class="text">
      <h4>DHL eCommerce</h4>
      <p>Unsere Lösungen wurden von den E-Commerce-Spezialisten von DHL entwickelt und ermöglichen einen mühelosen Versand in europäische Länder.</p>
    </div>
  `;

  const card2 = document.createElement('a');
  card2.className = 'volumenversand-card';
  card2.href = 'https://www.dhl.com/express';
  card2.innerHTML = `
    <div class="icon">✈️</div>
    <div class="text">
      <h4>DHL Express</h4>
      <p>Schnell, Door-to-Door, Zustellung per Kurier. Time-Definite-Zustellung in über 220 Ländern.</p>
    </div>
  `;

  cardsWrapper.appendChild(card1);
  cardsWrapper.appendChild(card2);
  right.appendChild(cardsWrapper);
}
