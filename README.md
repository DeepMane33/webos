# CYBERTRON OS

basically i got bored at 2am and decided to build an entire operating system inside a web browser. no frameworks. no libraries. just html, css, and vanilla javascript. this is what happens when you give a teenager too much caffeine and access to the Web Audio API.

## what is this

 CYBERTRON OS is a fully functional desktop environment that runs in your browser. it's got windows you can drag around, a taskbar, a dock, 15 built-in apps, video wallpapers, sound effects, a terminal that actually works, and a pixel cat that follows your mouse. it's themed after transformers because why not.

you can check it out live here: **https://cybertron-os.vercel.app**

## features

### the desktop

yeah it's got the whole glassmorphism thing going on. frosted glass everywhere. looks pretty sick honestly.

- animated gradient background with video wallpapers (hosted on supabase)
- particle effects that float around and follow your cursor
- draggable desktop icons — rearrange them however you want
- right-click context menu for quick access to stuff
- global search bar that opens with ctrl+space — searches through all your apps

### the window manager

every app opens in its own window. you can:

- drag windows around by the titlebar
- resize them from the bottom-right corner
- minimize, maximize, or close with the macos-style buttons (red/yellow/green)
- double-click the titlebar to maximize
- drag a window to the left or right edge of the screen to snap it to half-screen
- shake a window really fast and it minimizes all the other windows (yes really)

windows open with a spring animation and close with a blur effect. it's satisfying.

### the taskbar and dock

there's a taskbar at the bottom that shows all your open apps, a live clock, battery percentage, wifi icon, and volume. clicking the lightning bolt icon opens the start menu.

there's also a macos-style dock with app icons that have hover tooltips and show which apps are running. right-click on a dock icon for extra options.

### the boot sequence

when you open the site, you get a full animated boot screen. progress bar fills up, status messages cycle through ("INITIALIZING SPARK CORE", "LOADING ENERGON GRID", etc), and then it transitions to a lock screen with a live clock. enter anything to unlock. the password is fake. but it looks cool so whatever.

### the control center

click the grid icon in the taskbar and a control panel slides in with:

- wifi and bluetooth toggles
- dark mode toggle
- do not disturb toggle
- brightness and volume sliders (they actually move)
- wallpaper quick picker
- performance mode toggle (balanced vs high perf)
- battery status display

### the command center

press F12 and a full dashboard pops up with weather info, calendar, quick notes, system stats (randomly generated but looks real), and quick command buttons to open apps.

### notifications

toast notifications slide in from the right side. they're color-coded (info, success, warning, error), have timestamps, and auto-dismiss after 4 seconds. you can also click them to dismiss early.

### sound effects

EVERYTHING makes sounds. i used the Web Audio API to generate all sounds from scratch — no audio files. just math and oscillators. window open sounds, window close sounds, clicks, hovers, notifications, boot melody, lock/unlock sounds, theme change jingle, and even a cat meow and purr sound. 12 sounds total, all synthesized in real time.

### the cybercat

there's a pixel cat that follows your mouse cursor around the screen. click it to pin/unpin it in place. double-click to pet it and it meows and purrs with floating hearts. completely useless but absolutely essential.

## the apps

### terminal
a proper terminal emulator with 15+ commands. type `help` to see them all. highlights include `neofetch` (shows system info with ascii art), `cowsay` (makes a cow say things), `calc` (does math), `color` (changes terminal color), `sysinfo` (shows animated system stats), and `matrix` (coming soon). it's got command history with arrow keys too.

### mission log (notepad)
a text editor. write stuff. save it. it persists in your browser's localStorage so it's still there when you come back. has word count, character count, line count. you can bold text, convert to uppercase/lowercase, and download your notes as a .txt file.

### energon calc (calculator)
a full calculator with a display, buttons for numbers and operations, and a history panel that shows your last 5 calculations. click a history entry to reuse it. does basic math — addition, subtraction, multiplication, division, percentage.

### data core (file manager)
a virtual file system with folders and files. navigate through `/cybertron/prime` and check out folders like "Intel Reports", "Holo Records", "Frequencies", and "Transmissions". each file type has its own icon. it's all fake data but it feels real.

### energon radio (music player)
10 real songs streaming from supabase. YOASOBI, LiSA, Kenshi Yonezu, Official HIGE DANdism, Ado, Fujii Kaze, Aimer. there's album art, a playlist, play/pause/skip controls, and a visualizer that bounces to the music. this one's my favorite.

### cyber-link (browser)
a browser inside the browser. it's got its own internal pages — `meridian://home` is the homepage with quick links, `meridian://dashboard` shows a live dashboard with clock and system stats, `meridian://news` has fake news articles, `meridian://chat` is a fake chatroom. the address bar works and everything.

### shorts
a tiktok-style vertical video feed. 19 short videos from supabase. scroll wheel to go to next video, touch swipe on mobile, tap to pause/play. there's a like button, sound toggle, shuffle button, and a progress bar. it's basically reels but make it cybertronian.

### systems (settings)
change your faction theme — autobot (red), decepticon (purple), energon (cyan), maximal (orange), predacon (green). each one changes the entire OS accent color. you can also toggle sound effects, notifications, and high performance mode.

### wallpaper studio
5 animated video wallpapers hosted on supabase. dark cybertron, energon grid, autobot forge, decepticon lair, and transformer. click one and your entire desktop transforms. hover over a wallpaper thumbnail to preview it.

### cybertron store
an app store for the OS. shows all 15 apps with descriptions and ratings. most are already installed but some show an "install" button. clicking install adds the app to your desktop. it's a fake store but it looks legit.

### optic sensor (camera)
opens your actual webcam feed inside a window. it's a real camera. in a fake operating system. technology is wild.

### holo archive (gallery)
12 images displayed in a grid layout. click any image to open a full-screen lightbox with previous/next navigation and an image counter. the images are hosted on supabase.

### weather
shows current weather with a big icon, temperature, and a 5-day forecast. all fake data but it looks like a real weather app.

### system monitor
displays cpu, ram, and disk usage with animated progress bars. the numbers are randomly generated every few seconds. looks very "mission control".

### about
shows system info — OS name, version, codename, kernel, architecture. all made up but very official looking.

## keyboard shortcuts

| shortcut | what it does |
|----------|-------------|
| ctrl+space | open global search |
| ctrl+shift+t | open terminal |
| ctrl+shift+e | open notepad |
| ctrl+shift+m | open music player |
| ctrl+shift+c | open calculator |
| f11 | maximize focused window |
| f12 | open command center |
| escape | close whatever's open |
| meta (windows key) | toggle start menu |
| arrow keys | navigate in terminal history, scroll through shorts |

## tech stack

- **html5** — just semantic markup
- **css3** — glassmorphism, animations, backdrop-filter, css custom properties, grid layout
- **javascript (es6+)** — vanilla js, zero frameworks, zero dependencies
- **supabase** — hosts all the media files (wallpapers, music, shorts videos, gallery images)
- **vercel** — deploys the whole thing for free

## how to run it locally

1. clone the repo
   ```
   git clone https://github.com/DeepMane33/webos.git
   ```

2. open `index.html` in your browser. that's it. no build step. no install. just open the file.

   or if you want a local server:
   ```
   # node
   npx serve .

   # python
   python -m http.server 8000
   ```

3. click the lightning bolt to open the start menu. double-click desktop icons to open apps. press F12 for the command center. pet the cat.

## project structure

```
webos/
├── index.html            # the main page — all the html structure
├── cosmos.js             # the main engine — boot, window manager, all app logic, ~3300 lines
├── os.js                 # extra features — particles, spotlight search, snap zones, animations
├── apps.js               # the meridian os version of app definitions (unused in cybertron build)
├── style.css             # the meridian os styles (unused in cybertron build)
├── cosmos.css            # the main cybertron styles
├── cosmos-premium.css    # premium ui components and animations
├── supabase-config.js    # supabase connection config (gitignored — you need your own)
├── catt.png              # the pixel cat image
├── pixelcat.png          # alternative cat image
├── weboslock.jpeg        # lock screen background
├── server.js             # optional node server
├── server.py             # optional python server
└── .gitignore
```

## customization

the whole theme is built on css variables. change these in `cosmos-premium.css` or `cosmos.css`:

```css
:root {
    --accent: #8b5cf6;           /* main accent color */
    --accent-glow: #8b5cf680;    /* glow effect */
    --accent-light: #c4b5fd;     /* lighter accent */
    --bg-deep: #0a0a1a;          /* deep background */
}
```

you can also change the theme from within the OS — open Settings > Faction Theme and pick from 5 preset themes.

## notes

- all media files (videos, music, images) are hosted on supabase storage, not in this repo. the repo is just the code.
- the supabase config is gitignored. you'll need to set up your own supabase bucket or modify the URLs in `cosmos.js`.
- this was built over a few late nights. it's not perfect but it works and it's fun.
- if you're reading this, thanks for checking it out. star the repo if you think it's cool.

## license

do whatever you want with it. mit license.
