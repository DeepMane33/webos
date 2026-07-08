/* ═══════════════════════════════════════════
   APP DEFINITIONS — Meridian OS
   ═══════════════════════════════════════════ */

const APP_DEFS = {
  terminal: {
    title: 'Terminal',
    icon: '\u{1F4BB}',
    width: 640, height: 420,
    content: buildTerminal
  },
  files: {
    title: 'Files',
    icon: '\u{1F4C1}',
    width: 700, height: 480,
    content: buildFileManager
  },
  editor: {
    title: 'Notepad',
    icon: '\u{1F4DD}',
    width: 600, height: 450,
    content: buildEditor
  },
  calculator: {
    title: 'Calculator',
    icon: '\u{1F5A9}',
    width: 320, height: 480,
    content: buildCalculator
  },
  browser: {
    title: 'Browser',
    icon: '\u{1F310}',
    width: 800, height: 560,
    content: buildBrowser
  },
  weather: {
    title: 'Weather',
    icon: '\u{26C5}',
    width: 420, height: 480,
    content: buildWeather
  },
  settings: {
    title: 'Settings',
    icon: '\u{2699}',
    width: 700, height: 500,
    content: buildSettings
  },
  music: {
    title: 'Music Player',
    icon: '\u{1F3B5}',
    width: 380, height: 520,
    content: buildMusicPlayer
  },
  paint: {
    title: 'Paint',
    icon: '\u{1F3A8}',
    width: 720, height: 520,
    content: buildPaint
  },
  about: {
    title: 'About Meridian OS',
    icon: '\u{2139}',
    width: 420, height: 420,
    content: buildAbout
  },
  volume: {
    title: 'Volume',
    icon: '\u{1F50A}',
    width: 300, height: 200,
    content: buildVolume
  },
  battery: {
    title: 'Battery',
    icon: '\u{1F50B}',
    width: 280, height: 160,
    content: buildBattery
  },
  monitor: {
    title: 'System Monitor',
    icon: '\u{1F4CA}',
    width: 500, height: 400,
    content: buildSystemMonitor
  },
  clock: {
    title: 'Clock',
    icon: '\u{1F550}',
    width: 350, height: 420,
    content: buildClock
  },
  gallery: {
    title: 'Gallery',
    icon: '\u{1F5BC}',
    width: 650, height: 500,
    content: buildGallery
  },
  stickynotes: {
    title: 'Sticky Notes',
    icon: '\\u{1F4DD}',
    width: 500, height: 450,
    content: buildStickyNotes
  },
  camera: {
    title: 'Camera',
    icon: '\\u{1F4F7}',
    width: 640, height: 520,
    content: buildCamera
  },
  shorts: {
    title: 'Shorts',
    icon: '\\u{1F3AC}',
    width: 400, height: 680,
    content: buildShorts
  }
};

/* ── TERMINAL ── */
function buildTerminal(win) {
  const body = document.createElement('div');
  body.className = 'terminal-body';
  body.innerHTML = `<div class="term-line"><span class="term-info">Meridian OS Terminal v1.0</span></div>
<div class="term-line"><span class="term-info">Type 'help' for available commands.</span></div>
<div class="term-line">&nbsp;</div>`;
  
  const inputLine = document.createElement('div');
  inputLine.className = 'term-input-line';
  inputLine.innerHTML = `<span class="term-prompt">user@meridian:~$ </span><input class="term-input" autofocus>`;
  body.appendChild(inputLine);

  const input = inputLine.querySelector('.term-input');
  const history = [];
  let histIdx = -1;

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const cmd = input.value.trim();
      input.value = '';
      if (cmd) {
        history.unshift(cmd);
        histIdx = -1;
      }
      executeCommand(cmd, body, inputLine);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (histIdx < history.length - 1) { histIdx++; input.value = history[histIdx]; }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx > 0) { histIdx--; input.value = history[histIdx]; }
      else { histIdx = -1; input.value = ''; }
    }
  });

  body.addEventListener('click', () => input.focus());
  setTimeout(() => input.focus(), 100);
  return body;
}

function executeCommand(cmd, body, inputLine) {
  // Echo the command
  const echoLine = document.createElement('div');
  echoLine.className = 'term-line';
  echoLine.innerHTML = `<span class="term-prompt">user@meridian:~$ </span>${escHtml(cmd)}`;
  body.insertBefore(echoLine, inputLine);

  let output = '';
  let cls = 'term-output';

  const parts = cmd.split(/\s+/);
  const command = parts[0]?.toLowerCase();
  const args = parts.slice(1);

  switch (command) {
    case '': break;
    case 'help':
      output = `Available commands:
  help        Show this help
  echo        Print text
  date        Show current date/time
  clear       Clear terminal
  whoami      Show username
  uname       System info
  ls          List files
  cat         Read a file
  neofetch    System info (fancy)
  calc        Calculator (calc 2+2)
  color       Change terminal color (color green/blue/purple/red)
  cowsay      Make a cow say something
  matrix      Toggle matrix rain
  history     Show command history
  sysinfo     Show animated system stats
  exit        Close terminal`;
      cls = 'term-info';
      break;

    case 'echo':
      output = args.join(' ');
      break;

    case 'date':
      output = new Date().toString();
      break;

    case 'clear':
      const lines = body.querySelectorAll('.term-line');
      lines.forEach(l => l.remove());
      return;

    case 'whoami':
      output = 'user';
      break;

    case 'uname':
      output = 'Meridian OS 1.0.0 (WebBrowser) x86_64 JavaScript/V8';
      break;

    case 'ls':
      output = `Desktop/  Documents/  Downloads/  Music/  Pictures/  Videos/  .config/`;
      cls = 'term-info';
      break;

    case 'cat':
      if (!args[0]) { output = 'Usage: cat <filename>'; cls = 'term-error'; }
      else if (args[0] === '/etc/os-release') {
        output = `NAME="Meridian OS"
VERSION="1.0.0"
ID=meridian
PRETTY_NAME="Meridian OS 1.0.0"`;
      } else {
        output = `cat: ${args[0]}: No such file or directory`;
        cls = 'term-error';
      }
      break;

    case 'neofetch':
      output = `       ╔═══╗        user@meridian
      ║ M ║        ─────────────────
       ╚═══╝        OS: Meridian OS 1.0.0
    ╔════════╗      Host: WebBrowser
    ║ Meridian║     Kernel: JavaScript
    ║   OS    ║     Uptime: ${Math.floor(performance.now()/1000)}s
    ╚════════╝     Shell: meridian-sh
                   Resolution: ${window.innerWidth}x${window.innerHeight}
                   Theme: Glassmorphism Dark
                   Terminal: meridian-term`;
      cls = 'term-info';
      break;

    case 'calc':
      try {
        const expr = args.join('');
        if (!expr) { output = 'Usage: calc <expression>'; cls = 'term-error'; break; }
        const safe = expr.replace(/[^0-9+\-*/().% ]/g, '');
        const result = Function('"use strict";return (' + safe + ')')();
        output = `${expr} = ${result}`;
      } catch { output = 'Invalid expression'; cls = 'term-error'; }
      break;

    case 'color':
      const colors = { green:'#a8e6cf', blue:'#74b9ff', purple:'#a29bfe', red:'#ff6b7a', yellow:'#ffd93d', pink:'#fd79a8', white:'#e8e6f0' };
      const c = colors[args[0]];
      if (c) {
        body.style.color = c;
        output = `Terminal color set to ${args[0]}`;
      } else {
        output = 'Available colors: ' + Object.keys(colors).join(', ');
        cls = 'term-info';
      }
      break;

    case 'cowsay':
      const msg = args.join(' ') || 'Moo!';
      const line = '─'.repeat(msg.length + 2);
      output = ` ┌${line}┐
 │ ${msg} │
 └${line}┘
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;
      break;

    case 'matrix':
      output = 'Matrix mode toggled! (visual effect coming soon)';
      cls = 'term-success';
      break;

    case 'history':
      output = history.map((h,i) => `  ${history.length - i}  ${h}`).reverse().join('\n') || 'No history yet.';
      cls = 'term-info';
      break;

    case 'sysinfo': {
      const cpu = (Math.random() * 60 + 20).toFixed(1);
      const ram = (Math.random() * 30 + 40).toFixed(1);
      const disk = '45.0';
      const upH = Math.floor(performance.now() / 3600000);
      const upM = Math.floor((performance.now() % 3600000) / 60000);
      const procs = Math.floor(Math.random() * 40 + 120);
      const cpuBar = '█'.repeat(Math.round(cpu / 5)) + '░'.repeat(20 - Math.round(cpu / 5));
      const ramBar = '█'.repeat(Math.round(ram / 5)) + '░'.repeat(20 - Math.round(ram / 5));
      const diskBar = '█'.repeat(Math.round(45 / 5)) + '░'.repeat(20 - Math.round(45 / 5));
      output = `╔══════════════════════════════════════╗
║         SYSTEM INFORMATION           ║
╠══════════════════════════════════════╣
║ CPU Usage:  [${cpuBar}] ${cpu}%
║ RAM Usage:  [${ramBar}] ${ram}%
║ Disk Usage: [${diskBar}] ${disk}%
║──────────────────────────────────────
║ Processes:  ${procs} running
║ Uptime:     ${upH}h ${upM}m
║ Load Avg:   ${(Math.random()*2).toFixed(2)}, ${(Math.random()*1.5).toFixed(2)}, ${(Math.random()*1).toFixed(2)}
║ Network:    ↑ ${(Math.random()*10).toFixed(1)} MB/s  ↓ ${(Math.random()*50).toFixed(1)} MB/s
╚══════════════════════════════════════╝`;
      cls = 'term-info';
      break;
    }

    case 'exit':
      const win = body.closest('.window');
      if (win) closeWindow(win.dataset.windowId);
      return;

    default:
      output = `Command not found: ${command}. Type 'help' for available commands.`;
      cls = 'term-error';
  }

  if (output) {
    const outLine = document.createElement('div');
    outLine.className = 'term-line';
    outLine.innerHTML = `<span class="${cls}">${escHtml(output)}</span>`;
    body.insertBefore(outLine, inputLine);
  }

  body.scrollTop = body.scrollHeight;
}

/* ── FILE MANAGER ── */
function buildFileManager(win) {
  const fs = {
    '/': ['home', 'etc', 'tmp', 'var'],
    '/home': ['user'],
    '/home/user': ['Desktop', 'Documents', 'Downloads', 'Music', 'Pictures', 'Videos', '.config'],
    '/home/user/Desktop': ['readme.txt', 'notes.txt', 'project/'],
    '/home/user/Documents': ['report.pdf', 'budget.xlsx', 'resume.docx', 'ideas.md'],
    '/home/user/Downloads': ['image.png', 'setup.exe', 'archive.zip'],
    '/home/user/Music': ['track01.mp3', 'track02.mp3', 'playlist.m3u'],
    '/home/user/Pictures': ['wallpaper.jpg', 'screenshot.png', 'vacation/'],
    '/home/user/Videos': ['tutorial.mp4', 'demo.webm'],
    '/home/user/.config': ['settings.json', 'theme.conf']
  };

  const fileIcons = {
    '.txt': '\u{1F4C4}', '.pdf': '\u{1F4D5}', '.xlsx': '\u{1F4CA}',
    '.docx': '\u{1F4D6}', '.md': '\u{1F4DD}', '.png': '\u{1F5BC}',
    '.jpg': '\u{1F5BC}', '.exe': '\u{2699}', '.zip': '\u{1F4E6}',
    '.mp3': '\u{1F3B5}', '.m3u': '\u{1F3B6}', '.mp4': '\u{1F3AC}',
    '.webm': '\u{1F3AC}', '.json': '\u{1F4CB}', '.conf': '\u{2699}',
    'folder': '\u{1F4C1}'
  };

  let currentPath = '/home/user';

  const body = document.createElement('div');
  body.className = 'files-body';

  body.innerHTML = `
    <div class="files-toolbar">
      <button class="files-nav-btn" id="files-back">\u2190</button>
      <button class="files-nav-btn" id="files-home">\u2302</button>
      <div class="files-path" id="files-path">/home/user</div>
    </div>
    <div class="files-content" id="files-grid"></div>
    <div class="files-status" id="files-status">Ready</div>`;

  const grid = body.querySelector('#files-grid');
  const pathEl = body.querySelector('#files-path');
  const statusEl = body.querySelector('#files-status');

  function render() {
    const items = fs[currentPath] || [];
    pathEl.textContent = currentPath;
    grid.innerHTML = '';

    items.forEach(item => {
      const isFolder = item.endsWith('/') || !item.includes('.');
      const icon = isFolder ? fileIcons['folder'] : (fileIcons['.' + item.split('.').pop()] || '\u{1F4C4}');
      const el = document.createElement('div');
      el.className = 'file-item';
      el.innerHTML = `<div class="file-icon">${icon}</div><div class="file-name">${item}</div>`;
      el.addEventListener('dblclick', () => {
        if (isFolder) {
          const name = item.replace('/', '');
          currentPath = currentPath === '/' ? '/' + name : currentPath + '/' + name;
          render();
        }
      });
      el.addEventListener('click', () => {
        grid.querySelectorAll('.file-item').forEach(f => f.classList.remove('selected'));
        el.classList.add('selected');
        statusEl.textContent = item;
      });
      grid.appendChild(el);
    });

    statusEl.textContent = `${items.length} items`;
  }

  body.querySelector('#files-back').addEventListener('click', () => {
    if (currentPath !== '/') {
      currentPath = currentPath.substring(0, currentPath.lastIndexOf('/')) || '/';
      render();
    }
  });

  body.querySelector('#files-home').addEventListener('click', () => {
    currentPath = '/home/user';
    render();
  });

  render();
  return body;
}

/* ── NOTEPAD ── */
function buildEditor(win) {
  const body = document.createElement('div');
  body.className = 'editor-body';

  body.innerHTML = `
    <div class="editor-toolbar">
      <button class="editor-tool" data-cmd="new">\u{1F4C1} New</button>
      <button class="editor-tool" data-cmd="save">\u{1F4BE} Save</button>
      <button class="editor-tool" data-cmd="bold"><b>B</b></button>
      <button class="editor-tool" data-cmd="upper">Aa \u2192 AA</button>
      <button class="editor-tool" data-cmd="lower">Aa \u2192 aa</button>
      <button class="editor-tool" data-cmd="count">Word Count</button>
    </div>
    <textarea class="editor-textarea" placeholder="Start typing..." spellcheck="false">Welcome to Meridian OS Notepad!

This is a simple text editor.
You can write notes, code, or anything you like.

Features:
- New / Save files
- Bold text formatting
- Case conversion (upper/lower)
- Word & character count
- Auto-saves to browser localStorage

Try typing something!</textarea>
    <div class="editor-status">
      <span id="editor-pos">Ln 1, Col 1</span>
      <span id="editor-count">0 words | 0 chars</span>
    </div>`;

  const textarea = body.querySelector('.editor-textarea');

  // Load saved content
  const saved = localStorage.getItem('meridian_notepad');
  if (saved) textarea.value = saved;

  // Update word count
  function updateCount() {
    const text = textarea.value;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    body.querySelector('#editor-count').textContent = `${words} words | ${text.length} chars`;
    localStorage.setItem('meridian_notepad', text);
  }

  textarea.addEventListener('input', updateCount);
  textarea.addEventListener('click', () => {
    const pos = textarea.selectionStart;
    const lines = textarea.value.substring(0, pos).split('\n');
    body.querySelector('#editor-pos').textContent = `Ln ${lines.length}, Col ${lines[lines.length-1].length + 1}`;
  });

  updateCount();

  // Toolbar actions
  body.querySelectorAll('.editor-tool').forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.dataset.cmd;
      switch (cmd) {
        case 'new':
          if (confirm('Clear current content?')) { textarea.value = ''; updateCount(); }
          break;
        case 'save':
          const blob = new Blob([textarea.value], { type: 'text/plain' });
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'document.txt';
          a.click();
          showNotification('Notepad', 'File saved!', 'success');
          break;
        case 'bold':
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          const sel = textarea.value.substring(start, end);
          textarea.value = textarea.value.substring(0, start) + `**${sel}**` + textarea.value.substring(end);
          updateCount();
          break;
        case 'upper':
          textarea.value = textarea.value.toUpperCase();
          updateCount();
          break;
        case 'lower':
          textarea.value = textarea.value.toLowerCase();
          updateCount();
          break;
        case 'count':
          const t = textarea.value;
          const w = t.trim() ? t.trim().split(/\s+/).length : 0;
          const l = t.split('\n').length;
          showNotification('Notepad', `${w} words, ${t.length} chars, ${l} lines`, 'info');
          break;
      }
    });
  });

  return body;
}

/* ── CALCULATOR ── */
function buildCalculator(win) {
  const body = document.createElement('div');
  body.className = 'calc-body';

  body.innerHTML = `
    <div class="calc-display">
      <div class="calc-expr" id="calc-expr">&nbsp;</div>
      <div class="calc-result" id="calc-result">0</div>
    </div>
    <div class="calc-grid">
      <button class="calc-btn clear" data-v="C">C</button>
      <button class="calc-btn clear" data-v="CE">CE</button>
      <button class="calc-btn op" data-v="%">%</button>
      <button class="calc-btn op" data-v="/">÷</button>
      <button class="calc-btn" data-v="7">7</button>
      <button class="calc-btn" data-v="8">8</button>
      <button class="calc-btn" data-v="9">9</button>
      <button class="calc-btn op" data-v="*">×</button>
      <button class="calc-btn" data-v="4">4</button>
      <button class="calc-btn" data-v="5">5</button>
      <button class="calc-btn" data-v="6">6</button>
      <button class="calc-btn op" data-v="-">−</button>
      <button class="calc-btn" data-v="1">1</button>
      <button class="calc-btn" data-v="2">2</button>
      <button class="calc-btn" data-v="3">3</button>
      <button class="calc-btn op" data-v="+">+</button>
      <button class="calc-btn" data-v="00">00</button>
      <button class="calc-btn" data-v="0">0</button>
      <button class="calc-btn" data-v=".">.</button>
      <button class="calc-btn eq" data-v="=">=</button>
    </div>
    <div class="calc-history" id="calc-history">
      <div style="font-size:11px;color:var(--text-dim);margin-bottom:6px;font-weight:600;text-transform:uppercase;letter-spacing:1px">History</div>
      <div class="calc-history-list" id="calc-history-list"></div>
    </div>`;

  const exprEl = body.querySelector('#calc-expr');
  const resultEl = body.querySelector('#calc-result');
  const historyListEl = body.querySelector('#calc-history-list');
  let expression = '';
  let lastResult = '';
  const calcHistory = [];

  function addHistory(expr, result) {
    calcHistory.unshift({ expr, result });
    if (calcHistory.length > 5) calcHistory.pop();
    historyListEl.innerHTML = calcHistory.map(h =>
      `<div style="padding:3px 0;border-bottom:1px solid rgba(255,255,255,0.05);font-size:12px;cursor:pointer" title="Click to reuse">
        <span style="color:var(--text-dim)">${escHtml(h.expr)}</span>
        <span style="color:var(--accent);float:right">${escHtml(h.result)}</span>
      </div>`
    ).join('');
  }

  body.querySelectorAll('.calc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const v = btn.dataset.v;

      if (v === 'C') { expression = ''; lastResult = ''; exprEl.innerHTML = '&nbsp;'; resultEl.textContent = '0'; return; }
      if (v === 'CE') { expression = expression.slice(0, -1); exprEl.textContent = expression || '\u00A0'; return; }

      if (v === '=') {
        try {
          const safe = expression.replace(/[^0-9+\-*/().% ]/g, '');
          const result = Function('"use strict";return (' + safe + ')')();
          const displayResult = Number.isFinite(result) ? parseFloat(result.toFixed(10)).toString() : 'Error';
          exprEl.textContent = expression + ' =';
          resultEl.textContent = displayResult;
          addHistory(expression, displayResult);
          lastResult = result.toString();
          expression = result.toString();
        } catch {
          resultEl.textContent = 'Error';
        }
        return;
      }

      // If last action was = and user types a number, start fresh
      if (lastResult && /[0-9]/.test(v) && !/[+\-*/%]/.test(expression.slice(-1))) {
        expression = '';
        lastResult = '';
      }

      expression += v;
      exprEl.textContent = expression;
    });
  });

  return body;
}

/* ── BROWSER ── */
function buildBrowser(win) {
  const body = document.createElement('div');
  body.className = 'browser-body';

  const pages = {
    'meridian://home': `
      <div class="browser-homepage">
        <h2>Meridian Browser</h2>
        <p style="color:var(--text-dim)">Your gateway to the web</p>
        <div class="quick-links">
          <div class="quick-link" onclick="browserNav(this.closest('.browser-body'),'meridian://dashboard')"><div class="ql-icon">\u{1F4CA}</div><div class="ql-name">Dashboard</div></div>
          <div class="quick-link" onclick="browserNav(this.closest('.browser-body'),'meridian://about')"><div class="ql-icon">\u{2139}</div><div class="ql-name">About</div></div>
          <div class="quick-link" onclick="browserNav(this.closest('.browser-body'),'meridian://news')"><div class="ql-icon">\u{1F4F0}</div><div class="ql-name">News</div></div>
          <div class="quick-link" onclick="browserNav(this.closest('.browser-body'),'meridian://games')"><div class="ql-icon">\u{1F3AE}</div><div class="ql-name">Games</div></div>
          <div class="quick-link" onclick="browserNav(this.closest('.browser-body'),'meridian://chat')"><div class="ql-icon">\u{1F4AC}</div><div class="ql-name">Chat</div></div>
          <div class="quick-link" onclick="browserNav(this.closest('.browser-body'),'meridian://music')"><div class="ql-icon">\u{1F3B5}</div><div class="ql-name">Music</div></div>
          <div class="quick-link" onclick="browserNav(this.closest('.browser-body'),'meridian://settings')"><div class="ql-icon">\u{2699}</div><div class="ql-name">Settings</div></div>
        </div>
      </div>`,
    'meridian://dashboard': `
      <div style="padding:24px;max-width:600px;margin:auto">
        <h2 style="margin-bottom:20px">\u{1F4CA} Dashboard</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
          <div style="padding:16px;background:rgba(255,255,255,0.03);border:1px solid var(--border-glass);border-radius:12px">
            <h3 style="font-size:14px;margin-bottom:12px;color:var(--accent)">\u{1F550} Clock</h3>
            <div id="dash-clock" style="font-size:28px;font-weight:700;font-family:monospace"></div>
            <div id="dash-date" style="font-size:12px;color:var(--text-dim);margin-top:4px"></div>
          </div>
          <div style="padding:16px;background:rgba(255,255,255,0.03);border:1px solid var(--border-glass);border-radius:12px">
            <h3 style="font-size:14px;margin-bottom:12px;color:var(--accent)">\u{26C5} Weather</h3>
            <div style="font-size:32px;margin-bottom:4px">\u{26C5}</div>
            <div style="font-size:20px;font-weight:600">22\u00B0C</div>
            <div style="font-size:12px;color:var(--text-dim)">Partly Cloudy</div>
          </div>
          <div style="padding:16px;background:rgba(255,255,255,0.03);border:1px solid var(--border-glass);border-radius:12px;grid-column:span 2">
            <h3 style="font-size:14px;margin-bottom:12px;color:var(--accent)">\u{1F4DD} Quick Notes</h3>
            <div id="dash-notes" style="font-size:13px;color:var(--text-dim);line-height:1.6"></div>
          </div>
          <div style="padding:16px;background:rgba(255,255,255,0.03);border:1px solid var(--border-glass);border-radius:12px">
            <h3 style="font-size:14px;margin-bottom:12px;color:var(--accent)">\u{1F4BB} System</h3>
            <div style="font-size:12px;line-height:1.8;color:var(--text-dim)">
              <div>CPU: <span id="dash-cpu" style="color:var(--text)">--</span></div>
              <div>RAM: <span id="dash-ram" style="color:var(--text)">--</span></div>
              <div>Uptime: <span id="dash-uptime" style="color:var(--text)">--</span></div>
            </div>
          </div>
          <div style="padding:16px;background:rgba(255,255,255,0.03);border:1px solid var(--border-glass);border-radius:12px">
            <h3 style="font-size:14px;margin-bottom:12px;color:var(--accent)">\u{1F3B5} Now Playing</h3>
            <div style="font-size:13px">
              <div style="font-weight:600">Midnight Drive</div>
              <div style="color:var(--text-dim);font-size:12px">Synthwave FM</div>
            </div>
          </div>
        </div>
      </div>`,
    'meridian://about': `
      <div style="padding:24px;max-width:500px;margin:auto">
        <h2 style="margin-bottom:12px">About Meridian Browser</h2>
        <p>A lightweight, privacy-focused browser built right into Meridian OS.</p>
        <p style="margin-top:8px;color:var(--text-dim)">Version 1.0 | Rendering Engine: MeridianWebKit</p>
        <hr style="border-color:var(--border-glass);margin:16px 0">
        <p>Built with HTML, CSS, and JavaScript. No external dependencies.</p>
      </div>`,
    'meridian://news': `
      <div style="padding:24px;max-width:600px;margin:auto">
        <h2 style="margin-bottom:16px">\u{1F4F0} Meridian News</h2>
        <div style="padding:12px;margin-bottom:8px;background:rgba(255,255,255,0.03);border:1px solid var(--border-glass);border-radius:8px">
          <h3 style="font-size:15px;margin-bottom:4px">Meridian OS 1.0 Released!</h3>
          <p style="font-size:13px;color:var(--text-dim)">The first version of Meridian OS is now available with 10 built-in apps, glassmorphism UI, and full window management.</p>
        </div>
        <div style="padding:12px;margin-bottom:8px;background:rgba(255,255,255,0.03);border:1px solid var(--border-glass);border-radius:8px">
          <h3 style="font-size:15px;margin-bottom:4px">New Paint App Launched</h3>
          <p style="font-size:13px;color:var(--text-dim)">Create digital art with the new Paint application featuring multiple brushes and colors.</p>
        </div>
        <div style="padding:12px;margin-bottom:8px;background:rgba(255,255,255,0.03);border:1px solid var(--border-glass);border-radius:8px">
          <h3 style="font-size:15px;margin-bottom:4px">Weather Widget Now Available</h3>
          <p style="font-size:13px;color:var(--text-dim)">Check the forecast directly from your desktop with the new Weather app.</p>
        </div>
      </div>`,
    'meridian://games': `
      <div style="padding:24px;text-align:center">
        <h2 style="margin-bottom:16px">\u{1F3AE} Games</h2>
        <p style="color:var(--text-dim)">Coming soon! Mini-games will be available in the next update.</p>
        <div style="margin-top:20px;padding:20px;background:rgba(255,255,255,0.03);border:1px solid var(--border-glass);border-radius:8px;display:inline-block">
          <div style="font-size:48px">\u{1F3AE}</div>
          <p style="margin-top:8px">Stay tuned!</p>
        </div>
      </div>`,
    'meridian://chat': `
      <div style="padding:24px;max-width:500px;margin:auto">
        <h2 style="margin-bottom:16px">\u{1F4AC} Meridian Chat</h2>
        <div style="background:rgba(0,0,0,0.2);border:1px solid var(--border-glass);border-radius:8px;padding:16px;min-height:200px;margin-bottom:12px">
          <div style="margin-bottom:8px"><span style="color:var(--accent);font-weight:600">System:</span> Welcome to Meridian Chat! This is a demo.</div>
          <div style="margin-bottom:8px"><span style="color:#a855f7;font-weight:600">Alice:</span> Hey everyone! The new OS looks great!</div>
          <div style="margin-bottom:8px"><span style="color:#2ed573;font-weight:600">Bob:</span> Love the glassmorphism design</div>
          <div><span style="color:#ffa502;font-weight:600">Charlie:</span> When are mini-games coming?</div>
        </div>
        <div style="display:flex;gap:8px">
          <input type="text" placeholder="Type a message..." style="flex:1;padding:8px 12px;background:rgba(0,0,0,0.3);border:1px solid var(--border-glass);border-radius:8px;color:var(--text);outline:none">
          <button style="padding:8px 16px;background:var(--accent);border:none;border-radius:8px;color:white;cursor:pointer">Send</button>
        </div>
      </div>`,
    'meridian://music': `
      <div style="padding:24px;text-align:center">
        <h2 style="margin-bottom:16px">\u{1F3B5} Music Store</h2>
        <p style="color:var(--text-dim)">Browse and discover new music</p>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:20px;max-width:400px;margin-left:auto;margin-right:auto">
          ${['\u{1F3B5} Synthwave','\u{1F3B6} Lo-Fi','\u{1F3B8} Rock','\u{1F3B9} Classical','\u{1F3BA} Jazz','\u{1F3B7} Hip-Hop'].map(g => `
            <div style="padding:16px;background:rgba(255,255,255,0.03);border:1px solid var(--border-glass);border-radius:8px;cursor:pointer">${g}</div>
          `).join('')}
        </div>
      </div>`,
    'meridian://settings': `
      <div style="padding:24px;max-width:400px;margin:auto">
        <h2 style="margin-bottom:16px">\u{2699} Browser Settings</h2>
        <div style="padding:12px 0;border-bottom:1px solid var(--border-glass)">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span>Search Engine</span><span style="color:var(--text-dim)">Meridian Search</span>
          </div>
        </div>
        <div style="padding:12px 0;border-bottom:1px solid var(--border-glass)">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span>Homepage</span><span style="color:var(--text-dim)">meridian://home</span>
          </div>
        </div>
        <div style="padding:12px 0">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span>Privacy Mode</span><span style="color:var(--success)">Enabled</span>
          </div>
        </div>
      </div>`
  };

  body.innerHTML = `
    <div class="browser-toolbar">
      <button class="browser-nav-btn" id="browser-back">\u2190</button>
      <button class="browser-nav-btn" id="browser-fwd">\u2192</button>
      <button class="browser-nav-btn" id="browser-refresh">\u21BB</button>
      <input class="browser-url" id="browser-url" value="meridian://home" placeholder="Enter URL...">
      <button class="browser-nav-btn" id="browser-go">\u279C</button>
    </div>
    <div class="browser-content" id="browser-page"></div>`;

  const urlInput = body.querySelector('#browser-url');
  const pageEl = body.querySelector('#browser-page');
  let dashInterval = null;

  function navigate(url) {
    urlInput.value = url;
    pageEl.innerHTML = pages[url] || `
      <div style="padding:40px;text-align:center">
        <div style="font-size:48px;margin-bottom:16px">\u{1F30D}</div>
        <h2>Page Not Found</h2>
        <p style="color:var(--text-dim);margin-top:8px">Could not find: ${escHtml(url)}</p>
        <p style="color:var(--text-dim);margin-top:4px">Try meridian://home, meridian://dashboard, meridian://news, meridian://games, or meridian://chat</p>
      </div>`;

    // Dashboard live updates
    if (dashInterval) { clearInterval(dashInterval); dashInterval = null; }
    if (url === 'meridian://dashboard') {
      function updateDash() {
        const now = new Date();
        const clk = pageEl.querySelector('#dash-clock');
        const dt = pageEl.querySelector('#dash-date');
        const cpu = pageEl.querySelector('#dash-cpu');
        const ram = pageEl.querySelector('#dash-ram');
        const up = pageEl.querySelector('#dash-uptime');
        const notes = pageEl.querySelector('#dash-notes');
        if (clk) clk.textContent = now.toLocaleTimeString();
        if (dt) dt.textContent = now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        if (cpu) cpu.textContent = (Math.random()*60+20).toFixed(1) + '%';
        if (ram) ram.textContent = (Math.random()*30+40).toFixed(1) + '%';
        if (up) { const s = Math.floor(performance.now()/1000); up.textContent = Math.floor(s/3600) + 'h ' + Math.floor((s%3600)/60) + 'm'; }
        if (notes) {
          const saved = localStorage.getItem('meridian_stickynotes');
          if (saved) {
            try { const arr = JSON.parse(saved); notes.textContent = arr.slice(0,3).map(n=>n.text).join(' | ') || 'No notes yet'; }
            catch { notes.textContent = 'No notes yet'; }
          } else { notes.textContent = 'No notes yet'; }
        }
      }
      updateDash();
      dashInterval = setInterval(updateDash, 2000);
    }
  }

  // Store nav function on body for onclick handlers
  body._navigate = navigate;

  urlInput.addEventListener('keydown', e => { if (e.key === 'Enter') navigate(urlInput.value); });
  body.querySelector('#browser-go').addEventListener('click', () => navigate(urlInput.value));
  body.querySelector('#browser-back').addEventListener('click', () => navigate('meridian://home'));
  body.querySelector('#browser-refresh').addEventListener('click', () => navigate(urlInput.value));

  navigate('meridian://home');
  return body;
}

// Global nav function for inline onclick
function browserNav(body, url) {
  if (body._navigate) body._navigate(url);
}

/* ── WEATHER ── */
function buildWeather(win) {
  const body = document.createElement('div');
  body.className = 'weather-body';

  const forecasts = [
    { day: 'Mon', icon: '\u{2600}', temp: '24\u00B0' },
    { day: 'Tue', icon: '\u{26C5}', temp: '22\u00B0' },
    { day: 'Wed', icon: '\u{1F327}', temp: '18\u00B0' },
    { day: 'Thu', icon: '\u{2600}', temp: '26\u00B0' },
    { day: 'Fri', icon: '\u{26C5}', temp: '23\u00B0' },
  ];

  body.innerHTML = `
    <div class="weather-main">
      <div class="weather-icon">\u{26C5}</div>
      <div class="weather-temp">22\u00B0C</div>
      <div class="weather-desc">Partly Cloudy</div>
      <div class="weather-location">\u{1F4CD} San Francisco, CA</div>
    </div>
    <div class="weather-details">
      <div class="weather-detail">
        <div class="wd-label">Humidity</div>
        <div class="wd-value">65%</div>
      </div>
      <div class="weather-detail">
        <div class="wd-label">Wind</div>
        <div class="wd-value">12 km/h</div>
      </div>
      <div class="weather-detail">
        <div class="wd-label">UV Index</div>
        <div class="wd-value">5</div>
      </div>
    </div>
    <div class="weather-forecast">
      ${forecasts.map(f => `
        <div class="forecast-day">
          <div class="fd-name">${f.day}</div>
          <div class="fd-icon">${f.icon}</div>
          <div class="fd-temp">${f.temp}</div>
        </div>
      `).join('')}
    </div>`;

  return body;
}

/* ── SETTINGS ── */
function buildSettings(win) {
  const body = document.createElement('div');
  body.className = 'settings-body';

  const settingsPages = {
    appearance: `
      <div class="settings-section">
        <h3>Appearance</h3>
        <div class="setting-row">
          <div><div class="setting-label">Dark Mode</div><div class="setting-desc">Use dark color scheme</div></div>
          <div class="toggle on" onclick="this.classList.toggle('on')"></div>
        </div>
        <div class="setting-row">
          <div><div class="setting-label">Accent Color</div><div class="setting-desc">Customize system accent</div></div>
          <div style="display:flex;gap:6px">
            ${['#6c63ff','#a855f7','#ff4757','#2ed573','#ffa502','#74b9ff','#fd79a8'].map(c=>
              `<div style="width:24px;height:24px;border-radius:50%;background:${c};cursor:pointer;border:2px solid transparent" onclick="setAccent('${c}',this)"></div>`
            ).join('')}
          </div>
        </div>
        <div class="setting-row">
          <div><div class="setting-label">Wallpaper</div><div class="setting-desc">Choose desktop background</div></div>
          <button class="editor-tool" onclick="cycleWallpaper()">Change</button>
        </div>
        <div class="setting-row">
          <div><div class="setting-label">Animation Speed</div><div class="setting-desc">Window open/close animation</div></div>
          <select style="background:rgba(0,0,0,0.3);border:1px solid var(--border-glass);color:var(--text);padding:6px 10px;border-radius:6px">
            <option>Fast</option><option selected>Normal</option><option>Slow</option><option>None</option>
          </select>
        </div>
      </div>`,
    display: `
      <div class="settings-section">
        <h3>Display</h3>
        <div class="setting-row">
          <div><div class="setting-label">Resolution</div><div class="setting-desc">Screen resolution</div></div>
          <span style="color:var(--text-dim)">${window.innerWidth} x ${window.innerHeight}</span>
        </div>
        <div class="setting-row">
          <div><div class="setting-label">Taskbar Position</div><div class="setting-desc">Where the taskbar appears</div></div>
          <select style="background:rgba(0,0,0,0.3);border:1px solid var(--border-glass);color:var(--text);padding:6px 10px;border-radius:6px">
            <option selected>Bottom</option><option>Top</option><option>Left</option><option>Right</option>
          </select>
        </div>
        <div class="setting-row">
          <div><div class="setting-label">Show Desktop Icons</div><div class="setting-desc">Display icons on desktop</div></div>
          <div class="toggle on" onclick="this.classList.toggle('on');document.getElementById('desktop-icons').style.display=this.classList.contains('on')?'grid':'none'"></div>
        </div>
      </div>`,
    sound: `
      <div class="settings-section">
        <h3>Sound</h3>
        <div class="setting-row">
          <div><div class="setting-label">System Volume</div><div class="setting-desc">Master volume level</div></div>
          <input type="range" min="0" max="100" value="75" style="width:120px">
        </div>
        <div class="setting-row">
          <div><div class="setting-label">Notification Sound</div><div class="setting-desc">Play sound for notifications</div></div>
          <div class="toggle on" onclick="this.classList.toggle('on')"></div>
        </div>
        <div class="setting-row">
          <div><div class="setting-label">System Sounds</div><div class="setting-desc">UI interaction sounds</div></div>
          <div class="toggle on" onclick="this.classList.toggle('on')"></div>
        </div>
      </div>`,
    widgets: `
      <div class="settings-section">
        <h3>Widgets</h3>
        <div class="setting-row">
          <div><div class="setting-label">Desktop Clock Widget</div><div class="setting-desc">Show analog clock on desktop</div></div>
          <div class="toggle on" onclick="this.classList.toggle('on');toggleDesktopWidget('clock',this.classList.contains('on'))"></div>
        </div>
        <div class="setting-row">
          <div><div class="setting-label">Weather Widget</div><div class="setting-desc">Show weather info on desktop</div></div>
          <div class="toggle on" onclick="this.classList.toggle('on');toggleDesktopWidget('weather',this.classList.contains('on'))"></div>
        </div>
        <div class="setting-row">
          <div><div class="setting-label">System Monitor Widget</div><div class="setting-desc">Show CPU/RAM stats on desktop</div></div>
          <div class="toggle" onclick="this.classList.toggle('on');toggleDesktopWidget('sysmon',this.classList.contains('on'))"></div>
        </div>
        <div class="setting-row">
          <div><div class="setting-label">Notes Preview Widget</div><div class="setting-desc">Show recent sticky notes on desktop</div></div>
          <div class="toggle" onclick="this.classList.toggle('on');toggleDesktopWidget('notes',this.classList.contains('on'))"></div>
        </div>
      </div>`,
    about: `
      <div class="settings-section">
        <h3>About Meridian OS</h3>
        <div class="setting-row"><div class="setting-label">OS Name</div><span style="color:var(--text-dim)">Meridian OS</span></div>
        <div class="setting-row"><div class="setting-label">Version</div><span style="color:var(--text-dim)">1.0.0</span></div>
        <div class="setting-row"><div class="setting-label">Codename</div><span style="color:var(--text-dim)">Aurora</span></div>
        <div class="setting-row"><div class="setting-label">Kernel</div><span style="color:var(--text-dim)">JavaScript ES2024</span></div>
        <div class="setting-row"><div class="setting-label">Renderer</div><span style="color:var(--text-dim)">MeridianWebKit</span></div>
        <div class="setting-row"><div class="setting-label">Desktop</div><span style="color:var(--text-dim)">MeridianDE 1.0</span></div>
        <div class="setting-row"><div class="setting-label">License</div><span style="color:var(--text-dim)">Open Source</span></div>
      </div>`
  };

  body.innerHTML = `
    <div class="settings-nav">
      <div class="settings-nav-item active" data-page="appearance">\u{1F3A8} Appearance</div>
      <div class="settings-nav-item" data-page="display">\u{1F4BB} Display</div>
      <div class="settings-nav-item" data-page="sound">\u{1F50A} Sound</div>
      <div class="settings-nav-item" data-page="widgets">\u{1F4CB} Widgets</div>
      <div class="settings-nav-item" data-page="about">\u{2139} About</div>
    </div>
    <div class="settings-content" id="settings-page"></div>`;

  const pageEl = body.querySelector('#settings-page');

  function showPage(name) {
    pageEl.innerHTML = settingsPages[name] || '';
    body.querySelectorAll('.settings-nav-item').forEach(n => n.classList.toggle('active', n.dataset.page === name));
  }

  body.querySelectorAll('.settings-nav-item').forEach(item => {
    item.addEventListener('click', () => showPage(item.dataset.page));
  });

  showPage('appearance');
  return body;
}

/* Settings helpers */
function setAccent(color, el) {
  document.documentElement.style.setProperty('--accent', color);
  document.documentElement.style.setProperty('--accent-glow', color + '66');
  el.closest('.settings-body')?.querySelectorAll('[style*="border-radius:50%"]').forEach(s => s.style.borderColor = 'transparent');
  el.style.borderColor = 'white';
}

const wallpapers = [
  'linear-gradient(135deg, #0a0a1a 0%, #1a1040 30%, #0f1a3a 60%, #0a0a1a 100%)',
  'linear-gradient(135deg, #0a1628 0%, #1a2a4a 30%, #0a2040 60%, #0a1020 100%)',
  'linear-gradient(135deg, #1a0a20 0%, #2a1040 30%, #1a0a30 60%, #0a0a1a 100%)',
  'linear-gradient(135deg, #0a1a0a 0%, #102a10 30%, #0a200a 60%, #0a1a0a 100%)',
  'linear-gradient(135deg, #1a0a0a 0%, #301010 30%, #200a0a 60%, #0a0a0a 100%)',
];
let wpIdx = 0;
function cycleWallpaper() {
  wpIdx = (wpIdx + 1) % wallpapers.length;
  document.getElementById('desktop').style.background = wallpapers[wpIdx];
  showNotification('Settings', 'Wallpaper changed!', 'success');
}

/* Desktop widget toggles */
function toggleDesktopWidget(type, on) {
  // This function is called from Settings > Widgets toggles
  // Actual widget rendering is handled by the main desktop code
  showNotification('Widgets', `${type} widget ${on ? 'enabled' : 'disabled'}`, 'info');
}

/* ── MUSIC PLAYER ── */
function buildMusicPlayer(win) {
  const body = document.createElement('div');
  body.className = 'music-body';

  const playlist = [
    { title: 'Midnight Drive', artist: 'Synthwave FM', dur: '3:42' },
    { title: 'Neon Dreams', artist: 'Retro Pulse', dur: '4:15' },
    { title: 'Digital Sunset', artist: 'Chillhop Radio', dur: '3:58' },
    { title: 'Starlight', artist: 'Cosmic Beats', dur: '5:01' },
    { title: 'Ocean Waves', artist: 'Nature Sounds', dur: '6:30' },
  ];

  let currentTrack = 0;
  let isPlaying = false;
  let vizInterval = null;

  body.innerHTML = `
    <div class="music-art" id="music-art">\u{1F3B5}</div>
    <div class="music-visualizer" id="music-viz">
      <div class="viz-bar"></div><div class="viz-bar"></div><div class="viz-bar"></div><div class="viz-bar"></div>
      <div class="viz-bar"></div><div class="viz-bar"></div><div class="viz-bar"></div><div class="viz-bar"></div>
    </div>
    <div class="music-title" id="music-title">${playlist[0].title}</div>
    <div class="music-artist" id="music-artist">${playlist[0].artist}</div>
    <div class="music-progress" id="music-progress">
      <div class="music-progress-bar" id="music-bar"></div>
    </div>
    <div class="music-time">
      <span id="music-elapsed">1:18</span>
      <span id="music-total">${playlist[0].dur}</span>
    </div>
    <div class="music-controls">
      <button class="music-btn" id="music-prev">\u23EE</button>
      <button class="music-btn play" id="music-play">\u25B6</button>
      <button class="music-btn" id="music-next">\u23ED</button>
    </div>
    <div class="music-playlist">
      ${playlist.map((t, i) => `
        <div class="playlist-item ${i === 0 ? 'active' : ''}" data-idx="${i}">
          <span>${i === 0 ? '\u{1F3B5}' : '\u{1F3B5}'}</span>
          <span>${t.title}</span>
          <span class="pl-dur">${t.dur}</span>
        </div>
      `).join('')}
    </div>`;

  const art = body.querySelector('#music-art');
  const playBtn = body.querySelector('#music-play');
  const vizBars = body.querySelectorAll('.viz-bar');

  function updateVisualizer() {
    vizBars.forEach(bar => {
      const h = Math.random() * 28 + 4;
      bar.style.height = h + 'px';
      bar.style.opacity = 0.5 + Math.random() * 0.5;
    });
  }

  function startVisualizer() {
    vizBars.forEach(b => b.style.display = 'block');
    vizInterval = setInterval(updateVisualizer, 150);
  }

  function stopVisualizer() {
    if (vizInterval) { clearInterval(vizInterval); vizInterval = null; }
    vizBars.forEach(b => { b.style.height = '4px'; b.style.opacity = '0.3'; });
  }

  // Initially hide visualizer bars
  vizBars.forEach(b => { b.style.display = 'none'; });

  function loadTrack(idx) {
    currentTrack = idx;
    body.querySelector('#music-title').textContent = playlist[idx].title;
    body.querySelector('#music-artist').textContent = playlist[idx].artist;
    body.querySelector('#music-total').textContent = playlist[idx].dur;
    body.querySelectorAll('.playlist-item').forEach((p, i) => p.classList.toggle('active', i === idx));
  }

  playBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    playBtn.innerHTML = isPlaying ? '\u23F8' : '\u25B6';
    art.classList.toggle('playing', isPlaying);
    if (isPlaying) startVisualizer(); else stopVisualizer();
  });

  body.querySelector('#music-prev').addEventListener('click', () => {
    loadTrack((currentTrack - 1 + playlist.length) % playlist.length);
  });

  body.querySelector('#music-next').addEventListener('click', () => {
    loadTrack((currentTrack + 1) % playlist.length);
  });

  body.querySelectorAll('.playlist-item').forEach(item => {
    item.addEventListener('click', () => loadTrack(parseInt(item.dataset.idx)));
  });

  return body;
}

/* ── PAINT ── */
function buildPaint(win) {
  const body = document.createElement('div');
  body.className = 'paint-body';

  const colors = ['#ffffff','#ff4757','#ffa502','#ffd93d','#2ed573','#74b9ff','#6c63ff','#a855f7','#fd79a8','#000000'];

  body.innerHTML = `
    <div class="paint-toolbar">
      ${colors.map((c, i) => `<div class="paint-color ${i===0?'active':''}" style="background:${c}" data-color="${c}"></div>`).join('')}
      <span style="margin-left:8px;font-size:12px;color:var(--text-dim)">Size:</span>
      <input type="range" class="paint-size" id="paint-size" min="1" max="20" value="3">
      <button class="paint-tool-btn active" data-tool="brush">\u{1F58C} Brush</button>
      <button class="paint-tool-btn" data-tool="eraser">\u{1F9F9} Eraser</button>
      <button class="paint-tool-btn" id="paint-clear">\u{1F5D1} Clear</button>
      <button class="paint-tool-btn" id="paint-save">\u{1F4BE} Save</button>
    </div>
    <div class="paint-canvas-wrap">
      <canvas id="paint-canvas" width="680" height="440"></canvas>
    </div>`;

  const canvas = body.querySelector('#paint-canvas');
  const ctx = canvas.getContext('2d');
  let drawing = false;
  let color = '#ffffff';
  let size = 3;
  let tool = 'brush';

  // Dark background
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  canvas.addEventListener('mousedown', e => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
  });

  canvas.addEventListener('mousemove', e => {
    if (!drawing) return;
    ctx.lineWidth = size;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = tool === 'eraser' ? '#1a1a2e' : color;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  });

  canvas.addEventListener('mouseup', () => { drawing = false; });
  canvas.addEventListener('mouseleave', () => { drawing = false; });

  body.querySelectorAll('.paint-color').forEach(el => {
    el.addEventListener('click', () => {
      color = el.dataset.color;
      body.querySelectorAll('.paint-color').forEach(c => c.classList.remove('active'));
      el.classList.add('active');
    });
  });

  body.querySelector('#paint-size').addEventListener('input', e => { size = e.target.value; });

  body.querySelectorAll('[data-tool]').forEach(btn => {
    btn.addEventListener('click', () => {
      tool = btn.dataset.tool;
      body.querySelectorAll('[data-tool]').forEach(b => b.classList.toggle('active', b === btn));
    });
  });

  body.querySelector('#paint-clear').addEventListener('click', () => {
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  });

  body.querySelector('#paint-save').addEventListener('click', () => {
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = 'painting.png';
    a.click();
    showNotification('Paint', 'Image saved!', 'success');
  });

  return body;
}

/* ── ABOUT ── */
function buildAbout(win) {
  const body = document.createElement('div');
  body.className = 'about-body';
  body.innerHTML = `
    <div class="about-logo">M</div>
    <div class="about-name">Meridian OS</div>
    <div class="about-version">Version 1.0.0 — Codename: Aurora</div>
    <div class="about-specs">
      <div class="about-spec"><span class="about-spec-label">OS</span><span>Meridian OS 1.0.0</span></div>
      <div class="about-spec"><span class="about-spec-label">Desktop</span><span>MeridianDE</span></div>
      <div class="about-spec"><span class="about-spec-label">Kernel</span><span>JavaScript ES2024</span></div>
      <div class="about-spec"><span class="about-spec-label">Renderer</span><span>MeridianWebKit</span></div>
      <div class="about-spec"><span class="about-spec-label">Shell</span><span>meridian-sh</span></div>
      <div class="about-spec"><span class="about-spec-label">Resolution</span><span>${window.innerWidth}x${window.innerHeight}</span></div>
      <div class="about-spec"><span class="about-spec-label">Apps</span><span>16 installed</span></div>
      <div class="about-spec"><span class="about-spec-label">License</span><span>Open Source</span></div>
    </div>
    <div class="about-credit">Built with HTML, CSS, JavaScript &hearts;</div>`;
  return body;
}

/* ── VOLUME POPUP ── */
function buildVolume(win) {
  const body = document.createElement('div');
  body.className = 'volume-body';
  body.innerHTML = `
    <div class="volume-icon">\u{1F50A}</div>
    <div class="volume-label" id="vol-val">75%</div>
    <div class="volume-slider-wrap">
      <input type="range" class="volume-slider" min="0" max="100" value="75" id="vol-slider">
    </div>`;
  body.querySelector('#vol-slider').addEventListener('input', e => {
    body.querySelector('#vol-val').textContent = e.target.value + '%';
  });
  return body;
}

/* ── BATTERY POPUP ── */
function buildBattery(win) {
  const body = document.createElement('div');
  body.className = 'volume-body';
  body.innerHTML = `
    <div class="volume-icon">\u{1F50B}</div>
    <div class="volume-label">100%</div>
    <p style="color:var(--text-dim);font-size:13px;margin-top:8px">Battery fully charged</p>`;
  return body;
}

/* ═══════════════════════════════════════════
   NEW PREMIUM APPS
   ═══════════════════════════════════════════ */

/* ── SYSTEM MONITOR ── */
function buildSystemMonitor(win) {
  const body = document.createElement('div');
  body.className = 'monitor-body';

  const processes = [
    { name: 'meridian-shell', cpu: '2.3', mem: '4.1' },
    { name: 'browser-engine', cpu: '8.7', mem: '12.4' },
    { name: 'window-mgr', cpu: '1.2', mem: '3.8' },
    { name: 'compositor', cpu: '5.4', mem: '6.2' },
    { name: 'audio-daemon', cpu: '0.8', mem: '2.1' },
    { name: 'network-svc', cpu: '1.5', mem: '1.9' },
    { name: 'theme-engine', cpu: '0.4', mem: '1.2' },
    { name: 'notif-daemon', cpu: '0.2', mem: '0.8' },
    { name: 'file-indexer', cpu: '3.1', mem: '5.3' },
    { name: 'dbus-proxy', cpu: '0.1', mem: '0.4' },
  ];

  body.innerHTML = `
    <div class="monitor-section">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
        <span style="font-size:13px;font-weight:600">CPU Usage</span>
        <span id="mon-cpu-val" style="font-size:13px;color:var(--accent)">0%</span>
      </div>
      <div class="monitor-bar"><div class="monitor-bar-fill" id="mon-cpu-bar" style="width:0%;background:linear-gradient(90deg,#6c63ff,#a855f7)"></div></div>
    </div>
    <div class="monitor-section">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
        <span style="font-size:13px;font-weight:600">RAM Usage</span>
        <span id="mon-ram-val" style="font-size:13px;color:var(--accent)">0%</span>
      </div>
      <div class="monitor-bar"><div class="monitor-bar-fill" id="mon-ram-bar" style="width:0%;background:linear-gradient(90deg,#2ed573,#7bed9f)"></div></div>
    </div>
    <div class="monitor-section">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
        <span style="font-size:13px;font-weight:600">Disk Usage</span>
        <span style="font-size:13px;color:var(--accent)">45%</span>
      </div>
      <div class="monitor-bar"><div class="monitor-bar-fill" style="width:45%;background:linear-gradient(90deg,#ffa502,#ffd93d)"></div></div>
    </div>
    <div class="monitor-section" style="display:flex;gap:16px;align-items:center">
      <div style="flex:1">
        <div style="font-size:12px;color:var(--text-dim)">\u{2B06} Upload</div>
        <div id="mon-net-up" style="font-size:14px;font-weight:600">0 MB/s</div>
      </div>
      <div style="flex:1">
        <div style="font-size:12px;color:var(--text-dim)">\u{2B07} Download</div>
        <div id="mon-net-down" style="font-size:14px;font-weight:600">0 MB/s</div>
      </div>
    </div>
    <div class="monitor-section" style="flex:1;overflow:auto">
      <div style="font-size:13px;font-weight:600;margin-bottom:8px">Processes</div>
      <table class="monitor-process-table">
        <thead><tr><th>Process</th><th>CPU %</th><th>MEM %</th></tr></thead>
        <tbody id="mon-proc-body">
          ${processes.map(p => `<tr><td>${p.name}</td><td>${p.cpu}</td><td>${p.mem}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>`;

  const cpuBar = body.querySelector('#mon-cpu-bar');
  const cpuVal = body.querySelector('#mon-cpu-val');
  const ramBar = body.querySelector('#mon-ram-bar');
  const ramVal = body.querySelector('#mon-ram-val');
  const netUp = body.querySelector('#mon-net-up');
  const netDown = body.querySelector('#mon-net-down');
  const procBody = body.querySelector('#mon-proc-body');

  function updateMonitor() {
    const cpu = Math.random() * 60 + 20;
    const ram = Math.random() * 30 + 40;
    cpuBar.style.width = cpu + '%';
    cpuVal.textContent = cpu.toFixed(1) + '%';
    ramBar.style.width = ram + '%';
    ramVal.textContent = ram.toFixed(1) + '%';
    netUp.textContent = (Math.random() * 10).toFixed(1) + ' MB/s';
    netDown.textContent = (Math.random() * 50).toFixed(1) + ' MB/s';
    procBody.innerHTML = processes.map(p => {
      const c = (parseFloat(p.cpu) + Math.random() * 4 - 2).toFixed(1);
      const m = (parseFloat(p.mem) + Math.random() * 2 - 1).toFixed(1);
      return `<tr><td>${p.name}</td><td>${Math.max(0, c)}</td><td>${Math.max(0, m)}</td></tr>`;
    }).join('');
  }

  updateMonitor();
  const interval = setInterval(updateMonitor, 2000);
  win._monitorInterval = interval;
  const observer = new MutationObserver(() => {
    if (!document.body.contains(body)) { clearInterval(interval); observer.disconnect(); }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  return body;
}

/* ── ANALOG CLOCK ── */
function buildClock(win) {
  const body = document.createElement('div');
  body.className = 'clock-body';

  body.innerHTML = `
    <div class="clock-tabs">
      <div class="clock-tab active" data-tab="clock">Clock</div>
      <div class="clock-tab" data-tab="stopwatch">Stopwatch</div>
      <div class="clock-tab" data-tab="timer">Timer</div>
    </div>
    <div class="clock-panel" id="clock-panel-clock">
      <svg id="clock-svg" width="220" height="220" viewBox="0 0 220 220">
        <defs>
          <radialGradient id="clock-face-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:rgba(255,255,255,0.08)"/>
            <stop offset="100%" style="stop-color:rgba(255,255,255,0.02)"/>
          </radialGradient>
        </defs>
        <circle cx="110" cy="110" r="105" fill="url(#clock-face-grad)" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
        <circle cx="110" cy="110" r="3" fill="var(--accent)"/>
        ${[...Array(12)].map((_, i) => {
          const angle = (i * 30 - 90) * Math.PI / 180;
          const x = 110 + 88 * Math.cos(angle);
          const y = 110 + 88 * Math.sin(angle);
          const isMain = i % 3 === 0;
          return `<circle cx="${x}" cy="${y}" r="${isMain ? 4 : 2}" fill="${isMain ? 'var(--accent)' : 'rgba(255,255,255,0.4)'}"/>`;
        }).join('')}
        ${[...Array(60)].map((_, i) => {
          if (i % 5 === 0) return '';
          const angle = (i * 6 - 90) * Math.PI / 180;
          const x1 = 110 + 98 * Math.cos(angle);
          const y1 = 110 + 98 * Math.sin(angle);
          const x2 = 110 + 103 * Math.cos(angle);
          const y2 = 110 + 103 * Math.sin(angle);
          return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>`;
        }).join('')}
        <line id="clock-hour" x1="110" y1="110" x2="110" y2="55" stroke="var(--accent)" stroke-width="4" stroke-linecap="round"/>
        <line id="clock-minute" x1="110" y1="110" x2="110" y2="35" stroke="rgba(255,255,255,0.8)" stroke-width="2.5" stroke-linecap="round"/>
        <line id="clock-second" x1="110" y1="110" x2="110" y2="25" stroke="#ff4757" stroke-width="1" stroke-linecap="round"/>
      </svg>
      <div id="clock-digital" style="font-size:24px;font-weight:700;font-family:monospace;margin-top:8px"></div>
      <div id="clock-tz" style="font-size:12px;color:var(--text-dim);margin-top:4px"></div>
    </div>
    <div class="clock-panel" id="clock-panel-stopwatch" style="display:none;text-align:center;padding-top:20px">
      <div id="sw-display" style="font-size:36px;font-family:monospace;font-weight:700;margin-bottom:20px">00:00.000</div>
      <div style="display:flex;gap:10px;justify-content:center">
        <button class="editor-tool" id="sw-start">Start</button>
        <button class="editor-tool" id="sw-stop">Stop</button>
        <button class="editor-tool" id="sw-reset">Reset</button>
      </div>
    </div>
    <div class="clock-panel" id="clock-panel-timer" style="display:none;text-align:center;padding-top:20px">
      <div id="tm-display" style="font-size:36px;font-family:monospace;font-weight:700;margin-bottom:16px">00:00</div>
      <div style="display:flex;gap:8px;justify-content:center;align-items:center;margin-bottom:16px">
        <input type="number" id="tm-input" min="1" max="999" value="5" style="width:60px;padding:6px 10px;background:rgba(0,0,0,0.3);border:1px solid var(--border-glass);border-radius:6px;color:var(--text);text-align:center;font-size:16px">
        <span style="color:var(--text-dim);font-size:14px">minutes</span>
      </div>
      <div style="display:flex;gap:10px;justify-content:center">
        <button class="editor-tool" id="tm-start">Start</button>
        <button class="editor-tool" id="tm-stop">Stop</button>
        <button class="editor-tool" id="tm-reset">Reset</button>
      </div>
    </div>`;

  // Tab switching
  const tabs = body.querySelectorAll('.clock-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      body.querySelectorAll('.clock-panel').forEach(p => p.style.display = 'none');
      body.querySelector('#clock-panel-' + tab.dataset.tab).style.display = tab.dataset.tab === 'clock' ? 'flex' : 'block';
      if (tab.dataset.tab === 'clock') body.querySelector('#clock-panel-clock').style.flexDirection = 'column';
      body.querySelector('#clock-panel-' + tab.dataset.tab).style.alignItems = 'center';
      body.querySelector('#clock-panel-' + tab.dataset.tab).style.flexDirection = 'column';
    });
  });

  body.querySelector('#clock-panel-clock').style.display = 'flex';
  body.querySelector('#clock-panel-clock').style.flexDirection = 'column';
  body.querySelector('#clock-panel-clock').style.alignItems = 'center';

  // Analog clock
  const hourHand = body.querySelector('#clock-hour');
  const minuteHand = body.querySelector('#clock-minute');
  const secondHand = body.querySelector('#clock-second');
  const digitalEl = body.querySelector('#clock-digital');
  const tzEl = body.querySelector('#clock-tz');
  tzEl.textContent = Intl.DateTimeFormat().resolvedOptions().timeZone;

  function updateClock() {
    const now = new Date();
    const h = now.getHours() % 12;
    const m = now.getMinutes();
    const s = now.getSeconds();
    const ms = now.getMilliseconds();

    const secAngle = (s + ms / 1000) * 6;
    const minAngle = (m + s / 60) * 6;
    const hourAngle = (h + m / 60) * 30;

    secondHand.setAttribute('transform', `rotate(${secAngle}, 110, 110)`);
    minuteHand.setAttribute('transform', `rotate(${minAngle}, 110, 110)`);
    hourHand.setAttribute('transform', `rotate(${hourAngle}, 110, 110)`);

    digitalEl.textContent = now.toLocaleTimeString();
    requestAnimationFrame(updateClock);
  }
  updateClock();

  // Stopwatch
  let swRunning = false, swStart = 0, swElapsed = 0, swInterval = null;
  const swDisplay = body.querySelector('#sw-display');

  body.querySelector('#sw-start').addEventListener('click', () => {
    if (swRunning) return;
    swRunning = true;
    swStart = performance.now() - swElapsed;
    swInterval = setInterval(() => {
      swElapsed = performance.now() - swStart;
      const mins = Math.floor(swElapsed / 60000);
      const secs = Math.floor((swElapsed % 60000) / 1000);
      const ms = Math.floor(swElapsed % 1000);
      swDisplay.textContent = `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}.${String(ms).padStart(3,'0')}`;
    }, 10);
  });

  body.querySelector('#sw-stop').addEventListener('click', () => {
    swRunning = false;
    clearInterval(swInterval);
  });

  body.querySelector('#sw-reset').addEventListener('click', () => {
    swRunning = false;
    clearInterval(swInterval);
    swElapsed = 0;
    swDisplay.textContent = '00:00.000';
  });

  // Timer
  let tmRunning = false, tmRemaining = 0, tmInterval = null;
  const tmDisplay = body.querySelector('#tm-display');
  const tmInput = body.querySelector('#tm-input');

  body.querySelector('#tm-start').addEventListener('click', () => {
    if (tmRunning) return;
    if (tmRemaining <= 0) {
      tmRemaining = parseInt(tmInput.value) * 60 * 1000;
    }
    tmRunning = true;
    tmInterval = setInterval(() => {
      tmRemaining -= 100;
      if (tmRemaining <= 0) {
        tmRemaining = 0;
        tmRunning = false;
        clearInterval(tmInterval);
        tmDisplay.textContent = '00:00';
        alert('Timer finished!');
        return;
      }
      const mins = Math.floor(tmRemaining / 60000);
      const secs = Math.floor((tmRemaining % 60000) / 1000);
      tmDisplay.textContent = `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
    }, 100);
  });

  body.querySelector('#tm-stop').addEventListener('click', () => {
    tmRunning = false;
    clearInterval(tmInterval);
  });

  body.querySelector('#tm-reset').addEventListener('click', () => {
    tmRunning = false;
    clearInterval(tmInterval);
    tmRemaining = 0;
    tmDisplay.textContent = '00:00';
  });

  return body;
}

/* ── GALLERY ── */
function buildGallery(win) {
  const body = document.createElement('div');
  body.className = 'gallery-body';

  const SB_URL = 'https://vvbfmzehffthkzoikkgu.supabase.co/storage/v1/object/public';
  const items = [
    { name: 'Car 1', cat: 'photos', img: SB_URL + '/gallery/car1.jpg' },
    { name: 'Car 2', cat: 'photos', img: SB_URL + '/gallery/car2.jpg' },
    { name: 'Car 3', cat: 'photos', img: SB_URL + '/gallery/car3.jpg' },
    { name: 'Car 4', cat: 'photos', img: SB_URL + '/gallery/car4.jpg' },
    { name: 'Car 5', cat: 'photos', img: SB_URL + '/gallery/car5.jpg' },
    { name: 'Car 6', cat: 'photos', img: SB_URL + '/gallery/car6.jpg' },
    { name: 'Holo 1', cat: 'screenshots', img: SB_URL + '/gallery/holopictures/WhatsApp Image 2026-07-08 at 16.25.2.jpeg' },
    { name: 'Holo 2', cat: 'screenshots', img: SB_URL + '/gallery/holopictures/WhatsApp Image 2026-07-08 at 16.25.29.jpeg' },
    { name: 'Holo 3', cat: 'screenshots', img: SB_URL + '/gallery/holopictures/WhatsApp Image 2026-07-08 at 16.25.30.jpeg' },
    { name: 'Optimus Prime', cat: 'art', img: SB_URL + '/gallery/transformers/01_optimus_prime.svg' },
    { name: 'Megatron', cat: 'art', img: SB_URL + '/gallery/transformers/02_megatron.svg' },
    { name: 'Bumblebee', cat: 'art', img: SB_URL + '/gallery/transformers/03_bumblebee.svg' },
  ];

  let filter = 'all';

  function renderGrid() {
    const filtered = filter === 'all' ? items : items.filter(i => i.cat === filter);
    grid.innerHTML = filtered.map((item, idx) => `
      <div class="gallery-item" data-idx="${items.indexOf(item)}" style="background:url('${item.img}') center/cover">
        <div class="gallery-overlay">
          <div class="gallery-name">${item.name}</div>
          <div class="gallery-cat">${item.cat}</div>
        </div>
      </div>
    `).join('');

    grid.querySelectorAll('.gallery-item').forEach(el => {
      el.addEventListener('click', () => {
        const i = parseInt(el.dataset.idx);
        openModal(items[i]);
      });
    });
  }

  function openModal(item) {
    modal.style.display = 'flex';
    modalInner.style.background = item.img ? `url('${item.img}') center/contain no-repeat var(--bg-deep)` : item.grad;
    modalTitle.textContent = item.name;
    modalCat.textContent = item.cat;
  }

  body.innerHTML = `
    <div class="gallery-tabs">
      <div class="gallery-tab active" data-filter="all">All</div>
      <div class="gallery-tab" data-filter="photos">Photos</div>
      <div class="gallery-tab" data-filter="screenshots">Screenshots</div>
      <div class="gallery-tab" data-filter="art">Art</div>
    </div>
    <div class="gallery-grid" id="gallery-grid"></div>
    <div class="gallery-modal" id="gallery-modal">
      <div class="gallery-modal-inner" id="gallery-modal-inner">
        <div class="gallery-modal-close" id="gallery-modal-close">\u2715</div>
        <div id="gallery-modal-title" style="font-size:20px;font-weight:700;margin-bottom:8px"></div>
        <div id="gallery-modal-cat" style="font-size:13px;color:var(--text-dim)"></div>
      </div>
    </div>`;

  const grid = body.querySelector('#gallery-grid');
  const modal = body.querySelector('#gallery-modal');
  const modalInner = body.querySelector('#gallery-modal-inner');
  const modalTitle = body.querySelector('#gallery-modal-title');
  const modalCat = body.querySelector('#gallery-modal-cat');

  body.querySelector('#gallery-modal-close').addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

  body.querySelectorAll('.gallery-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      body.querySelectorAll('.gallery-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      filter = tab.dataset.filter;
      renderGrid();
    });
  });

  renderGrid();
  return body;
}

/* ── STICKY NOTES ── */
function buildStickyNotes(win) {
  const body = document.createElement('div');
  body.className = 'stickynotes-body';

  const defaultNotes = [
    { text: 'Welcome to Meridian OS!', color: '#ffd93d' },
    { text: 'Try the new apps!', color: '#fd79a8' },
    { text: 'Remember to save your work', color: '#74b9ff' },
    { text: 'Have a great day!', color: '#2ed573' },
  ];

  let notes = defaultNotes;
  try {
    const saved = localStorage.getItem('meridian_stickynotes');
    if (saved) notes = JSON.parse(saved);
  } catch {}

  function save() {
    localStorage.setItem('meridian_stickynotes', JSON.stringify(notes));
  }

  function render() {
    grid.innerHTML = notes.map((note, i) => {
      const rot = (Math.random() * 6 - 3).toFixed(1);
      return `
        <div class="sticky-note" data-idx="${i}" style="background:${note.color};transform:rotate(${rot}deg)">
          <div class="sticky-delete" data-idx="${i}">\u2715</div>
          <div class="sticky-text" contenteditable="true" data-idx="${i}">${escHtml(note.text)}</div>
        </div>`;
    }).join('');

    grid.querySelectorAll('.sticky-text').forEach(el => {
      el.addEventListener('blur', () => {
        const idx = parseInt(el.dataset.idx);
        notes[idx].text = el.textContent;
        save();
      });
    });

    grid.querySelectorAll('.sticky-delete').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(el.dataset.idx);
        notes.splice(idx, 1);
        save();
        render();
      });
    });
  }

  body.innerHTML = `
    <div class="stickynotes-toolbar">
      <button class="editor-tool" id="sn-add">\u2795 New Note</button>
    </div>
    <div class="stickynotes-grid" id="sn-grid"></div>`;

  const grid = body.querySelector('#sn-grid');

  body.querySelector('#sn-add').addEventListener('click', () => {
    const colors = ['#ffd93d', '#fd79a8', '#74b9ff', '#2ed573', '#a29bfe', '#ffa502'];
    notes.push({ text: 'New note...', color: colors[Math.floor(Math.random() * colors.length)] });
    save();
    render();
  });

  render();
  return body;
}

function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

/* ═══════════════════════════════════════════
   CAMERA APP
   ═══════════════════════════════════════════ */
function buildCamera(win) {
  const body = document.createElement('div');
  body.className = 'camera-body';

  body.innerHTML = `
    <div class="camera-viewfinder" id="camera-viewfinder">
      <video id="camera-video" autoplay playsinline muted></video>
      <div class="camera-overlay">
        <div class="camera-grid-lines">
          <div class="grid-line-h"></div>
          <div class="grid-line-h"></div>
          <div class="grid-line-v"></div>
          <div class="grid-line-v"></div>
        </div>
      </div>
      <div class="camera-no-access" id="camera-no-access" style="display:none">
        <div class="camera-no-access-icon">📷</div>
        <div class="camera-no-access-text">Camera access required</div>
        <div class="camera-no-access-sub">Click "Start Camera" to begin</div>
      </div>
    </div>
    <div class="camera-controls">
      <button class="camera-btn camera-btn-secondary" id="camera-flip" title="Flip Camera">🔄</button>
      <button class="camera-btn camera-btn-capture" id="camera-capture" title="Take Photo">📸</button>
      <button class="camera-btn camera-btn-secondary" id="camera-start" title="Start Camera">▶️</button>
    </div>
    <div class="camera-gallery" id="camera-gallery">
      <div class="camera-gallery-title">Captured Photos</div>
      <div class="camera-gallery-grid" id="camera-gallery-grid"></div>
    </div>`;

  const video = body.querySelector('#camera-video');
  const noAccess = body.querySelector('#camera-no-access');
  const captureBtn = body.querySelector('#camera-capture');
  const flipBtn = body.querySelector('#camera-flip');
  const startBtn = body.querySelector('#camera-start');
  const galleryGrid = body.querySelector('#camera-gallery-grid');
  let stream = null;
  let facingMode = 'user';
  let photos = [];

  async function startCamera() {
    try {
      if (stream) {
        stream.getTracks().forEach(t => t.stop());
      }
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facingMode, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });
      video.srcObject = stream;
      noAccess.style.display = 'none';
      video.style.display = 'block';
      startBtn.innerHTML = '⏹️';
      startBtn.title = 'Stop Camera';
      showNotification('Camera', 'Camera started successfully!', 'success');
    } catch (err) {
      noAccess.style.display = 'flex';
      video.style.display = 'none';
      showNotification('Camera', 'Could not access camera: ' + err.message, 'error');
    }
  }

  function stopCamera() {
    if (stream) {
      stream.getTracks().forEach(t => t.stop());
      stream = null;
    }
    video.srcObject = null;
    noAccess.style.display = 'flex';
    video.style.display = 'none';
    startBtn.innerHTML = '▶️';
    startBtn.title = 'Start Camera';
  }

  startBtn.addEventListener('click', () => {
    if (stream) stopCamera(); else startCamera();
  });

  flipBtn.addEventListener('click', () => {
    facingMode = facingMode === 'user' ? 'environment' : 'user';
    if (stream) startCamera();
  });

  captureBtn.addEventListener('click', () => {
    if (!stream) {
      showNotification('Camera', 'Start the camera first!', 'warning');
      return;
    }
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL('image/png');
    photos.unshift(dataUrl);
    renderGallery();
    showNotification('Camera', 'Photo captured!', 'success');

    // Flash effect
    const flash = document.createElement('div');
    flash.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;background:white;opacity:0.8;z-index:10;pointer-events:none;transition:opacity 0.3s;';
    body.querySelector('.camera-viewfinder').appendChild(flash);
    setTimeout(() => { flash.style.opacity = '0'; }, 50);
    setTimeout(() => flash.remove(), 400);
  });

  function renderGallery() {
    galleryGrid.innerHTML = photos.map((p, i) => `
      <div class="camera-gallery-thumb" data-idx="${i}">
        <img src="${p}" alt="Photo ${i+1}">
        <div class="camera-gallery-actions">
          <button class="camera-gallery-btn" data-action="download" data-idx="${i}" title="Download">💾</button>
          <button class="camera-gallery-btn" data-action="delete" data-idx="${i}" title="Delete">🗑️</button>
        </div>
      </div>
    `).join('');

    galleryGrid.querySelectorAll('[data-action="download"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.dataset.idx);
        const a = document.createElement('a');
        a.href = photos[idx];
        a.download = `photo_${Date.now()}.png`;
        a.click();
      });
    });

    galleryGrid.querySelectorAll('[data-action="delete"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.dataset.idx);
        photos.splice(idx, 1);
        renderGallery();
      });
    });
  }

  // Auto-start camera
  setTimeout(() => startCamera(), 300);

  // Cleanup on window close
  const observer = new MutationObserver(() => {
    if (!document.body.contains(body)) {
      stopCamera();
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  return body;
}

/* ═══════════════════════════════════════════
   SHORTS / REELS APP
   ═══════════════════════════════════════════ */
function buildShorts(win) {
  const body = document.createElement('div');
  body.className = 'shorts-body';

  // Local video files from shorts folder
  const videoFiles = [
    'ere.mp4',
    'iio.mp4',
    'rrt.mp4',
    'tuy.mp4',
    'uui.mp4',
    'WhatsApp Video 2026-07-06 .mp4',
    'WhatsApp Video 2026-07-06 at 02.17.39.mp4',
    'WhatsApp Video 2026-07-06 at 02.17.392.mp4',
    'WhatsApp Video 2026-07-06 at 02.17.4.mp4',
    'WhatsApp Video 2026-07-06 at 02.2.mp4',
    'WhatsApp Video 2026-07-06 at 02.22.30.mp4',
    'WhatsApp Video 2026-07-06 at 02.22.31 (1).mp4',
    'WhatsApp Video 2026-07-06 at 02.22.39.mp4',
    'WhatsApp Video 2026-07-06 at 02.24..mp4',
    'WhatsApp Video 2026-07-06 at 02.24.5.mp4',
    'WhatsApp Video 2026-07-06 at 02.24.57.mp4',
    'WhatsApp Video 22026-07-06 at 02.17.39.mp4',
    'yui.mp4',
    'yuuu.mp4'
  ];

  // Fisher-Yates shuffle for random order
  function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const shuffledVideos = shuffle(videoFiles);
  let currentIdx = 0;
  let touchStartY = 0;
  let touchStartTime = 0;
  let isPlaying = false;

  body.innerHTML = `
    <div class="shorts-container" id="shorts-container">
      <div class="shorts-header">
        <span class="shorts-logo">▶ Shorts</span>
        <span class="shorts-shuffle" id="shorts-shuffle" title="Reshuffle">🔀</span>
      </div>
      <div class="shorts-feed" id="shorts-feed">
        ${shuffledVideos.map((video, i) => `
          <div class="shorts-reel ${i === 0 ? 'active' : ''}" id="shorts-reel-${i}" data-idx="${i}">
            <video class="shorts-video" 
                   src="shorts/${encodeURIComponent(video)}" 
                   playsinline 
                   muted 
                   loop
                   preload="metadata"
                   ${i === 0 ? 'autoplay' : ''}>
            </video>
            <div class="shorts-loading">Loading...</div>
            <div class="shorts-info">
              <div class="shorts-creator">@webos</div>
              <div class="shorts-title">${video.replace('.mp4', '').replace(/WhatsApp Video 2026-07-06 at? ?/, '').replace(/WhatsApp Video 22026-07-06 at? ?/, '')}</div>
            </div>
            <div class="shorts-actions">
              <div class="shorts-action" data-action="like"><span class="shorts-action-icon">❤️</span><span class="shorts-action-count">0</span></div>
              <div class="shorts-action" data-action="comment"><span class="shorts-action-icon">💬</span><span class="shorts-action-count">0</span></div>
              <div class="shorts-action" data-action="share"><span class="shorts-action-icon">↗️</span><span class="shorts-action-label">Share</span></div>
              <div class="shorts-action" data-action="reshuffle"><span class="shorts-action-icon">🔀</span><span class="shorts-action-label">Shuffle</span></div>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="shorts-nav-hint" id="shorts-nav-hint">
        <span>⬆ Scroll up for next</span>
      </div>
      <div class="shorts-progress" id="shorts-progress">
        <div class="shorts-progress-bar"></div>
      </div>
    </div>`;

  const feed = body.querySelector('#shorts-feed');
  const container = body.querySelector('#shorts-container');
  const reels = feed.querySelectorAll('.shorts-reel');
  const videos = feed.querySelectorAll('.shorts-video');
  const progressBar = body.querySelector('#shorts-progress .shorts-progress-bar');
  const shuffleBtn = body.querySelector('#shorts-shuffle');

  function showReel(idx) {
    if (idx < 0 || idx >= reels.length) return;
    
    // Pause all videos
    videos.forEach(v => {
      v.pause();
      v.currentTime = 0;
      v.removeAttribute('autoplay');
    });
    
    // Hide all reels
    reels.forEach(r => r.classList.remove('active'));
    
    // Show target reel
    currentIdx = idx;
    const reel = reels[idx];
    const video = videos[idx];
    reel.classList.add('active');
    
    // Play video
    video.play().catch(() => {});
    video.setAttribute('autoplay', '');
    
    // Reset progress bar
    progressBar.style.width = '0%';
    progressBar.style.transition = 'none';
    void progressBar.offsetWidth; // force reflow
    progressBar.style.transition = 'width 15s linear';
    progressBar.style.width = '100%';
    
    // Preload next video
    const nextIdx = (idx + 1) % reels.length;
    if (!videos[nextIdx].hasAttribute('preload')) {
      videos[nextIdx].setAttribute('preload', 'metadata');
    }
  }

  function nextReel() {
    const nextIdx = (currentIdx + 1) % reels.length;
    showReel(nextIdx);
  }

  function prevReel() {
    const prevIdx = (currentIdx - 1 + reels.length) % reels.length;
    showReel(prevIdx);
  }

  // Touch/swipe handling
  container.addEventListener('touchstart', e => {
    touchStartY = e.touches[0].clientY;
    touchStartTime = Date.now();
  }, { passive: true });

  container.addEventListener('touchend', e => {
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY - touchEndY;
    const deltaTime = Date.now() - touchStartTime;
    
    if (Math.abs(deltaY) > 50 && deltaTime < 500) {
      if (deltaY > 0) nextReel();
      else prevReel();
    }
  }, { passive: true });

  // Wheel scroll
  container.addEventListener('wheel', e => {
    if (e.deltaY > 30) nextReel();
    else if (e.deltaY < -30) prevReel();
  }, { passive: true });

  // Keyboard navigation
  container.tabIndex = 0;
  container.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') nextReel();
    else if (e.key === 'ArrowUp') prevReel();
    else if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      const video = videos[currentIdx];
      if (video.paused) video.play();
      else video.pause();
    }
  });

  container.addEventListener('click', () => container.focus());

  // Shuffle button
  shuffleBtn.addEventListener('click', () => {
    const newOrder = shuffle(videoFiles);
    feed.innerHTML = newOrder.map((video, i) => `
      <div class="shorts-reel ${i === 0 ? 'active' : ''}" id="shorts-reel-${i}" data-idx="${i}">
        <video class="shorts-video" 
               src="shorts/${encodeURIComponent(video)}" 
               playsinline 
               muted 
               loop
               preload="metadata"
               ${i === 0 ? 'autoplay' : ''}>
        </video>
        <div class="shorts-loading">Loading...</div>
        <div class="shorts-info">
          <div class="shorts-creator">@webos</div>
          <div class="shorts-title">${video.replace('.mp4', '').replace(/WhatsApp Video 2026-07-06 at? ?/, '').replace(/WhatsApp Video 22026-07-06 at? ?/, '')}</div>
        </div>
    <div class="shorts-actions">
              <div class="shorts-action" data-action="like"><span class="shorts-action-icon">❤️</span><span class="shorts-action-count">0</span></div>
              <div class="shorts-action" data-action="comment"><span class="shorts-action-icon">💬</span><span class="shorts-action-count">0</span></div>
              <div class="shorts-action" data-action="share"><span class="shorts-action-icon">↗️</span><span class="shorts-action-label">Share</span></div>
              <div class="shorts-action" data-action="reshuffle"><span class="shorts-action-icon">🔀</span><span class="shorts-action-label">Shuffle</span></div>
            </div>
          </div>
        `).join('');
    
    // Re-attach event listeners for new elements
    const newVideos = feed.querySelectorAll('.shorts-video');
    const newReels = feed.querySelectorAll('.shorts-reel');
    videos.forEach((v, i) => {
      v.removeAttribute('autoplay');
      v.pause();
      v.currentTime = 0;
    });
    if (newVideos[0]) {
      newVideos[0].play().catch(() => {});
      newVideos[0].setAttribute('autoplay', '');
    }
    currentIdx = 0;
    progressBar.style.width = '0%';
    progressBar.style.transition = 'none';
    void progressBar.offsetWidth;
    progressBar.style.transition = 'width 15s linear';
    progressBar.style.width = '100%';
  });

  // Video event handlers
  videos.forEach((video, i) => {
    video.addEventListener('loadeddata', () => {
      const loading = video.parentElement.querySelector('.shorts-loading');
      if (loading) loading.style.display = 'none';
    });
    
    video.addEventListener('error', () => {
      const loading = video.parentElement.querySelector('.shorts-loading');
      if (loading) loading.textContent = 'Failed to load';
    });
    
    video.addEventListener('ended', () => {
      // Loop is enabled, but just in case
      video.currentTime = 0;
      video.play().catch(() => {});
    });
  });

  // Auto-advance progress bar
  setInterval(() => {
    const video = videos[currentIdx];
    if (video && !video.paused && video.duration) {
      const progress = (video.currentTime / video.duration) * 100;
      progressBar.style.width = Math.min(progress, 100) + '%';
    }
  }, 100);

  // Start first video
  if (videos[0]) {
    videos[0].play().catch(() => {});
  }

  return body;
}
