export default function decorate(block) {
  const title = block.children[1].children[0].textContent;
  const backgroundImageUrl = block.children[1].children[1].textContent;
  const formPlaceholder = block.children[1].children[2].textContent;
  const formButtonText = block.children[1].children[3].textContent;

  block.classList.add('hero');

  // Create and insert the full-width background element
  const backgroundDiv = document.createElement('div');
  backgroundDiv.className = 'hero-background';
  backgroundDiv.style.backgroundImage = `url(${backgroundImageUrl})`;
  block.appendChild(backgroundDiv);

  // Create content wrapper
  const contentDiv = document.createElement('div');
  contentDiv.className = 'hero-content';

  const h1 = document.createElement('h1');
  h1.textContent = title;
  contentDiv.appendChild(h1);

  const form = document.createElement('form');
  form.className = 'tracking-form';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = formPlaceholder;
  input.className = 'tracking-input';

  const button = document.createElement('button');
  button.type = 'submit';
  button.textContent = formButtonText;
  button.className = 'tracking-submit';

  form.appendChild(input);
  form.appendChild(button);
  contentDiv.appendChild(form);

  // Clear original block content and append
  block.textContent = '';
  block.appendChild(backgroundDiv);
  block.appendChild(contentDiv);
}
