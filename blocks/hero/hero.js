export default function decorate(block) {
  const title = block.querySelector('div:nth-child(1) div:nth-child(2)').textContent;
  const backgroundImage = block.querySelector('div:nth-child(2) div:nth-child(2)').textContent;
  const formPlaceholder = block.querySelector('div:nth-child(3) div:nth-child(2)').textContent;
  const formButtonText = block.querySelector('div:nth-child(4) div:nth-child(2)').textContent;

  block.innerHTML = `
    <img class="hero-background" src="${backgroundImage}" alt="DHL Delivery" loading="lazy">
    <div class="hero-content">
      <h1>${title}</h1>
      <form class="tracking-form" id="tracking-form">
        <input 
          type="text" 
          class="tracking-input" 
          placeholder="${formPlaceholder}"
          required
          name="tracking-number"
        >
        <button type="submit" class="tracking-submit">${formButtonText}</button>
      </form>
    </div>
  `;

  // Add form submission handling
  const form = block.querySelector('#tracking-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const trackingNumber = form.querySelector('input[name="tracking-number"]').value;
    if (trackingNumber.trim()) {
      // Handle tracking submission
      window.location.href = `/tracking-results?number=${encodeURIComponent(trackingNumber)}`;
    }
  });
}