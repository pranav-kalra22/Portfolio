/**
 * Pranav Kalra Portfolio — Hero Interactive System Architecture Visual
 * Renders a lightweight, interactive live event-driven architecture pipeline.
 * Visitors can hover/click pipeline stages to inspect real-time system metrics.
 */

function initHeroVisual() {
  const container = document.getElementById('hero-system-canvas');
  if (!container) return;

  const stages = [
    {
      id: 'ingest',
      label: '1. Ingestion Layer',
      tech: 'Go 1.22 / Kafka 3.4',
      metric: '<45ms Latency',
      desc: 'HMAC-SHA256 signature validation & dual-topic append-only streaming buffer.'
    },
    {
      id: 'queue',
      label: '2. Queue & Lock',
      tech: 'Redis 7 (SetNX)',
      metric: '300s TTL Idempotency',
      desc: 'Distributed atomic locking prevents redundant job processing under concurrent bursts.'
    },
    {
      id: 'compute',
      label: '3. Syntax & Graph',
      tech: 'Tree-Sitter / Spark 4.1',
      metric: '4 AST Parsers',
      desc: 'Extracts exact function scopes and builds in-memory directed interaction graphs.'
    },
    {
      id: 'rag',
      label: '4. Hybrid RAG & Vector',
      tech: 'CodeBERT / ChromaDB',
      metric: 'RRF Fusion (k=60)',
      desc: 'Combines sparse BM25 with calibrated dense embeddings to ground model inference.'
    },
    {
      id: 'guardrail',
      label: '5. Deterministic Guardrail',
      tech: 'Go Zero-Trust Worker',
      metric: '0 API 422 Errors',
      desc: 'Prunes out-of-boundary suggestions and verifies coordinates before output dispatch.'
    }
  ];

  let activeIndex = 0;
  let isPaused = false;

  function render() {
    let html = `
      <div style="display: flex; flex-direction: column; gap: 0.75rem; height: 100%; justify-content: space-between;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 0.75rem;">
          <div style="font-family: var(--font-mono); font-size: 0.78rem; color: #38BDF8; display: flex; align-items: center; gap: 0.5rem;">
            <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #10B981; box-shadow: 0 0 8px #10B981;"></span>
            LIVE SYSTEM TELEMETRY
          </div>
          <span style="font-family: var(--font-mono); font-size: 0.74rem; color: #94A3B8;">Event-Driven Microservices</span>
        </div>

        <div class="system-stages-list" style="display: flex; flex-direction: column; gap: 0.5rem;">
    `;

    stages.forEach((stage, idx) => {
      const isActive = idx === activeIndex;
      html += `
        <div class="hero-stage-item ${isActive ? 'active' : ''}" data-idx="${idx}" style="
          background: ${isActive ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.03)'};
          border: 1px solid ${isActive ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.07)'};
          border-left: 3px solid ${isActive ? '#38BDF8' : 'rgba(255, 255, 255, 0.15)'};
          border-radius: var(--radius-sm);
          padding: 0.6rem 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: space-between;
        ">
          <div>
            <div style="font-size: 0.84rem; font-weight: 600; color: ${isActive ? '#FFFFFF' : '#CBD5E1'};">
              ${stage.label}
            </div>
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: #94A3B8;">
              ${stage.tech}
            </div>
          </div>
          <div style="font-family: var(--font-mono); font-size: 0.72rem; color: ${isActive ? '#34D399' : '#64748B'}; background: rgba(0,0,0,0.3); padding: 0.2rem 0.5rem; border-radius: 4px;">
            ${stage.metric}
          </div>
        </div>
      `;
    });

    const curr = stages[activeIndex];
    html += `
        </div>

        <div style="background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: var(--radius-sm); padding: 0.85rem 1rem; font-size: 0.82rem; line-height: 1.45; color: #CBD5E1;">
          <strong style="color: #38BDF8; font-family: var(--font-mono); font-size: 0.75rem; text-transform: uppercase;">Active Stage Detail:</strong>
          <div style="margin-top: 0.25rem;">${curr.desc}</div>
        </div>
      </div>
    `;

    container.innerHTML = html;

    // Attach click events
    container.querySelectorAll('.hero-stage-item').forEach(el => {
      el.addEventListener('click', () => {
        activeIndex = parseInt(el.getAttribute('data-idx'), 10);
        isPaused = true;
        render();
      });
      el.addEventListener('mouseenter', () => {
        isPaused = true;
      });
      el.addEventListener('mouseleave', () => {
        isPaused = false;
      });
    });
  }

  render();

  // Subtle auto-progression loop (cycles active stage every 4 seconds)
  setInterval(() => {
    if (!isPaused && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      activeIndex = (activeIndex + 1) % stages.length;
      render();
    }
  }, 4000);
}

document.addEventListener('DOMContentLoaded', initHeroVisual);
