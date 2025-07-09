export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 2) return;

  const contentRow = rows[1];
  const [title, subtitle, description, features, ctaText, ctaLink] = [...contentRow.children];

  const content = document.createElement('div');
  content.className = 'teaser-content';

  // Title
  const heading = title.querySelector('h2') || document.createElement('h2');
  content.appendChild(heading);

  // Subtitle
  const subtitleDiv = document.createElement('div');
  subtitleDiv.className = 'teaser-subtitle';
  subtitleDiv.textContent = subtitle.textContent;
  content.appendChild(subtitleDiv);

  // Description
  const descDiv = document.createElement('div');
  descDiv.className = 'teaser-description';
  descDiv.textContent = description.textContent;
  content.appendChild(descDiv);

  // Features
  const featureList = features.querySelector('ul');
  if (featureList) content.appendChild(featureList);

  // CTA
  const cta = document.createElement('a');
  cta.className = 'teaser-cta';
  cta.href = ctaLink.textContent;
  cta.textContent = ctaText.textContent;
  content.appendChild(cta);

  // Image (use placeholder background or set via table if needed)
  const image = document.createElement('div');
  image.className = 'teaser-image';
  image.style.backgroundImage = 'url("https://www.dhl.com/content/dam/dhl/global/core/images/marketing-stage-2730x1120/europe-core-homepage-banner.web.3840.1200.png")';

  // Clear and rebuild
  block.innerHTML = '';
  block.appendChild(content);
  block.appendChild(image);
}
