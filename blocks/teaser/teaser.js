export default function decorate(block) {
  // Extract elements from the block
  const teaserElements = block.querySelectorAll('div > div');
  const teaserTitle = teaserElements[1].children[0].textContent;
  const teaserSubtitle = teaserElements[1].children[1].textContent;
  const teaserDescription = teaserElements[1].children[2].textContent;
  const teaserServices = teaserElements[1].children[3].querySelectorAll('li');
  const teaserCTA = teaserElements[1].children[4].textContent;
  const teaserCTALink = teaserElements[1].children[5].textContent;
  const teaserImageSrc = teaserElements[1].children[6].textContent;

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

  // Create the services section
  const servicesElement = document.createElement('div');
  servicesElement.className = 'teaser-services';
  const servicesTitle = document.createElement('h3');
  servicesTitle.className = 'services-title';
  servicesTitle.textContent = 'Verfügbare Services';
  servicesElement.appendChild(servicesTitle);
  const servicesGrid = document.createElement('div');
  servicesGrid.className = 'services-grid';
  teaserServices.forEach(service => {
    const serviceItem = document.createElement('div');
    serviceItem.className = 'service-item';
    const serviceIcon = document.createElement('div');
    serviceIcon.className = 'service-icon';
    serviceIcon.textContent = '📦'; // Placeholder icon
    const serviceText = document.createElement('span');
    serviceText.className = 'service-text';
    serviceText.textContent = service.textContent;
    serviceItem.appendChild(serviceIcon);
    serviceItem.appendChild(serviceText);
    servicesGrid.appendChild(serviceItem);
  });
  servicesElement.appendChild(servicesGrid);
  teaserContent.appendChild(servicesElement);

  // Create and append the CTA button
  const ctaElement = document.createElement('a');
  ctaElement.className = 'teaser-cta';
  ctaElement.href = teaserCTALink;
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
