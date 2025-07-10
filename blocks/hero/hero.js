export default function decorate(block) {
  const [labels, content] = block.children;

  const picture = content.querySelector('picture');
  const title = content.children[1]?.textContent?.trim();
  const inputPlaceholder = content.children[2]?.textContent?.trim();
  const buttonText = content.children[3]?.textContent?.trim();

  // Extract image URL from picture
  const image = picture?.querySelector('img');
  const imageUrl = image?.src || '';

  // Add class to block
  block.classList.add('hero');

  // Clear block contents
  block.innerHTML = '';

  // Background image div
  const background = document.createElement('div');
  background.className = 'hero-background';
  background.style.backgroundImage = `url(${imageUrl})`;

  // Content wrapper
  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'hero-content';

  // Title
  const h1 = document.createElement('h1');
  h1.textContent = title;

  // Form
  const form = document.createElement('form');
  form.className = 'tracking-form';

  const input = document.createElement('input');
  input.className = 'tracking-input';
  input.type = 'text';
  input.placeholder = inputPlaceholder;

  const button = document.createElement('button');
  button.className = 'tracking-submit';
  button.type = 'submit';
  button.textContent = buttonText;

  form.appendChild(input);
  form.appendChild(button);

  // Assemble content
  contentWrapper.appendChild(h1);
  contentWrapper.appendChild(form);

  // Append to block
  block.appendChild(background);
  block.appendChild(contentWrapper);
}
