// Service worker: precarga el shell y sirve red-primero con respaldo en caché.
const CACHE = 'weathernow-v1';

const precachear = async () => {
  const cache = await caches.open(CACHE);
  const respuesta = await fetch('/index.html', { cache: 'no-cache' });
  await cache.put('/index.html', respuesta.clone());
  await cache.put('/', respuesta.clone());

  const html = await respuesta.text();
  const assets = [...html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map((coincidencia) => coincidencia[1]);
  await cache.addAll(assets);
};

self.addEventListener('install', (evento) => {
  evento.waitUntil(
    precachear()
      .catch(() => {})
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    caches
      .keys()
      .then((claves) => Promise.all(claves.filter((clave) => clave !== CACHE).map((clave) => caches.delete(clave))))
      .then(() => self.clients.claim())
  );
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
          const shell = (await cache.match('/')) || (await cache.match('/index.html'));
          if (shell) return shell;
        }
        return Response.error();
      }
    })
  );
});
