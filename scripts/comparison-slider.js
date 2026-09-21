/**
 * Pranav Kalra Portfolio — Interactive Radiographic Image Comparison Slider
 * Provides smooth before/after comparison between low-dose noisy X-rays and NAFNet restored X-rays.
 * Supports mouse drag, touch events, and keyboard accessibility.
 */

function initComparisonSlider() {
  const container = document.getElementById('xray-slider-container');
  if (!container) return;

  const afterWrap = container.querySelector('.slider-image-after-wrap');
  const handle = container.querySelector('.slider-handle');
  if (!afterWrap || !handle) return;

  let isDragging = false;

  function setSliderPosition(x) {
    const rect = container.getBoundingClientRect();
    if (rect.width === 0) return;
    let offsetX = x - rect.left;
    if (offsetX < 0) offsetX = 0;
    if (offsetX > rect.width) offsetX = rect.width;

    const percentage = (offsetX / rect.width) * 100;
    afterWrap.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
    handle.setAttribute('aria-valuenow', Math.round(percentage));
  }

  // Set initial position to 50%
  afterWrap.style.width = '50%';
  handle.style.left = '50%';
  handle.setAttribute('aria-valuenow', '50');

  // Mouse Events
  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    setSliderPosition(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    setSliderPosition(e.clientX);
  });

  // Touch Events for Mobile
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    if (e.touches.length > 0) {
      setSliderPosition(e.touches[0].clientX);
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length === 0) return;
    setSliderPosition(e.touches[0].clientX);
  }, { passive: true });

  // Keyboard Accessibility
  handle.addEventListener('keydown', (e) => {
    const current = parseFloat(handle.getAttribute('aria-valuenow') || '50');
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const next = Math.max(0, current - 5);
      afterWrap.style.width = `${next}%`;
      handle.style.left = `${next}%`;
      handle.setAttribute('aria-valuenow', next);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = Math.min(100, current + 5);
      afterWrap.style.width = `${next}%`;
      handle.style.left = `${next}%`;
      handle.setAttribute('aria-valuenow', next);
    }
  });
}

document.addEventListener('DOMContentLoaded', initComparisonSlider);
