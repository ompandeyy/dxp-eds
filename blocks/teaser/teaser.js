export default function decorate(block) {
  // Remove heading structure if it exists (row 1)
  const headingRow = block.querySelector(':scope > div:first-child');
  if (headingRow) headingRow.style.display = 'none';

  const contentRow = block.querySelector(':scope > div:nth-child(2)');
  if (!contentRow) return;

  const [
    headingEl,
    subheadingEl,
    descriptionEl,
    listEl,
    ctaTextEl,
    ctaLinkEl,
  ] = Array.from(contentRow.children);

  headingEl.classList.add('teaser-heading');
  subheadingEl.classList.add('teaser-subheading');
  descriptionEl.classList.add('teaser-description');
  listEl.classList.add('teaser-list');
  ctaTextEl.classList.add('teaser-cta');
  ctaLinkEl.classList.add('teaser-link');

  // Make CTA clickable
  const link = ctaLinkEl.textContent?.trim();
  const buttonText = ctaTextEl.textContent?.trim();
  if (link && buttonText) {
    const a = document.createElement('a');
    a.href = link;
    a.className = 'teaser-button';
    a.textContent = buttonText;
    ctaTextEl.replaceWith(a);
    ctaLinkEl.remove();
  }
}
