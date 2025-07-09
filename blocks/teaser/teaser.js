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

  // Append both columns to the block
  block.appendChild(imageCol);
  block.appendChild(contentCol);

  // Add class
  block.classList.add('teaser');
}
