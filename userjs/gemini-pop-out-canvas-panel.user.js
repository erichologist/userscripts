// ==UserScript==
// @name         Gemini Pop-out Canvas Panel
// @downloadURL  https://github.com/erichologist/userscripts/raw/refs/heads/main/userjs/gemini-pop-out-canvas-panel.user.js
// @namespace    https://greasyfork.org/en/users/1467106-finickyspider
// @version      1.1.0
// @description  Moves the real <immersive-panel> into a fullscreen-capable modal and restores it back. Works across all Canvas projects.
// @author       FinickySpider
// @match        https://gemini.google.com/*
// @run-at       document-idle
// @grant        GM_addStyle
// @license MIT
//
// @downloadURL https://update.greasyfork.org/scripts/566006/Gemini%3A%20Pop-out%20Canvas%20Panel.user.js
// @updateURL https://update.greasyfork.org/scripts/566006/Gemini%3A%20Pop-out%20Canvas%20Panel.meta.js
// ==/UserScript==


(() => {
  'use strict';

  const PANEL_SELECTOR = 'immersive-panel';

  const ID = {
    overlay: 'tm-popout-overlay',
    modal: 'tm-popout-modal',
    host: 'tm-popout-host',
    launch: 'tm-popout-launch',
    placeholder: 'tm-popout-placeholder',
  };

  GM_addStyle(`
    #${ID.launch} {
      position: fixed;
      right: 16px;
      bottom: 16px;
      z-index: 2147483647;
      font: 12px/1.2 system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
      border: 1px solid rgba(255,255,255,.25);
      background: rgba(0,0,0,.55);
      color: #fff;
      padding: 10px 12px;
      border-radius: 12px;
      cursor: pointer;
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      user-select: none;
    }
    #${ID.launch}:hover { background: rgba(0,0,0,.7); }

    #${ID.overlay} {
      position: fixed;
      inset: 0;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 14px;
      background: rgba(0,0,0,.7);
      z-index: 2147483647;
    }

    #${ID.modal} {
      width: min(1800px, calc(100vw - 24px));
      height: min(980px, calc(100vh - 24px));
      background: rgba(20,20,20,.95);
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 16px;
      box-shadow: 0 20px 80px rgba(0,0,0,.6);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      outline: none;
    }

    #${ID.modal}:fullscreen {
      width: 100vw;
      height: 100vh;
      border-radius: 0;
      border: 0;
    }

    #${ID.modal} .tm-bar {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
      align-items: center;
      padding: 10px;
      background: linear-gradient(rgba(20,20,20,.95), rgba(20,20,20,.55));
      border-bottom: 1px solid rgba(255,255,255,.08);
      flex: 0 0 auto;
    }

    #${ID.modal} .tm-btn {
      font: 12px/1.2 system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
      border: 1px solid rgba(255,255,255,.18);
      background: rgba(255,255,255,.08);
      color: #fff;
      padding: 8px 10px;
      border-radius: 12px;
      cursor: pointer;
      user-select: none;
    }
    #${ID.modal} .tm-btn:hover { background: rgba(255,255,255,.14); }

    #${ID.host} {
      position: relative;
      flex: 1 1 auto;
      overflow: auto;
      padding: 10px;
    }

    #${ID.host} ${PANEL_SELECTOR} {
      display: block !important;
      width: 100% !important;
      height: calc(100vh - 120px) !important;
      min-height: 600px;
    }

    #${ID.placeholder} {
      display: block;
      min-height: 200px;
      border: 1px dashed rgba(255,255,255,.18);
      border-radius: 12px;
      margin: 8px 0;
      background: rgba(255,255,255,.03);
    }
  `);

  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function ensureOnce(id, factory) {
    let el = document.getElementById(id);
    if (!el) el = factory();
    return el;
  }

  function isVisible(el) {
    if (!el) return false;
    const r = el.getBoundingClientRect();
    if (r.width < 20 || r.height < 20) return false;
    // Must be in viewport at least a bit
    const inView = r.bottom > 0 && r.right > 0 && r.top < innerHeight && r.left < innerWidth;
    if (!inView) return false;
    const cs = getComputedStyle(el);
    return cs.display !== 'none' && cs.visibility !== 'hidden' && cs.opacity !== '0';
  }

  function pickBestPanel() {
    // Pick the largest visible immersive-panel (usually the active canvas)
    const panels = qsa(PANEL_SELECTOR).filter(isVisible);
    if (!panels.length) return null;

    let best = panels[0];
    let bestArea = 0;

    for (const p of panels) {
      const r = p.getBoundingClientRect();
      const area = Math.max(0, r.width) * Math.max(0, r.height);
      if (area > bestArea) {
        bestArea = area;
        best = p;
      }
    }
    return best;
  }

  function safeExitFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  }

  // ---------- UI ----------
  const overlay = ensureOnce(ID.overlay, () => {
    const el = document.createElement('div');
    el.id = ID.overlay;
    document.body.appendChild(el);
    return el;
  });

  const modal = ensureOnce(ID.modal, () => {
    const el = document.createElement('div');
    el.id = ID.modal;
    el.tabIndex = -1;

    const bar = document.createElement('div');
    bar.className = 'tm-bar';

    const btnFs = document.createElement('button');
    btnFs.className = 'tm-btn';
    btnFs.type = 'button';
    btnFs.textContent = 'Fullscreen';

    const btnClose = document.createElement('button');
    btnClose.className = 'tm-btn';
    btnClose.type = 'button';
    btnClose.textContent = 'Close';

    const host = document.createElement('div');
    host.id = ID.host;

    bar.append(btnFs, btnClose);
    el.append(bar, host);
    overlay.appendChild(el);

    btnFs.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        el.requestFullscreen().catch(err => console.warn('Fullscreen failed:', err));
      } else {
        safeExitFullscreen();
      }
    });

    btnClose.addEventListener('click', closeModal);

    return el;
  });

  const host = ensureOnce(ID.host, () => qs(`#${ID.host}`));

  function ensureLaunchButton() {
    return ensureOnce(ID.launch, () => {
      const el = document.createElement('button');
      el.id = ID.launch;
      el.type = 'button';
      el.textContent = 'Pop-out panel';
      el.addEventListener('click', () => {
        if (isOpen()) closeModal();
        else openModal();
      });
      document.body.appendChild(el);
      return el;
    });
  }

  // ---------- Option A state ----------
  let pulled = null;
  let originalParent = null;
  let originalNextSibling = null;
  let placeholder = null;

  function isOpen() {
    return overlay.style.display === 'flex';
  }

  function openModal() {
    if (isOpen()) return;

    const panel = pickBestPanel();
    if (!panel) {
      alert(`No visible ${PANEL_SELECTOR} found on this view.`);
      return;
    }

    pulled = panel;
    originalParent = panel.parentNode;
    originalNextSibling = panel.nextSibling;

    placeholder = document.createElement('div');
    placeholder.id = ID.placeholder;
    placeholder.title = 'Panel popped out (userscript placeholder).';

    if (originalParent) originalParent.insertBefore(placeholder, originalNextSibling);

    host.appendChild(panel);

    overlay.style.display = 'flex';
    modal.focus();
  }

  function closeModal() {
    if (!isOpen()) return;

    overlay.style.display = 'none';
    safeExitFullscreen();

    if (pulled && originalParent) {
      const stillValidSibling = originalNextSibling && originalNextSibling.parentNode === originalParent;

      if (stillValidSibling) {
        originalParent.insertBefore(pulled, originalNextSibling);
      } else if (placeholder && placeholder.parentNode === originalParent) {
        originalParent.insertBefore(pulled, placeholder);
      } else {
        originalParent.appendChild(pulled);
      }
    }

    if (placeholder?.parentNode) placeholder.parentNode.removeChild(placeholder);

    pulled = null;
    originalParent = null;
    originalNextSibling = null;
    placeholder = null;
  }

  // ---------- Events ----------
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    // ESC closes when open
    if (e.key === 'Escape' && isOpen()) closeModal();

    // Alt+P toggles popout
    if (e.altKey && (e.key === 'p' || e.key === 'P')) {
      e.preventDefault();
      if (isOpen()) closeModal();
      else openModal();
    }
  });

  // ---------- SPA/Remount resilience ----------
  // Gemini re-renders body often; ensure our launch button persists.
  const keepAlive = new MutationObserver(() => {
    // If body got replaced or our button got removed, re-add it.
    if (!document.getElementById(ID.launch)) ensureLaunchButton();

    // If modal open but overlay got detached somehow, reattach.
    if (!document.getElementById(ID.overlay)) {
      document.body.appendChild(overlay);
      overlay.appendChild(modal);
    }
  });

  keepAlive.observe(document.documentElement, { childList: true, subtree: true });

  // Initial injection
  ensureLaunchButton();
})();
