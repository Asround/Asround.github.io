// Retirement worker for the previous blog. Deliberately has no fetch handler.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key =>
      key.startsWith('main-') || key === 'precache-v1' || key === 'runtime'
    ).map(key => caches.delete(key)));
    await self.clients.claim();
    await self.registration.unregister();
  })());
});
