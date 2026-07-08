# Devlog #1 — Foundation & Core Architecture
**Date:** June 13, 2026

## What I Built Today

Started building **Meridian OS** — a fully interactive web-based operating system.

### Core Structure
- **index.html** — Main page with boot screen, lock screen, desktop, taskbar, start menu, context menu, and calendar popup
- **style.css** — Full glassmorphism dark theme with CSS variables for easy theming
- **apps.js** — Modular app definitions where each app is a function that returns DOM content
- **os.js** — Core OS engine handling window management, boot sequence, and system interactions

### Desktop Environment
- Animated gradient background with floating orbs
- Desktop icon grid (10 apps) with double-click to launch
- Taskbar with start button, running apps, system tray, and live clock
- Start menu with user profile, search bar, and app list

### Window Manager
- Draggable windows (grab the title bar)
- Resizable windows (grab the bottom-right corner)
- Minimize / Maximize / Close buttons (macOS-style colored dots)
- Window focus management (click to bring forward)
- Window open/close animations
- Double-click title bar to maximize/restore

### Design Philosophy
Chose a **glassmorphism dark theme** with purple/indigo accent colors. Every surface uses backdrop-filter blur for that frosted glass look. CSS variables make it trivial to restyle the entire system.

### Boot Sequence
Two-stage boot: animated loading screen (3.5s) → lock screen (click to enter) → desktop. No password required — anyone can test it out!

---
