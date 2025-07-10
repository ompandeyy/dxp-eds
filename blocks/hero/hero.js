export default function decorate(block) {
  // Get the title, background image, form placeholder, and form button text
  const title = block.querySelector('h1').textContent; // Title
  const backgroundImageUrl = block.style.backgroundImage.slice(5, -2); // Background image URL
  const formPlaceholder = block.querySelector('.hero-input').placeholder; // Form placeholder
  const formButtonText = block.querySelector('.hero-button').textContent; // Form button text

  // Set the background image for the block itself
  block.style.backgroundImage = `url(${backgroundImageUrl})`;
  block.style.backgroundSize = 'cover';
  block.style.backgroundPosition = 'center center';
  block.style.color = 'white'; // Optional: Change text color for better visibility

  // Create a container for the hero content
  const heroContainer = document.createElement('div');
  heroContainer.className = 'hero-container';

  // Create and append the title
  const titleElement = document.createElement('h1');
  titleElement.textContent = title;
  heroContainer.appendChild(titleElement);

  // Create the form
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

  // Append input and button to the form
  form.appendChild(input);
  form.appendChild(button);
  heroContainer.appendChild(form);

  // Clear the block and append the hero container
  block.textContent = '';
  block.appendChild(heroContainer);
}
