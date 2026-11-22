
/* Kampil — service worker untuk GitHub Pages (ROOT, sejajar index.html)
   Scope service worker mengikuti folder skripnya: file ini HARUS di root repo
   agar bisa mengontrol halaman utama — syarat Chrome Android untuk menawarkan
   "Instal aplikasi", bukan hanya "Buat pintasan".
   Hanya meng-cache file aplikasi — TIDAK PERNAH meng-cache data kampil;
   data tetap terenkripsi di IndexedDB perangkat.
   v3: instalasi cache ditoleransi per file (satu file gagal tidak lagi
   menggagalkan aktivasi service worker) dan navigasi jaringan-dulu dengan
   cadangan index dari cache, agar start_url selalu bisa dibuka SW. */
var CACHE = "kampil-github-v7";
var APP_FILES = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "assets/icon-192.png",
  "assets/icon-512.png",
  "assets/icon-maskable-512.png",
  "assets/apple-touch-icon.png"
];
var INDEX_URL = new URL("index.html", self.registration.scope).href;
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      /* cache.addAll bersifat atomik: SATU file gagal (404/redirect) menggagalkan
         SELURUH instalasi service worker — dan tanpa SW aktif Chrome menolak
         instal aplikasi. Karena itu: coba addAll, lalu lengkapi per file dengan
         kegagalan per file ditoleransi. Aktivasi SW tidak boleh diveto cache. */
      return cache.addAll(APP_FILES).catch(function () {
        return Promise.all(APP_FILES.map(function (u) {
          return cache.add(u).catch(function () { return null; });
        }));
      });
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
  if (req.mode === "navigate") {
    /* Navigasi: jaringan dulu (halaman selalu versi terbaru), cache index
       sebagai cadangan offline — start_url harus bisa dilayani SW. */
    event.respondWith(
      fetch(req).then(function (res) {
        if (res && res.ok) {
          var copy = res.clone();
          caches.open(CACHE).then(function (cache) { cache.put(INDEX_URL, copy); });
        }
        return res;
      }).catch(function () {
        return caches.match(INDEX_URL, { ignoreSearch: true }).then(function (hit) {
          return hit || new Response("Offline", { status: 503, statusText: "Offline" });
        });
      })
    );
    return;
  }
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then(function (hit) {
      var network = fetch(req).then(function (res) {
        if (res && res.ok) {
          var copy = res.clone();
          caches.open(CACHE).then(function (cache) { cache.put(req, copy); });
        }
        return res;
      }).catch(function () {
        return hit || new Response("", { status: 504, statusText: "Gateway Timeout" });
      });
      return hit || network;
    })
  );
});
