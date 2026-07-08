/* ═══════════════════════════════════════════
   MERIDIAN OS — Core Engine (Premium)
   Window Manager, Boot, Taskbar, Interactions
   Particles, Spotlight, Snap, Widgets, Animations
   ═══════════════════════════════════════════ */

// ── State ──
let windows = {};
let windowOrder = [];
let windowIdCounter = 0;
let zIndexCounter = 100;
let startMenuOpen = false;
let calendarOpen = false;
let dragState = null;
let resizeState = null;

// Premium state
let spotlightOpen = false;
let spotlightIndex = 0;
let snapPreview = null;
let widgetsVisible = false;
let mouseX = 0, mouseY = 0;
let particles = [];
let particleCanvas, particleCtx;
let taskbarPreviewTimer = null;
let taskbarPreviewEl = null;

// ── Keyboard shortcut map for apps ──
const APP_SHORTCUTS = {
  terminal:  { keys: 'Ctrl+Shift+T', keyCode: 'T' },
  editor:    { keys: 'Ctrl+Shift+E', keyCode: 'E' },
  music:     { keys: 'Ctrl+Shift+M', keyCode: 'M' },
  calculator:{ keys: 'Ctrl+Shift+C', keyCode: 'C' }
};

// ── Boot Sequence ──
document.addEventListener('DOMContentLoaded', () => {
  const bootScreen = document.getElementById('boot-screen');
  const lockScreen = document.getElementById('lock-screen');
  const desktop = document.getElementById('desktop');

  // ── Enhanced Boot Sequence ──
  enhancedBootSequence(bootScreen, lockScreen, desktop);

  // ── Context menu ──
  desktop.addEventListener('contextmenu', e => {
    e.preventDefault();
    const menu = document.getElementById('context-menu');
    menu.style.display = 'block';
    menu.style.left = Math.min(e.clientX, window.innerWidth - 200) + 'px';
    menu.style.top = Math.min(e.clientY, window.innerHeight - 280) + 'px';
  });

  document.addEventListener('click', () => {
    document.getElementById('context-menu').style.display = 'none';
    if (!startMenuOpen) return;
  });

  // Global mouse handlers for drag/resize
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

  // Keyboard shortcuts
  document.addEventListener('keydown', onKeyDown);

  // Track mouse for particles
  document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

  // Create snap preview element
  snapPreview = document.createElement('div');
  snapPreview.id = 'snap-preview';
  snapPreview.style.cssText = 'position:fixed;z-index:9999;pointer-events:none;border:2px solid rgba(160,120,255,0.6);background:rgba(160,120,255,0.12);border-radius:12px;display:none;transition:all 0.2s ease;';
  document.body.appendChild(snapPreview);

  // Create taskbar preview element
  taskbarPreviewEl = document.createElement('div');
  taskbarPreviewEl.id = 'taskbar-preview';
  taskbarPreviewEl.style.cssText = 'position:fixed;z-index:10000;display:none;background:rgba(20,18,40,0.95);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:12px 16px;min-width:200px;max-width:280px;backdrop-filter:blur(20px);box-shadow:0 8px 32px rgba(0,0,0,0.5);pointer-events:none;';
  document.body.appendChild(taskbarPreviewEl);

  // Create particle canvas
  initParticles();
});

// ═══════════════════════════════════════════
// 1. PARTICLE SYSTEM
// ═══════════════════════════════════════════
function initParticles() {
  particleCanvas = document.createElement('canvas');
  particleCanvas.id = 'particle-canvas';
  particleCanvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;';
  document.body.insertBefore(particleCanvas, document.body.firstChild);

  particleCtx = particleCanvas.getContext('2d');
  resizeParticleCanvas();
  window.addEventListener('resize', resizeParticleCanvas);

  // Create 80 particles
  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: 1 + Math.random() * 2,
      opacity: 0.3 + Math.random() * 0.3,
      color: Math.random() > 0.5 ? '255,255,255' : '180,140,255'
    });
  }

  requestAnimationFrame(animateParticles);
}

function resizeParticleCanvas() {
  if (!particleCanvas) return;
  particleCanvas.width = window.innerWidth;
  particleCanvas.height = window.innerHeight;
}

function animateParticles() {
  if (!particleCtx) return;
  const ctx = particleCtx;
  ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

  particles.forEach(p => {
    // Gentle follow mouse
    const dx = mouseX - p.x;
    const dy = mouseY - p.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 300 && dist > 10) {
      p.vx += (dx / dist) * 0.02;
      p.vy += (dy / dist) * 0.02;
    }

    // Apply velocity with damping
    p.x += p.vx;
    p.y += p.vy;
    p.vx *= 0.99;
    p.vy *= 0.99;

    // Wrap around
    if (p.x < -10) p.x = particleCanvas.width + 10;
    if (p.x > particleCanvas.width + 10) p.x = -10;
    if (p.y < -10) p.y = particleCanvas.height + 10;
    if (p.y > particleCanvas.height + 10) p.y = -10;

    // Draw
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.color},${p.opacity})`;
    ctx.fill();
  });

  requestAnimationFrame(animateParticles);
}

// ═══════════════════════════════════════════
// 5. ENHANCED BOOT SEQUENCE
// ═══════════════════════════════════════════
function enhancedBootSequence(bootScreen, lockScreen, desktop) {
  const bootText = document.getElementById('boot-text');
  const bootLoader = document.getElementById('boot-loader');

  // Typing effect for "Meridian OS"
  if (bootText) {
    bootText.textContent = '';
    bootText.style.opacity = '1';
    const title = 'Meridian OS';
    let charIdx = 0;
    const typeInterval = setInterval(() => {
      if (charIdx < title.length) {
        bootText.textContent += title[charIdx];
        charIdx++;
      } else {
        clearInterval(typeInterval);
      }
    }, 100);
  }

  // Status messages
  const statusMessages = [
    'Initializing kernel...',
    'Loading drivers...',
    'Starting services...',
    'Configuring display...',
    'Ready.'
  ];

  let statusEl = document.createElement('div');
  statusEl.id = 'boot-status';
  statusEl.style.cssText = 'position:absolute;bottom:80px;left:50%;transform:translateX(-50%);color:rgba(255,255,255,0.6);font-size:13px;font-family:monospace;text-align:center;';
  bootScreen.appendChild(statusEl);

  let msgIdx = 0;
  const msgInterval = setInterval(() => {
    if (msgIdx < statusMessages.length) {
      statusEl.style.opacity = '0';
      setTimeout(() => {
        statusEl.textContent = statusMessages[msgIdx];
        statusEl.style.transition = 'opacity 0.4s ease';
        statusEl.style.opacity = '1';
      }, 200);
      msgIdx++;
    } else {
      clearInterval(msgInterval);
    }
  }, 700);

  // Staggered fade-in for boot elements
  const bootElements = bootScreen.querySelectorAll('.boot-logo, .boot-text, .boot-loader');
  bootElements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transition = 'opacity 0.6s ease';
    setTimeout(() => { el.style.opacity = '1'; }, 300 + i * 400);
  });

  // Transition to lock screen after 4s
  setTimeout(() => {
    bootScreen.style.display = 'none';
    lockScreen.style.display = 'flex';
    enhancedLockScreen(lockScreen, desktop);
    updateLockClock();
    setInterval(updateLockClock, 1000);
  }, 4000);
}

// ═══════════════════════════════════════════
// 6. ENHANCED LOCK SCREEN
// ═══════════════════════════════════════════
function enhancedLockScreen(lockScreen, desktop) {
  // Time-based greeting
  const hour = new Date().getHours();
  let greeting = 'Good evening';
  if (hour >= 5 && hour < 12) greeting = 'Good morning';
  else if (hour >= 12 && hour < 17) greeting = 'Good afternoon';

  let greetEl = lockScreen.querySelector('#lock-greeting');
  if (!greetEl) {
    greetEl = document.createElement('div');
    greetEl.id = 'lock-greeting';
    greetEl.style.cssText = 'font-size:28px;font-weight:300;color:rgba(255,255,255,0.9);margin-bottom:8px;text-align:center;';
    const lockContent = lockScreen.querySelector('.lock-content') || lockScreen;
    lockContent.insertBefore(greetEl, lockContent.firstChild);
  }
  greetEl.textContent = greeting;

  // Parallax effect
  lockScreen.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    lockScreen.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
  });

  // Swipe up gesture to unlock
  let swipeStartY = null;
  lockScreen.addEventListener('mousedown', e => { swipeStartY = e.clientY; });
  lockScreen.addEventListener('mousemove', e => {
    if (swipeStartY !== null && swipeStartY - e.clientY > 100) {
      swipeStartY = null;
      unlockToDesktop(lockScreen, desktop);
    }
  });
  lockScreen.addEventListener('mouseup', () => { swipeStartY = null; });

  // Click to enter (keep existing)
  lockScreen.addEventListener('click', () => unlockToDesktop(lockScreen, desktop));
}

function unlockToDesktop(lockScreen, desktop) {
  lockScreen.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  lockScreen.style.opacity = '0';
  lockScreen.style.transform = 'translateY(-30px)';
  setTimeout(() => {
    lockScreen.style.display = 'none';
    desktop.style.display = 'block';
    startClock();
    initTaskbar();
    showNotification('Meridian OS', 'Welcome! Double-click icons to open apps.', 'info');
  }, 400);
}

function updateLockClock() {
  const now = new Date();
  const timeEl = document.getElementById('lock-time');
  const dateEl = document.getElementById('lock-date');
  if (timeEl) timeEl.textContent = now.toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit', hour12:false });
  if (dateEl) dateEl.textContent = now.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' });
}

// ── Clock ──
function startClock() {
  updateClock();
  setInterval(updateClock, 1000);
}

function updateClock() {
  const now = new Date();
  const clockEl = document.getElementById('taskbar-clock');
  if (!clockEl) return;
  clockEl.innerHTML = `
    <div>${now.toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit', hour12:true })}</div>
    <div style="font-size:11px;color:var(--text-dim)">${now.toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' })}</div>`;
}

// ── Calendar ──
function toggleCalendar() {
  calendarOpen = !calendarOpen;
  const popup = document.getElementById('calendar-popup');
  popup.style.display = calendarOpen ? 'block' : 'none';

  if (calendarOpen) {
    const now = new Date();
    document.getElementById('cal-header').textContent = now.toLocaleDateString('en-US', { month:'long', year:'numeric' });

    const grid = document.getElementById('cal-grid');
    grid.innerHTML = '';

    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const daysInPrev = new Date(now.getFullYear(), now.getMonth(), 0).getDate();

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = document.createElement('div');
      day.className = 'cal-day other';
      day.textContent = daysInPrev - i;
      grid.appendChild(day);
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const day = document.createElement('div');
      day.className = 'cal-day' + (d === now.getDate() ? ' today' : '');
      day.textContent = d;
      grid.appendChild(day);
    }

    // Next month days
    const remaining = 42 - grid.children.length;
    for (let d = 1; d <= remaining; d++) {
      const day = document.createElement('div');
      day.className = 'cal-day other';
      day.textContent = d;
      grid.appendChild(day);
    }
  }
}

// ── Start Menu ──
function toggleStartMenu() {
  startMenuOpen = !startMenuOpen;
  const menu = document.getElementById('start-menu');
  menu.classList.toggle('visible', startMenuOpen);
  if (startMenuOpen) {
    calendarOpen = false;
    document.getElementById('calendar-popup').style.display = 'none';
    document.getElementById('start-search-input').value = '';
    filterStartApps('');
    setTimeout(() => document.getElementById('start-search-input').focus(), 100);
  }
}

function filterStartApps(query) {
  const items = document.querySelectorAll('#start-apps-list .start-app');
  const q = query.toLowerCase();
  items.forEach(item => {
    item.style.display = item.textContent.toLowerCase().includes(q) ? 'flex' : 'none';
  });
}

// ═══════════════════════════════════════════
// 2. SPOTLIGHT SEARCH (Cmd+K / Ctrl+K)
// ═══════════════════════════════════════════
function toggleSpotlight() {
  spotlightOpen = !spotlightOpen;
  let overlay = document.getElementById('spotlight-overlay');

  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'spotlight-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:50000;display:flex;align-items:flex-start;justify-content:center;padding-top:20vh;background:rgba(0,0,0,0.5);backdrop-filter:blur(8px);';
    overlay.innerHTML = `
      <div id="spotlight-box" style="width:520px;background:rgba(20,18,40,0.95);border:1px solid rgba(255,255,255,0.1);border-radius:16px;overflow:hidden;box-shadow:0 16px 64px rgba(0,0,0,0.6);">
        <div style="display:flex;align-items:center;padding:16px 20px;border-bottom:1px solid rgba(255,255,255,0.06);">
          <span style="font-size:18px;margin-right:12px;">🔍</span>
          <input id="spotlight-input" type="text" placeholder="Search apps, commands..." style="flex:1;background:none;border:none;color:#e8e6f0;font-size:16px;outline:none;" autocomplete="off">
          <span style="font-size:11px;color:rgba(255,255,255,0.3);background:rgba(255,255,255,0.08);padding:2px 8px;border-radius:4px;">ESC</span>
        </div>
        <div id="spotlight-results" style="max-height:320px;overflow-y:auto;padding:8px;"></div>
      </div>`;
    overlay.addEventListener('click', e => { if (e.target === overlay) closeSpotlight(); });
    document.body.appendChild(overlay);

    // Add input listener for live search
    const spotlightInput = document.getElementById('spotlight-input');
    if (spotlightInput) {
      spotlightInput.addEventListener('input', () => {
        spotlightIndex = 0;
        updateSpotlightResults(spotlightInput.value);
      });
    }
  }

  overlay.style.display = spotlightOpen ? 'flex' : 'none';
  if (spotlightOpen) {
    const input = document.getElementById('spotlight-input');
    input.value = '';
    spotlightIndex = 0;
    updateSpotlightResults('');
    setTimeout(() => input.focus(), 50);
  }
}

function closeSpotlight() {
  spotlightOpen = false;
  const overlay = document.getElementById('spotlight-overlay');
  if (overlay) overlay.style.display = 'none';
}

function fuzzyMatch(query, text) {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  if (t.includes(q)) return true;
  let qi = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) qi++;
  }
  return qi === q.length;
}

function updateSpotlightResults(query) {
  const container = document.getElementById('spotlight-results');
  if (!container) return;
  container.innerHTML = '';

  const results = [];

  // Search apps
  if (typeof APP_DEFS !== 'undefined') {
    Object.entries(APP_DEFS).forEach(([id, def]) => {
      if (!query || fuzzyMatch(query, def.title)) {
        const shortcut = APP_SHORTCUTS[id];
        results.push({
          id, icon: def.icon, title: def.title,
          shortcut: shortcut ? shortcut.keys : '',
          type: 'app'
        });
      }
    });
  }

  // Add terminal commands as search results
  const termCmds = ['help','echo','date','clear','whoami','uname','ls','cat','neofetch','calc','color','cowsay','matrix','history','exit'];
  termCmds.forEach(cmd => {
    if (query && fuzzyMatch(query, cmd)) {
      results.push({
        id: 'terminal', icon: '💻', title: `Terminal: ${cmd}`,
        shortcut: 'Ctrl+Shift+T', type: 'command'
      });
    }
  });

  // Add special actions
  if (!query || fuzzyMatch(query, 'spotlight') || fuzzyMatch(query, 'search')) {
    results.push({ id: '_spotlight', icon: '🔍', title: 'Spotlight Search', shortcut: 'Ctrl+K', type: 'action' });
  }

  spotlightIndex = Math.min(spotlightIndex, Math.max(0, results.length - 1));

  results.forEach((r, i) => {
    const el = document.createElement('div');
    el.style.cssText = `display:flex;align-items:center;padding:10px 14px;border-radius:8px;cursor:pointer;transition:background 0.15s;${i === spotlightIndex ? 'background:rgba(160,120,255,0.2);' : ''}`;
    el.innerHTML = `
      <span style="font-size:20px;margin-right:12px;width:28px;text-align:center;">${r.icon}</span>
      <span style="flex:1;color:#e8e6f0;font-size:14px;">${r.title}</span>
      ${r.shortcut ? `<span style="font-size:11px;color:rgba(255,255,255,0.4);background:rgba(255,255,255,0.08);padding:2px 8px;border-radius:4px;font-family:monospace;">${r.shortcut}</span>` : ''}`;
    el.addEventListener('mouseenter', () => {
      spotlightIndex = i;
      container.querySelectorAll('div').forEach((d, j) => { d.style.background = j === i ? 'rgba(160,120,255,0.2)' : ''; });
    });
    el.addEventListener('click', () => {
      closeSpotlight();
      if (r.type === 'app' || r.type === 'command') openApp(r.id);
    });
    container.appendChild(el);
  });

  if (results.length === 0 && query) {
    const noResult = document.createElement('div');
    noResult.style.cssText = 'padding:20px;text-align:center;color:rgba(255,255,255,0.4);font-size:13px;';
    noResult.textContent = 'No results found';
    container.appendChild(noResult);
  }
}

function handleSpotlightKeys(e) {
  const container = document.getElementById('spotlight-results');
  if (!container) return;
  const items = container.children;
  const count = items.length;

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    spotlightIndex = (spotlightIndex + 1) % count;
    Array.from(items).forEach((el, i) => { el.style.background = i === spotlightIndex ? 'rgba(160,120,255,0.2)' : ''; });
    items[spotlightIndex]?.scrollIntoView({ block: 'nearest' });
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    spotlightIndex = (spotlightIndex - 1 + count) % count;
    Array.from(items).forEach((el, i) => { el.style.background = i === spotlightIndex ? 'rgba(160,120,255,0.2)' : ''; });
    items[spotlightIndex]?.scrollIntoView({ block: 'nearest' });
  } else if (e.key === 'Enter') {
    e.preventDefault();
    items[spotlightIndex]?.click();
  }
}

// ═══════════════════════════════════════════
// WINDOW MANAGER (Enhanced with snap zones + animations)
// ═══════════════════════════════════════════
function openApp(appId) {
  // Close start menu
  startMenuOpen = false;
  document.getElementById('start-menu').classList.remove('visible');

  const def = APP_DEFS[appId];
  if (!def) return;

  const id = 'win-' + (++windowIdCounter);
  const x = 60 + (windowIdCounter % 8) * 30;
  const y = 40 + (windowIdCounter % 6) * 25;

  const win = document.createElement('div');
  win.className = 'window';
  win.dataset.windowId = id;
  win.dataset.appId = appId;
  win.style.left = x + 'px';
  win.style.top = y + 'px';
  win.style.width = def.width + 'px';
  win.style.height = def.height + 'px';
  win.style.zIndex = ++zIndexCounter;

  // Enhanced open animation: scale from 0.85 with spring easing + slight rotation
  win.style.animation = 'windowOpenPremium 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';

  win.innerHTML = `
    <div class="window-header" data-window-id="${id}">
      <span style="margin-right:8px;font-size:14px">${def.icon}</span>
      <div class="window-title">${def.title}</div>
      <div class="window-controls">
        <button class="win-btn win-minimize" onclick="minimizeWindow('${id}')"></button>
        <button class="win-btn win-maximize" onclick="toggleMaximize('${id}')"></button>
        <button class="win-btn win-close" onclick="closeWindow('${id}')"></button>
      </div>
    </div>
    <div class="window-body" id="${id}-body"></div>
    <div class="resize-handle" data-window-id="${id}"></div>`;

  document.getElementById('windows-container').appendChild(win);

  // Build app content
  const appBody = win.querySelector('.window-body');
  const content = def.content(win);
  if (content) appBody.appendChild(content);

  // Store window state
  windows[id] = {
    id, appId, element: win,
    minimized: false, maximized: false,
    prevBounds: null
  };
  windowOrder.push(id);

  // Focus
  focusWindow(id);

  // Taskbar entry
  updateTaskbar();

  // Drag (with shake detection + snap zones)
  const header = win.querySelector('.window-header');
  let dragHistory = [];

  header.addEventListener('mousedown', e => {
    if (e.target.closest('.window-controls')) return;
    e.preventDefault();
    focusWindow(id);
    const rect = win.getBoundingClientRect();
    dragState = { id, startX: e.clientX, startY: e.clientY, origLeft: rect.left, origTop: rect.top };
    dragHistory = [];
  });

  // Double-click header to maximize
  header.addEventListener('dblclick', () => toggleMaximize(id));

  // Resize
  const handle = win.querySelector('.resize-handle');
  handle.addEventListener('mousedown', e => {
    e.preventDefault();
    e.stopPropagation();
    focusWindow(id);
    const rect = win.getBoundingClientRect();
    resizeState = { id, startX: e.clientX, startY: e.clientY, origW: rect.width, origH: rect.height };
  });

  // Click to focus
  win.addEventListener('mousedown', () => focusWindow(id));

  return id;
}

function focusWindow(id) {
  const win = windows[id];
  if (!win) return;

  // Remove focused from all
  document.querySelectorAll('.window').forEach(w => w.classList.remove('focused'));
  win.element.style.zIndex = ++zIndexCounter;
  win.element.classList.add('focused');

  // Move to end of order
  windowOrder = windowOrder.filter(w => w !== id);
  windowOrder.push(id);

  updateTaskbar();
}

function closeWindow(id) {
  const win = windows[id];
  if (!win) return;

  // Enhanced close: scale down + blur + fade
  win.element.style.animation = 'windowClosePremium 0.3s ease forwards';
  setTimeout(() => {
    win.element.remove();
    delete windows[id];
    windowOrder = windowOrder.filter(w => w !== id);
    updateTaskbar();
  }, 300);
}

function minimizeWindow(id) {
  const win = windows[id];
  if (!win) return;
  win.minimized = !win.minimized;

  if (win.minimized) {
    // Enhanced minimize: shrink to taskbar with trail effect
    win.element.style.animation = 'windowMinimizePremium 0.3s ease forwards';
    setTimeout(() => {
      win.element.style.display = 'none';
      win.element.style.animation = '';
      // Focus next window
      const visible = windowOrder.filter(w => !windows[w]?.minimized);
      if (visible.length) focusWindow(visible[visible.length - 1]);
      updateTaskbar();
    }, 300);
  } else {
    win.element.style.display = 'flex';
    win.element.style.animation = 'windowOpenPremium 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
    focusWindow(id);
    updateTaskbar();
  }
}

function toggleMaximize(id) {
  const win = windows[id];
  if (!win) return;

  // Remove snap classes
  win.element.classList.remove('snap-left', 'snap-right');

  if (win.maximized) {
    // Restore
    win.element.classList.remove('maximized');
    if (win.prevBounds) {
      win.element.style.left = win.prevBounds.left;
      win.element.style.top = win.prevBounds.top;
      win.element.style.width = win.prevBounds.width;
      win.element.style.height = win.prevBounds.height;
    }
    win.maximized = false;
  } else {
    // Save bounds
    const rect = win.element.getBoundingClientRect();
    win.prevBounds = {
      left: rect.left + 'px', top: rect.top + 'px',
      width: rect.width + 'px', height: rect.height + 'px'
    };
    win.element.classList.add('maximized');
    win.maximized = true;
  }
  focusWindow(id);
}

// ═══════════════════════════════════════════
// 3. WINDOW SNAP ZONES
// ═══════════════════════════════════════════
function checkSnapZone(clientX, clientY) {
  const threshold = 20;
  const w = window.innerWidth;
  const h = window.innerHeight;

  if (clientX <= threshold) return 'left';
  if (clientX >= w - threshold) return 'right';
  if (clientY <= threshold) return 'top';
  return null;
}

function showSnapPreview(zone) {
  if (!snapPreview) return;
  const w = window.innerWidth;
  const h = window.innerHeight;

  if (zone === 'left') {
    snapPreview.style.cssText += 'display:block;left:0;top:0;width:' + (w / 2) + 'px;height:' + h + 'px;border-radius:0;';
  } else if (zone === 'right') {
    snapPreview.style.cssText += 'display:block;left:' + (w / 2) + 'px;top:0;width:' + (w / 2) + 'px;height:' + h + 'px;border-radius:0;';
  } else if (zone === 'top') {
    snapPreview.style.cssText += 'display:block;left:0;top:0;width:' + w + 'px;height:' + h + 'px;border-radius:0;';
  } else {
    snapPreview.style.display = 'none';
  }
}

function applySnap(id, zone) {
  const win = windows[id];
  if (!win) return;

  const w = window.innerWidth;
  const h = window.innerHeight;

  // Save current bounds if not already saved
  if (!win.prevBounds && !win.maximized) {
    const rect = win.element.getBoundingClientRect();
    win.prevBounds = {
      left: rect.left + 'px', top: rect.top + 'px',
      width: rect.width + 'px', height: rect.height + 'px'
    };
  }

  win.element.classList.remove('snap-left', 'snap-right', 'maximized');

  if (zone === 'left') {
    win.element.style.left = '0px';
    win.element.style.top = '0px';
    win.element.style.width = (w / 2) + 'px';
    win.element.style.height = h + 'px';
    win.element.classList.add('snap-left');
    win.maximized = false;
  } else if (zone === 'right') {
    win.element.style.left = (w / 2) + 'px';
    win.element.style.top = '0px';
    win.element.style.width = (w / 2) + 'px';
    win.element.style.height = h + 'px';
    win.element.classList.add('snap-right');
    win.maximized = false;
  } else if (zone === 'top') {
    toggleMaximize(id);
  }
}

// ── Mouse Handlers (Enhanced with snap zones + shake detection) ──
let dragHistory = [];
let lastDragTime = 0;

function onMouseMove(e) {
  if (dragState) {
    const win = windows[dragState.id];
    if (!win) return;
    const dx = e.clientX - dragState.startX;
    const dy = e.clientY - dragState.startY;
    const newLeft = dragState.origLeft + dx;
    const newTop = Math.max(0, dragState.origTop + dy);
    win.element.style.left = newLeft + 'px';
    win.element.style.top = newTop + 'px';

    // Snap zone detection
    const zone = checkSnapZone(e.clientX, e.clientY);
    showSnapZoneIndicator(e.clientX, e.clientY, zone);

    // Shake detection: track rapid direction changes
    const now = Date.now();
    if (now - lastDragTime > 50) {
      dragHistory.push({ x: e.clientX, y: e.clientY, t: now });
      if (dragHistory.length > 8) dragHistory.shift();
      lastDragTime = now;
      if (detectShake()) {
        minimizeAllWindowsExcept(dragState.id);
        dragHistory = [];
      }
    }
  }

  if (resizeState) {
    const win = windows[resizeState.id];
    if (!win) return;
    const dx = e.clientX - resizeState.startX;
    const dy = e.clientY - resizeState.startY;
    const newW = Math.max(320, resizeState.origW + dx);
    const newH = Math.max(200, resizeState.origH + dy);
    win.element.style.width = newW + 'px';
    win.element.style.height = newH + 'px';
  }
}

function onMouseUp(e) {
  if (dragState) {
    // Check snap zone on release
    const zone = checkSnapZone(e.clientX, e.clientY);
    if (zone) {
      applySnap(dragState.id, zone);
    }
    if (snapPreview) snapPreview.style.display = 'none';
    dragHistory = [];
  }
  dragState = null;
  resizeState = null;
}

function showSnapZoneIndicator(x, y, zone) {
  if (!snapPreview) return;
  if (!zone) {
    snapPreview.style.display = 'none';
    return;
  }
  const w = window.innerWidth;
  const h = window.innerHeight;
  snapPreview.style.transition = 'all 0.2s ease';
  if (zone === 'left') {
    Object.assign(snapPreview.style, { display:'block', left:'0px', top:'0px', width:(w/2)+'px', height:h+'px', borderRadius:'0' });
  } else if (zone === 'right') {
    Object.assign(snapPreview.style, { display:'block', left:(w/2)+'px', top:'0px', width:(w/2)+'px', height:h+'px', borderRadius:'0' });
  } else if (zone === 'top') {
    Object.assign(snapPreview.style, { display:'block', left:'0px', top:'0px', width:w+'px', height:h+'px', borderRadius:'0' });
  }
}

function detectShake() {
  if (dragHistory.length < 6) return false;
  let dirChanges = 0;
  for (let i = 2; i < dragHistory.length; i++) {
    const dx1 = dragHistory[i-1].x - dragHistory[i-2].x;
    const dx2 = dragHistory[i].x - dragHistory[i-1].x;
    if ((dx1 > 0 && dx2 < 0) || (dx1 < 0 && dx2 > 0)) dirChanges++;
  }
  return dirChanges >= 4;
}

function minimizeAllWindowsExcept(exceptId) {
  Object.keys(windows).forEach(id => {
    if (id !== exceptId && !windows[id].minimized) {
      minimizeWindow(id);
    }
  });
  showNotification('Meridian OS', 'All other windows minimized', 'info');
}

// ═══════════════════════════════════════════
// 4. TASKBAR PREVIEW
// ═══════════════════════════════════════════
function showTaskbarPreview(taskbarEl, winId) {
  const win = windows[winId];
  if (!win || !taskbarPreviewEl) return;
  const def = APP_DEFS[win.appId];
  if (!def) return;

  // Get mini content preview
  const body = win.element.querySelector('.window-body');
  let preview = '';
  if (body) {
    const text = body.textContent || body.innerText || '';
    preview = text.substring(0, 100).trim();
    if (text.length > 100) preview += '...';
  }

  taskbarPreviewEl.innerHTML = `
    <div style="font-size:13px;font-weight:600;color:#e8e6f0;margin-bottom:6px;">${def.icon} ${def.title}</div>
    <div style="font-size:11px;color:rgba(255,255,255,0.5);line-height:1.4;max-height:60px;overflow:hidden;">${preview || 'No preview available'}</div>`;

  // Position above taskbar item
  const rect = taskbarEl.getBoundingClientRect();
  taskbarPreviewEl.style.display = 'block';
  const previewRect = taskbarPreviewEl.getBoundingClientRect();
  taskbarPreviewEl.style.left = Math.max(8, rect.left + rect.width / 2 - previewRect.width / 2) + 'px';
  taskbarPreviewEl.style.bottom = (window.innerHeight - rect.top + 8) + 'px';
  taskbarPreviewEl.style.top = 'auto';
}

function hideTaskbarPreview() {
  if (taskbarPreviewTimer) { clearTimeout(taskbarPreviewTimer); taskbarPreviewTimer = null; }
  if (taskbarPreviewEl) taskbarPreviewEl.style.display = 'none';
}

// ── Taskbar ──
function initTaskbar() {
  updateTaskbar();
}

function updateTaskbar() {
  const container = document.getElementById('taskbar-apps');
  container.innerHTML = '';

  windowOrder.forEach(id => {
    const win = windows[id];
    if (!win) return;
    const def = APP_DEFS[win.appId];
    if (!def) return;

    const el = document.createElement('div');
    el.className = 'taskbar-app' + (win.element.classList.contains('focused') && !win.minimized ? ' active' : '');
    el.innerHTML = `<span class="app-icon">${def.icon}</span><span>${def.title}</span>`;
    el.addEventListener('click', () => {
      if (win.minimized) {
        win.minimized = false;
        win.element.style.display = 'flex';
        win.element.style.animation = 'windowOpenPremium 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
        focusWindow(id);
      } else if (win.element.classList.contains('focused')) {
        minimizeWindow(id);
      } else {
        focusWindow(id);
      }
    });

    // Taskbar preview on hover
    el.addEventListener('mouseenter', () => {
      if (taskbarPreviewTimer) clearTimeout(taskbarPreviewTimer);
      taskbarPreviewTimer = setTimeout(() => showTaskbarPreview(el, id), 500);
    });
    el.addEventListener('mouseleave', hideTaskbarPreview);

    container.appendChild(el);
  });
}

// ── Context Menu Actions ──
function ctxAction(action) {
  document.getElementById('context-menu').style.display = 'none';
  switch (action) {
    case 'refresh':
      showNotification('Desktop', 'Desktop refreshed!', 'info');
      break;
    case 'terminal': openApp('terminal'); break;
    case 'editor': openApp('editor'); break;
    case 'wallpaper': cycleWallpaper(); break;
    case 'settings': openApp('settings'); break;
    case 'about': openApp('about'); break;
    case 'widgets': toggleDesktopWidgets(); break;
  }
}

// ═══════════════════════════════════════════
// 9. ENHANCED NOTIFICATIONS
// ═══════════════════════════════════════════
function showNotification(title, body, type = 'info') {
  const area = document.getElementById('notification-area');
  if (!area) return;

  // Max 3 visible — push out older ones
  const existing = area.querySelectorAll('.notification');
  if (existing.length >= 3) {
    const oldest = existing[0];
    oldest.style.animation = 'notifSlide 0.3s ease reverse forwards';
    setTimeout(() => oldest.remove(), 300);
  }

  const notif = document.createElement('div');
  notif.className = 'notification';

  // Color-coded left border
  const borderColors = { info: '#74b9ff', success: '#a8e6cf', warning: '#ffd93d', error: '#ff6b7a' };
  const borderColor = borderColors[type] || borderColors.info;
  notif.style.borderLeft = `4px solid ${borderColor}`;

  const icons = { info: '\u{2139}', success: '\u{2705}', warning: '\u{26A0}', error: '\u{274C}' };
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit' });

  notif.innerHTML = `
    <div class="notif-header">
      <span>${icons[type] || icons.info}</span>
      <span class="notif-app">${title}</span>
      <span class="notif-time">${time}</span>
    </div>
    <div class="notif-body">${body}</div>
    <div class="notif-progress" style="position:absolute;bottom:0;left:0;height:3px;background:${borderColor};border-radius:0 0 8px 0;animation:notifProgress 4s linear forwards;"></div>`;

  notif.style.position = 'relative';
  notif.style.overflow = 'hidden';

  area.appendChild(notif);

  // Auto-dismiss after 4s
  setTimeout(() => {
    if (notif.parentNode) {
      notif.style.animation = 'notifSlide 0.3s ease reverse forwards';
      setTimeout(() => notif.remove(), 300);
    }
  }, 4000);

  // Click to dismiss
  notif.addEventListener('click', () => {
    notif.style.animation = 'notifSlide 0.3s ease reverse forwards';
    setTimeout(() => notif.remove(), 300);
  });
}

// ═══════════════════════════════════════════
// 7. DESKTOP WIDGETS SYSTEM
// ═══════════════════════════════════════════
let widgetContainer = null;
let widgetIntervals = [];

function toggleDesktopWidgets() {
  widgetsVisible = !widgetsVisible;
  if (widgetsVisible) {
    createDesktopWidgets();
  } else {
    destroyDesktopWidgets();
  }
  showNotification('Widgets', widgetsVisible ? 'Desktop widgets enabled' : 'Desktop widgets disabled', 'info');
}

function createDesktopWidgets() {
  if (widgetContainer) return;

  widgetContainer = document.createElement('div');
  widgetContainer.id = 'desktop-widgets';
  widgetContainer.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:50;';

  // Create 3 widgets
  createClockWidget();
  createSystemMonitorWidget();
  createQuickNotesWidget();

  document.body.appendChild(widgetContainer);
}

function destroyDesktopWidgets() {
  widgetIntervals.forEach(id => clearInterval(id));
  widgetIntervals = [];
  if (widgetContainer) {
    widgetContainer.remove();
    widgetContainer = null;
  }
}

function makeWidgetDraggable(el, widgetKey) {
  let dragging = false, startX, startY, origX, origY;

  // Load saved position
  const saved = localStorage.getItem('widget_' + widgetKey);
  if (saved) {
    try {
      const pos = JSON.parse(saved);
      el.style.left = pos.x + 'px';
      el.style.top = pos.y + 'px';
    } catch(e) {}
  }

  el.querySelector('.widget-header').addEventListener('mousedown', e => {
    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
    const rect = el.getBoundingClientRect();
    origX = rect.left;
    origY = rect.top;
    e.preventDefault();
  });

  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    const x = origX + (e.clientX - startX);
    const y = origY + (e.clientY - startY);
    el.style.left = x + 'px';
    el.style.top = y + 'px';
  });

  document.addEventListener('mouseup', () => {
    if (dragging) {
      dragging = false;
      const rect = el.getBoundingClientRect();
      localStorage.setItem('widget_' + widgetKey, JSON.stringify({ x: rect.left, y: rect.top }));
    }
  });
}

function createClockWidget() {
  const el = document.createElement('div');
  el.className = 'desktop-widget';
  el.style.cssText = 'position:absolute;top:80px;right:30px;width:180px;height:200px;background:rgba(20,18,40,0.85);border:1px solid rgba(255,255,255,0.1);border-radius:14px;pointer-events:all;backdrop-filter:blur(16px);box-shadow:0 8px 32px rgba(0,0,0,0.4);overflow:hidden;';
  el.innerHTML = `
    <div class="widget-header" style="padding:10px 14px;font-size:12px;font-weight:600;color:rgba(255,255,255,0.7);cursor:grab;border-bottom:1px solid rgba(255,255,255,0.06);">🕐 Clock</div>
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:12px;">
      <canvas id="widget-clock-canvas" width="120" height="120" style="margin-bottom:8px;"></canvas>
      <div id="widget-digital-clock" style="font-size:20px;font-weight:300;color:#e8e6f0;font-variant-numeric:tabular-nums;"></div>
    </div>`;

  widgetContainer.appendChild(el);
  makeWidgetDraggable(el, 'clock');

  // Analog + digital clock
  const canvas = el.querySelector('#widget-clock-canvas');
  const digitalEl = el.querySelector('#widget-digital-clock');
  const ctx = canvas.getContext('2d');

  function drawClock() {
    const now = new Date();
    const h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();
    ctx.clearRect(0, 0, 120, 120);
    const cx = 60, cy = 60, r = 50;

    // Clock face
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Hour marks
    for (let i = 0; i < 12; i++) {
      const angle = (i * 30 - 90) * Math.PI / 180;
      const x1 = cx + Math.cos(angle) * 42;
      const y1 = cy + Math.sin(angle) * 42;
      const x2 = cx + Math.cos(angle) * 48;
      const y2 = cy + Math.sin(angle) * 48;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Hour hand
    const hAngle = ((h % 12) * 30 + m * 0.5 - 90) * Math.PI / 180;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(hAngle) * 28, cy + Math.sin(hAngle) * 28);
    ctx.strokeStyle = '#e8e6f0';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Minute hand
    const mAngle = (m * 6 - 90) * Math.PI / 180;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(mAngle) * 38, cy + Math.sin(mAngle) * 38);
    ctx.strokeStyle = '#a29bfe';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Second hand
    const sAngle = (s * 6 - 90) * Math.PI / 180;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(sAngle) * 42, cy + Math.sin(sAngle) * 42);
    ctx.strokeStyle = '#ff6b7a';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Center dot
    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#e8e6f0';
    ctx.fill();

    // Digital
    digitalEl.textContent = now.toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:true });
  }

  drawClock();
  const clockInterval = setInterval(drawClock, 1000);
  widgetIntervals.push(clockInterval);
}

function createSystemMonitorWidget() {
  const el = document.createElement('div');
  el.className = 'desktop-widget';
  el.style.cssText = 'position:absolute;top:300px;right:30px;width:200px;height:140px;background:rgba(20,18,40,0.85);border:1px solid rgba(255,255,255,0.1);border-radius:14px;pointer-events:all;backdrop-filter:blur(16px);box-shadow:0 8px 32px rgba(0,0,0,0.4);overflow:hidden;';
  el.innerHTML = `
    <div class="widget-header" style="padding:10px 14px;font-size:12px;font-weight:600;color:rgba(255,255,255,0.7);cursor:grab;border-bottom:1px solid rgba(255,255,255,0.06);">📊 System</div>
    <div style="padding:12px 14px;">
      <div style="margin-bottom:10px;">
        <div style="display:flex;justify-content:space-between;font-size:11px;color:rgba(255,255,255,0.6);margin-bottom:4px;">
          <span>CPU</span><span id="widget-cpu-val">0%</span>
        </div>
        <div style="height:6px;background:rgba(255,255,255,0.08);border-radius:3px;overflow:hidden;">
          <div id="widget-cpu-bar" style="height:100%;width:0%;background:linear-gradient(90deg,#a29bfe,#74b9ff);border-radius:3px;transition:width 0.5s ease;"></div>
        </div>
      </div>
      <div>
        <div style="display:flex;justify-content:space-between;font-size:11px;color:rgba(255,255,255,0.6);margin-bottom:4px;">
          <span>RAM</span><span id="widget-ram-val">0%</span>
        </div>
        <div style="height:6px;background:rgba(255,255,255,0.08);border-radius:3px;overflow:hidden;">
          <div id="widget-ram-bar" style="height:100%;width:0%;background:linear-gradient(90deg,#a8e6cf,#ffd93d);border-radius:3px;transition:width 0.5s ease;"></div>
        </div>
      </div>
    </div>`;

  widgetContainer.appendChild(el);
  makeWidgetDraggable(el, 'sysmon');

  // Animate CPU/RAM bars with simulated values
  function updateMonitor() {
    const cpu = 15 + Math.random() * 50;
    const ram = 30 + Math.random() * 40;
    const cpuBar = el.querySelector('#widget-cpu-bar');
    const ramBar = el.querySelector('#widget-ram-bar');
    const cpuVal = el.querySelector('#widget-cpu-val');
    const ramVal = el.querySelector('#widget-ram-val');
    if (cpuBar) cpuBar.style.width = cpu + '%';
    if (ramBar) ramBar.style.width = ram + '%';
    if (cpuVal) cpuVal.textContent = Math.round(cpu) + '%';
    if (ramVal) ramVal.textContent = Math.round(ram) + '%';
  }

  updateMonitor();
  const monInterval = setInterval(updateMonitor, 2000);
  widgetIntervals.push(monInterval);
}

function createQuickNotesWidget() {
  const el = document.createElement('div');
  el.className = 'desktop-widget';
  el.style.cssText = 'position:absolute;top:80px;right:230px;width:220px;height:180px;background:rgba(40,35,60,0.9);border:1px solid rgba(255,255,255,0.1);border-radius:14px;pointer-events:all;backdrop-filter:blur(16px);box-shadow:0 8px 32px rgba(0,0,0,0.4);overflow:hidden;display:flex;flex-direction:column;';

  const savedNote = localStorage.getItem('widget_quicknote') || 'Quick notes...\nClick to edit!';

  el.innerHTML = `
    <div class="widget-header" style="padding:10px 14px;font-size:12px;font-weight:600;color:rgba(255,255,255,0.7);cursor:grab;border-bottom:1px solid rgba(255,255,255,0.06);flex-shrink:0;">📝 Quick Notes</div>
    <textarea style="flex:1;padding:10px 14px;background:none;border:none;color:#e8e6f0;font-size:12px;resize:none;outline:none;font-family:inherit;line-height:1.5;">${savedNote}</textarea>`;

  widgetContainer.appendChild(el);
  makeWidgetDraggable(el, 'notes');

  // Save notes
  const textarea = el.querySelector('textarea');
  textarea.addEventListener('input', () => {
    localStorage.setItem('widget_quicknote', textarea.value);
  });
}

// ═══════════════════════════════════════════
// 10. KEYBOARD SHORTCUTS (Enhanced)
// ═══════════════════════════════════════════
function onKeyDown(e) {
  // Spotlight: Ctrl+K / Cmd+K
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    toggleSpotlight();
    return;
  }

  // Spotlight input handling
  if (spotlightOpen) {
    const input = document.getElementById('spotlight-input');
    if (e.key === 'Escape') {
      e.preventDefault();
      closeSpotlight();
      return;
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter') {
      handleSpotlightKeys(e);
      return;
    }
    // Update results on typing
    setTimeout(() => {
      if (input) updateSpotlightResults(input.value);
    }, 10);
    return;
  }

  // Ctrl+Shift+T = open terminal
  if (e.ctrlKey && e.shiftKey && e.key === 'T') {
    e.preventDefault();
    openApp('terminal');
    return;
  }
  // Ctrl+Shift+E = open editor
  if (e.ctrlKey && e.shiftKey && e.key === 'E') {
    e.preventDefault();
    openApp('editor');
    return;
  }
  // Ctrl+Shift+M = open music player
  if (e.ctrlKey && e.shiftKey && e.key === 'M') {
    e.preventDefault();
    openApp('music');
    return;
  }
  // Ctrl+Shift+C = open calculator
  if (e.ctrlKey && e.shiftKey && e.key === 'C') {
    e.preventDefault();
    openApp('calculator');
    return;
  }
  // F11 = toggle maximize focused window
  if (e.key === 'F11') {
    e.preventDefault();
    const focused = document.querySelector('.window.focused');
    if (focused) {
      toggleMaximize(focused.dataset.windowId);
    }
    return;
  }
  // Escape = close spotlight/start menu/calendar
  if (e.key === 'Escape') {
    if (spotlightOpen) {
      closeSpotlight();
    } else {
      startMenuOpen = false;
      document.getElementById('start-menu').classList.remove('visible');
      calendarOpen = false;
      document.getElementById('calendar-popup').style.display = 'none';
    }
  }
  // Meta key = toggle start menu
  if (e.key === 'Meta') {
    e.preventDefault();
    toggleStartMenu();
  }
}

// ── Wifi Toggle ──
function toggleWifi() {
  showNotification('Network', 'Wi-Fi toggled (demo)', 'info');
}

// ═══════════════════════════════════════════
// CSS: Inject premium animation keyframes
// ═══════════════════════════════════════════
const style = document.createElement('style');
style.textContent = `
/* Premium Window Open: scale from 0.85 + spring + slight rotation */
@keyframes windowOpenPremium {
  0% { opacity:0; transform:scale(0.85) rotate(-2deg); }
  60% { opacity:1; transform:scale(1.03) rotate(0.5deg); }
  80% { transform:scale(0.98) rotate(-0.2deg); }
  100% { opacity:1; transform:scale(1) rotate(0deg); }
}

/* Premium Window Close: scale down + blur + fade */
@keyframes windowClosePremium {
  0% { opacity:1; transform:scale(1); filter:blur(0px); }
  100% { opacity:0; transform:scale(0.85); filter:blur(8px); }
}

/* Premium Window Minimize: shrink to taskbar */
@keyframes windowMinimizePremium {
  0% { opacity:1; transform:scale(1) translateY(0); }
  100% { opacity:0; transform:scale(0.4) translateY(100vh); }
}

/* Notification progress bar */
@keyframes notifProgress {
  0% { width:100%; }
  100% { width:0%; }
}

/* Legacy fallback */
@keyframes windowClose {
  to { opacity:0; transform:scale(0.95); }
}

/* Snap zone styles */
.window.snap-left,
.window.snap-right {
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Notification stacking animation */
.notification {
  animation: notifSlide 0.3s ease forwards;
}
@keyframes notifSlide {
  0% { opacity:0; transform:translateX(30px); }
  100% { opacity:1; transform:translateX(0); }
}
`;
document.head.appendChild(style);
