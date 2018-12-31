const staticCacheName = "CSSTricksCache:v1";

addEventListener("install", event => {
	console.log("The service worker is installing...", event);
	event.waitUntil(
		caches.open(staticCacheName)
			.then( staticCache => {
				return staticCache.addAll([
					"/rubik/Rubik-Bold-kern-latin.woff2",
					"/rubik/Rubik-Bold-hint-all.woff2",
					"/rubik/Rubik-Regular-kern-latin.woff2",
					"/rubik/Rubik-Regular-hint-all.woff2"
				]);
			})
		);
});

addEventListener("activate", event => {
	console.log("The service worker is activated.", event);
});

addEventListener("fetch", event => {
	// console.log("The service worker is listening.", event.request);

	let request = event.request;
	event.respondWith(
		caches.match(request)
			.then(cacheResponse => {
				return cacheResponse || fetch(request);
			})
		);
});
