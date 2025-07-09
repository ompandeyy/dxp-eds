export default function decorate(block) {
  const [textCol, imgCol] = block.children;

  // Move image div to the second column
  const img = imgCol.querySelector('picture');
  if (img) {
    const imageWrapper = document.createElement('div');
    imageWrapper.appendChild(img);
    block.insertBefore(imageWrapper, textCol);
    imgCol.remove(); // remove old image column
  }

  // Add proper classes if needed
  block.classList.add('teaser');
}
