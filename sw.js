/* Kampil — service worker untuk GitHub Pages (ROOT, sejajar index.html)
   Scope service worker mengikuti folder skripnya: file ini HARUS di root repo
   agar bisa mengontrol halaman utama — syarat Chrome Android untuk menawarkan
   "Instal aplikasi", bukan hanya "Buat pintasan".
   Hanya meng-cache file aplikasi — TIDAK PERNAH meng-cache data kampil;
   data tetap terenkripsi di IndexedDB perangkat. */
var CACHE = "kampil-github-v2";
var APP_FILES = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "assets/icon-192.png",
  "assets/icon-512.png",
  "assets/icon-maskable-512.png",
  "assets/apple-touch-icon.png"
];
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(APP_FILES);
    }).then(function () { return self.skipWaiting(); })
  );
});
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        return k === CACHE ? null : caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});
self.addEventListener("fetch", function (event) {
  var req = event.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  if (url.origin !== new URL(self.registration.scope).origin) return;
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then(function (hit) {
      var network = fetch(req).then(function (res) {
        if (res && res.ok) {
          var copy = res.clone();
          caches.open(CACHE).then(function (cache) { cache.put(req, copy); });
        }
        return res;
      }).catch(function () { return hit; });
      return hit || network;
    })
  );
});
