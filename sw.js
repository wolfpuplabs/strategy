const CACHE_NAME = 'north-south-offline-v1';

// Daftar file yang akan di-download ke HP untuk mode offline
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './image.png',
    './image_8.png'
];

// Install Service Worker & Simpan File
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Menyimpan data untuk mode Offline...');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Gunakan file dari Cache saat Airplane Mode (Offline)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // Jika ada di cache (offline), gunakan itu. Jika tidak, ambil dari internet.
            return cachedResponse || fetch(event.request);
        })
    );
});
