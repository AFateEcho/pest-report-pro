const CACHE_NAME = 'pest-report-pro-v3';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './css/app.css',
  './css/font-awesome.min.css',
  './js/app.js',
  './js/pdf-generator.js',
  './js/storage.js',
  './js/i18n.js',
  './js/html2canvas.min.js',
  './js/tailwindcss.min.js',
  './js/jspdf.umd.min.js',
  './js/jspdf.plugin.autotable.min.js',
  './webfonts/fa-solid-900.woff2',
  './webfonts/fa-solid-900.ttf',
  './webfonts/fa-regular-400.woff2',
  './webfonts/fa-regular-400.ttf'
];

// 1x1 透明 PNG（用于图片 fallback）
const TRANSPARENT_PNG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // 使用 addAll 但捕获单个失败，避免一个文件失败导致全部失败
      return Promise.all(
        urlsToCache.map((url) =>
          cache.add(url).catch((err) => {
            console.warn('[SW] Failed to cache:', url, err.message);
          })
        )
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// 辅助：忽略查询参数匹配缓存
async function matchCache(request) {
  const cache = await caches.open(CACHE_NAME);
  // 先精确匹配
  let response = await cache.match(request);
  if (response) return response;

  // 再尝试不带查询参数的匹配
  const url = new URL(request.url);
  if (url.search) {
    const cleanUrl = url.origin + url.pathname;
    response = await cache.match(cleanUrl);
    if (response) return response;
  }

  // 最后尝试只匹配 pathname（相对路径）
  response = await cache.match(url.pathname);
  return response || null;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const dest = request.destination;

  event.respondWith(
    (async () => {
      // 1. 优先读缓存
      const cached = await matchCache(request);
      if (cached) {
        return cached;
      }

      // 2. 缓存未命中，尝试网络
      try {
        const networkResponse = await fetch(request);
        // 可选：把新资源加入缓存
        if (request.method === 'GET' && networkResponse.status === 200) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(request, networkResponse.clone());
        }
        return networkResponse;
      } catch (networkError) {
        // 3. 网络也失败了，做兜底

        // 导航请求 → 返回 index.html（SPA fallback）
        if (request.mode === 'navigate') {
          const fallback = await matchCache('./index.html');
          if (fallback) return fallback;
        }

        // 图片 → 返回透明像素
        if (dest === 'image') {
          return fetch(TRANSPARENT_PNG);
        }

        // 字体 → 返回空 204（避免浏览器继续加载导致报错）
        if (dest === 'font') {
          return new Response(null, { status: 204 });
        }

        // 样式/脚本 → 返回空 200（避免页面阻塞）
        if (dest === 'style' || dest === 'script') {
          return new Response('', {
            status: 200,
            headers: { 'Content-Type': dest === 'style' ? 'text/css' : 'application/javascript' }
          });
        }

        // 其他 → 503
        return new Response('Offline', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: { 'Content-Type': 'text/plain' }
        });
      }
    })()
  );
});
