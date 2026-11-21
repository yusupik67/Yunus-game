const CACHE = 'yunus-v1-1-5-p1';
const FILES = ['./', './index.html', './yunus.jpg', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png', './aura-violet.png', './aura-blue.png', './aura-red.png', './aura-gold.png', './aura-pink.png', './hair-h1.png', './hair-h2.png', './hair-h3.png', './hair-h4.png', './aura-black.png', './aura-fire.png', './aura-plasma.png', './sharingan-open.png', './sharingan-closed.png', './aura-blood.png', './aura-sun.png', './aura-d9.png', './aura-d9r.png', './aura-d9h1.png', './aura-d9h2.png', './aura-d9h3.png', './aura-d9h4.png', './gold-open.png', './gold-closed.png', './gold-thumb.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, {ignoreSearch: true}).then(r => r || fetch(e.request).then(res => {
    const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res;
  }).catch(() => caches.match('./index.html'))));
});
