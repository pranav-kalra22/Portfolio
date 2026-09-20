/**
 * Pranav Kalra Portfolio — Contact Form & Copy-To-Clipboard Management
 * Provides instant feedback, copy utilities, and accessible form handling.
 */

function initContactUtilities() {
  // 1. Copy Email to Clipboard
  const copyButtons = document.querySelectorAll('.js-copy-email');
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = 'pranavkalra04@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        const originalText = btn.innerHTML;
        btn.innerHTML = `
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>Copied!</span>
        `;
        btn.classList.add('btn-success');
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.remove('btn-success');
        }, 2200);
      } catch (err) {
        // Fallback for older browsers
        window.location.href = `mailto:${email}`;
      }
    });
  });

  // 2. Contact Form Handling
  const form = document.getElementById('contact-form');
  const alertBox = document.getElementById('form-alert');

  if (form && alertBox) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name')?.value.trim();
      const email = document.getElementById('contact-email')?.value.trim();
      const subject = document.getElementById('contact-subject')?.value.trim();
      const message = document.getElementById('contact-message')?.value.trim();

      // Basic client-side validation
      if (!name || !email || !message) {
        alertBox.className = 'form-alert error';
        alertBox.textContent = 'Please fill out your name, email, and message.';
        alertBox.style.display = 'block';
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alertBox.className = 'form-alert error';
        alertBox.textContent = 'Please enter a valid email address.';
        alertBox.style.display = 'block';
        return;
      }

      // Generate pre-populated mailto URL so recruiter gets an instant direct link
      const mailtoSubject = encodeURIComponent(subject ? `[Portfolio Inquiry] ${subject}` : `[Portfolio Inquiry] from ${name}`);
      const mailtoBody = encodeURIComponent(`Hi Pranav,\n\n${message}\n\nBest regards,\n${name}\n${email}`);
      const mailtoUrl = `mailto:pranavkalra04@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

      alertBox.className = 'form-alert success';
      alertBox.innerHTML = `Thank you, <strong>${escapeHtml(name)}</strong>! Opening your email client to send your message to <strong>pranavkalra04@gmail.com</strong>...`;
      alertBox.style.display = 'block';

      // Launch email client
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 750);
    });
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', initContactUtilities);
