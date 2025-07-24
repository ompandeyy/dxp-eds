export default function decorate(block) {
  const [labels, content] = block.children;

  const picture = content.querySelector('picture');
  const titleText = content.children[1]?.textContent?.trim();
  const inputPlaceholder = content.children[2]?.textContent?.trim();
  const buttonText = content.children[3]?.textContent?.trim();

  block.classList.add('hero');
  block.innerHTML = '';

  // Background wrapper
  const backgroundWrapper = document.createElement('div');
  backgroundWrapper.className = 'hero-background';

  // Fetch the image URL from the <picture> tag
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const imgSrc = img.src; // Get the source URL from the <img> tag
      const inlineImg = document.createElement('img');
      inlineImg.src = imgSrc;
      inlineImg.alt = 'Background Image';
      backgroundWrapper.appendChild(inlineImg);
    }
  }

  // Content
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
