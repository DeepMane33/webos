/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   CYBERTRON OS â€” Transformers Desktop Engine
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

// â”€â”€ STATE â”€â”€
var windows = [];
var windowIdCounter = 0;
var topZ = 100;
var startMenuOpen = false;
var notifOpen = false;
var controlCenterOpen = false;
var calendarOpen = false;
var searchOpen = false;
var dashboardOpen = false;
var neroOpen = false;
var currentTheme = localStorage.getItem('cybertron-theme') || 'decepticon';
var perfMode = 'balanced';
var brightness = 80;
var volume = 65;
var ccState = { wifi: true, bluetooth: false, darkmode: false, dnd: false };
var soundEffectsEnabled = true;
var notifEnabled = true;
var notifications = []; // initialized in initDesktop()

// â”€â”€ SVG ICONS (Lucide-style) â”€â”€
var ICO = {
    // Mission Log - Autobot/Transformer face insignia
    notes: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 1L6 5v4l-2 3 2 3v5h2l1 2h2v-2h2v2h2l1-2h2v-5l2-3-2-3V5l-3-4"/><path d="M8 5h8"/><path d="M9 8.5h6"/><path d="M10 12h4"/><circle cx="12" cy="16" r="1"/></svg>',
    // Energon Calc - Calculator with 1389 display
    calculator: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="1" width="14" height="22" rx="2"/><rect x="7" y="3" width="10" height="5" rx="1"/><text x="12" y="7.5" text-anchor="middle" font-size="4" fill="currentColor" stroke="none" font-family="monospace">1389</text><rect x="7" y="10" width="3" height="2.5" rx="0.5"/><rect x="10.5" y="10" width="3" height="2.5" rx="0.5"/><rect x="14" y="10" width="3" height="2.5" rx="0.5"/><rect x="7" y="13.5" width="3" height="2.5" rx="0.5"/><rect x="10.5" y="13.5" width="3" height="2.5" rx="0.5"/><rect x="14" y="13.5" width="3" height="2.5" rx="0.5"/><rect x="7" y="17" width="3" height="2.5" rx="0.5"/><rect x="10.5" y="17" width="3" height="2.5" rx="0.5"/><rect x="14" y="17" width="3" height="2.5" rx="0.5"/><rect x="7" y="20.5" width="3" height="1.5" rx="0.5"/><rect x="10.5" y="20.5" width="3" height="1.5" rx="0.5"/><rect x="14" y="20.5" width="3" height="1.5" rx="0.5"/></svg>',
    // Data Core - 3D wireframe cube with crystal lines
    files: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L3 7v10l9 5 9-5V7l-9-5z"/><path d="M12 12l9-5"/><path d="M12 12l-9-5"/><path d="M12 12v10"/><path d="M7.5 4.5L16.5 9.5"/><path d="M16.5 4.5L7.5 9.5"/><path d="M7.5 14.5l9 5"/><path d="M16.5 14.5l-9 5"/></svg>',
    // Energon Radio - Boombox with speakers and handle
    music: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="6" width="22" height="13" rx="2"/><path d="M5 6V4h14v2"/><circle cx="7" cy="13" r="3"/><circle cx="17" cy="13" r="3"/><circle cx="7" cy="13" r="1"/><circle cx="17" cy="13" r="1"/><rect x="11" y="8" width="2" height="2" rx="0.5"/><rect x="11" y="11" width="2" height="2" rx="0.5"/><line x1="12" y1="8" x2="12" y2="6"/></svg>',
    // Holo Archive - Folder/archive with horizontal lines
    gallery: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18a1 1 0 0 1 1 1v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a1 1 0 0 1 1-1z"/><path d="M3 6l3-3h6l2 3"/><line x1="6" y1="11" x2="18" y2="11"/><line x1="6" y1="14" x2="18" y2="14"/><line x1="6" y1="17" x2="14" y2="17"/></svg>',
    // Systems - Gear/cog with teeth and inner circle
    settings: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v3M12 20v3M1 12h3M20 12h3"/><path d="M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/><path d="M7.5 4.5l1.5-.5M15 4l1.5 1M19.5 7.5l.5 1.5M20 15l-1 1.5M19.5 19.5l-1.5.5M9 20l-1.5-1M4.5 19.5l-.5-1.5M4 9l1-1.5"/></svg>',
    // Cyber-Link - Network sharing nodes (3 circles connected)
    browser: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',
    // Whisper - Headset with microphone
    whisper: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>',
    // About - Info circle with i
    about: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
    // Wallpaper - Landscape picture frame
    wallpaper: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
    // Cybertron Store - Shopping bag
    store: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>',
    // Optic Sensor - Eye with iris and pupil
    camera: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="1"/></svg>',
    // Shorts - Film strip with sprocket holes and play button
    shorts: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><rect x="3" y="3.5" width="3" height="2" rx="0.3"/><rect x="3" y="7" width="3" height="2" rx="0.3"/><rect x="3" y="17.5" width="3" height="2" rx="0.3"/><rect x="18" y="3.5" width="3" height="2" rx="0.3"/><rect x="18" y="7" width="3" height="2" rx="0.3"/><rect x="18" y="17.5" width="3" height="2" rx="0.3"/><polygon points="10,8.5 10,15.5 15.5,12" fill="currentColor" stroke="none"/></svg>',
    folder: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg>',
    file: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>',
    home: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    download: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>',
    check: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    search: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
    heart: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
    heartFilled: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
    messageCircle: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>',
    share: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>',
    shuffle: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"/><path d="M4 20 21 3"/><polyline points="21 16 16 16 16 21"/><path d="M15 19 3 1"/></svg>',
    play: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg>',
    pause: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="4" height="16" x="6" y="4"/><rect width="4" height="16" x="14" y="4"/></svg>',
    skipBack: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" x2="5" y1="19" y2="5"/></svg>',
    skipForward: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" x2="19" y1="5" y2="19"/></svg>',
    arrowLeft: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>',
    arrowRight: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
    refresh: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>',
    grid: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/></svg>',
    list: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>',
    star: '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    trash: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
    checkCircle: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>',
    xCircle: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>',
    alertTriangle: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
    refreshBadge: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>',
    volume: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>',
    volumeX: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>',
    weather: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 18a5 5 0 0 0 .88-9.87A5.5 5.5 0 0 0 6.5 8 4 4 0 0 0 8 16h9z"/><line x1="16" y1="3" x2="16" y2="1"/><line x1="22" y1="8" x2="24" y2="8"/><line x1="20.5" y1="4.5" x2="22" y2="3"/><line x1="20.5" y1="11.5" x2="22" y2="13"/></svg>',
    chronometer: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><path d="M9 2h6"/><path d="M12 2v2"/><path d="M5 5l1.5 1.5"/><path d="M19 5l-1.5 1.5"/><line x1="5" y1="21" x2="7" y2="19"/><line x1="19" y1="21" x2="17" y2="19"/></svg>',
    sparkCore: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>'
};

// ── SOUND ENGINE (Web Audio API) ──
var CyberSound = (function() {
    var ctx = null;
    function getCtx() {
        if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
        if (ctx.state === 'suspended') ctx.resume();
        return ctx;
    }
    function play(freq, type, dur, vol, ramp) {
        if (!soundEffectsEnabled) return;
        var c = getCtx();
        var o = c.createOscillator();
        var g = c.createGain();
        o.type = type || 'sine';
        o.frequency.setValueAtTime(freq, c.currentTime);
        if (ramp) o.frequency.exponentialRampToValueAtTime(ramp, c.currentTime + dur);
        g.gain.setValueAtTime(vol || 0.15, c.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
        o.connect(g); g.connect(c.destination);
        o.start(c.currentTime); o.stop(c.currentTime + dur);
    }
    function noise(dur, vol) {
        if (!soundEffectsEnabled) return;
        var c = getCtx();
        var buf = c.createBuffer(1, c.sampleRate * dur, c.sampleRate);
        var data = buf.getChannelData(0);
        for (var i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.3;
        var src = c.createBufferSource();
        src.buffer = buf;
        var g = c.createGain();
        g.gain.setValueAtTime(vol || 0.05, c.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
        src.connect(g); g.connect(c.destination);
        src.start(c.currentTime);
    }
    return {
        windowOpen: function() { play(600, 'sine', 0.15, 0.12, 900); },
        windowClose: function() { play(500, 'sine', 0.12, 0.1, 300); },
        click: function() { play(800, 'sine', 0.06, 0.08, 1200); },
        hover: function() { play(1000, 'sine', 0.03, 0.03); },
        notify: function() {
            play(523, 'sine', 0.12, 0.12);
            setTimeout(function() { play(659, 'sine', 0.12, 0.12); }, 120);
            setTimeout(function() { play(784, 'sine', 0.18, 0.1); }, 240);
        },
        error: function() { play(200, 'square', 0.2, 0.08, 100); },
        unlock: function() { play(440, 'sine', 0.1, 0.1, 880); },
        lock: function() { play(600, 'sine', 0.1, 0.1, 300); },
        theme: function() {
            play(440, 'sine', 0.1, 0.08);
            setTimeout(function() { play(554, 'sine', 0.1, 0.08); }, 80);
            setTimeout(function() { play(659, 'sine', 0.15, 0.06); }, 160);
        },
        install: function() {
            play(400, 'sine', 0.08, 0.08);
            setTimeout(function() { play(500, 'sine', 0.08, 0.08); }, 100);
            setTimeout(function() { play(600, 'sine', 0.08, 0.08); }, 200);
            setTimeout(function() { play(800, 'sine', 0.15, 0.06); }, 300);
        },
        catMeow: function() {
            var c = getCtx();
            var o = c.createOscillator();
            var g = c.createGain();
            o.type = 'sine';
            o.frequency.setValueAtTime(700, c.currentTime);
            o.frequency.exponentialRampToValueAtTime(900, c.currentTime + 0.1);
            o.frequency.exponentialRampToValueAtTime(600, c.currentTime + 0.3);
            o.frequency.exponentialRampToValueAtTime(800, c.currentTime + 0.4);
            g.gain.setValueAtTime(0.15, c.currentTime);
            g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.45);
            o.connect(g); g.connect(c.destination);
            o.start(c.currentTime); o.stop(c.currentTime + 0.45);
        },
        catPurr: function() {
            var c = getCtx();
            for (var i = 0; i < 6; i++) {
                (function(idx) {
                    var o = c.createOscillator();
                    var g = c.createGain();
                    o.type = 'sine';
                    o.frequency.setValueAtTime(25 + Math.random() * 10, c.currentTime + idx * 0.08);
                    g.gain.setValueAtTime(0.06, c.currentTime + idx * 0.08);
                    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + idx * 0.08 + 0.07);
                    o.connect(g); g.connect(c.destination);
                    o.start(c.currentTime + idx * 0.08); o.stop(c.currentTime + idx * 0.08 + 0.07);
                })(i);
            }
        },
        catPin: function() { play(1200, 'sine', 0.08, 0.08, 800); },
        boot: function() {
            var notes = [262, 330, 392, 523];
            notes.forEach(function(f, i) {
                setTimeout(function() { play(f, 'sine', 0.2, 0.06); }, i * 150);
            });
        }
    };
})();

// ── APPS REGISTRY ──
var apps = {
    notes:       { name: 'Mission Log',      icon: ICO.notes, width: 680, height: 460 },
    calculator:  { name: 'Energon Calc',     icon: ICO.calculator, width: 350, height: 500 },
    files:       { name: 'Data Core',        icon: ICO.files, width: 750, height: 500 },
    music:       { name: 'Energon Radio',    icon: ICO.music, width: 400, height: 540 },
    gallery:     { name: 'Holo Archive',     icon: ICO.gallery, width: 560, height: 460 },
    settings:    { name: 'Systems',          icon: ICO.settings, width: 680, height: 500 },
    browser:     { name: 'Cyber-Link',       icon: ICO.browser, width: 750, height: 520 },
    about:       { name: 'About',            icon: ICO.about, width: 460, height: 500 },
    wallpaper:   { name: 'Wallpaper',        icon: ICO.wallpaper, width: 700, height: 540 },
    store:       { name: 'Cybertron Store',  icon: ICO.store, width: 700, height: 520 },
    camera:      { name: 'Optic Sensor',     icon: ICO.camera, width: 640, height: 520 },
    shorts:      { name: 'Shorts',      icon: ICO.shorts, width: 400, height: 680 },
    weather:     { name: 'Energon Weather',  icon: ICO.about, width: 420, height: 500 },
    clock:       { name: 'Chronometer',      icon: ICO.about, width: 380, height: 460 },
    sysmonitor:  { name: 'Spark Core',       icon: ICO.settings, width: 520, height: 440 }
};

// â”€â”€ WALLPAPERS â”€â”€
var SB_URL = 'https://vvbfmzehffthkzoikkgu.supabase.co/storage/v1/object/public';
var wallpapers = [
    { id: 'hatsune-miku',      name: 'Energon Grid',      file: SB_URL + '/wallpapers/hatsune-miku.mp4' },
    { id: 'neon-car',          name: 'Decepticon Lair',   file: SB_URL + '/wallpapers/neon-car.mp4' },
    { id: 'optimus',       name: 'Optimus Prime',     file: 'wallpapers/optimus.jpg' },
    { id: 'download2',     name: 'Cybertron Alpha',   file: 'wallpapers/download2.jpg' },
    { id: 'download3',     name: 'Cybertron Beta',    file: 'wallpapers/download3.jpg' },
];
localStorage.removeItem('cybertron-wallpaper');
var currentWallpaper = localStorage.getItem('cybertron-wallpaper') || 'hatsune-miku';

// â”€â”€ DESKTOP ICONS â”€â”€
var desktopIcons = [
    { app: 'notes',     icon: ICO.notes, label: 'Mission Log' },
    { app: 'calculator', icon: ICO.calculator, label: 'Energon Calc' },
    { app: 'files',     icon: ICO.files, label: 'Data Core' },
    { app: 'music',     icon: ICO.music, label: 'Energon Radio' },
    { app: 'gallery',   icon: ICO.gallery, label: 'Holo Archive' },
    { app: 'settings',  icon: ICO.settings, label: 'Systems' },
    { app: 'browser',   icon: ICO.browser, label: 'Cyber-Link' },
    { app: 'wallpaper', icon: ICO.wallpaper, label: 'Wallpaper' },
    { app: 'store',     icon: ICO.store, label: 'Cybertron Store' },
    { app: 'camera',    icon: ICO.camera, label: 'Optic Sensor' },
    { app: 'shorts',    icon: ICO.shorts, label: 'Shorts' },
    { app: 'about',     icon: ICO.about, label: 'About' }
];

// â”€â”€ DATA â”€â”€
var notes = [
    { id: 1, title: 'Welcome', text: 'Welcome to CYBERTRON OS!\n\nYour Cybertronian desktop experience. Explore the systems and make them yours.\n\n\u2014 Autobot Command' },
    { id: 2, title: 'Quick Tips', text: '\u2022 Ctrl+Space opens Scanner search\n\u2022 F12 opens Command Center\n\u2022 Right-click desktop for options\n\u2022 Change wallpapers in Wallpaper app\n\u2022 Drag windows to screen edges to snap' },
    { id: 3, title: 'Mission Log', text: '\u25A1 Customize wallpaper\n\u25A1 Try the calculator\n\u25A1 Check out Cybertron Store\n\u25A1 Explore CYBERTRON OS' }
];
var activeNote = 1;
var calcDisplay = '0';
var calcExpr = '';
var calcNew = true;
var musicPlaying = false;
var musicTrack = 0;
var musicAudio = null;
var musicTracks = [
    { title: 'Yoru ni Kakeru', artist: 'YOASOBI', file: SB_URL + '/music/01 - YOASOBI - Yoru ni Kakeru.mp3', cover: SB_URL + '/music/covers/01.jpg' },
    { title: 'Gurenge', artist: 'LiSA', file: SB_URL + '/music/02 - LiSA - Gurenge.mp3', cover: SB_URL + '/music/covers/02.jpg' },
    { title: 'Pretender', artist: 'Official HIGE DANdism', file: SB_URL + '/music/03 - Official HIGE DANdism - Pretender.mp3', cover: SB_URL + '/music/covers/03.jpg' },
    { title: 'Lemon', artist: 'Kenshi Yonezu', file: SB_URL + '/music/04 - Kenshi Yonezu - Lemon.mp3', cover: SB_URL + '/music/covers/04.jpg' },
    { title: 'Usseewa', artist: 'Ado', file: SB_URL + '/music/05 - Ado - Usseewa.mp3', cover: SB_URL + '/music/covers/05.jpg' },
    { title: 'Idol', artist: 'YOASOBI', file: SB_URL + '/music/06 - YOASOBI - Idol.mp3', cover: SB_URL + '/music/covers/06.jpg' },
    { title: 'Shinunoga E-Wa', artist: 'Fujii Kaze', file: SB_URL + '/music/07 - Fujii Kaze - Shinunoga E-Wa.mp3', cover: SB_URL + '/music/covers/07.jpg' },
    { title: 'Zankyosanka', artist: 'Aimer', file: SB_URL + '/music/08 - Aimer - Zankyosanka.mp3', cover: SB_URL + '/music/covers/08.jpg' },
    { title: 'Mixed Nuts', artist: 'Official HIGE DANdism', file: SB_URL + '/music/09 - Official HIGE DANdism - Mixed Nuts.mp3', cover: SB_URL + '/music/covers/09.jpg' },
    { title: 'Kick Back', artist: 'Kenshi Yonezu', file: SB_URL + '/music/10 - Kenshi Yonezu - Kick Back.mp3', cover: SB_URL + '/music/covers/10.jpg' }
];
var currentPath = '/cybertron/prime';
var filesView = 'grid';
var fileSystem = {
    '/cybertron/prime': [
        { name: 'Intel Reports', type: 'folder', icon: ICO.folder },
        { name: 'Holo Records',  type: 'folder', icon: ICO.folder },
        { name: 'Frequencies',   type: 'folder', icon: ICO.folder },
        { name: 'Transmissions', type: 'folder', icon: ICO.folder },
        { name: 'Downloads',     type: 'folder', icon: ICO.folder },
        { name: 'mission_log.txt', type: 'file', icon: ICO.file, size: '2 KB', modified: 'Today' },
        { name: 'intel_brief.md',  type: 'file', icon: ICO.file, size: '1 KB', modified: 'Yesterday' }
    ],
    '/cybertron/prime/Intel Reports': [
        { name: 'decepticon_activity.pdf',  type: 'file', icon: ICO.file, size: '2.4 MB', modified: 'Jun 15' },
        { name: 'energon_levels.txt',       type: 'file', icon: ICO.file, size: '512 B', modified: 'Jun 14' },
        { name: 'sector_scan.xlsx',         type: 'file', icon: ICO.file, size: '180 KB', modified: 'Jun 10' }
    ],
    '/cybertron/prime/Holo Records': [
        { name: 'cybertron_skyline.jpg',  type: 'file', icon: ICO.gallery, size: '3.1 MB', modified: 'Jun 12' },
        { name: 'optic_capture.png',      type: 'file', icon: ICO.camera, size: '890 KB', modified: 'Jun 16' },
        { name: 'battle_record.jpg',      type: 'file', icon: ICO.camera, size: '4.5 MB', modified: 'Jun 08' }
    ],
    '/cybertron/prime/Frequencies': [
        { name: 'autobot_march.mp3', type: 'file', icon: ICO.music, size: '5.2 MB', modified: 'Jun 05' },
        { name: 'energon_hum.mp3',   type: 'file', icon: ICO.music, size: '4.8 MB', modified: 'Jun 05' }
    ],
    '/cybertron/prime/Transmissions': [
        { name: 'transmission.mp4', type: 'file', icon: ICO.shorts, size: '28 MB', modified: 'Jun 01' }
    ],
    '/cybertron/prime/Downloads': [
        { name: 'system_update.exe',  type: 'file', icon: ICO.download, size: '45 MB', modified: 'Jun 17' },
        { name: 'data_archive.zip',   type: 'file', icon: ICO.download, size: '12 MB', modified: 'Jun 16' }
    ]
};

// â”€â”€ STORE APPS â”€â”€
var storeApps = [
    { id: 'notes', name: 'Mission Log', icon: ICO.notes, desc: 'Record your transmissions and logs', rating: 4.8, installed: true },
    { id: 'calculator', name: 'Energon Calc', icon: ICO.calculator, desc: 'Perform Cybertronian calculations', rating: 4.5, installed: true },
    { id: 'files', name: 'Data Core', icon: ICO.files, desc: 'Access and manage your data archives', rating: 4.6, installed: true },
    { id: 'music', name: 'Energon Radio', icon: ICO.music, desc: 'Stream Cybertronian frequencies', rating: 4.7, installed: true },
    { id: 'gallery', name: 'Holo Archive', icon: ICO.gallery, desc: 'View holographic image records', rating: 4.4, installed: true },
    { id: 'settings', name: 'Systems', icon: ICO.settings, desc: 'Configure system settings and themes', rating: 4.9, installed: true },
    { id: 'browser', name: 'Cyber-Link', icon: ICO.browser, desc: 'Browse the Cybertron network', rating: 4.3, installed: true },
    { id: 'camera', name: 'Optic Sensor', icon: ICO.camera, desc: 'Capture visual recordings', rating: 4.1, installed: true },
    { id: 'shorts', name: 'Shorts', icon: ICO.shorts, desc: 'Watch short video transmissions', rating: 4.2, installed: true },
    { id: 'wallpaper', name: 'Wallpaper Studio', icon: ICO.wallpaper, desc: 'Customize your desktop background', rating: 4.0, installed: true },
    { id: 'about', name: 'About', icon: ICO.about, desc: 'View system information', rating: 4.6, installed: true },
    { id: 'weather', name: 'Energon Weather', icon: ICO.weather, desc: 'Real-time Cybertronian weather data', rating: 4.7, installed: false },
    { id: 'clock', name: 'Chronometer', icon: ICO.chronometer, desc: 'Analog and digital time display', rating: 4.5, installed: false },
    { id: 'sysmonitor', name: 'Spark Core', icon: ICO.sparkCore, desc: 'Monitor CPU, RAM, and system health', rating: 4.8, installed: false }
];

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// ── DESKTOP BRANDING ──
function addDesktopBranding() {
    var existing = document.getElementById('desktop-branding');
    if (existing) existing.remove();
    var brand = document.createElement('div');
    brand.id = 'desktop-branding';
    brand.innerHTML = '<div class="brand-cybertron">CYBERTRON</div><div class="brand-os">OS</div>';
    document.getElementById('desktop').appendChild(brand);
}

// BOOT SEQUENCE
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

function boot() {
    initDesktop();
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// LOCK SCREEN
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

function showLockScreen() {
    var lock = document.getElementById('lock-screen');
    lock.classList.remove('hidden');
    updateLockClock();
    setInterval(updateLockClock, 1000);
    var input = document.getElementById('lock-input');
    input.value = '';
    // Update lock screen user
    var lockUser = document.querySelector('.lock-user');
    if (lockUser) lockUser.textContent = 'PRIME';
    setTimeout(function() { input.focus(); }, 100);
}

function updateLockClock() {
    var now = new Date();
    var h = String(now.getHours()).padStart(2, '0');
    var m = String(now.getMinutes()).padStart(2, '0');
    var el = document.getElementById('lock-time');
    if (el) el.textContent = h + ':' + m;
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var dateEl = document.getElementById('lock-date');
    if (dateEl) dateEl.textContent = days[now.getDay()] + ', ' + months[now.getMonth()] + ' ' + now.getDate();
}

function unlockDesktop() {
    CyberSound.unlock();
    var lock = document.getElementById('lock-screen');
    lock.classList.add('unlocking');
    setTimeout(function() {
        lock.classList.add('hidden');
        lock.classList.remove('unlocking');
        initDesktop();
    }, 500);
}



// â”€â”€ Lock input handler â”€â”€
document.addEventListener('DOMContentLoaded', function() {
    var lockInput = document.getElementById('lock-input');
    if (lockInput) {
        lockInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') unlockDesktop();
        });
    }
});

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// DESKTOP INIT
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•


// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// CLOCK
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

function initClock() {
    var days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    var shortDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    var fullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var calMonth = new Date().getMonth();
    var calYear = new Date().getFullYear();

    // Generate clock marks
    var marksContainer = document.getElementById('cyber-clock-marks');
    if (marksContainer) {
        for (var i = 0; i < 12; i++) {
            var mark = document.createElement('div');
            mark.className = 'cyber-clock-mark' + (i % 3 === 0 ? ' major' : '');
            mark.style.transform = 'rotate(' + (i * 30) + 'deg)';
            marksContainer.appendChild(mark);
        }
    }

    // Render mini calendar with navigation
    function renderCalendar() {
        var cal = document.getElementById('mini-calendar');
        if (!cal) return;
        var now = new Date();
        var today = now.getDate();
        var thisMonth = now.getMonth();
        var thisYear = now.getFullYear();
        var firstDay = new Date(calYear, calMonth, 1).getDay();
        var daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
        var daysInPrev = new Date(calYear, calMonth, 0).getDate();

        var html = '<div class="cal-nav">';
        html += '<button class="cal-nav-btn" id="cal-prev">&#8249;</button>';
        html += '<div class="cal-header">' + fullMonths[calMonth] + ' ' + calYear + '</div>';
        html += '<button class="cal-nav-btn" id="cal-next">&#8250;</button>';
        html += '</div>';
        html += '<div class="cal-weekdays">';
        for (var d = 0; d < 7; d++) html += '<div class="cal-weekday">' + shortDays[d] + '</div>';
        html += '</div><div class="cal-days">';

        for (var i = firstDay - 1; i >= 0; i--) {
            html += '<div class="cal-day other">' + (daysInPrev - i) + '</div>';
        }
        for (var d = 1; d <= daysInMonth; d++) {
            var isToday = (d === today && calMonth === thisMonth && calYear === thisYear);
            html += '<div class="cal-day' + (isToday ? ' today' : '') + '">' + d + '</div>';
        }
        var remaining = 42 - (firstDay + daysInMonth);
        for (var d = 1; d <= remaining; d++) {
            html += '<div class="cal-day other">' + d + '</div>';
        }
        html += '</div>';
        cal.innerHTML = html;

        // Navigation handlers
        document.getElementById('cal-prev').addEventListener('click', function() {
            calMonth--;
            if (calMonth < 0) { calMonth = 11; calYear--; }
            renderCalendar();
        });
        document.getElementById('cal-next').addEventListener('click', function() {
            calMonth++;
            if (calMonth > 11) { calMonth = 0; calYear++; }
            renderCalendar();
        });
    }

    renderCalendar();

    function update() {
        var now = new Date();
        var h = now.getHours();
        var m = now.getMinutes();
        var s = now.getSeconds();
        var ms = now.getMilliseconds();

        // Taskbar clock
        var clockEl = document.getElementById('taskbar-clock');
        if (clockEl) clockEl.textContent = String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0');

        // Analog clock hands
        var hourDeg = (h % 12) * 30 + m * 0.5;
        var minDeg = m * 6 + s * 0.1;
        var secDeg = s * 6 + ms * 0.006;

        var hourHand = document.getElementById('cyber-hour');
        var minHand = document.getElementById('cyber-minute');
        var secHand = document.getElementById('cyber-second');
        if (hourHand) hourHand.style.transform = 'rotate(' + hourDeg + 'deg)';
        if (minHand) minHand.style.transform = 'rotate(' + minDeg + 'deg)';
        if (secHand) secHand.style.transform = 'rotate(' + secDeg + 'deg)';

        // Digital time with AM/PM
        var ampm = h >= 12 ? 'PM' : 'AM';
        var h12 = h % 12 || 12;
        var digital = document.getElementById('cyber-clock-digital');
        if (digital) digital.textContent = String(h12).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0') + ' ' + ampm;

        // Date
        var dateEl = document.getElementById('cyber-clock-date');
        if (dateEl) dateEl.textContent = shortDays[now.getDay()] + ' ' + now.getDate() + ' ' + months[now.getMonth()];
    }
    update();
    setInterval(update, 50);
}

// Top search bar
function initTopSearch() {
    var input = document.getElementById('top-search-input');
    if (!input) return;

    // Create results dropdown
    var results = document.createElement('div');
    results.className = 'top-search-results';
    results.id = 'top-search-results';
    input.parentElement.appendChild(results);

    function searchApps(q) {
        if (!q) { results.style.display = 'none'; results.innerHTML = ''; return; }
        var matches = [];
        var qLower = q.toLowerCase();
        // Only search installed apps
        for (var i = 0; i < storeApps.length; i++) {
            var app = storeApps[i];
            if (!app.installed) continue;
            if (app.name.toLowerCase().indexOf(qLower) !== -1 || app.id.indexOf(qLower) !== -1) {
                matches.push({ id: app.id, name: app.name, icon: app.icon });
            }
        }
        if (matches.length === 0) {
            results.innerHTML = '<div class="top-search-empty">No apps found</div>';
            results.style.display = 'block';
            return;
        }
        var html = '';
        for (var i = 0; i < matches.length; i++) {
            html += '<div class="top-search-item" data-app="' + matches[i].id + '">' +
                '<span class="top-search-item-icon">' + matches[i].icon + '</span>' +
                '<span class="top-search-item-name">' + matches[i].name + '</span>' +
                '</div>';
        }
        results.innerHTML = html;
        results.style.display = 'block';

        // Add click handlers
        var items = results.querySelectorAll('.top-search-item');
        for (var j = 0; j < items.length; j++) {
            items[j].addEventListener('click', function() {
                openApp(this.getAttribute('data-app'));
                input.value = '';
                results.style.display = 'none';
                input.blur();
            });
        }
    }

    input.addEventListener('input', function() {
        searchApps(this.value.trim());
    });

    input.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            input.blur();
            input.value = '';
            results.style.display = 'none';
        }
        if (e.key === 'Enter') {
            var firstItem = results.querySelector('.top-search-item');
            if (firstItem) {
                openApp(firstItem.getAttribute('data-app'));
                input.value = '';
                results.style.display = 'none';
                input.blur();
            }
        }
    });

    input.addEventListener('focus', function() {
        if (this.value.trim()) searchApps(this.value.trim());
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.top-search')) {
            results.style.display = 'none';
        }
    });
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// SYSTEM STATUS
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

function initSystemStatus() {
    setInterval(function() {
        var cpu = Math.floor(Math.random() * 40) + 20;
        var ram = Math.floor(Math.random() * 30) + 45;
        var disk = Math.floor(Math.random() * 10) + 44;
        var cpuEl = document.getElementById('dash-cpu');
        var ramEl = document.getElementById('dash-ram');
        var diskEl = document.getElementById('dash-disk');
        if (cpuEl) cpuEl.textContent = cpu + '%';
        if (ramEl) ramEl.textContent = ram + '%';
        if (diskEl) diskEl.textContent = disk + '%';
    }, 3000);
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// WALLPAPER ENGINE
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

function initWallpaperEngine() {
    var video = document.getElementById('wallpaper-video');
    var bg = document.getElementById('desktop-bg');
    if (!video) return;
    var validWp = false;
    if (currentWallpaper && currentWallpaper !== 'none') {
        for (var i = 0; i < wallpapers.length; i++) {
            if (wallpapers[i].id === currentWallpaper) { validWp = true; break; }
        }
        if (!validWp) {
            currentWallpaper = 'hatsune-miku';
            localStorage.setItem('cybertron-wallpaper', 'hatsune-miku');
        }
    }
    if (currentWallpaper && currentWallpaper !== 'none') {
        if (bg) bg.style.display = 'none';
        loadWallpaper(currentWallpaper);
    } else {
        video.classList.remove('active');
    }
}

function loadWallpaper(wpId) {
    var video = document.getElementById('wallpaper-video');
    var bg = document.getElementById('desktop-bg');
    if (!video) return;
    if (wpId === 'none' || !wpId) {
        video.classList.remove('active');
        currentWallpaper = 'none';
        localStorage.setItem('cybertron-wallpaper', 'none');
        window._parallaxEnabled = false;
        setTimeout(function() {
            video.pause();
            video.removeAttribute('src');
            video.load();
            if (bg) { bg.style.display = ''; bg.style.backgroundImage = ''; bg.style.backgroundSize = ''; bg.style.transform = ''; }
        }, 800);
        return;
    }
    var wp = null;
    for (var i = 0; i < wallpapers.length; i++) {
        if (wallpapers[i].id === wpId) { wp = wallpapers[i]; break; }
    }
    if (!wp) return;
    currentWallpaper = wpId;
    localStorage.setItem('cybertron-wallpaper', wpId);
    var isImage = wp.file.match(/\.(jpg|jpeg|png|gif|webp)$/i);
    if (isImage) {
        video.classList.remove('active');
        video.pause();
        video.removeAttribute('src');
        window._parallaxEnabled = true;
        if (bg) {
            bg.style.display = 'block';
            bg.style.backgroundImage = 'url(' + wp.file + ')';
            bg.style.backgroundSize = 'cover';
            bg.style.backgroundPosition = 'center';
            bg.style.transform = 'scale(1.1)';
            bg.style.transition = 'transform 0.3s ease-out';
        }
    } else {
        window._parallaxEnabled = false;
        if (bg) { bg.style.display = 'none'; bg.style.backgroundImage = ''; bg.style.transform = ''; }
        video.classList.remove('active');
        setTimeout(function() {
            video.src = wp.file;
            video.load();
            video.oncanplay = function() {
                video.play().catch(function() {});
                video.classList.add('active');
                video.oncanplay = null;
            };
        }, 400);
    }
}

// Parallax effect for static wallpapers (MewoOS style)
window._parallaxEnabled = false;
document.addEventListener('mousemove', function(e) {
    if (!window._parallaxEnabled) return;
    var bg = document.getElementById('desktop-bg');
    if (!bg || !bg.style.backgroundImage) return;
    var cx = e.clientX / window.innerWidth - 0.5;
    var cy = e.clientY / window.innerHeight - 0.5;
    bg.style.transform = 'scale(1.1) translate(' + (cx * -20) + 'px, ' + (cy * -20) + 'px)';
    var orb1 = document.querySelector('.desktop-orb-1');
    var orb2 = document.querySelector('.desktop-orb-2');
    if (orb1) orb1.style.transform = 'translate(' + (cx * 40) + 'px, ' + (cy * 40) + 'px)';
    if (orb2) orb2.style.transform = 'translate(' + (cx * 30) + 'px, ' + (cy * 30) + 'px)';
});

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// DESKTOP ICONS
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

function renderDesktopIcons() {
    var container = document.getElementById('desktop-icons');
    container.innerHTML = '';
    for (var i = 0; i < desktopIcons.length; i++) {
        var ic = desktopIcons[i];
        var div = document.createElement('div');
        div.className = 'desktop-icon';
        div.setAttribute('data-app', ic.app);
        div.innerHTML = '<div class="icon-img">' + ic.icon + '</div><span>' + ic.label + '</span>';
        (function(appId) {
            div.addEventListener('dblclick', function() { openApp(appId); });
        })(ic.app);
        // Make icon draggable
        (function(icon) {
            var dragging = false, moved = false, ox = 0, oy = 0, startX = 0, startY = 0;
            icon.addEventListener('mousedown', function(e) {
                if (e.button !== 0) return;
                dragging = true;
                moved = false;
                startX = e.clientX;
                startY = e.clientY;
                var rect = icon.getBoundingClientRect();
                ox = e.clientX - rect.left;
                oy = e.clientY - rect.top;
                e.preventDefault();
            });
            document.addEventListener('mousemove', function(e) {
                if (!dragging) return;
                var dx = e.clientX - startX;
                var dy = e.clientY - startY;
                if (!moved && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
                    moved = true;
                    icon.style.position = 'absolute';
                    icon.style.zIndex = '20';
                    icon.style.cursor = 'grabbing';
                    icon.style.transition = 'none';
                }
                if (moved) {
                    icon.style.left = (e.clientX - ox) + 'px';
                    icon.style.top = (e.clientY - oy) + 'px';
                }
            });
            document.addEventListener('mouseup', function() {
                if (dragging && moved) {
                    icon.style.cursor = 'grab';
                }
                dragging = false;
            });
        })(div);
        container.appendChild(div);
    }
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// WINDOW MANAGER
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

function openApp(appId) {
    CyberSound.windowOpen();
    var existing = null;
    for (var i = 0; i < windows.length; i++) {
        if (windows[i].appId === appId && !windows[i].closed) { existing = windows[i]; break; }
    }
    if (existing) {
        focusWindow(existing.id);
        if (existing.minimized) {
            existing.el.classList.remove('minimizing');
            existing.el.style.display = 'flex';
            existing.minimized = false;
        }
        return;
    }
    var app = apps[appId];
    if (!app) return;
    var id = ++windowIdCounter;
    var el = document.createElement('div');
    el.className = 'cosmos-window focused';
    el.id = 'win-' + id;
    el.style.width = app.width + 'px';
    el.style.height = app.height + 'px';
    el.style.left = (80 + (windows.length % 8) * 30) + 'px';
    el.style.top = (50 + (windows.length % 8) * 30) + 'px';
    el.style.zIndex = ++topZ;
    el.innerHTML =
        '<div class="win-titlebar" data-win="' + id + '">' +
            '<span class="win-title">' + app.icon + ' ' + app.name + '</span>' +
            '<div class="win-controls">' +
                '<button class="win-btn win-btn-min" onclick="minimizeWindow(' + id + ')"></button>' +
                '<button class="win-btn win-btn-max" onclick="maximizeWindow(' + id + ')"></button>' +
                '<button class="win-btn win-btn-close" onclick="closeWindow(' + id + ')"></button>' +
            '</div>' +
        '</div>' +
        '<div class="win-body" id="win-body-' + id + '"></div>' +
        '<div class="win-resize" data-win="' + id + '"></div>';
    document.getElementById('windows-container').appendChild(el);
    var winObj = { id: id, appId: appId, el: el, minimized: false, maximized: false, closed: false, prevRect: null, snap: null };
    windows.push(winObj);
    initWindowDrag(el, id);
    initWindowResize(el, id);
    initWindowSnap(el, id);
    el.addEventListener('mousedown', function() { focusWindow(id); });
    renderApp(appId, id);
    updateTaskbar();
    focusWindow(id);
}

function renderApp(appId, winId) {
    var body = document.getElementById('win-body-' + winId);
    if (!body) return;
    switch (appId) {
        case 'notes':       renderNotes(body); break;
        case 'calculator':  renderCalculator(body); break;
        case 'files':       renderFiles(body); break;
        case 'music':       renderMusic(body); break;
        case 'gallery':     renderGallery(body); break;
        case 'settings':    renderSettings(body); break;
        case 'browser':     renderBrowser(body); break;
        case 'about':       renderAbout(body); break;
        case 'wallpaper':   renderWallpaperApp(body); break;
        case 'store':       renderStore(body); break;
        case 'camera':      renderCamera(body); break;
        case 'shorts':      renderShorts(body); break;
        case 'weather':     renderWeather(body); break;
        case 'clock':       renderClock(body); break;
        case 'sysmonitor':  renderSysMonitor(body); break;
    }
}

function closeWindow(id) {
    CyberSound.windowClose();
    var win = null;
    for (var i = 0; i < windows.length; i++) {
        if (windows[i].id === id) { win = windows[i]; break; }
    }
    if (!win) return;
    win.el.classList.add('closing');
    win.closed = true;
    setTimeout(function() {
        win.el.remove();
        windows = windows.filter(function(w) { return w.id !== id; });
        updateTaskbar();
    }, 200);
}

function minimizeWindow(id) {
    var win = null;
    for (var i = 0; i < windows.length; i++) {
        if (windows[i].id === id) { win = windows[i]; break; }
    }
    if (!win) return;
    win.minimized = true;
    win.el.classList.add('minimizing');
    setTimeout(function() { win.el.style.display = 'none'; }, 300);
    updateTaskbar();
}

function maximizeWindow(id) {
    var win = null;
    for (var i = 0; i < windows.length; i++) {
        if (windows[i].id === id) { win = windows[i]; break; }
    }
    if (!win) return;
    if (win.maximized) {
        win.el.style.left = win.prevRect.left + 'px';
        win.el.style.top = win.prevRect.top + 'px';
        win.el.style.width = win.prevRect.width + 'px';
        win.el.style.height = win.prevRect.height + 'px';
        win.el.style.borderRadius = '';
        win.maximized = false;
        win.snap = null;
        win.el.classList.remove('snap-max', 'snap-left', 'snap-right');
    } else {
        win.prevRect = {
            left: parseInt(win.el.style.left), top: parseInt(win.el.style.top),
            width: win.el.offsetWidth, height: win.el.offsetHeight
        };
        win.el.style.left = '0px';
        win.el.style.top = '38px';
        win.el.style.width = '100vw';
        win.el.style.height = 'calc(100vh - 38px)';
        win.el.style.borderRadius = '0';
        win.maximized = true;
        win.el.classList.add('snap-max');
    }
}

function focusWindow(id) {
    for (var i = 0; i < windows.length; i++) {
        windows[i].el.classList.remove('focused');
    }
    var win = null;
    for (var i = 0; i < windows.length; i++) {
        if (windows[i].id === id) { win = windows[i]; break; }
    }
    if (win) {
        win.el.style.zIndex = ++topZ;
        win.el.classList.add('focused');
    }
    updateTaskbar();
}

function closeAllWindows() {
    var copy = windows.slice();
    for (var i = 0; i < copy.length; i++) {
        closeWindow(copy[i].id);
    }
}

// â”€â”€ Window Drag â”€â”€
function initWindowDrag(el, winId) {
    var titlebar = el.querySelector('.win-titlebar');
    var dragging = false, ox, oy;
    titlebar.addEventListener('mousedown', function(e) {
        if (e.target.classList.contains('win-btn')) return;
        var win = null;
        for (var i = 0; i < windows.length; i++) {
            if (windows[i].id === winId) { win = windows[i]; break; }
        }
        if (win && win.maximized) return;
        dragging = true;
        var rect = el.getBoundingClientRect();
        ox = e.clientX - rect.left;
        oy = e.clientY - rect.top;
        focusWindow(winId);
    });
    document.addEventListener('mousemove', function(e) {
        if (!dragging) return;
        el.style.left = (e.clientX - ox) + 'px';
        el.style.top = (e.clientY - oy) + 'px';
        // Remove snap when dragging
        var win = null;
        for (var i = 0; i < windows.length; i++) {
            if (windows[i].id === winId) { win = windows[i]; break; }
        }
        if (win) {
            win.el.classList.remove('snap-left', 'snap-right', 'snap-max');
            win.snap = null;
            win.maximized = false;
            el.style.borderRadius = '';
        }
    });
    document.addEventListener('mouseup', function() { dragging = false; });
    titlebar.addEventListener('dblclick', function() { maximizeWindow(winId); });
}

// â”€â”€ Window Resize â”€â”€
function initWindowResize(el, winId) {
    var handle = el.querySelector('.win-resize');
    var resizing = false, sx, sy, sw, sh;
    handle.addEventListener('mousedown', function(e) {
        e.stopPropagation();
        resizing = true;
        sx = e.clientX; sy = e.clientY;
        sw = el.offsetWidth; sh = el.offsetHeight;
        focusWindow(winId);
    });
    document.addEventListener('mousemove', function(e) {
        if (!resizing) return;
        var nw = Math.max(380, sw + (e.clientX - sx));
        var nh = Math.max(260, sh + (e.clientY - sy));
        el.style.width = nw + 'px';
        el.style.height = nh + 'px';
    });
    document.addEventListener('mouseup', function() { resizing = false; });
}

// â”€â”€ Window Snap â”€â”€
function initWindowSnap(el, winId) {
    document.addEventListener('mousemove', function(e) {
        var win = null;
        for (var i = 0; i < windows.length; i++) {
            if (windows[i].id === winId && windows[i].el === el) { win = windows[i]; break; }
        }
        if (!win || win.maximized) return;
        // Check if dragging near edges
        // Left edge: snap left
        // Right edge: snap right
        // Top edge: maximize
    });
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// TASKBAR
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

function updateTaskbar() {
    var container = document.getElementById('taskbar-apps');
    container.innerHTML = '';
    for (var i = 0; i < windows.length; i++) {
        var w = windows[i];
        if (w.closed) continue;
        var app = apps[w.appId];
        var btn = document.createElement('button');
        btn.className = 'taskbar-app-btn' + (w.el.classList.contains('focused') && !w.minimized ? ' active' : '');
        btn.innerHTML = app.icon + ' ' + app.name;
        (function(wid, wObj) {
            btn.addEventListener('click', function() {
                if (wObj.minimized) {
                    wObj.el.classList.remove('minimizing');
                    wObj.el.style.display = 'flex';
                    wObj.minimized = false;
                }
                focusWindow(wid);
            });
        })(w.id, w);
        container.appendChild(btn);
    }
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// START MENU
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

function renderStartMenuApps() {
    var list = document.getElementById('start-apps-list');
    var appKeys = Object.keys(apps);
    var html = '';
    for (var i = 0; i < appKeys.length; i++) {
        var id = appKeys[i];
        var app = apps[id];
        html += '<div class="start-app" onclick="openApp(\'' + id + '\');closeStartMenu()">' + app.icon + ' ' + app.name + '</div>';
    }
    // Update start menu user
    var startUsername = document.querySelector('.start-username');
    if (startUsername) startUsername.textContent = 'PRIME';
    var startRole = document.querySelector('.start-role');
    if (startRole) startRole.textContent = 'Autobot Commander';
    list.innerHTML = html;
}

function toggleStartMenu() {
    startMenuOpen = !startMenuOpen;
    document.getElementById('start-menu').classList.toggle('visible', startMenuOpen);
    document.getElementById('start-btn').classList.toggle('active', startMenuOpen);
    if (startMenuOpen) {
        closeNotifications();
        closeControlCenter();
        closeCalendar();
        document.getElementById('start-search').focus();
    }
}

function closeStartMenu() {
    startMenuOpen = false;
    document.getElementById('start-menu').classList.remove('visible');
    document.getElementById('start-btn').classList.remove('active');
}

function filterStartMenu(q) {
    q = q.toLowerCase();
    var items = document.querySelectorAll('#start-apps-list .start-app');
    for (var i = 0; i < items.length; i++) {
        items[i].style.display = items[i].textContent.toLowerCase().indexOf(q) !== -1 ? '' : 'none';
    }
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// GLOBAL SEARCH
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

function openSearch() {
    searchOpen = true;
    var el = document.getElementById('global-search');
    el.classList.add('visible');
    document.getElementById('search-input').value = '';
    document.getElementById('search-input').focus();
    renderSearchResults('');
}

function closeSearch() {
    searchOpen = false;
    document.getElementById('global-search').classList.remove('visible');
}

function renderSearchResults(q) {
    var container = document.getElementById('search-results');
    if (!q) {
        container.innerHTML = '<div class="search-result" style="color:var(--text-muted);justify-content:center;padding:20px;">Initiate scan...</div>';
        return;
    }
    var results = [];
    var appKeys = Object.keys(apps);
    for (var i = 0; i < appKeys.length; i++) {
        if (apps[appKeys[i]].name.toLowerCase().indexOf(q.toLowerCase()) !== -1) {
            results.push({ type: 'app', id: appKeys[i], icon: apps[appKeys[i]].icon, name: apps[appKeys[i]].name, hint: 'System' });
        }
    }
    // Search files
    var paths = Object.keys(fileSystem);
    for (var p = 0; p < paths.length; p++) {
        var files = fileSystem[paths[p]];
        for (var f = 0; f < files.length; f++) {
            if (files[f].name.toLowerCase().indexOf(q.toLowerCase()) !== -1) {
                results.push({ type: 'file', id: paths[p], icon: files[f].icon, name: files[f].name, hint: paths[p] });
            }
        }
    }
    // Search wallpapers
    for (var w = 0; w < wallpapers.length; w++) {
        if (wallpapers[w].name.toLowerCase().indexOf(q.toLowerCase()) !== -1) {
            results.push({ type: 'wallpaper', id: wallpapers[w].id, icon: ICO.wallpaper, name: wallpapers[w].name, hint: 'Wallpaper' });
        }
    }
    if (results.length === 0) {
        container.innerHTML = '<div class="search-result" style="color:var(--text-muted);justify-content:center;padding:20px;">No signals detected</div>';
        return;
    }
    var html = '';
    for (var r = 0; r < results.length; r++) {
        var res = results[r];
        html += '<div class="search-result' + (r === 0 ? ' selected' : '') + '" onclick="searchSelect(\'' + res.type + '\',\'' + res.id + '\')">' +
            '<div class="search-result-icon">' + res.icon + '</div>' +
            '<span class="search-result-name">' + res.name + '</span>' +
            '<span class="search-result-hint">' + res.hint + '</span>' +
        '</div>';
    }
    container.innerHTML = html;
}

function searchSelect(type, id) {
    closeSearch();
    if (type === 'app') openApp(id);
    else if (type === 'file') { openApp('files'); }
    else if (type === 'wallpaper') { loadWallpaper(id); showToast('Wallpaper', 'Cybertronian background applied', ICO.wallpaper); }
}

document.addEventListener('DOMContentLoaded', function() {
    var searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() { renderSearchResults(this.value); });
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeSearch();
            if (e.key === 'Enter') {
                var selected = document.querySelector('#search-results .search-result.selected');
                if (selected) selected.click();
            }
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                var items = document.querySelectorAll('#search-results .search-result');
                var idx = -1;
                for (var i = 0; i < items.length; i++) {
                    if (items[i].classList.contains('selected')) { idx = i; break; }
                }
                if (idx >= 0) items[idx].classList.remove('selected');
                if (e.key === 'ArrowDown') idx = Math.min(idx + 1, items.length - 1);
                else idx = Math.max(idx - 1, 0);
                if (items[idx]) items[idx].classList.add('selected');
            }
        });
    }
});

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// CONTROL CENTER
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

function toggleControlCenter() {
    controlCenterOpen = !controlCenterOpen;
    document.getElementById('control-center').classList.toggle('visible', controlCenterOpen);
    if (controlCenterOpen) {
        closeStartMenu();
        closeNotifications();
        closeCalendar();
    }
}

function closeControlCenter() {
    controlCenterOpen = false;
    document.getElementById('control-center').classList.remove('visible');
}

function toggleCC(el, key) {
    ccState[key] = !ccState[key];
    el.classList.toggle('on', ccState[key]);
    showToast(key.charAt(0).toUpperCase() + key.slice(1), ccState[key] ? 'Online' : 'Offline', ccState[key] ? ICO.checkCircle : ICO.xCircle);
}

function setBrightness(val) {
    brightness = parseInt(val);
    document.body.style.filter = 'brightness(' + (brightness / 100) + ')';
}

function setVolume(val) { volume = parseInt(val); }

function setPerfMode(mode, el) {
    perfMode = mode;
    document.body.classList.remove('perf-high', 'perf-low');
    if (mode === 'high') document.body.classList.add('perf-high');
    var toggles = el.parentElement.querySelectorAll('.cc-toggle');
    for (var i = 0; i < toggles.length; i++) toggles[i].classList.remove('on');
    el.classList.add('on');
    showToast('Power Core', mode.charAt(0).toUpperCase() + mode.slice(1) + ' power', ICO.checkCircle);
}

function renderCCWallpapers() {
    var container = document.getElementById('cc-wallpapers');
    if (!container) return;
    var html = '';
    for (var i = 0; i < wallpapers.length; i++) {
        var wp = wallpapers[i];
        html += '<video class="cc-wp-thumb' + (currentWallpaper === wp.id ? ' active' : '') + '" src="' + wp.file + '" muted preload="metadata" onclick="loadWallpaper(\'' + wp.id + '\');renderCCWallpapers()" onmouseenter="this.play()" onmouseleave="this.pause();this.currentTime=0"></video>';
    }
    container.innerHTML = html;
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// NOTIFICATIONS
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

function toggleNotifications() {
    notifOpen = !notifOpen;
    document.getElementById('notifications-panel').classList.toggle('visible', notifOpen);
    if (notifOpen) {
        closeStartMenu();
        closeControlCenter();
        closeCalendar();
        renderNotifications();
    }
}

function closeNotifications() {
    notifOpen = false;
    document.getElementById('notifications-panel').classList.remove('visible');
}

function renderNotifications() {
    var list = document.getElementById('notif-list');
    if (notifications.length === 0) {
        list.innerHTML = '<div class="notif-empty">No notifications</div>';
        return;
    }
    var html = '';
    for (var i = 0; i < notifications.length; i++) {
        var n = notifications[i];
        html += '<div class="notif-item">' +
            '<div class="notif-icon-wrap">' + n.icon + '</div>' +
            '<div class="notif-body">' +
                '<div class="notif-title">' + n.title + '</div>' +
                '<div class="notif-text">' + n.text + '</div>' +
                '<div class="notif-time">' + n.time + '</div>' +
            '</div>' +
        '</div>';
    }
    list.innerHTML = html;
}

function clearAllNotifications() {
    notifications = [];
    renderNotifications();
    showToast('Alerts', 'All signals cleared', ICO.trash);
}

function showToast(title, text, icon) {
    CyberSound.notify();
    var container = document.getElementById('toast-container');
    var toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = '<span class="toast-icon">' + (icon || ICO.checkCircle) + '</span><span><strong>' + title + '</strong> ' + text + '</span>';
    container.appendChild(toast);
    setTimeout(function() {
        toast.classList.add('toast-out');
        setTimeout(function() { toast.remove(); }, 250);
    }, 3000);
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// CALENDAR
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

function toggleCalendar() {
    calendarOpen = !calendarOpen;
    document.getElementById('calendar-popup').classList.toggle('visible', calendarOpen);
    if (calendarOpen) {
        closeStartMenu();
        closeNotifications();
        closeControlCenter();
        renderCalendar();
    }
}

function closeCalendar() {
    calendarOpen = false;
    document.getElementById('calendar-popup').classList.remove('visible');
}

function renderCalendar() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();
    var today = now.getDate();
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var firstDay = new Date(year, month, 1).getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var daysInPrev = new Date(year, month, 0).getDate();
    var html = '<div class="cal-month">' + months[month] + ' ' + year + '</div>';
    html += '<div class="cal-grid">';
    var dayNames = ['Su','Mo','Tu','We','Th','Fr','Sa'];
    for (var d = 0; d < 7; d++) html += '<div class="cal-day-header">' + dayNames[d] + '</div>';
    // Previous month days
    for (var i = firstDay - 1; i >= 0; i--) {
        html += '<div class="cal-day other-month">' + (daysInPrev - i) + '</div>';
    }
    // Current month days
    for (var day = 1; day <= daysInMonth; day++) {
        html += '<div class="cal-day' + (day === today ? ' today' : '') + '">' + day + '</div>';
    }
    // Next month days
    var totalCells = firstDay + daysInMonth;
    var remaining = (7 - (totalCells % 7)) % 7;
    for (var n = 1; n <= remaining; n++) {
        html += '<div class="cal-day other-month">' + n + '</div>';
    }
    html += '</div>';
    document.getElementById('calendar-content').innerHTML = html;
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// CONTEXT MENU (Desktop)
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

function initContextMenu() {
    document.getElementById('desktop').addEventListener('contextmenu', function(e) {
        e.preventDefault();
        if (e.target.closest('.cosmos-window') || e.target.closest('#taskbar')) return;
        showDesktopContextMenu(e.clientX, e.clientY);
    });
}

function showDesktopContextMenu(x, y) {
    var menu = document.getElementById('context-menu');
    menu.style.display = 'block';
    menu.style.left = x + 'px';
    menu.style.top = y + 'px';
    menu.innerHTML =
        '<div class="ctx-item" onclick="openApp(\'wallpaper\');hideContextMenu()">Change Wallpaper</div>' +
        '<div class="ctx-item" onclick="openApp(\'settings\');hideContextMenu()">System Settings</div>' +
        '<div class="ctx-sep"></div>' +
        '<div class="ctx-item" onclick="openApp(\'files\');hideContextMenu()">Open Data Core</div>' +
        '<div class="ctx-item" onclick="openApp(\'terminal\');hideContextMenu()">Open Command Core</div>' +
        '<div class="ctx-sep"></div>' +
        '<div class="ctx-item" onclick="openApp(\'notes\');hideContextMenu()">New Mission Log</div>' +
        '<div class="ctx-item" onclick="toggleDashboard();hideContextMenu()">Command Center <span class="ctx-shortcut">F12</span></div>' +
        '<div class="ctx-sep"></div>' +
        '<div class="ctx-item" onclick="showShutdown();hideContextMenu()">Deactivate</div>';
    // Adjust if off-screen
    var rect = menu.getBoundingClientRect();
    if (rect.right > window.innerWidth) menu.style.left = (x - rect.width) + 'px';
    if (rect.bottom > window.innerHeight) menu.style.top = (y - rect.height) + 'px';
}

function hideContextMenu() {
    document.getElementById('context-menu').style.display = 'none';
}

document.addEventListener('click', function(e) {
    if (!e.target.closest('#context-menu')) hideContextMenu();
});

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// DASHBOARD (F12)
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•



// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// TELETRAAN SCANNER (Google Search)
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

var searchEngine = 'google';

function toggleNero() {
    neroOpen = !neroOpen;
    document.getElementById('nero-panel').classList.toggle('visible', neroOpen);
    if (neroOpen) {
        setTimeout(function() {
            var input = document.getElementById('scanner-input');
            if (input) input.focus();
        }, 100);
    }
}

function setSearchEngine(engine, btn) {
    searchEngine = engine;
    var btns = document.querySelectorAll('.scanner-engine');
    for (var i = 0; i < btns.length; i++) btns[i].classList.remove('active');
    btn.classList.add('active');
    var input = document.getElementById('scanner-input');
    if (input) {
        switch(engine) {
            case 'google': input.placeholder = 'Search Google...'; break;
            case 'duckduckgo': input.placeholder = 'Search DuckDuckGo...'; break;
            case 'youtube': input.placeholder = 'Search YouTube...'; break;
            case 'wikipedia': input.placeholder = 'Search Wikipedia...'; break;
        }
    }
}

function scannerSearch() {
    var input = document.getElementById('scanner-input');
    var query = input.value.trim();
    if (!query) return;
    var url = '';
    switch(searchEngine) {
        case 'google': url = 'https://www.google.com/search?q=' + encodeURIComponent(query); break;
        case 'duckduckgo': url = 'https://duckduckgo.com/?q=' + encodeURIComponent(query); break;
        case 'youtube': url = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(query); break;
        case 'wikipedia': url = 'https://en.wikipedia.org/wiki/Special:Search?search=' + encodeURIComponent(query); break;
    }
    // Open in new tab since most search engines block iframes
    window.open(url, '_blank');
    showSearchResults(query, url);
    input.value = '';
}

function showSearchResults(query, url) {
    var resultsEl = document.getElementById('scanner-results');
    if (!resultsEl) return;
    var engineName = searchEngine.charAt(0).toUpperCase() + searchEngine.slice(1);
    var engineIcon = 'ðŸ”';
    switch(searchEngine) {
        case 'google': engineIcon = 'ðŸ”'; break;
        case 'duckduckgo': engineIcon = 'ðŸ¦†'; break;
        case 'youtube': engineIcon = 'â–¶ï¸'; break;
        case 'wikipedia': engineIcon = 'ðŸ“–'; break;
    }
    var safeUrl = url.replace(/'/g, "\\'");
    resultsEl.innerHTML =
        '<div class="scanner-result-item" onclick="openInBrowser(\'' + safeUrl + '\')">' +
            '<div class="scanner-result-icon">' + engineIcon + '</div>' +
            '<div class="scanner-result-body">' +
                '<div class="scanner-result-title">' + escapeHtml(query) + '</div>' +
                '<div class="scanner-result-url">' + escapeHtml(url) + '</div>' +
                '<div class="scanner-result-snippet">Search results for "' + escapeHtml(query) + '" on ' + engineName + '. Click to open in Cyber-Link browser.</div>' +
            '</div>' +
        '</div>' +
        '<div style="text-align:center;padding:16px;">' +
            '<button onclick="openInBrowser(\'' + safeUrl + '\')" style="padding:8px 20px;background:var(--accent);color:#fff;border:none;border-radius:var(--radius-full);cursor:pointer;font-family:var(--font-body);font-size:0.82rem;">Open in Cyber-Link</button>' +
        '</div>';
}

function openInBrowser(url) {
    // Open external URLs in new browser tab (most sites block iframes)
    window.open(url, '_blank');
}

function getNeroResponse(msg) {
    var lower = msg.toLowerCase();
    if (lower.indexOf('hello') !== -1 || lower.indexOf('hi') !== -1) return 'Greetings, Autobot. How may I assist you today?';
    if (lower.indexOf('wallpaper') !== -1) return 'You can change wallpapers using the Wallpaper app or through Systems \u2192 Wallpapers. You have 4 Cybertronian backgrounds to choose from!';
    if (lower.indexOf('weather') !== -1) return 'Cybertronian atmospheric readings: 22\u00B0C, clear energon skies. Humidity at 45% with light solar winds.';
    if (lower.indexOf('time') !== -1) return 'Current Cybertronian standard time: ' + new Date().toLocaleTimeString() + '.';
    if (lower.indexOf('help') !== -1) return 'I can assist with:\n\u2022 System configuration\n\u2022 App deployment\n\u2022 Energon diagnostics\n\u2022 Tactical queries\n\nJust ask, Commander!';
    if (lower.indexOf('theme') !== -1 || lower.indexOf('color') !== -1) return 'You can change faction themes in Systems \u2192 Appearance. Available factions: Autobot, Decepticon, Energon, Maximal, Predacon.';
    if (lower.indexOf('keyboard') !== -1 || lower.indexOf('shortcut') !== -1) return 'Cybertronian shortcuts:\n\u2022 Ctrl+Space: Scanner\n\u2022 F12: Command Center\n\u2022 Escape: Close panels\n\u2022 Alt+Space: Command palette';
    if (lower.indexOf('optimus') !== -1) return 'Freedom is the right of all sentient beings. \u2014 Optimus Prime';
    if (lower.indexOf('megatron') !== -1) return 'Decepticons, transform and rise up!';
    if (lower.indexOf('transform') !== -1) return 'Autobots, roll out!';
    return 'I understand you\'re requesting intel on "' + msg.substring(0, 40) + '". Processing... This is a simulated response. In a full deployment, I would connect to Cybertron\'s mainframe for full analysis.';
}

function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// KEYBOARD SHORTCUTS
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl+Space: Global Search
        if (e.ctrlKey && e.code === 'Space') {
            e.preventDefault();
            if (searchOpen) closeSearch();
            else openSearch();
            return;
        }
        // F12: Dashboard
        
        // Escape: Close panels
        if (e.key === 'Escape') {
            if (searchOpen) { closeSearch(); return; }
            if (dashboardOpen) { toggleDashboard(); return; }
            if (neroOpen) { toggleNero(); return; }
            if (startMenuOpen) { closeStartMenu(); return; }
            if (notifOpen) { closeNotifications(); return; }
            if (controlCenterOpen) { closeControlCenter(); return; }
            if (calendarOpen) { closeCalendar(); return; }
            hideContextMenu();
            return;
        }
    });
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// DESKTOP SELECTION BOX
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

function initDesktopSelection() {
    var desktop = document.getElementById('desktop');
    var selBox = document.getElementById('selection-box');
    var selecting = false, sx, sy;

    desktop.addEventListener('mousedown', function(e) {
        if (e.target.closest('.cosmos-window') || e.target.closest('#taskbar') || e.target.closest('#start-menu') || e.target.closest('.desktop-icon')) return;
        if (e.button !== 0) return;
        selecting = true;
        sx = e.clientX; sy = e.clientY;
        selBox.style.display = 'block';
        selBox.style.left = sx + 'px';
        selBox.style.top = sy + 'px';
        selBox.style.width = '0px';
        selBox.style.height = '0px';
    });

    document.addEventListener('mousemove', function(e) {
        if (!selecting) return;
        var x = Math.min(e.clientX, sx);
        var y = Math.min(e.clientY, sy);
        var w = Math.abs(e.clientX - sx);
        var h = Math.abs(e.clientY - sy);
        selBox.style.left = x + 'px';
        selBox.style.top = y + 'px';
        selBox.style.width = w + 'px';
        selBox.style.height = h + 'px';
    });

    document.addEventListener('mouseup', function() {
        selecting = false;
        selBox.style.display = 'none';
    });
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// SHUTDOWN & RESTART
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•



function showBootScreen() {
    closeAllWindows();
    document.getElementById('desktop').classList.add('hidden');
    document.getElementById('boot-screen').classList.remove('hidden', 'fade-out');
    document.querySelector('.boot-progress-bar').style.width = '0%';
    // Update boot screen text
    var bootTitle = document.querySelector('.boot-title');
    if (bootTitle) bootTitle.textContent = 'CYBERTRON';
    var bootStatus = document.querySelector('.boot-status');
    if (bootStatus) bootStatus.textContent = 'INITIALIZING SPARK CORE...';
    boot();
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// OUTSIDE CLICK HANDLERS
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

document.addEventListener('mousedown', function(e) {
    if (startMenuOpen && !e.target.closest('#start-menu') && !e.target.closest('#start-btn')) closeStartMenu();
    if (notifOpen && !e.target.closest('#notifications-panel') && !e.target.closest('.taskbar-btn')) closeNotifications();
    if (controlCenterOpen && !e.target.closest('#control-center') && !e.target.closest('.taskbar-btn')) closeControlCenter();
    if (calendarOpen && !e.target.closest('#calendar-popup') && !e.target.closest('#taskbar-clock')) closeCalendar();
});

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// APP RENDERERS
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

// â”€â”€ NOTES â”€â”€
function renderNotes(body) {
    body.parentElement.style.display = 'flex';
    body.style.display = 'flex';
    body.style.padding = '0';
    body.style.overflow = 'hidden';
    var sidebar = document.createElement('div');
    sidebar.className = 'notes-sidebar';
    var listHtml = '';
    for (var i = 0; i < notes.length; i++) {
        var n = notes[i];
        listHtml += '<div class="notes-list-item' + (n.id === activeNote ? ' active' : '') + '" onclick="selectNote(' + n.id + ', this)">' +
            '<strong>' + n.title + '</strong>' +
            '<small>' + n.text.substring(0, 30) + '...</small>' +
        '</div>';
    }
    listHtml += '<div class="notes-list-item" onclick="addNote()" style="color:var(--accent);text-align:center;">+ New Note</div>';
    sidebar.innerHTML = listHtml;
    var editor = document.createElement('div');
    editor.className = 'notes-editor';
    var note = null;
    for (var i = 0; i < notes.length; i++) {
        if (notes[i].id === activeNote) { note = notes[i]; break; }
    }
    if (!note && notes.length > 0) note = notes[0];
    editor.innerHTML =
        '<div class="notes-toolbar">' +
            '<button onclick="deleteNote()">Delete</button>' +
        '</div>' +
        '<textarea class="notes-textarea" id="note-editor" oninput="saveNote(this.value)">' + (note ? note.text : '') + '</textarea>';
    body.appendChild(sidebar);
    body.appendChild(editor);
}

function selectNote(id, el) {
    activeNote = id;
    var note = null;
    for (var i = 0; i < notes.length; i++) {
        if (notes[i].id === id) { note = notes[i]; break; }
    }
    var items = document.querySelectorAll('.notes-list-item');
    for (var i = 0; i < items.length; i++) items[i].classList.remove('active');
    if (el) el.classList.add('active');
    var textarea = document.getElementById('note-editor');
    if (textarea && note) textarea.value = note.text;
}

function saveNote(text) {
    for (var i = 0; i < notes.length; i++) {
        if (notes[i].id === activeNote) { notes[i].text = text; break; }
    }
}

function addNote() {
    var id = Date.now();
    notes.push({ id: id, title: 'New Note', text: '' });
    activeNote = id;
    refreshNotesWindow();
}

function deleteNote() {
    notes = notes.filter(function(n) { return n.id !== activeNote; });
    if (notes.length === 0) notes.push({ id: Date.now(), title: 'New Note', text: '' });
    activeNote = notes[0].id;
    refreshNotesWindow();
}

function refreshNotesWindow() {
    var win = null;
    for (var i = 0; i < windows.length; i++) {
        if (windows[i].appId === 'notes' && !windows[i].closed) { win = windows[i]; break; }
    }
    if (win) {
        var body = document.getElementById('win-body-' + win.id);
        body.innerHTML = '';
        renderNotes(body);
    }
}

// â”€â”€ CALCULATOR â”€â”€
function renderCalculator(body) {
    body.style.padding = '16px';
    var btns = ['C', '\u00B1', '%', '\u00F7', '7', '8', '9', '\u00D7', '4', '5', '6', '\u2212', '1', '2', '3', '+', '0', '.', 'DEL', '='];
    var html = '<div class="calc-display"><div class="calc-expr" id="calc-expr"></div><div class="calc-result" id="calc-result">0</div></div><div class="calc-grid">';
    for (var i = 0; i < btns.length; i++) {
        var b = btns[i];
        var cls = 'calc-btn';
        if (['\u00F7', '\u00D7', '\u2212', '+'].indexOf(b) !== -1) cls += ' op';
        if (b === '=') cls += ' eq';
        html += '<button class="' + cls + '" onclick="calcInput(\'' + b + '\')">' + b + '</button>';
    }
    html += '</div>';
    body.innerHTML = html;
    calcDisplay = '0'; calcExpr = ''; calcNew = true;
}

function calcInput(b) {
    var display = document.getElementById('calc-result');
    var expr = document.getElementById('calc-expr');
    if (!display) return;
    if (b === 'C') { calcDisplay = '0'; calcExpr = ''; calcNew = true; }
    else if (b === 'DEL') { calcDisplay = calcDisplay.slice(0, -1) || '0'; }
    else if (b === '\u00B1') { calcDisplay = String(-parseFloat(calcDisplay)); }
    else if (b === '%') { calcDisplay = String(parseFloat(calcDisplay) / 100); }
    else if (b === '=') {
        try {
            var safe = (calcExpr + calcDisplay).replace(/\u00D7/g, '*').replace(/\u00F7/g, '/').replace(/\u2212/g, '-');
            calcDisplay = String(eval(safe));
            calcExpr = ''; calcNew = true;
        } catch(e) { calcDisplay = 'Error'; }
    }
    else if (['\u00F7', '\u00D7', '\u2212', '+'].indexOf(b) !== -1) {
        calcExpr += calcDisplay + b; calcNew = true;
    }
    else {
        if (calcNew) { calcDisplay = b === '.' ? '0.' : b; calcNew = false; }
        else { calcDisplay += b; }
    }
    display.textContent = calcDisplay;
    if (expr) expr.textContent = calcExpr;
}

// â”€â”€ FILE EXPLORER â”€â”€
function renderFiles(body) {
    body.style.padding = '0';
    body.style.display = 'flex';
    body.style.flexDirection = 'column';
    body.innerHTML =
        '<div class="files-container">' +
            '<div class="files-toolbar">' +
                '<button onclick="filesGoBack()">' + ICO.arrowLeft + ' Back</button>' +
                '<div class="files-breadcrumb" id="files-breadcrumb"></div>' +
                '<div class="files-view-btns">' +
                    '<button id="files-grid-btn" class="' + (filesView === 'grid' ? 'active' : '') + '" onclick="setFilesView(\'grid\')">' + ICO.grid + '</button>' +
                    '<button id="files-list-btn" class="' + (filesView === 'list' ? 'active' : '') + '" onclick="setFilesView(\'list\')">' + ICO.list + '</button>' +
                '</div>' +
            '</div>' +
            '<div style="display:flex;flex:1;overflow:hidden;">' +
                '<div class="files-sidebar">' +
                    '<div class="files-sidebar-label">Quick Access</div>' +
                    '<div class="files-sidebar-item' + (currentPath === '/cybertron/prime' ? ' active' : '') + '" onclick="filesNavigate(\'/cybertron/prime\')">' + ICO.home + ' Prime Quarters</div>' +
                    '<div class="files-sidebar-item" onclick="filesNavigate(\'/cybertron/prime/Intel Reports\')">' + ICO.folder + ' Intel Reports</div>' +
                    '<div class="files-sidebar-item" onclick="filesNavigate(\'/cybertron/prime/Holo Records\')">' + ICO.gallery + ' Holo Records</div>' +
                    '<div class="files-sidebar-item" onclick="filesNavigate(\'/cybertron/prime/Frequencies\')">' + ICO.music + ' Frequencies</div>' +
                    '<div class="files-sidebar-item" onclick="filesNavigate(\'/cybertron/prime/Transmissions\')">' + ICO.shorts + ' Transmissions</div>' +
                    '<div class="files-sidebar-item" onclick="filesNavigate(\'/cybertron/prime/Downloads\')">' + ICO.download + ' Downloads</div>' +
                '</div>' +
                '<div class="files-content" id="files-content"></div>' +
            '</div>' +
        '</div>';
    renderFilesContent();
    renderBreadcrumb();
}

function renderBreadcrumb() {
    var bc = document.getElementById('files-breadcrumb');
    if (!bc) return;
    var parts = currentPath.split('/');
    var html = '';
    var path = '';
    for (var i = 0; i < parts.length; i++) {
        if (parts[i]) {
            path += '/' + parts[i];
            html += '<span class="sep">/</span><span onclick="filesNavigate(\'' + path + '\')">' + parts[i] + '</span>';
        }
    }
    bc.innerHTML = html || '<span>/</span>';
}

function renderFilesContent() {
    var container = document.getElementById('files-content');
    if (!container) return;
    var items = fileSystem[currentPath] || [];
    if (filesView === 'grid') {
        var html = '<div class="files-grid">';
        for (var i = 0; i < items.length; i++) {
            var f = items[i];
            html += '<div class="file-item" ondblclick="filesOpen(\'' + f.name + '\', \'' + f.type + '\')">' +
                '<div class="file-icon">' + f.icon + '</div>' +
                '<div class="file-name">' + f.name + '</div>' +
            '</div>';
        }
        html += '</div>';
        container.innerHTML = html;
    } else {
        var html = '<div class="files-list"><div class="files-list-header"><span>Name</span><span>Size</span><span>Modified</span><span>Type</span></div>';
        for (var i = 0; i < items.length; i++) {
            var f = items[i];
            html += '<div class="file-list-item" ondblclick="filesOpen(\'' + f.name + '\', \'' + f.type + '\')">' +
                '<div class="file-list-name"><span class="file-icon">' + f.icon + '</span>' + f.name + '</div>' +
                '<span class="file-list-meta">' + (f.size || '--') + '</span>' +
                '<span class="file-list-meta">' + (f.modified || '--') + '</span>' +
                '<span class="file-list-meta">' + f.type + '</span>' +
            '</div>';
        }
        html += '</div>';
        container.innerHTML = html;
    }
}

function filesOpen(name, type) {
    if (type === 'folder') {
        currentPath += '/' + name;
        renderFilesContent();
        renderBreadcrumb();
        updateFilesSidebar();
    }
}

function filesGoBack() {
    var parts = currentPath.split('/');
    if (parts.length > 2) {
        parts.pop();
        currentPath = parts.join('/');
        renderFilesContent();
        renderBreadcrumb();
        updateFilesSidebar();
    }
}

function filesNavigate(path) {
    if (fileSystem[path]) {
        currentPath = path;
        renderFilesContent();
        renderBreadcrumb();
        updateFilesSidebar();
    }
}

function updateFilesSidebar() {
    var items = document.querySelectorAll('.files-sidebar-item');
    for (var i = 0; i < items.length; i++) items[i].classList.remove('active');
}

function setFilesView(view) {
    filesView = view;
    renderFilesContent();
    var gridBtn = document.getElementById('files-grid-btn');
    var listBtn = document.getElementById('files-list-btn');
    if (gridBtn) gridBtn.classList.toggle('active', view === 'grid');
    if (listBtn) listBtn.classList.toggle('active', view === 'list');
}

// â”€â”€ MUSIC PLAYER â”€â”€
function renderMusic(body) {
    body.style.padding = '0';
    body.style.display = 'flex';
    body.style.flexDirection = 'column';
    body.style.background = 'var(--bg-deep)';
    var track = musicTracks[musicTrack];
    var trackListHtml = '';
    for (var i = 0; i < musicTracks.length; i++) {
        var t = musicTracks[i];
        var isActive = i === musicTrack;
        trackListHtml += '<div class="music-track' + (isActive ? ' active' : '') + '" onclick="musicSelect(' + i + ')">' +
            '<span class="track-num">' + (isActive && musicPlaying ? '&#9654;' : String(i + 1).padStart(2, '0')) + '</span>' +
            '<span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + t.title + '<span style="color:var(--text-muted);margin-left:6px;font-size:0.72rem">' + t.artist + '</span></span>' +
        '</div>';
    }
    body.innerHTML =
        '<div class="music-player">' +
            '<div class="music-cover-bg">' +
                '<img class="music-cover-img" id="music-cover-img" src="' + track.cover + '">' +
                '<div class="music-cover-overlay">' +
                    '<img class="music-cover-art" id="music-cover-art" src="' + track.cover + '">' +
                    '<div class="music-title-text" id="music-title">' + track.title + '</div>' +
                    '<div class="music-artist-text" id="music-artist">' + track.artist + '</div>' +
                '</div>' +
            '</div>' +
            '<div style="padding:14px 18px 0;">' +
                '<div class="music-time-row">' +
                    '<span id="music-current">0:00</span>' +
                    '<span id="music-duration">0:00</span>' +
                '</div>' +
                '<div class="music-progress" id="music-seekbar"><div class="music-progress-fill" id="music-progress"></div></div>' +
                '<div class="music-controls">' +
                    '<button onclick="musicPrev()">' + ICO.skipBack + '</button>' +
                    '<button class="play-btn" onclick="musicToggle()" id="music-play-btn">' + (musicPlaying ? ICO.pause : ICO.play) + '</button>' +
                    '<button onclick="musicNext()">' + ICO.skipForward + '</button>' +
                '</div>' +
            '</div>' +
            '<div class="music-list">' + trackListHtml + '</div>' +
        '</div>';
    // Attach seek event properly
    var seekbar = document.getElementById('music-seekbar');
    if (seekbar) {
        seekbar.addEventListener('click', function(e) {
            musicSeek(e);
        });
    }
}

function musicToggle() {
    if (!musicAudio) {
        musicAudio = new Audio(musicTracks[musicTrack].file);
        musicAudio.addEventListener('ended', function() { musicNext(); });
        musicAudio.addEventListener('timeupdate', updateMusicProgress);
        musicAudio.addEventListener('loadedmetadata', function() {
            var durEl = document.getElementById('music-duration');
            if (durEl) durEl.textContent = formatTime(musicAudio.duration);
        });
    }
    if (musicPlaying) {
        musicAudio.pause();
        musicPlaying = false;
    } else {
        musicAudio.play().catch(function() {});
        musicPlaying = true;
    }
    refreshMusicUI();
}

function musicNext() {
    musicTrack = (musicTrack + 1) % musicTracks.length;
    playTrack(musicTrack);
}

function musicPrev() {
    musicTrack = (musicTrack - 1 + musicTracks.length) % musicTracks.length;
    playTrack(musicTrack);
}

function musicSelect(i) {
    musicTrack = i;
    playTrack(i);
}

function playTrack(idx) {
    if (musicAudio) {
        musicAudio.pause();
        musicAudio.removeEventListener('ended', arguments.callee);
        musicAudio.removeEventListener('timeupdate', updateMusicProgress);
    }
    musicAudio = new Audio(musicTracks[idx].file);
    musicAudio.addEventListener('ended', function() { musicNext(); });
    musicAudio.addEventListener('timeupdate', updateMusicProgress);
    musicAudio.addEventListener('loadedmetadata', function() {
        var durEl = document.getElementById('music-duration');
        if (durEl) durEl.textContent = formatTime(musicAudio.duration);
    });
    musicAudio.play().catch(function() {});
    musicPlaying = true;
    refreshMusicUI();
}

function updateMusicProgress() {
    if (!musicAudio) return;
    var pct = (musicAudio.currentTime / musicAudio.duration) * 100;
    var fill = document.getElementById('music-progress');
    var curEl = document.getElementById('music-current');
    if (fill) fill.style.width = pct + '%';
    if (curEl) curEl.textContent = formatTime(musicAudio.currentTime);
}

function musicSeek(e) {
    if (!musicAudio || !musicAudio.duration || isNaN(musicAudio.duration)) return;
    var seekbar = document.getElementById('music-seekbar');
    if (!seekbar) return;
    var rect = seekbar.getBoundingClientRect();
    var pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    musicAudio.currentTime = pct * musicAudio.duration;
    updateMusicProgress();
}

function formatTime(s) {
    if (!s || isNaN(s)) return '0:00';
    var m = Math.floor(s / 60);
    var sec = Math.floor(s % 60);
    return m + ':' + (sec < 10 ? '0' : '') + sec;
}

function refreshMusicUI() {
    var track = musicTracks[musicTrack];
    var coverImg = document.getElementById('music-cover-img');
    var coverArt = document.getElementById('music-cover-art');
    var title = document.getElementById('music-title');
    var artist = document.getElementById('music-artist');
    var btn = document.getElementById('music-play-btn');
    if (coverImg) coverImg.src = track.cover;
    if (coverArt) {
        coverArt.src = track.cover;
    }
    if (title) title.textContent = track.title;
    if (artist) artist.textContent = track.artist;
    if (btn) btn.innerHTML = musicPlaying ? ICO.pause : ICO.play;
    var tracks = document.querySelectorAll('.music-track');
    for (var i = 0; i < tracks.length; i++) {
        tracks[i].classList.toggle('active', i === musicTrack);
    }
}

// â”€â”€ GALLERY â”€â”€
function renderGallery(body) {
    var images = [
        SB_URL + '/gallery/holopictures/WhatsApp Image 2026-07-08 at 16.25.2.jpeg',
        SB_URL + '/gallery/holopictures/WhatsApp Image 2026-07-08 at 16.25.29.jpeg',
        SB_URL + '/gallery/holopictures/WhatsApp Image 2026-07-08 at 16.25.30.jpeg',
        SB_URL + '/gallery/holopictures/WhatsApp Image 2026-07-08 at 16.25.32.jpeg',
        SB_URL + '/gallery/holopictures/WhatsApp Image 2026-07-08 at 16.25.33.jpeg',
        SB_URL + '/gallery/holopictures/WhatsApp Image 2026-07-08 at 16.25.34.jpeg',
        SB_URL + '/gallery/holopictures/WhatsApp Image 2026-07-08 at 16.25.35.jpeg',
        SB_URL + '/gallery/holopictures/WhatsApp Image 2026-07-08 at 16.25.39.jpeg',
        SB_URL + '/gallery/holopictures/WhatsApp Image 2026-07-08 at 16.27.09.jpeg',
        SB_URL + '/gallery/holopictures/WhatsApp Image 2026-07-08 at 16.27.1.jpeg',
        SB_URL + '/gallery/holopictures/WhatsApp Image 2026-07-08 at 16.27.10.jpeg',
        SB_URL + '/gallery/holopictures/WhatsApp Image 2026-07-08 at 16.27.jpeg'
    ];
    body.style.padding = '0';
    body.style.overflow = 'auto';
    body.style.background = 'var(--bg-deep)';
    body.style.position = 'relative';
    var html = '<div id="holo-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px;padding:12px;">';
    for (var i = 0; i < images.length; i++) {
        html += '<div class="gallery-card" onclick="holoOpen(' + i + ')" style="cursor:pointer;"><img src="' + images[i] + '" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block;border-radius:var(--radius-sm);"></div>';
    }
    html += '</div>';
    body.innerHTML = html;

    window.holoImages = images;
    window.holoIdx = 0;
    window.holoBody = body;

    window.holoOpen = function(idx) {
        window.holoIdx = idx;
        var lb = document.createElement('div');
        lb.className = 'holo-lightbox';
        lb.id = 'holo-lightbox';
        lb.innerHTML =
            '<div class="holo-lightbox-close" onclick="holoClose()">&times;</div>' +
            '<div class="holo-lightbox-nav holo-lightbox-prev" onclick="holoNav(-1)">&#8249;</div>' +
            '<img id="holo-lb-img" src="' + images[idx] + '">' +
            '<div class="holo-lightbox-nav holo-lightbox-next" onclick="holoNav(1)">&#8250;</div>' +
            '<div class="holo-lightbox-count" id="holo-lb-count">' + (idx + 1) + ' / ' + images.length + '</div>';
        body.appendChild(lb);
    };

    window.holoClose = function() {
        var lb = document.getElementById('holo-lightbox');
        if (lb) lb.remove();
    };

    window.holoNav = function(dir) {
        window.holoIdx = (window.holoIdx + dir + images.length) % images.length;
        var img = document.getElementById('holo-lb-img');
        var count = document.getElementById('holo-lb-count');
        if (img) img.src = images[window.holoIdx];
        if (count) count.textContent = (window.holoIdx + 1) + ' / ' + images.length;
    };
}

// â”€â”€ SETTINGS â”€â”€
function renderSettings(body) {
    body.style.padding = '0';
    body.style.display = 'flex';
    body.innerHTML =
        '<div class="settings-container">' +
            '<div class="settings-nav">' +
                '<div class="settings-nav-item active" onclick="settingsShow(\'appearance\', this)">' + ICO.wallpaper + ' Faction Theme</div>' +
                '<div class="settings-nav-item" onclick="settingsShow(\'wallpapers\', this)">' + ICO.gallery + ' Wallpapers</div>' +
                '<div class="settings-nav-item" onclick="settingsShow(\'about\', this)">' + ICO.about + ' About</div>' +
            '</div>' +
            '<div class="settings-content" id="settings-content">' + settingsAppearance() + '</div>' +
        '</div>';
}

function settingsAppearance() {
    var themes = [
        { id: 'autobot', name: 'Autobot', color: 'linear-gradient(135deg,#e63946,#b82d38)' },
        { id: 'decepticon', name: 'Deception', color: 'linear-gradient(135deg,#9b59b6,#7d3f94)' },
        { id: 'energon', name: 'Energon', color: 'linear-gradient(135deg,#00d4ff,#00a8cc)' },
        { id: 'maximal', name: 'Maximal', color: 'linear-gradient(135deg,#f59e0b,#d97706)' },
        { id: 'predacon', name: 'Predacon', color: 'linear-gradient(135deg,#22c55e,#16a34a)' }
    ];
    var themeHtml = '';
    for (var i = 0; i < themes.length; i++) {
        var t = themes[i];
        themeHtml += '<div class="theme-swatch' + (currentTheme === t.id ? ' active' : '') + '" style="background:' + t.color + '" onclick="setTheme(\'' + t.id + '\')"><span>' + t.name + '</span></div>';
    }
    return '<div class="settings-section"><h3>Faction Theme</h3><div class="theme-grid">' + themeHtml + '</div></div>' +
        '<div class="settings-section"><h3>Sound Effects</h3>' +
            '<div class="settings-row"><label>System Sounds</label>' +
                '<button class="settings-toggle-btn" id="sound-toggle" onclick="toggleSoundEffects()">' + (soundEffectsEnabled ? 'ON' : 'OFF') + '</button></div>' +
        '</div>' +
        '<div class="settings-section"><h3>Notifications</h3>' +
            '<div class="settings-row"><label>Desktop Notifications</label>' +
                '<button class="settings-toggle-btn" id="notif-toggle" onclick="toggleNotifSetting()">' + (notifEnabled ? 'ON' : 'OFF') + '</button></div>' +
        '</div>' +
        '<div class="settings-section"><h3>Performance</h3>' +
            '<div class="settings-row"><label>High Performance Mode</label>' +
                '<button class="settings-toggle-btn" id="perf-toggle" onclick="togglePerfMode()">' + (perfMode === 'high' ? 'ON' : 'OFF') + '</button></div>' +
        '</div>';
}

function settingsShow(section, el) {
    var items = document.querySelectorAll('.settings-nav-item');
    for (var i = 0; i < items.length; i++) items[i].classList.remove('active');
    if (el) el.classList.add('active');
    var content = document.getElementById('settings-content');
    if (section === 'appearance') content.innerHTML = settingsAppearance();
    else if (section === 'wallpapers') content.innerHTML = settingsWallpapers();
    else if (section === 'about') content.innerHTML =
        '<div style="text-align:left;">' +
            '<h2 style="font-weight:700;color:var(--accent-light);margin-bottom:16px;font-family:Orbitron,monospace;">About CYBERTRON OS</h2>' +
            '<p style="color:var(--text-dim);line-height:1.8;">' +
                '<strong>Version:</strong> 1.0.0<br>' +
                '<strong>Build:</strong> 2026.06.23<br>' +
                '<strong>Kernel:</strong> Cybertron Core x64<br>' +
                '<strong>Desktop:</strong> Cybertron Desktop 1.0<br>' +
                '<strong>Faction:</strong> Autobot<br>' +
                '<strong>Architecture:</strong> Cybertronian Web OS' +
            '</p>' +
        '</div>';
}

function settingsWallpapers() {
    var active = currentWallpaper || 'none';
    var html = '<div class="settings-section"><h3>' + ICO.gallery + ' Cybertron Wallpapers</h3>' +
        '<p class="wallpaper-label">Choose a Cybertronian background for your desktop.</p>' +
        '<div class="wallpaper-grid">' +
        '<div class="wp-none-card' + (active === 'none' ? ' active' : '') + '" onclick="loadWallpaper(\'none\');refreshSettingsWallpaper()">Cybertron Default</div>';
    for (var i = 0; i < wallpapers.length; i++) {
        var wp = wallpapers[i];
        html += '<div class="wallpaper-card' + (active === wp.id ? ' active' : '') + '" onclick="loadWallpaper(\'' + wp.id + '\');refreshSettingsWallpaper()">' +
            '<video class="wallpaper-thumb" src="' + wp.file + '" muted preload="metadata" onmouseenter="this.play()" onmouseleave="this.pause();this.currentTime=0"></video>' +
            '<div class="wallpaper-name">' + wp.name + '</div>' +
        '</div>';
    }
    html += '</div></div>';
    return html;
}

function refreshSettingsWallpaper() {
    var win = null;
    for (var i = 0; i < windows.length; i++) {
        if (windows[i].appId === 'settings' && !windows[i].closed) { win = windows[i]; break; }
    }
    if (win) {
        var body = document.getElementById('win-body-' + win.id);
        body.innerHTML = '';
        renderSettings(body);
        var navItems = body.querySelectorAll('.settings-nav-item');
        for (var i = 0; i < navItems.length; i++) navItems[i].classList.remove('active');
        if (navItems[2]) navItems[2].classList.add('active');
        document.getElementById('settings-content').innerHTML = settingsWallpapers();
    }
}

function setTheme(theme) {
    CyberSound.theme();
    currentTheme = theme;
    document.body.className = theme === 'default' ? '' : 'theme-' + theme;
    document.documentElement.style.removeProperty('--accent');
    document.documentElement.style.removeProperty('--accent-light');
    document.documentElement.style.removeProperty('--accent-dark');
    document.documentElement.style.removeProperty('--accent-glow');
    if (perfMode === 'high') document.body.classList.add('perf-high');
    var win = null;
    for (var i = 0; i < windows.length; i++) {
        if (windows[i].appId === 'settings' && !windows[i].closed) { win = windows[i]; break; }
    }
    if (win) {
        var body = document.getElementById('win-body-' + win.id);
        body.innerHTML = '';
        renderSettings(body);
    }
    showToast('Faction', 'Aligned with ' + theme, ICO.wallpaper);
}

function toggleSoundEffects() {
    soundEffectsEnabled = !soundEffectsEnabled;
    var btn = document.getElementById('sound-toggle');
    if (btn) btn.textContent = soundEffectsEnabled ? 'ON' : 'OFF';
    showToast('Sound', soundEffectsEnabled ? 'System sounds enabled' : 'System sounds muted', ICO.volume);
}

function toggleNotifSetting() {
    notifEnabled = !notifEnabled;
    var btn = document.getElementById('notif-toggle');
    if (btn) btn.textContent = notifEnabled ? 'ON' : 'OFF';
    showToast('Notifications', notifEnabled ? 'Notifications enabled' : 'Notifications disabled', ICO.checkCircle);
}

function togglePerfMode() {
    perfMode = perfMode === 'high' ? 'balanced' : 'high';
    var btn = document.getElementById('perf-toggle');
    if (btn) btn.textContent = perfMode === 'high' ? 'ON' : 'OFF';
    if (perfMode === 'high') {
        document.body.classList.add('perf-high');
    } else {
        document.body.classList.remove('perf-high');
    }
    showToast('Performance', perfMode === 'high' ? 'High performance mode' : 'Balanced mode', ICO.checkCircle);
}

function toggleWidgets() {
    var container = document.getElementById('widgets-container');
    container.style.display = container.style.display === 'none' ? '' : 'none';
}

// ═══════════════════════════════════════
// CYBERTRON CALENDAR WIDGET
// ═══════════════════════════════════════

var calWidgetMonth = new Date().getMonth();
var calWidgetYear = new Date().getFullYear();
var calWidgetDrag = { active: false, offsetX: 0, offsetY: 0 };

function initCalendarWidget() {
    var existing = document.getElementById('cybertron-calendar-widget');
    if (existing) return;

    var widget = document.createElement('div');
    widget.id = 'cybertron-calendar-widget';
    widget.innerHTML =
        '<div class="cal-widget-header" id="cal-widget-drag-handle">' +
            '<div class="cal-widget-title">' +
                '<span class="cal-widget-title-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></span>' +
                '<span>STAR CALENDAR</span>' +
            '</div>' +
            '<div class="cal-widget-controls">' +
                '<button class="cal-widget-btn" onclick="closeCalendarWidget()" title="Close">✕</button>' +
            '</div>' +
        '</div>' +
        '<div class="cal-widget-month-row">' +
            '<button class="cal-widget-nav-btn" onclick="calWidgetPrev()">‹</button>' +
            '<span class="cal-widget-month-title" id="cal-widget-month-title"></span>' +
            '<button class="cal-widget-nav-btn" onclick="calWidgetNext()">›</button>' +
        '</div>' +
        '<div class="cal-widget-grid" id="cal-widget-grid"></div>' +
        '<div class="cal-widget-footer">' +
            '<span class="cal-widget-today-info" id="cal-widget-today-info"></span>' +
            '<button class="cal-widget-today-btn" onclick="calWidgetGoToday()">TODAY</button>' +
        '</div>';

    document.body.appendChild(widget);
    renderCalendarWidget();
    initCalendarWidgetDrag();
}

function renderCalendarWidget() {
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var dayNames = ['Su','Mo','Tu','We','Th','Fr','Sa'];
    var today = new Date();
    var year = calWidgetYear;
    var month = calWidgetMonth;

    // Update month title
    var titleEl = document.getElementById('cal-widget-month-title');
    if (titleEl) titleEl.textContent = months[month] + ' ' + year;

    // Build grid
    var grid = document.getElementById('cal-widget-grid');
    if (!grid) return;

    var html = '';
    // Day headers
    for (var d = 0; d < 7; d++) {
        html += '<div class="cal-widget-day-header">' + dayNames[d] + '</div>';
    }

    // Previous month days
    var firstDay = new Date(year, month, 1).getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var daysInPrev = new Date(year, month, 0).getDate();

    for (var i = firstDay - 1; i >= 0; i--) {
        html += '<div class="cal-widget-day other-month">' + (daysInPrev - i) + '</div>';
    }

    // Current month days
    for (var day = 1; day <= daysInMonth; day++) {
        var isToday = (day === today.getDate() && month === today.getMonth() && year === today.getFullYear());
        html += '<div class="cal-widget-day' + (isToday ? ' today' : '') + '" onclick="calWidgetSelectDay(' + day + ')">' + day + '</div>';
    }

    // Next month days
    var totalCells = firstDay + daysInMonth;
    var remaining = (7 - (totalCells % 7)) % 7;
    for (var n = 1; n <= remaining; n++) {
        html += '<div class="cal-widget-day other-month">' + n + '</div>';
    }

    grid.innerHTML = html;

    // Update today info
    var infoEl = document.getElementById('cal-widget-today-info');
    if (infoEl) {
        var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        infoEl.innerHTML = '<strong>' + days[today.getDay()] + '</strong> · ' + months[today.getMonth()] + ' ' + today.getDate() + ', ' + today.getFullYear();
    }
}

function calWidgetPrev() {
    calWidgetMonth--;
    if (calWidgetMonth < 0) {
        calWidgetMonth = 11;
        calWidgetYear--;
    }
    renderCalendarWidget();
}

function calWidgetNext() {
    calWidgetMonth++;
    if (calWidgetMonth > 11) {
        calWidgetMonth = 0;
        calWidgetYear++;
    }
    renderCalendarWidget();
}

function calWidgetGoToday() {
    var today = new Date();
    calWidgetMonth = today.getMonth();
    calWidgetYear = today.getFullYear();
    renderCalendarWidget();
}

function calWidgetSelectDay(day) {
    // Could add event creation here in the future
    showToast('Star Calendar', 'Selected: ' + (calWidgetMonth + 1) + '/' + day + '/' + calWidgetYear, ICO.checkCircle);
}

function closeCalendarWidget() {
    var widget = document.getElementById('cybertron-calendar-widget');
    if (widget) widget.remove();
}

function initCalendarWidgetDrag() {
    var widget = document.getElementById('cybertron-calendar-widget');
    var handle = document.getElementById('cal-widget-drag-handle');
    if (!widget || !handle) return;

    handle.addEventListener('mousedown', function(e) {
        if (e.target.tagName === 'BUTTON') return;
        calWidgetDrag.active = true;
        var rect = widget.getBoundingClientRect();
        calWidgetDrag.offsetX = e.clientX - rect.left;
        calWidgetDrag.offsetY = e.clientY - rect.top;
        widget.style.cursor = 'grabbing';
        widget.style.transition = 'none';
        e.preventDefault();
    });

    document.addEventListener('mousemove', function(e) {
        if (!calWidgetDrag.active) return;
        var x = e.clientX - calWidgetDrag.offsetX;
        var y = e.clientY - calWidgetDrag.offsetY;
        // Keep within viewport
        x = Math.max(0, Math.min(x, window.innerWidth - widget.offsetWidth));
        y = Math.max(0, Math.min(y, window.innerHeight - widget.offsetHeight));
        widget.style.left = x + 'px';
        widget.style.top = y + 'px';
        widget.style.right = 'auto';
        widget.style.bottom = 'auto';
    });

    document.addEventListener('mouseup', function() {
        if (calWidgetDrag.active) {
            calWidgetDrag.active = false;
            widget.style.cursor = 'default';
            widget.style.transition = '';
        }
    });
}

// ═══════════════════════════════════════
// PIXEL CAT — Cursor Companion (follows cursor)
// ═══════════════════════════════════════

var pixelCat = null;
var catX = 0, catY = 0;
var catPawTimer = null;
var catPetCooldown = false;
var catHovered = false;
var mouseX = 0, mouseY = 0;
var catLag = 0.04;
var catPinned = false;
var catClickTimer = null;

function initPixelCat() {
    // Remove existing cat if any
    var existing = document.getElementById('pixel-cat');
    if (existing) existing.remove();

    pixelCat = document.createElement('div');
    pixelCat.id = 'pixel-cat';
    pixelCat.innerHTML = '<img src="catt.png" alt="pixel cat" draggable="false">';
    pixelCat.title = 'Click to pin/unpin, double-click to pet!';
    document.body.appendChild(pixelCat);

    // Start at center of screen
    catX = window.innerWidth / 2;
    catY = window.innerHeight / 2;
    mouseX = catX;
    mouseY = catY;
    pixelCat.style.left = catX + 'px';
    pixelCat.style.top = catY + 'px';

    // Track cursor position
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Hover detection
    pixelCat.addEventListener('mouseenter', function() { catHovered = true; });
    pixelCat.addEventListener('mouseleave', function() { catHovered = false; });

    // Single click to pin/unpin, double-click to pet
    pixelCat.addEventListener('click', function(e) {
        e.stopPropagation();
        if (catClickTimer) {
            // Double-click detected — pet the cat
            clearTimeout(catClickTimer);
            catClickTimer = null;
            onCatPet(e);
        } else {
            // Wait to see if double-click follows
            catClickTimer = setTimeout(function() {
                catClickTimer = null;
                // Single click — toggle pin
                catPinned = !catPinned;
                CyberSound.catPin();
                pixelCat.classList.toggle('pinned', catPinned);
                if (catPinned) {
                    pixelCat.title = 'Pinned! Click to unpin';
                    showToast('CyberCat', 'Cat pinned in place', '[pin]');
                } else {
                    pixelCat.title = 'Click to pin/unpin, double-click to pet!';
                    showToast('CyberCat', 'Cat unpinned, following cursor', '[paw]');
                }
            }, 250);
        }
    });
 
    // Start animation loop
    requestAnimationFrame(animateCat);
}

function animateCat() {
    if (!pixelCat) return;

    if (!catPetCooldown && !catPinned) {
        // Smooth follow behind cursor with lag
        var targetX = mouseX + 18;
        var targetY = mouseY + 18;

        var dx = targetX - catX;
        var dy = targetY - catY;

        catX += dx * catLag;
        catY += dy * catLag;
    }

    // Keep within viewport
    catX = Math.max(0, Math.min(catX, window.innerWidth - 60));
    catY = Math.max(0, Math.min(catY, window.innerHeight - 60));

    pixelCat.style.left = catX + 'px';
    pixelCat.style.top = catY + 'px';

    // Flip cat based on movement direction
    var dx = mouseX - catX;
    if (dx < -2) {
        pixelCat.style.transform = 'scaleX(-1)';
    } else if (dx > 2) {
        pixelCat.style.transform = 'scaleX(1)';
    }

    requestAnimationFrame(animateCat);
}

function onCatPet(e) {
    e.stopPropagation();
    if (catPetCooldown) return;
    catPetCooldown = true;
    CyberSound.catMeow();
    setTimeout(function() { CyberSound.catPurr(); }, 200);

    // Add petting animation
    pixelCat.classList.add('petting');

    // Create heart burst
    pixelCat.classList.add('heart-burst');

    // Create multiple floating hearts
    for (var i = 0; i < 5; i++) {
        (function(idx) {
            setTimeout(function() {
                createFloatingHeart(e.clientX + Math.random() * 30 - 15, e.clientY - 10);
            }, idx * 100);
        })(i);
    }

    // Create floating paw prints
    createPawPrint(e.clientX, e.clientY);

    // Remove animations after
    setTimeout(function() {
        if (pixelCat) {
            pixelCat.classList.remove('petting');
            pixelCat.classList.remove('heart-burst');
        }
        catPetCooldown = false;
    }, 900);

    // Show toast
    showToast('Cyber-Cat', 'Purrrr... ❤️', '🐱');
}

function createFloatingHeart(x, y) {
    var heart = document.createElement('div');
    heart.className = 'cat-floating-heart';
    heart.textContent = ['<svg width=... heart ...</svg>', '*', '*', '*', '*'][Math.floor(Math.random() * 5)];
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = (12 + Math.random() * 10) + 'px';
    document.body.appendChild(heart);
    setTimeout(function() { heart.remove(); }, 1200);
}

function createPawPrint(x, y) {
    var paw = document.createElement('div');
    paw.className = 'cat-paw-print';
    paw.textContent = '[paw]';
    paw.style.left = (x + Math.random() * 20 - 10) + 'px';
    paw.style.top = (y + Math.random() * 20 - 10) + 'px';
    document.body.appendChild(paw);
    setTimeout(function() { paw.remove(); }, 1500);
}

function removePixelCat() {
    if (pixelCat) {
        pixelCat.remove();
        pixelCat = null;
    }
}

// Auto-init cat on desktop load
function initDesktop() {
    // Apply saved theme
    if (currentTheme && currentTheme !== 'default') {
        document.body.className = 'theme-' + currentTheme;
    }
    notifications = [
        { icon: ICO.checkCircle, title: 'Systems Online', text: 'All Cybertronian systems operational', time: 'Just now' },
        { icon: ICO.refreshBadge, title: 'Energon Signal', text: 'Autobot communications active', time: '5m ago' },
        { icon: ICO.checkCircle, title: 'Perimeter Scan', text: 'No Decepticon activity detected', time: '1h ago' }
    ];
    document.getElementById('desktop').classList.remove('hidden');
    renderDesktopIcons();
    initWallpaperEngine();
    initClock();
    initTopSearch();
    initSystemStatus();
    initContextMenu();
    initKeyboardShortcuts();
    initDesktopSelection();
    renderStartMenuApps();
    renderCalendar();
    renderCCWallpapers();
    initCalendarWidget();
    initPixelCat();
    addDesktopBranding();
    updateDashboardWeather();
    showToast('System', 'CYBERTRON OS online. Roll out!', ICO.checkCircle);
}

// -- WEATHER APP --
function renderWeather(body) {
    body.style.padding = '0';
    body.style.background = 'var(--bg-deep)';
    var days = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
    var now = new Date();
    var forecasts = '';
    for (var i = 0; i < 7; i++) {
        var d = new Date(now);
        d.setDate(d.getDate() + i);
        var temp = Math.floor(Math.random() * 15) + 18;
        var icons = ['\u2600\uFE0F','\u26C5','\u2601\uFE0F','\u1F327\uFE0F','\u26C5','\u2600\uFE0F','\u2601\uFE0F'];
        forecasts += '<div class="weather-day' + (i === 0 ? ' today' : '') + '">' +
            '<div class="weather-day-name">' + (i === 0 ? 'TODAY' : days[d.getDay()]) + '</div>' +
            '<div class="weather-day-icon">' + icons[i] + '</div>' +
            '<div class="weather-day-temp">' + temp + '\u00B0</div></div>';
    }
    var temp = Math.floor(Math.random() * 10) + 22;
    body.innerHTML =
        '<div class="weather-app">' +
            '<div class="weather-now">' +
                '<div class="weather-now-icon">\u26C5</div>' +
                '<div class="weather-now-temp">' + temp + '\u00B0C</div>' +
                '<div class="weather-now-desc">Partly Cloudy</div>' +
                '<div class="weather-now-loc">\u{1F4CD} Iacon, Cybertron</div>' +
            '</div>' +
            '<div class="weather-details">' +
                '<div class="weather-detail"><div class="weather-detail-val">65%</div><div class="weather-detail-label">Humidity</div></div>' +
                '<div class="weather-detail"><div class="weather-detail-val">12 km/h</div><div class="weather-detail-label">Wind</div></div>' +
                '<div class="weather-detail"><div class="weather-detail-val">5</div><div class="weather-detail-label">UV Index</div></div>' +
                '<div class="weather-detail"><div class="weather-detail-val">1013 hPa</div><div class="weather-detail-label">Pressure</div></div>' +
            '</div>' +
            '<div class="weather-forecast">' + forecasts + '</div>' +
        '</div>';
}

// -- CLOCK APP --
function renderClock(body) {
    body.style.padding = '0';
    body.style.background = 'var(--bg-deep)';
    body.style.display = 'flex';
    body.style.flexDirection = 'column';
    body.style.alignItems = 'center';
    body.style.justifyContent = 'center';
    body.innerHTML =
        '<div class="clock-app">' +
            '<canvas id="clock-canvas" width="200" height="200"></canvas>' +
            '<div class="clock-digital" id="clock-digital"></div>' +
            '<div class="clock-date" id="clock-date"></div>' +
        '</div>';
    function updateClock() {
        var now = new Date();
        var h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();
        var digital = document.getElementById('clock-digital');
        var dateEl = document.getElementById('clock-date');
        if (digital) digital.textContent = String(h).padStart(2,'0') + ':' + String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
        var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        var dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        if (dateEl) dateEl.textContent = dayNames[now.getDay()] + ', ' + months[now.getMonth()] + ' ' + now.getDate() + ', ' + now.getFullYear();
        var canvas = document.getElementById('clock-canvas');
        if (!canvas) return;
        var ctx = canvas.getContext('2d');
        var cx = 100, cy = 100, r = 85;
        ctx.clearRect(0, 0, 200, 200);
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.lineWidth = 2; ctx.stroke();
        for (var i = 0; i < 12; i++) {
            var angle = (i * 30 - 90) * Math.PI / 180;
            var inner = i % 3 === 0 ? r - 14 : r - 8;
            ctx.beginPath();
            ctx.moveTo(cx + Math.cos(angle) * inner, cy + Math.sin(angle) * inner);
            ctx.lineTo(cx + Math.cos(angle) * (r - 2), cy + Math.sin(angle) * (r - 2));
            ctx.strokeStyle = i % 3 === 0 ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)';
            ctx.lineWidth = i % 3 === 0 ? 2 : 1; ctx.stroke();
        }
        var hAngle = ((h % 12 + m / 60) * 30 - 90) * Math.PI / 180;
        ctx.beginPath(); ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(hAngle) * 45, cy + Math.sin(hAngle) * 45);
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.stroke();
        var mAngle = ((m + s / 60) * 6 - 90) * Math.PI / 180;
        ctx.beginPath(); ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(mAngle) * 65, cy + Math.sin(mAngle) * 65);
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
        var sAngle = (s * 6 - 90) * Math.PI / 180;
        ctx.beginPath(); ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(sAngle) * 72, cy + Math.sin(sAngle) * 72);
        ctx.strokeStyle = 'var(--accent)'; ctx.lineWidth = 1; ctx.stroke();
        ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#fff'; ctx.fill();
    }
    updateClock();
    setInterval(updateClock, 1000);
}

// -- SYSTEM MONITOR APP --
function renderSysMonitor(body) {
    body.style.padding = '20px';
    body.style.background = 'var(--bg-deep)';
    var cpu = Math.floor(Math.random() * 40) + 20;
    var ram = Math.floor(Math.random() * 30) + 45;
    var disk = Math.floor(Math.random() * 10) + 44;
    var temp = Math.floor(Math.random() * 15) + 45;
    body.innerHTML =
        '<div class="sysmon-app">' +
            '<div class="sysmon-header">SYSTEM MONITOR</div>' +
            '<div class="sysmon-bars">' +
                '<div class="sysmon-bar-group">' +
                    '<div class="sysmon-bar-label"><span>CPU</span><span id="sysmon-cpu-val">' + cpu + '%</span></div>' +
                    '<div class="sysmon-bar"><div class="sysmon-bar-fill cpu" id="sysmon-cpu-bar" style="width:' + cpu + '%"></div></div>' +
                '</div>' +
                '<div class="sysmon-bar-group">' +
                    '<div class="sysmon-bar-label"><span>RAM</span><span id="sysmon-ram-val">' + ram + '%</span></div>' +
                    '<div class="sysmon-bar"><div class="sysmon-bar-fill ram" id="sysmon-ram-bar" style="width:' + ram + '%"></div></div>' +
                '</div>' +
                '<div class="sysmon-bar-group">' +
                    '<div class="sysmon-bar-label"><span>DISK</span><span id="sysmon-disk-val">' + disk + '%</span></div>' +
                    '<div class="sysmon-bar"><div class="sysmon-bar-fill disk" id="sysmon-disk-bar" style="width:' + disk + '%"></div></div>' +
                '</div>' +
            '</div>' +
            '<div class="sysmon-cards">' +
                '<div class="sysmon-card"><div class="sysmon-card-val" id="sysmon-temp">' + temp + '\u00B0C</div><div class="sysmon-card-label">Temperature</div></div>' +
                '<div class="sysmon-card"><div class="sysmon-card-val" id="sysmon-procs">' + (Math.floor(Math.random() * 40) + 120) + '</div><div class="sysmon-card-label">Processes</div></div>' +
                '<div class="sysmon-card"><div class="sysmon-card-val" id="sysmon-uptime">0h 0m</div><div class="sysmon-card-label">Uptime</div></div>' +
                '<div class="sysmon-card"><div class="sysmon-card-val" id="sysmon-net">\u2191 2.4 \u2193 5.1</div><div class="sysmon-card-label">MB/s</div></div>' +
            '</div>' +
        '</div>';
    var startTime = Date.now();
    function updateMonitor() {
        var c = Math.floor(Math.random() * 40) + 20;
        var r = Math.floor(Math.random() * 30) + 45;
        var d = Math.floor(Math.random() * 10) + 44;
        var t = Math.floor(Math.random() * 15) + 45;
        var upSec = Math.floor((Date.now() - startTime) / 1000);
        var upH = Math.floor(upSec / 3600);
        var upM = Math.floor((upSec % 3600) / 60);
        var cpuBar = document.getElementById('sysmon-cpu-bar');
        var ramBar = document.getElementById('sysmon-ram-bar');
        var diskBar = document.getElementById('sysmon-disk-bar');
        if (cpuBar) { cpuBar.style.width = c + '%'; document.getElementById('sysmon-cpu-val').textContent = c + '%'; }
        if (ramBar) { ramBar.style.width = r + '%'; document.getElementById('sysmon-ram-val').textContent = r + '%'; }
        if (diskBar) { diskBar.style.width = d + '%'; document.getElementById('sysmon-disk-val').textContent = d + '%'; }
        var tempEl = document.getElementById('sysmon-temp');
        var procEl = document.getElementById('sysmon-procs');
        var upEl = document.getElementById('sysmon-uptime');
        var netEl = document.getElementById('sysmon-net');
        if (tempEl) tempEl.textContent = t + '\u00B0C';
        if (procEl) procEl.textContent = Math.floor(Math.random() * 40) + 120;
        if (upEl) upEl.textContent = upH + 'h ' + upM + 'm';
        if (netEl) netEl.textContent = '\u2191 ' + (Math.random() * 8).toFixed(1) + ' \u2193 ' + (Math.random() * 15).toFixed(1);
    }
    setInterval(updateMonitor, 2000);
}

// ── BROWSER ──
var browserHistory = [];
var browserHistoryIdx = -1;

function renderBrowser(body) {
    body.style.padding = '0';
    body.style.display = 'flex';
    body.style.flexDirection = 'column';
    body.innerHTML =
        '<div class="browser-toolbar">' +
            '<button onclick="browserBack()">←</button>' +
            '<button onclick="browserForward()">→</button>' +
            '<button onclick="browserRefresh()">⟳</button>' +
            '<input class="browser-url" id="browser-url" value="cybertron://home" placeholder="Enter URL..." onkeydown="if(event.key===\'Enter\')browserGo()">' +
            '<button onclick="browserGo()" style="padding:5px 12px;background:var(--accent);color:#fff;border:none;border-radius:var(--radius-xs);cursor:pointer;font-size:0.72rem;">Go</button>' +
        '</div>' +
        '<div class="browser-frame" id="browser-frame">' +
            '<div class="browser-home">' +
                '<h2>CYBER-LINK</h2>' +
                '<p>Your window to the Cybertron network</p>' +
                '<div class="browser-bookmarks">' +
                    '<div class="browser-bookmark" onclick="browserNavigate(\'https://www.google.com\')">Google</div>' +
                    '<div class="browser-bookmark" onclick="browserNavigate(\'https://www.youtube.com\')">YouTube</div>' +
                    '<div class="browser-bookmark" onclick="browserNavigate(\'https://tfwiki.net\')">TFWiki</div>' +
                    '<div class="browser-bookmark" onclick="browserNavigate(\'https://www.reddit.com/r/transformers/\')">r/Transformers</div>' +
                    '<div class="browser-bookmark" onclick="browserNavigate(\'https://hasbropulse.com\')">Hasbro Pulse</div>' +
                    '<div class="browser-bookmark" onclick="browserNavigate(\'https://www.seibertron.com\')">Seibertron</div>' +
                '</div>' +
                '<p style="margin-top:20px;font-size:0.72rem;color:var(--text-muted);">Links open in new browser tabs</p>' +
            '</div>' +
        '</div>';
}

function browserGo() {
    var urlInput = document.getElementById('browser-url');
    if (!urlInput) return;
    var url = urlInput.value.trim();
    if (!url) return;
    if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('cybertron://')) {
        url = 'https://' + url;
    }
    browserNavigate(url);
}

function browserNavigate(url) {
    var urlInput = document.getElementById('browser-url');
    if (urlInput) urlInput.value = url;
    if (browserHistoryIdx < browserHistory.length - 1) {
        browserHistory = browserHistory.slice(0, browserHistoryIdx + 1);
    }
    browserHistory.push(url);
    browserHistoryIdx = browserHistory.length - 1;
    // Open external URLs in new tab (most sites block iframes)
    if (!url.startsWith('cybertron://')) {
        window.open(url, '_blank');
        showToast('Cyber-Link', 'Opening in new tab...', ICO.browser);
    }
}

function browserBack() {
    if (browserHistoryIdx > 0) {
        browserHistoryIdx--;
        var url = browserHistory[browserHistoryIdx];
        var urlInput = document.getElementById('browser-url');
        if (urlInput) urlInput.value = url;
        if (!url.startsWith('cybertron://')) {
            window.open(url, '_blank');
        }
    }
}

function browserForward() {
    if (browserHistoryIdx < browserHistory.length - 1) {
        browserHistoryIdx++;
        var url = browserHistory[browserHistoryIdx];
        var urlInput = document.getElementById('browser-url');
        if (urlInput) urlInput.value = url;
        if (!url.startsWith('cybertron://')) {
            window.open(url, '_blank');
        }
    }
}

function browserRefresh() {
    // No-op for external URLs (opened in new tabs)
    showToast('Cyber-Link', 'Use the external tab to refresh', ICO.browser);
}

function browserNav(url) {
    var urlInput = document.getElementById('browser-url');
    if (urlInput) urlInput.value = url;
    browserNavigate(url);
}
// â”€â”€ ABOUT â”€â”€
function renderAbout(body) {
    body.innerHTML =
        '<div class="about-page">' +
            '<div class="about-logo">\u26a1</div>' +
            '<h1 class="about-title">CYBERTRON</h1>' +
            '<p class="about-version">Version 1.0.0 \u2014 Build 2026.06.23</p>' +
            '<p class="about-desc">A Cybertronian desktop operating system. Metallic, powerful, eternal. Designed for the war between Autobots and Decepticons.</p>' +
            '<div class="about-specs">' +
                '<div class="about-spec"><span>System</span><span>CYBERTRON OS 1.0</span></div>' +
                '<div class="about-spec"><span>Kernel</span><span>Cybertron Core x64</span></div>' +
                '<div class="about-spec"><span>Desktop</span><span>Cybertron Desktop 1.0</span></div>' +
                '<div class="about-spec"><span>Faction</span><span>Autobot</span></div>' +
                '<div class="about-spec"><span>Resolution</span><span>' + window.innerWidth + '\u00D7' + window.innerHeight + '</span></div>' +
                '<div class="about-spec"><span>Uptime</span><span id="about-uptime">00:00:00</span></div>' +
            '</div>' +
        '</div>';
    var start = Date.now();
    setInterval(function() {
        var el = document.getElementById('about-uptime');
        if (el) {
            var diff = Math.floor((Date.now() - start) / 1000);
            var h = String(Math.floor(diff / 3600)).padStart(2, '0');
            var m = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
            var s = String(diff % 60).padStart(2, '0');
            el.textContent = h + ':' + m + ':' + s;
        }
    }, 1000);
}

// â”€â”€ WALLPAPER APP â”€â”€
function renderWallpaperApp(body) {
    var active = currentWallpaper || 'none';
    body.style.padding = '0';

    // Get current wallpaper info for hero
    var heroSrc = '';
    var heroName = 'Cybertron Default';
    if (active !== 'none') {
        for (var i = 0; i < wallpapers.length; i++) {
            if (wallpapers[i].id === active) {
                heroSrc = wallpapers[i].file;
                heroName = wallpapers[i].name;
                break;
            }
        }
    }

    var heroHtml = heroSrc
        ? '<div class="wp-app-hero"><video class="wp-hero-video" src="' + heroSrc + '" muted loop autoplay playsinline></video><div class="wp-app-hero-overlay"><div class="wp-app-hero-title">Wallpaper Studio</div><div class="wp-app-hero-sub">Current: ' + heroName + '</div></div></div>'
        : '<div class="wp-app-hero"><div class="wp-hero-gradient"></div><div class="wp-app-hero-overlay"><div class="wp-app-hero-title">Wallpaper Studio</div><div class="wp-app-hero-sub">Current: ' + heroName + '</div></div></div>';

    var cardsHtml =
        '<div class="wp-app-card' + (active === 'none' ? ' active' : '') + '" onclick="applyWallpaperFromApp(\'none\')">' +
            '<div class="wp-app-preview-none"><div class="wp-app-gradient-preview"></div></div>' +
            '<div class="wp-app-info"><span class="wp-app-name">Cybertron Default</span><span class="wp-app-badge">' + (active === 'none' ? 'ACTIVE' : '') + '</span></div>' +
        '</div>';
    for (var i = 0; i < wallpapers.length; i++) {
        var wp = wallpapers[i];
        cardsHtml += '<div class="wp-app-card' + (active === wp.id ? ' active' : '') + '" onclick="applyWallpaperFromApp(\'' + wp.id + '\')">' +
            '<video class="wp-app-preview" src="' + wp.file + '" muted preload="metadata" onmouseenter="this.play()" onmouseleave="this.pause();this.currentTime=0"></video>' +
            '<div class="wp-app-info"><span class="wp-app-name">' + wp.name + '</span><span class="wp-app-badge">' + (active === wp.id ? 'ACTIVE' : '') + '</span></div>' +
        '</div>';
    }

    body.innerHTML =
        '<div class="wp-app">' +
            heroHtml +
            '<div class="wp-app-header"><h2>' + ICO.gallery + ' Wallpapers</h2></div>' +
            '<div class="wp-app-grid">' + cardsHtml + '</div>' +
            '<div class="wp-app-footer"><span class="wp-app-current">Active: <strong>' + heroName + '</strong></span></div>' +
        '</div>';
}

function applyWallpaperFromApp(wpId) {
    loadWallpaper(wpId);
    var win = null;
    for (var i = 0; i < windows.length; i++) {
        if (windows[i].appId === 'wallpaper' && !windows[i].closed) { win = windows[i]; break; }
    }
    if (win) {
        var body = document.getElementById('win-body-' + win.id);
        body.innerHTML = '';
        renderWallpaperApp(body);
    }
    refreshSettingsWallpaper();
    renderCCWallpapers();
    showToast('Wallpaper', 'Cybertronian background applied', ICO.wallpaper);
}

// â”€â”€ NOVA STORE â”€â”€
function renderStore(body) {
    body.style.padding = '0';
    body.style.display = 'flex';
    body.style.flexDirection = 'column';
    var featuredHtml = '';
    var allHtml = '';
    for (var i = 0; i < storeApps.length; i++) {
        var app = storeApps[i];
        var cardHtml = '<div class="store-app-card">' +
            '<div class="store-app-icon">' + app.icon + '</div>' +
            '<div class="store-app-name">' + app.name + '</div>' +
            '<div class="store-app-desc">' + app.desc + '</div>' +
            '<div class="store-app-rating">' + ICO.star.repeat(Math.floor(app.rating)) + ' ' + app.rating + '</div>' +
            (app.installed ?
                '<button class="store-install-btn installed">Installed</button>' :
                '<button class="store-install-btn" onclick="installStoreApp(\'' + app.id + '\', this)">Install</button>') +
        '</div>';
        if (i < 4) featuredHtml += cardHtml;
        allHtml += cardHtml;
    }
    body.innerHTML =
        '<div class="store-container">' +
            '<div class="store-header">' +
                '<span style="font-size:1.1rem;font-weight:700;">' + ICO.store + ' Cybertron Store</span>' +
                '<input type="text" class="store-search" placeholder="Scan for systems...">' +
            '</div>' +
            '<div class="store-content">' +
                '<div class="store-section-title">Featured</div>' +
                '<div class="store-grid">' + featuredHtml + '</div>' +
                '<div class="store-section-title">All Systems</div>' +
                '<div class="store-grid">' + allHtml + '</div>' +
            '</div>' +
        '</div>';
}

function installStoreApp(appId, btn) {
    CyberSound.install();
    btn.textContent = 'Installing...';
    btn.disabled = true;
    setTimeout(function() {
        for (var i = 0; i < storeApps.length; i++) {
            if (storeApps[i].id === appId) { storeApps[i].installed = true; break; }
        }
        var appDef = null;
        for (var i = 0; i < storeApps.length; i++) {
            if (storeApps[i].id === appId) { appDef = storeApps[i]; break; }
        }
        if (appDef && !apps[appId]) {
            apps[appId] = { name: appDef.name, icon: appDef.icon, width: 500, height: 440 };
        }
        var alreadyOnDesktop = false;
        for (var i = 0; i < desktopIcons.length; i++) {
            if (desktopIcons[i].app === appId) { alreadyOnDesktop = true; break; }
        }
        if (!alreadyOnDesktop && appDef) {
            desktopIcons.push({ app: appId, icon: appDef.icon, label: appDef.name });
            renderDesktopIcons();
        }
        renderStartMenuApps();
        btn.textContent = 'Installed';
        btn.className = 'store-install-btn installed';
        btn.disabled = false;
        showToast('Cybertron Store', appDef.name + ' deployed!', ICO.checkCircle);
        // Re-render store to update icons
        var storeWin = null;
        for (var i = 0; i < windows.length; i++) {
            if (windows[i].appId === 'store' && !windows[i].closed) { storeWin = windows[i]; break; }
        }
        if (storeWin) {
            var storeBody = document.getElementById('win-body-' + storeWin.id);
            if (storeBody) renderStore(storeBody);
        }
        // Update dashboard weather visibility
        updateDashboardWeather();
    }, 1500);
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// CAMERA APP
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

var cameraStream = null;
var cameraFacingMode = 'user';
var cameraPhotos = [];

function renderCamera(body) {
    body.style.cssText = 'display:flex;flex-direction:column;height:100%;overflow:hidden;padding:0;';
    body.innerHTML =
        '<div class="camera-viewfinder" id="camera-viewfinder">' +
            '<video class="camera-video" id="camera-video" autoplay playsinline muted></video>' +
            '<div class="camera-grid">' +
                '<div class="camera-grid-line h" style="top:33.33%"></div>' +
                '<div class="camera-grid-line h" style="top:66.66%"></div>' +
                '<div class="camera-grid-line v" style="left:33.33%"></div>' +
                '<div class="camera-grid-line v" style="left:66.66%"></div>' +
            '</div>' +
            '<div class="camera-noaccess" id="camera-noaccess">' +
                '<div class="camera-noaccess-icon">' + ICO.camera + '</div>' +
                '<div class="camera-noaccess-title">Optic Sensor Offline</div>' +
                '<div class="camera-noaccess-sub">Click "Activate" to bring sensor online</div>' +
            '</div>' +
        '</div>' +
        '<div class="camera-controls">' +
            '<button class="camera-btn" id="cam-flip" title="Flip Camera">' + ICO.refresh + '</button>' +
            '<button class="camera-btn camera-btn-capture" id="cam-capture" title="Take Photo">' + ICO.camera + '</button>' +
            '<button class="camera-btn" id="cam-start" title="Start Camera">' + ICO.play + '</button>' +
        '</div>' +
        '<div class="camera-gallery-wrap">' +
            '<div class="camera-gallery-label">Captured Images</div>' +
            '<div class="camera-gallery" id="camera-gallery"></div>' +
        '</div>';

    var video = body.querySelector('#camera-video');
    var noAccess = body.querySelector('#camera-noaccess');
    var galleryEl = body.querySelector('#camera-gallery');

    function camStart() {
        if (cameraStream) { cameraStream.getTracks().forEach(function(t) { t.stop(); }); }
        navigator.mediaDevices.getUserMedia({
            video: { facingMode: cameraFacingMode, width: { ideal: 1280 }, height: { ideal: 720 } },
            audio: false
        }).then(function(stream) {
            cameraStream = stream;
            video.srcObject = stream;
            noAccess.style.display = 'none';
            video.style.display = 'block';
            body.querySelector('#cam-start').innerHTML = ICO.pause;
            showToast('Optic Sensor', 'Sensor online!', ICO.checkCircle);
        }).catch(function(err) {
            noAccess.style.display = 'flex';
            video.style.display = 'none';
            showToast('Optic Sensor', 'Sensor offline: ' + err.message, ICO.xCircle);
        });
    }

    function camStop() {
        if (cameraStream) { cameraStream.getTracks().forEach(function(t) { t.stop(); }); cameraStream = null; }
        video.srcObject = null;
        noAccess.style.display = 'flex';
        video.style.display = 'none';
        body.querySelector('#cam-start').innerHTML = ICO.play;
    }

    body.querySelector('#cam-start').onclick = function() { if (cameraStream) camStop(); else camStart(); };

    body.querySelector('#cam-flip').onclick = function() {
        cameraFacingMode = cameraFacingMode === 'user' ? 'environment' : 'user';
        if (cameraStream) camStart();
    };

    body.querySelector('#cam-capture').onclick = function() {
        if (!cameraStream) {
            showToast('Optic Sensor', 'Requesting permission...', ICO.camera);
            camStart();
            var waitForStream = setInterval(function() {
                if (cameraStream) {
                    clearInterval(waitForStream);
                    setTimeout(function() {
                        body.querySelector('#cam-capture').click();
                    }, 500);
                }
            }, 100);
            setTimeout(function() { clearInterval(waitForStream); }, 5000);
            return;
        }
        var canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        var dataUrl = canvas.toDataURL('image/png');
        cameraPhotos.unshift(dataUrl);
        renderCameraGallery(galleryEl);
        showToast('Optic Sensor', 'Image captured!', ICO.checkCircle);
        // Flash effect
        var flash = document.createElement('div');
        flash.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;background:white;opacity:0.8;z-index:10;pointer-events:none;transition:opacity 0.3s;';
        body.querySelector('#camera-viewfinder').appendChild(flash);
        setTimeout(function() { flash.style.opacity = '0'; }, 50);
        setTimeout(function() { flash.remove(); }, 400);
    };

    // Auto-start
    setTimeout(camStart, 300);

    // Cleanup on close
    var observer = new MutationObserver(function() {
        if (!document.body.contains(body)) { camStop(); observer.disconnect(); }
    });
    observer.observe(document.body, { childList: true, subtree: true });
}

function renderCameraGallery(el) {
    el.innerHTML = '';
    for (var i = 0; i < cameraPhotos.length; i++) {
        var thumb = document.createElement('div');
        thumb.style.cssText = 'width:56px;height:56px;border-radius:6px;overflow:hidden;flex-shrink:0;cursor:pointer;border:1px solid var(--border);transition:border-color 0.1s;';
        thumb.innerHTML = '<img src="' + cameraPhotos[i] + '" style="width:100%;height:100%;object-fit:cover;display:block">';
        (function(idx) {
            thumb.onclick = function() {
                var a = document.createElement('a');
                a.href = cameraPhotos[idx];
                a.download = 'photo_' + Date.now() + '.png';
                a.click();
            };
        })(i);
        el.appendChild(thumb);
    }
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// SHORTS / REELS APP - Local videos from shorts folder
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

var shortsVideos = [
    SB_URL + '/shorts/ere.mp4',
    SB_URL + '/shorts/iio.mp4',
    SB_URL + '/shorts/rrt.mp4',
    SB_URL + '/shorts/tuy.mp4',
    SB_URL + '/shorts/uui.mp4',
    SB_URL + '/shorts/WhatsApp Video 2026-07-06 .mp4',
    SB_URL + '/shorts/WhatsApp Video 2026-07-06 at 02.17.39.mp4',
    SB_URL + '/shorts/WhatsApp Video 2026-07-06 at 02.17.392.mp4',
    SB_URL + '/shorts/WhatsApp Video 2026-07-06 at 02.17.4.mp4',
    SB_URL + '/shorts/WhatsApp Video 2026-07-06 at 02.2.mp4',
    SB_URL + '/shorts/WhatsApp Video 2026-07-06 at 02.22.30.mp4',
    SB_URL + '/shorts/WhatsApp Video 2026-07-06 at 02.22.31 (1).mp4',
    SB_URL + '/shorts/WhatsApp Video 2026-07-06 at 02.22.39.mp4',
    SB_URL + '/shorts/WhatsApp Video 2026-07-06 at 02.24..mp4',
    SB_URL + '/shorts/WhatsApp Video 2026-07-06 at 02.24.5.mp4',
    SB_URL + '/shorts/WhatsApp Video 2026-07-06 at 02.24.57.mp4',
    SB_URL + '/shorts/WhatsApp Video 22026-07-06 at 02.17.39.mp4',
    SB_URL + '/shorts/yui.mp4',
    SB_URL + '/shorts/yuuu.mp4'
];

function shuffleShorts(array) {
    var arr = array.slice();
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

var shortsReels = shuffleShorts(shortsVideos);
var shortsIdx = 0;
var shortsTouchY = 0;
var shortsCooldown = false;
var shortsSoundOn = false;

function renderShorts(body) {
    body.style.cssText = 'display:flex;flex-direction:column;height:100%;background:#000;overflow:hidden;padding:0;position:relative;';
    body.innerHTML =
        '<div class="shorts-header">' +
            '<span class="shorts-header-title">' + ICO.shorts + ' Shorts</span>' +
            '<span class="shorts-header-search">' + ICO.search + '</span>' +
        '</div>' +
        '<div class="shorts-feed" id="shorts-feed"></div>' +
        '<div class="shorts-hint">' +
            '<span class="shorts-hint-text">Scroll for next video</span>' +
        '</div>' +
        '<div class="shorts-progress-bar">' +
            '<div class="shorts-progress-fill" id="shorts-progress"></div>' +
        '</div>';

    var feed = body.querySelector('#shorts-feed');
    var progressEl = body.querySelector('#shorts-progress');
    var progressInterval = null;

    function getVideoTitle(filename) {
        return filename
            .replace('.mp4', '')
            .replace(/WhatsApp Video 2026-07-06 at? ?/, '')
            .replace(/WhatsApp Video 22026-07-06 at? ?/, '');
    }

    function loadShort(idx) {
        if (idx < 0 || idx >= shortsReels.length) return;
        shortsIdx = idx;
        var videoFile = shortsReels[idx];

        feed.innerHTML =
            '<div class="shorts-reel">' +
                '<video class="shorts-video" ' +
                    'src="shorts/' + encodeURIComponent(videoFile) + '" ' +
                    'playsinline loop preload="metadata" autoplay>' +
                '</video>' +
                '<div class="shorts-loading">Loading...</div>' +
                '<div class="shorts-sound-btn' + (shortsSoundOn ? '' : ' muted') + '" id="shorts-sound-btn">' +
                    (shortsSoundOn ? ICO.volume : ICO.volumeX) +
                '</div>' +
                '<div class="shorts-info">' +
                    '<div class="shorts-creator">@webos</div>' +
                    '<div class="shorts-title-text">' + getVideoTitle(videoFile) + '</div>' +
                '</div>' +
                '<div class="shorts-actions">' +
                    '<div class="shorts-action-btn" id="shorts-like-btn">' +
                        ICO.heart +
                        '<span class="shorts-action-label">Like</span>' +
                    '</div>' +
                    '<div class="shorts-action-btn">' +
                        ICO.messageCircle +
                        '<span class="shorts-action-label">Comment</span>' +
                    '</div>' +
                    '<div class="shorts-action-btn">' +
                        ICO.share +
                        '<span class="shorts-action-label">Share</span>' +
                    '</div>' +
                    '<div class="shorts-action-btn">' +
                        ICO.shuffle +
                        '<span class="shorts-action-label">Shuffle</span>' +
                    '</div>' +
                '</div>' +
                '<div class="shorts-pause-overlay">' +
                    '<svg width="48" height="48" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>' +
                '</div>' +
            '</div>';

        var videoEl = feed.querySelector('.shorts-video');
        var loadingEl = feed.querySelector('.shorts-loading');
        var likeBtn = feed.querySelector('#shorts-like-btn');
        var soundBtn = feed.querySelector('#shorts-sound-btn');

        // Apply sound state
        if (videoEl) {
            videoEl.muted = !shortsSoundOn;
        }

        // Progress bar
        if (progressInterval) clearInterval(progressInterval);
        progressEl.style.width = '0%';
        progressInterval = setInterval(function() {
            if (videoEl && videoEl.duration) {
                var prog = (videoEl.currentTime / videoEl.duration) * 100;
                progressEl.style.width = Math.min(prog, 100) + '%';
            }
        }, 100);

        // Like button
        if (likeBtn) {
            likeBtn.onclick = function() {
                if (likeBtn.dataset.liked === '1') {
                    likeBtn.dataset.liked = '0';
                    likeBtn.innerHTML = ICO.heart + '<span class="shorts-action-label">Like</span>';
                } else {
                    likeBtn.dataset.liked = '1';
                    likeBtn.innerHTML = ICO.heartFilled + '<span class="shorts-action-label">Liked</span>';
                }
            };
        }

        // Sound toggle
        if (soundBtn) {
            soundBtn.onclick = function() {
                shortsSoundOn = !shortsSoundOn;
                if (videoEl) videoEl.muted = !shortsSoundOn;
                soundBtn.classList.toggle('muted', !shortsSoundOn);
                soundBtn.innerHTML = shortsSoundOn ? ICO.volume : ICO.volumeX;
            };
        }

        // Video events
        if (videoEl) {
            videoEl.addEventListener('loadeddata', function() {
                if (loadingEl) loadingEl.style.display = 'none';
            });
            videoEl.addEventListener('error', function() {
                if (loadingEl) loadingEl.textContent = 'Failed to load';
            });
            videoEl.addEventListener('ended', function() {
                videoEl.currentTime = 0;
                videoEl.play().catch(function() {});
            });
            videoEl.addEventListener('loadedmetadata', function() {
                if (shortsSoundOn && videoEl.muted) {
                    videoEl.muted = false;
                }
            });
            videoEl.addEventListener('play', function() {
                if (shortsSoundOn && videoEl.muted) {
                    videoEl.muted = false;
                }
            });

            // Tap to pause/play (YouTube-style)
            var pauseOverlay = feed.querySelector('.shorts-pause-overlay');
            feed.querySelector('.shorts-reel').addEventListener('click', function(e) {
                if (e.target.closest('.shorts-sound-btn') || e.target.closest('.shorts-actions') || e.target.closest('.shorts-info')) return;
                if (videoEl.paused) {
                    videoEl.play();
                    if (pauseOverlay) pauseOverlay.classList.remove('show');
                } else {
                    videoEl.pause();
                    if (pauseOverlay) pauseOverlay.classList.add('show');
                }
            });
        }
    }

    // Wheel navigation
    body.addEventListener('wheel', function(e) {
        if (shortsCooldown) return;
        e.preventDefault();
        shortsCooldown = true;
        setTimeout(function() { shortsCooldown = false; }, 600);
        if (e.deltaY > 80 && shortsIdx < shortsReels.length - 1) loadShort(shortsIdx + 1);
        else if (e.deltaY < -80 && shortsIdx > 0) loadShort(shortsIdx - 1);
    }, { passive: false, capture: true });

    // Touch
    body.addEventListener('touchstart', function(e) { shortsTouchY = e.touches[0].clientY; }, { passive: true, capture: true });
    body.addEventListener('touchend', function(e) {
        if (shortsCooldown) return;
        var dy = shortsTouchY - e.changedTouches[0].clientY;
        if (Math.abs(dy) > 80) {
            shortsCooldown = true;
            setTimeout(function() { shortsCooldown = false; }, 600);
            if (dy > 0 && shortsIdx < shortsReels.length - 1) loadShort(shortsIdx + 1);
            else if (dy < 0 && shortsIdx > 0) loadShort(shortsIdx - 1);
        }
    }, { passive: true, capture: true });

    // Keyboard
    body.tabIndex = 0;
    body.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown' && shortsIdx < shortsReels.length - 1) loadShort(shortsIdx + 1);
        else if (e.key === 'ArrowUp' && shortsIdx > 0) loadShort(shortsIdx - 1);
        else if (e.key === ' ' || e.key === 'Enter') {
            var videoEl = feed.querySelector('.shorts-video');
            if (videoEl) {
                if (videoEl.paused) videoEl.play();
                else videoEl.pause();
            }
        }
    });
    body.addEventListener('click', function() { body.focus(); });

    // Shuffle action button
    var shuffleBtn = feed.querySelector('.shorts-action-btn:last-child');
    if (shuffleBtn) {
        shuffleBtn.addEventListener('click', function() {
            shortsReels = shuffleShorts(shortsVideos);
            loadShort(0);
        });
    }

    loadShort(0);
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// INIT
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

window.addEventListener('load', function() { boot(); });