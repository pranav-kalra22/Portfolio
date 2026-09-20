/**
 * Pranav Kalra Portfolio — Core Application Script
 * Orchestrates navigation, scroll spies, case study tab switching, and modal controls.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initCaseStudyTabs();
  initResumeModal();
});

/* --------------------------------------------------------------------------
   NAVIGATION & SCROLL SPY
   -------------------------------------------------------------------------- */
function initNavigation() {
  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const allNavAnchors = document.querySelectorAll('.nav-link');

  // Sticky header background state
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile menu toggle
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.contains('mobile-open');
      if (isOpen) {
        navLinks.classList.remove('mobile-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      } else {
        navLinks.classList.add('mobile-open');
        menuToggle.setAttribute('aria-expanded', 'true');
      }
    });

    // Close mobile menu when clicking any nav link
    allNavAnchors.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active section tracking with IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const activeId = entry.target.getAttribute('id');
          allNavAnchors.forEach(link => {
            if (link.getAttribute('href') === `#${activeId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(sec => observer.observe(sec));
  }
}

/* --------------------------------------------------------------------------
   CASE STUDY TABS SWITCHER
   -------------------------------------------------------------------------- */
function initCaseStudyTabs() {
  const caseStudyCards = document.querySelectorAll('.case-study-card');

  caseStudyCards.forEach(card => {
    const tabButtons = card.querySelectorAll('.tab-btn');
    const tabPanels = card.querySelectorAll('.tab-panel');

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');

        // Deactivate siblings
        tabButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        tabPanels.forEach(p => p.classList.remove('active'));

        // Activate target
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const activePanel = card.querySelector(`.tab-panel[data-panel="${targetTab}"]`);
        if (activePanel) {
          activePanel.classList.add('active');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   RESUME MODAL DIALOG
   -------------------------------------------------------------------------- */
function initResumeModal() {
  const openButtons = document.querySelectorAll('.js-open-resume');
  const modal = document.getElementById('resume-modal');
  const closeButton = document.getElementById('close-resume-modal');

  if (!modal) return;

  function openModal(e) {
    if (e) e.preventDefault();
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => btn.addEventListener('click', openModal));

  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }

  // Backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}
