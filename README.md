# CYBERTRON OS

A fully interactive web-based operating system built with pure HTML, CSS, and JavaScript. No frameworks, no dependencies — just the web.

## Live Demo

Open `index.html` in your browser to experience CYBERTRON OS.

## Features

### Desktop Environment
- **Glassmorphism dark theme** with frosted glass surfaces and animated gradient orbs
- **Window manager** — draggable, resizable windows with macOS-style controls (minimize, maximize, close)
- **Taskbar** with start button, running apps, system tray, and live clock
- **Start menu** with user profile, search bar, and app launcher
- **Desktop icons** — double-click to launch apps
- **Right-click context menu** for quick actions
- **Global search** (Ctrl+Space) to find apps and files instantly

### System UI
- **Boot sequence** — animated loading screen with progress bar
- **Lock screen** — live clock, date, and password entry
- **Control Center** — WiFi, Bluetooth, Dark Mode, Do Not Disturb, brightness/volume sliders, wallpaper picker, performance modes
- **Notification center** — toast-style notifications with auto-dismiss
- **Calendar widget** — click the clock to open a full month view
- **Command Center dashboard** (F12) — weather, calendar, system stats, quick commands

### Built-in Apps (10+)

| App | Description |
|-----|-------------|
| **Terminal** | Functional emulator with 15+ commands, history, and colored output |
| **Calculator** | Standard calculator with expression evaluation |
| **Notepad** | Text editor with save, word count, and localStorage persistence |
| **File Manager** | Virtual filesystem with nested directories and file type icons |
| **Browser** | Built-in web browser with internal pages and quick links |
| **Weather** | Current conditions, detail cards, and 5-day forecast |
| **Settings** | Live theme editing, accent color picker, wallpaper cycling |
| **Music Player** | Album art, playlist, playback controls with visual feedback |
| **Paint** | HTML5 canvas drawing with brush/eraser tools and color palette |
| **Teletraan Scanner** | Google-powered web search with multiple search engines |

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Space` | Global search |
| `Ctrl+Shift+T` | Open Terminal |
| `Ctrl+Shift+E` | Open Notepad |
| `F12` | Command Center |
| `Escape` | Close menus/popups |
| `Meta` | Toggle Start Menu |

## Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Glassmorphism, CSS variables, animations, backdrop-filter
- **JavaScript (ES6+)** — Vanilla, zero dependencies

## Project Structure

```
webos/
├── index.html          # Main entry point
├── style.css           # Core styles
├── cosmos.css          # Extended theme
├── cosmos-premium.css  # Premium UI components
├── cosmos.js           # Main application logic
├── os.js               # OS engine (window manager, boot, system)
├── apps.js             # App definitions and implementations
├── server.js           # Node.js server (optional)
├── server.py           # Python server (optional)
└── .gitignore
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/DeepMane33/webos.git
   ```

2. Open `index.html` in your browser, or run a local server:
   ```bash
   # Node.js
   npx serve .

   # Python
   python -m http.server 8000
   ```

3. Enjoy the experience.

## Customization

The entire OS theme is controlled via CSS variables. Change the look by modifying the accent color:

```css
:root {
    --accent: #8b5cf6;        /* Primary accent */
    --accent-glow: #8b5cf680; /* Glow effect */
}
```

## License

MIT
