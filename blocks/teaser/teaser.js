export default function decorate(block) {
  // Extract elements from the block
  const teaserTitle = block.querySelector('.teaser-title').textContent;
  const teaserSubtitle = block.querySelector('.teaser-subtitle').textContent;
  const teaserDescription = block.querySelector('.teaser-description').textContent;
  const teaserServices = block.querySelector('.teaser-services');
  const teaserCTA = block.querySelector('.teaser-cta').textContent;
  const teaserImageSrc = block.querySelector('.teaser-image img').src;

  // Create the container for the teaser content
  const teaserContainer = document.createElement('div');
  teaserContainer.className = 'teaser-container';

  // Create the content section
  const teaserContent = document.createElement('div');
  teaserContent.className = 'teaser-content';

  // Create and append the title
  const titleElement = document.createElement('h2');
  titleElement.className = 'teaser-title';
  titleElement.textContent = teaserTitle;
  teaserContent.appendChild(titleElement);

  // Create and append the subtitle
  const subtitleElement = document.createElement('p');
  subtitleElement.className = 'teaser-subtitle';
  subtitleElement.textContent = teaserSubtitle;
  teaserContent.appendChild(subtitleElement);

  // Create and append the description
  const descriptionElement = document.createElement('p');
  descriptionElement.className = 'teaser-description';
  descriptionElement.textContent = teaserDescription;
  teaserContent.appendChild(descriptionElement);

  // Append the services section
  teaserContent.appendChild(teaserServices);

  // Create and append the CTA button
  const ctaElement = document.createElement('a');
  ctaElement.className = 'teaser-cta';
  ctaElement.href = block.querySelector('.teaser-cta').href;
  ctaElement.textContent = teaserCTA;
  teaserContent.appendChild(ctaElement);

  // Create the image section
  const teaserImage = document.createElement('div');
  teaserImage.className = 'teaser-image';
  const imgElement = document.createElement('img');
  imgElement.src = teaserImageSrc;
  imgElement.alt = 'Dokumenten- und Paketversand';
  teaserImage.appendChild(imgElement);

  // Clear the block and append the teaser container
  block.textContent = '';
  teaserContainer.appendChild(teaserContent);
  teaserContainer.appendChild(teaserImage);
  block.appendChild(teaserContainer);
}
