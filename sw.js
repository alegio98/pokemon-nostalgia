const SHELL_CACHE = "rf-shell-v6";
const RUNTIME_CACHE = "rf-runtime-v6";
const SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/pixel-pokeball.png",
  "./assets/pixel-greatball.png",
  "./assets/pokeball-placeholder.svg",
  "./assets/pixel-envelope.svg"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(SHELL_CACHE).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => ![SHELL_CACHE, RUNTIME_CACHE].includes(key)).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);

  if (url.hostname === "pokeapi.co") {
    event.respondWith(networkFirst(event.request));
    return;
  }

  if (url.hostname === "raw.githubusercontent.com" || url.hostname === "fonts.cdnfonts.com") {
    event.respondWith(cacheFirst(event.request));
    return;
  }

  if (url.origin === self.location.origin && url.pathname.endsWith("/config.js")) {
    event.respondWith(networkFirst(event.request));
    return;
  }

  if (url.origin === self.location.origin) {
    event.respondWith(cacheFirst(event.request));
  }
});

async function cacheFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) cache.put(request, response.clone());
  return response;
}

async function networkFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) return cached;
    throw error;
  }
}
