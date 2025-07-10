export default function decorate(block) {
  const picture = block.querySelector('picture');
  const titleText = block.querySelector('div:nth-child(2)')?.textContent?.trim();
  const inputPlaceholder = block.querySelector('div:nth-child(3)')?.textContent?.trim();
  const buttonText = block.querySelector('div:nth-child(4)')?.textContent?.trim();

  block.classList.add('hero');
  block.innerHTML = '';

  const backgroundWrapper = document.createElement('div');
  backgroundWrapper.className = 'hero-background';
  if (picture) backgroundWrapper.appendChild(picture);

  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'hero-content';

  const title = document.createElement('h1');
  title.textContent = titleText;
  contentWrapper.appendChild(title);

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
  contentWrapper.appendChild(form);

  block.appendChild(backgroundWrapper);
  block.appendChild(contentWrapper);
}
