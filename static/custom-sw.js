console.log('Content from custom service worker!')

navigator.serviceWorker.ready.then(registration => {
    if (registration.sync) {
        // Background Sync is supported.
        async function requestBackgroundSync() {
            await self.registration.sync.register('rate-shops');
        }
    } else {
        console.log("Background Sync isn't supported.")";
    }
});

self.addEventListener('sync', event => {
    if (event.tag === 'rate-shops') {
        event.waitUntil(rateShops());
    }
});

function rateShops() {
    console.log("rating shops in background...");
}
