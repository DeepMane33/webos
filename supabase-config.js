// Supabase Storage Configuration for CYBERTRON OS
const SUPABASE_URL = "https://vvbfmzehffthkzoikkgu.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2YmZtemVoZmZ0aGt6b2lra2d1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1MjE4NTQsImV4cCI6MjA5OTA5Nzg1NH0.QWEcM7gAVQKv7wNkw8X4SAXIYNKSxRViBt_-ZQMMEFk";

// Storage bucket names
const STORAGE_BUCKETS = {
    gallery: "gallery",
    music: "music",
    shorts: "shorts",
    wallpapers: "wallpapers"
};

// Helper function to get public URL for a file
function getStorageUrl(bucket, path) {
    return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${encodeURIComponent(path)}`;
}

// Gallery URLs
const GALLERY = {
    cars: [
        getStorageUrl("gallery", "car1.jpg"),
        getStorageUrl("gallery", "car2.jpg"),
        getStorageUrl("gallery", "car3.jpg"),
        getStorageUrl("gallery", "car4.jpg"),
        getStorageUrl("gallery", "car5.jpg"),
        getStorageUrl("gallery", "car6.jpg")
    ],
    holo: [
        getStorageUrl("gallery", "holopictures/WhatsApp Image 2026-07-08 at 16.25.2.jpeg"),
        getStorageUrl("gallery", "holopictures/WhatsApp Image 2026-07-08 at 16.25.29.jpeg"),
        getStorageUrl("gallery", "holopictures/WhatsApp Image 2026-07-08 at 16.25.30.jpeg"),
        getStorageUrl("gallery", "holopictures/WhatsApp Image 2026-07-08 at 16.25.32.jpeg"),
        getStorageUrl("gallery", "holopictures/WhatsApp Image 2026-07-08 at 16.25.33.jpeg"),
        getStorageUrl("gallery", "holopictures/WhatsApp Image 2026-07-08 at 16.25.34.jpeg"),
        getStorageUrl("gallery", "holopictures/WhatsApp Image 2026-07-08 at 16.25.35.jpeg"),
        getStorageUrl("gallery", "holopictures/WhatsApp Image 2026-07-08 at 16.25.39.jpeg"),
        getStorageUrl("gallery", "holopictures/WhatsApp Image 2026-07-08 at 16.27.09.jpeg"),
        getStorageUrl("gallery", "holopictures/WhatsApp Image 2026-07-08 at 16.27.1.jpeg"),
        getStorageUrl("gallery", "holopictures/WhatsApp Image 2026-07-08 at 16.27.10.jpeg"),
        getStorageUrl("gallery", "holopictures/WhatsApp Image 2026-07-08 at 16.27.jpeg")
    ],
    transformers: [
        getStorageUrl("gallery", "transformers/01_optimus_prime.svg"),
        getStorageUrl("gallery", "transformers/02_megatron.svg"),
        getStorageUrl("gallery", "transformers/03_bumblebee.svg"),
        getStorageUrl("gallery", "transformers/04_starscream.svg"),
        getStorageUrl("gallery", "transformers/05_soundwave.svg"),
        getStorageUrl("gallery", "transformers/06_ironhide.svg"),
        getStorageUrl("gallery", "transformers/07_ratchet.svg"),
        getStorageUrl("gallery", "transformers/08_prowl.svg"),
        getStorageUrl("gallery", "transformers/09_jazz.svg"),
        getStorageUrl("gallery", "transformers/10_shockwave.svg"),
        getStorageUrl("gallery", "transformers/11_blaster.svg"),
        getStorageUrl("gallery", "transformers/12_thundercracker.svg"),
        getStorageUrl("gallery", "transformers/13_skywarp.svg"),
        getStorageUrl("gallery", "transformers/14_wheeljack.svg"),
        getStorageUrl("gallery", "transformers/15_cybertron.svg")
    ]
};

// Music URLs
const MUSIC = {
    tracks: [
        { title: "Yoru ni Kakeru", artist: "YOASOBI", url: getStorageUrl("music", "01 - YOASOBI - Yoru ni Kakeru.mp3"), cover: getStorageUrl("music", "covers/01.jpg") },
        { title: "Gurenge", artist: "LiSA", url: getStorageUrl("music", "02 - LiSA - Gurenge.mp3"), cover: getStorageUrl("music", "covers/02.jpg") },
        { title: "Pretender", artist: "Official HIGE DANdism", url: getStorageUrl("music", "03 - Official HIGE DANdism - Pretender.mp3"), cover: getStorageUrl("music", "covers/03.jpg") },
        { title: "Lemon", artist: "Kenshi Yonezu", url: getStorageUrl("music", "04 - Kenshi Yonezu - Lemon.mp3"), cover: getStorageUrl("music", "covers/04.jpg") },
        { title: "Usseewa", artist: "Ado", url: getStorageUrl("music", "05 - Ado - Usseewa.mp3"), cover: getStorageUrl("music", "covers/05.jpg") },
        { title: "Idol", artist: "YOASOBI", url: getStorageUrl("music", "06 - YOASOBI - Idol.mp3"), cover: getStorageUrl("music", "covers/06.jpg") },
        { title: "Shinunoga E-Wa", artist: "Fujii Kaze", url: getStorageUrl("music", "07 - Fujii Kaze - Shinunoga E-Wa.mp3"), cover: getStorageUrl("music", "covers/07.jpg") },
        { title: "Zankyosanka", artist: "Aimer", url: getStorageUrl("music", "08 - Aimer - Zankyosanka.mp3"), cover: getStorageUrl("music", "covers/08.jpg") },
        { title: "Mixed Nuts", artist: "Official HIGE DANdism", url: getStorageUrl("music", "09 - Official HIGE DANdism - Mixed Nuts.mp3"), cover: getStorageUrl("music", "covers/09.jpg") },
        { title: "Kick Back", artist: "Kenshi Yonezu", url: getStorageUrl("music", "10 - Kenshi Yonezu - Kick Back.mp3"), cover: getStorageUrl("music", "covers/10.jpg") }
    ]
};

// Shorts URLs
const SHORTS = [
    getStorageUrl("shorts", "ere.mp4"),
    getStorageUrl("shorts", "iio.mp4"),
    getStorageUrl("shorts", "rrt.mp4"),
    getStorageUrl("shorts", "tuy.mp4"),
    getStorageUrl("shorts", "uui.mp4"),
    getStorageUrl("shorts", "yui.mp4"),
    getStorageUrl("shorts", "yuuu.mp4")
];

// Wallpaper URLs
const WALLPAPERS = [
    { name: "Black Dragon", url: getStorageUrl("wallpapers", "black-dragon.mp4") },
    { name: "Hatsune Miku", url: getStorageUrl("wallpapers", "hatsune-miku.mp4") },
    { name: "Neon Car", url: getStorageUrl("wallpapers", "neon-car.mp4") },
    { name: "Samurai Warrior", url: getStorageUrl("wallpapers", "samurai-warrior.mp4") },
    { name: "Transformer", url: getStorageUrl("wallpapers", "transformer.mp4") }
];
