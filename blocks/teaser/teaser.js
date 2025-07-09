export default function decorate(block) {
  const rows = [...block.children];
  
  // Skip the header row
  const dataRow = rows[1];
  const cells = [...dataRow.children];
  
  // Extract data from cells
  const title = cells[0].textContent.trim();
  const shortTitle = cells[1].textContent.trim();
  const description = cells[2].textContent.trim();
  const servicesHtml = cells[3].innerHTML;
  const ctaTitle = cells[4].textContent.trim();
  const ctaLink = cells[5].textContent.trim();
  const imageUrl = cells[6].textContent.trim();
  
  // Clear the block
  block.innerHTML = '';
  
  // Create the teaser structure
  const teaserContainer = document.createElement('div');
  teaserContainer.className = 'teaser-container';
  
  // Left content section
  const contentSection = document.createElement('div');
  contentSection.className = 'teaser-content';
  
  // Title
  const titleElement = document.createElement('h2');
  titleElement.className = 'teaser-title';
  titleElement.textContent = title;
  
  // Short title
  const shortTitleElement = document.createElement('p');
  shortTitleElement.className = 'teaser-subtitle';
  shortTitleElement.textContent = shortTitle;
  
  // Description
  const descriptionElement = document.createElement('p');
  descriptionElement.className = 'teaser-description';
  descriptionElement.textContent = description;
  
  // Services section
  const servicesSection = document.createElement('div');
  servicesSection.className = 'teaser-services';
  
  const servicesTitle = document.createElement('h3');
  servicesTitle.className = 'services-title';
  servicesTitle.textContent = 'Verfügbare Services';
  
  const servicesGrid = document.createElement('div');
  servicesGrid.className = 'services-grid';
  
  // Parse services from HTML and create service items
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = servicesHtml;
  const servicesList = tempDiv.querySelector('ul');
  
  if (servicesList) {
    const serviceItems = [...servicesList.children];
    serviceItems.forEach(item => {
      const serviceItem = document.createElement('div');
      serviceItem.className = 'service-item';
      
      const serviceIcon = document.createElement('div');
      serviceIcon.className = 'service-icon';
      serviceIcon.innerHTML = '📦'; // Using emoji as placeholder for DHL icons
      
      const serviceText = document.createElement('span');
      serviceText.className = 'service-text';
      serviceText.textContent = item.textContent;
      
      serviceItem.appendChild(serviceIcon);
      serviceItem.appendChild(serviceText);
      servicesGrid.appendChild(serviceItem);
    });
  }
  
  // CTA Button
  const ctaButton = document.createElement('a');
  ctaButton.className = 'teaser-cta';
  ctaButton.href = ctaLink;
  ctaButton.textContent = `${ctaTitle} unsere Versandoptionen`;
  
  // Right image section
  const imageSection = document.createElement('div');
  imageSection.className = 'teaser-image';
  
  const image = document.createElement('img');
  image.src = imageUrl;
  image.alt = title;
  image.loading = 'lazy';
  
  // Assemble the structure
  servicesSection.appendChild(servicesTitle);
  servicesSection.appendChild(servicesGrid);
  
  contentSection.appendChild(titleElement);
  contentSection.appendChild(shortTitleElement);
  contentSection.appendChild(descriptionElement);
  contentSection.appendChild(servicesSection);
  contentSection.appendChild(ctaButton);
  
  imageSection.appendChild(image);
  
  teaserContainer.appendChild(contentSection);
  teaserContainer.appendChild(imageSection);
  
  block.appendChild(teaserContainer);
}
