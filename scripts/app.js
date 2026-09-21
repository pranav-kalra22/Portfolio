/**
 * Pranav Kalra Portfolio — Core Application Script
 * Orchestrates navigation, scroll spy, project progressive drawers,
 * interactive pipeline steps, topology switches, and resume modal.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initProjectDrawers();
  initCodeSensePipeline();
  initCryptoShieldTopology();
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
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
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
   PROGRESSIVE DISCLOSURE PROJECT DRAWERS ("ENGINEER MODE")
   -------------------------------------------------------------------------- */
function initProjectDrawers() {
  const toggleButtons = document.querySelectorAll('.js-toggle-drawer');

  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const drawer = document.getElementById(targetId);
      if (!drawer) return;

      const isExpanded = drawer.classList.contains('is-expanded');

      if (isExpanded) {
        drawer.classList.remove('is-expanded');
        btn.setAttribute('aria-expanded', 'false');
        btn.querySelector('.drawer-toggle-text').textContent = 'Inspect Architecture & Defense';
        const chevron = btn.querySelector('.drawer-chevron');
        if (chevron) chevron.style.transform = 'rotate(0deg)';
      } else {
        drawer.classList.add('is-expanded');
        btn.setAttribute('aria-expanded', 'true');
        btn.querySelector('.drawer-toggle-text').textContent = 'Close Architecture Drawer';
        const chevron = btn.querySelector('.drawer-chevron');
        if (chevron) chevron.style.transform = 'rotate(180deg)';

        // Scroll slightly if drawer is off-screen
        setTimeout(() => {
          const rect = drawer.getBoundingClientRect();
          if (rect.top < 80) {
            window.scrollBy({ top: rect.top - 90, behavior: 'smooth' });
          }
        }, 150);
      }
    });
  });

  // Drawer Tabs Switcher
  const drawerTabButtons = document.querySelectorAll('.drawer-tab-btn');
  drawerTabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const parentDrawer = btn.closest('.project-drawer');
      if (!parentDrawer) return;

      const targetPanelId = btn.getAttribute('data-tab');

      // Update buttons
      parentDrawer.querySelectorAll('.drawer-tab-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Update panels
      parentDrawer.querySelectorAll('.drawer-panel').forEach(panel => {
        panel.classList.remove('active');
      });

      const activePanel = parentDrawer.querySelector(`.drawer-panel[data-panel="${targetPanelId}"]`);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   CODESENSE INTERACTIVE PIPELINE FLOW
   -------------------------------------------------------------------------- */
function initCodeSensePipeline() {
  const nodes = document.querySelectorAll('.pipeline-node');
  const detailCard = document.getElementById('cs-pipeline-detail');
  if (!nodes.length || !detailCard) return;

  const stepDetails = {
    '1': {
      title: 'Stage 1: HMAC Webhook Ingestion & Redis Lock',
      runtime: 'Go 1.22 (Port 8000) • 45ms',
      desc: 'Validates GitHub <code>X-Hub-Signature-256</code> in constant time using <code>hmac.Equal()</code>. Sets an atomic 300-second <code>SetNX</code> idempotency lock on the commit SHA, enqueuing raw payloads into Redis list <code>review_jobs</code>.'
    },
    '2': {
      title: 'Stage 2: Diff Fetch Worker & Decompression',
      runtime: 'Go Review Worker • 310ms',
      desc: 'Worker dequeues payload via blocking <code>BRPOP(2s)</code>. Calls GitHub REST API to fetch unified raw diffs without cloning massive multi-gigabyte repositories, isolating changed lines.'
    },
    '3': {
      title: 'Stage 3: Tree-Sitter AST & Dense Vectorization',
      runtime: 'Python 3.11 Microservice (Port 8001) • 1,820ms',
      desc: 'Tree-Sitter parses concrete syntax trees across 4 languages (Go, Python, JS, TS) to extract complete functional units. <code>microsoft/codebert-base</code> produces 768-dimensional embeddings.'
    },
    '4': {
      title: 'Stage 4: Hybrid RAG & Anisotropy Calibration',
      runtime: 'ChromaDB HNSW + Groq LPU • 8,515ms',
      desc: 'Retrieves top-k context using Reciprocal Rank Fusion (k=60) between BM25 and vector search. Remaps BERT anisotropic score cone [0.70, 0.99] into a realistic 50%–99% spread, then prompts Groq LPU with temperature 0.1.'
    },
    '5': {
      title: 'Stage 5: Coordinate Guardrail & GitHub Publishing',
      runtime: 'Go Review Worker • 710ms',
      desc: 'Cross-references model suggestions against parsed diff added lines (<code>+</code> lines). Automatically prunes out-of-bounds coordinates, eliminating GitHub HTTP 422 Unprocessable Entity errors.'
    }
  };

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      nodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      const step = node.getAttribute('data-step');
      const data = stepDetails[step];
      if (data) {
        detailCard.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
            <strong style="color: #38BDF8; font-family: var(--font-mono); font-size: 0.85rem;">${data.title}</strong>
            <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #34D399; background: rgba(52, 211, 153, 0.1); padding: 0.2rem 0.5rem; border-radius: 4px;">${data.runtime}</span>
          </div>
          <div style="font-size: 0.88rem; color: #CBD5E1; line-height: 1.55;">${data.desc}</div>
        `;
      }
    });
  });
}

/* --------------------------------------------------------------------------
   CRYPTOSHIELD INTERACTIVE TOPOLOGY SWITCH
   -------------------------------------------------------------------------- */
function initCryptoShieldTopology() {
  const switchButtons = document.querySelectorAll('.topology-btn');
  const views = document.querySelectorAll('.topology-view');
  if (!switchButtons.length || !views.length) return;

  switchButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTopology = btn.getAttribute('data-target');

      switchButtons.forEach(b => b.classList.remove('active'));
      views.forEach(v => v.classList.remove('active'));

      btn.classList.add('active');
      const activeView = document.getElementById(targetTopology);
      if (activeView) {
        activeView.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   RESUME PREVIEW MODAL
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
