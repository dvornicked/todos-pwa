const _self = self as unknown as ServiceWorkerGlobalScope

const cacheKey = 'todos-pwa-' + new Date().getTime();

const getInstallWaitUntilPromise = async () => {
    const cache = await caches.open(cacheKey);
    await cache.addAll(['/']);

    await _self.skipWaiting();
}

const handleInstall = async (event: ExtendableEvent) => {
    event.waitUntil(getInstallWaitUntilPromise());
}

const getActivateWaitUntilPromise = async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(key => {
        if (key !== cacheKey) return caches.delete(key);
    }))
}

const handleActivate = async (event: ExtendableEvent) => {
    event.waitUntil(getActivateWaitUntilPromise());
}

const getFetchRespondWithPromise = async (event: FetchEvent) => {
    const request = event.request;
    const cache = await caches.open(cacheKey);

    const cachedResponse = await cache.match(request);
    if (cachedResponse) return cachedResponse

    const response = await fetch(request);
    if (response.status === 200) await cache.put(request, response.clone());
    return response
}

const handleFetch = (event: FetchEvent) => {
    const request = event.request;
    if (request.method !== 'GET') return;
    if (!request.url.startsWith('http')) return;

    event.respondWith(getFetchRespondWithPromise(event));
}

_self.addEventListener('install', handleInstall)
_self.addEventListener('activate', handleActivate)
_self.addEventListener('fetch', handleFetch);
