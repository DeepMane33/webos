<div align="center">

# CYBERTRON OS

**A web-based desktop environment that runs entirely in your browser**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=flat-square&logo=vercel)](https://cybertron-os.vercel.app)

</div>

---

## About

CYBERTRON OS is a fully client-side desktop environment built with vanilla HTML, CSS, and JavaScript. No React, no TypeScript, no build tools — just the web platform doing what it does best.

It features a windowing system, 10+ built-in apps, a cinematic boot sequence, an animated pixel robot companion, glassmorphism UI, Transformers-themed design language, and live wallpapers — all running at 60fps with zero dependencies.

Everything stays in your browser. Notes, settings, wallpapers — all persisted through localStorage. Deploy it anywhere as a static site.

---

## Live Demo

**[cybertron-os.vercel.app](https://cybertron-os.vercel.app)**

---

## Features

### Desktop Environment
- **Windowing system** — drag, resize, minimize, maximize, close with macOS-style traffic light controls
- **Taskbar** — bottom dock with running apps, system tray, live clock, and magnification effect
- **Desktop icons** — double-click to launch apps, draggable icon placement
- **Right-click context menu** for quick app access
- **Spotlight search** — press `Ctrl+Space` to search and launch any app instantly
- **Lock screen** — live clock with password entry and cinematic unlock animation

### Pixel Robot Companion
- Pixel art robot that follows your cursor across the desktop
- Smooth lag-based following with direction-aware flip animation
- Click once to pause, click again to resume
- White background automatically removed via canvas pixel processing

### Visual Design
- **Dark industrial glassmorphism** — frosted glass panels with deep black transparency and subtle white borders
- **Parallax wallpapers** — image wallpapers shift with mouse movement for depth
- **Live video wallpapers** — animated backgrounds streamed from local files
- **Animated boot sequence** — logo pulse, progress bar, status text cycling
- **Holographic window effects** — scanline overlay, corner accents, pulse glow on focused windows
- **Window open/close animations** — scale + fade with blur transition

### Transformers Theme
- Autobot / Decepticon / Energon faction color themes
- Transformers character gallery with SVG artwork
- Teletraan Scanner — Google-powered web search panel
- Cybertronian naming throughout (Mission Log, Data Core, Energon Radio, Holo Archive)

---

## Built-in Apps

| App | Description |
|-----|-------------|
| **Terminal** | Functional shell emulator with 15+ commands, colored output, and command history |
| **Calculator** | Standard calculator with expression evaluation and keyboard support |
| **Mission Log** | Text editor with save, word count, and localStorage persistence |
| **Data Core** | Virtual file manager with nested directories, breadcrumb navigation, grid/list views |
| **Browser** | Built-in web browser with URL bar, quick links, and navigation controls |
| **Energon Weather** | Current conditions, detail cards, humidity, wind, UV index, and 5-day forecast |
| **Settings** | Live theme editing, accent color picker, wallpaper selection, sound toggle |
| **Energon Radio** | Music player with album art, playlist, playback controls, and progress bar |
| **Holo Archive** | Image gallery with lightbox viewer and Transformers character art |
| **Optic Sensor** | Camera app with grid overlay and photo capture |
| **Shorts** | TikTok-style vertical video scroller with like, comment, share actions |
| **Cybertron Store** | App store to install additional apps to your desktop |
| **Chronometer** | Analog + digital clock with real-time hand movement |
| **Spark Core** | System monitor showing CPU, RAM, disk usage with animated progress bars |
| **Wallpaper Studio** | Browse and apply wallpapers with live preview and parallax support |

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Space` | Open Spotlight search |
| `Ctrl+Shift+T` | Open Terminal |
| `Ctrl+Shift+E` | Open Mission Log |
| `F12` | Open Command Center dashboard |
| `Escape` | Close menus, search, popups |
| `↑↓` | Navigate search results |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 |
| Styling | CSS3 (Glassmorphism, custom properties, backdrop-filter, CSS Grid) |
| Logic | Vanilla JavaScript ES6+ |
| Storage | localStorage |
| Audio | Web Audio API (click sounds, notification tones) |
| Hosting | Vercel (static deployment) |

No frameworks. No build step. No node_modules.

---

## Architecture

```
webos/
├── index.html              # Main entry point
├── cosmos-premium.css      # Design system — glassmorphism, themes, all UI
├── cosmos.js               # Core engine — window manager, apps, boot, system
├── supabase-config.js      # Storage config for media assets
├── vercel.json             # Deployment config
├── icons/                  # App icon PNGs
├── wallpapers/             # Background images and videos
├── music/                  # Audio tracks and album covers
├── shorts/                 # Video clips for Shorts app
├── gallery/                # Transformers SVGs and photos
└── server.js               # Optional local dev server
```

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/DeepMane33/webos.git
cd webos

# Option 1: Open directly
open index.html

# Option 2: Local server
npx serve .

# Option 3: Python
python -m http.server 8000
```

---

## Deployment

CYBERTRON OS is a fully static site — deploy anywhere.

**Vercel** (recommended):
1. Push to GitHub
2. Connect repo to [Vercel](https://vercel.com)
3. Auto-deploys on every push

**Other options**: Netlify, Cloudflare Pages, GitHub Pages, or any static host.

---

## Customization

Change the entire theme by editing CSS variables:

```css
:root {
    --accent: #FFB347;           /* Primary accent color */
    --accent-glow: rgba(255, 179, 71, 0.15);
    --bg-deep: #090B0F;         /* Base background */
    --border: #2B3440;          /* Panel borders */
    --text: #ECECEC;            /* Primary text */
}
```

Switch between faction themes in Settings or via JavaScript:
```javascript
document.body.className = 'theme-autobot';   // Red accent
document.body.className = 'theme-decepticon'; // Purple accent
document.body.className = 'theme-energon';    // Cyan accent
```

---

<div align="center">

**CYBERTRON OS** — built with HTML, CSS, and JavaScript

</div>
