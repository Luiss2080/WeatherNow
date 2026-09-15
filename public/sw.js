// Service worker mínimo: red primero con respaldo en caché (spec 002, RF-18).
const CACHE = 'weathernow-v1';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (evento) => {
  evento.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (evento) => {
  const { request } = evento;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin || url.pathname.startsWith('/api')) return;

  evento.respondWith(
    caches.open(CACHE).then(async (cache) => {
      try {
        const respuesta = await fetch(request);
        if (respuesta.ok) cache.put(request, respuesta.clone());
        return respuesta;
      } catch {
        const cacheada = await cache.match(request);
        if (cacheada) return cacheada;
        if (request.mode === 'navigate') {
          const shell = await cache.match('/index.html');
          if (shell) return shell;
        }
        return Response.error();
      }
    })
  );
});
