// install evt
self.addEventListener('install', evt => {
  console.log('service worker installed');
})

// activate evt
self.addEventListener('activate', evt => {
  console.log('service worker activated');
})

// fetch evt
self.addEventListener('fetch', evt => {
  console.log('fetch event', evt)
})