/*Tell service worker to listen for push events */

self.addEventListener("push", (event) => {
    const title = event.data.text();

    event.waitUntil(self.registration.showNotification(title));
});
