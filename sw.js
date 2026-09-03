// ===== RYZIN STUDIO Web Push Service Worker =====
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('push', function(event) {
  let data = {
    title: '',
    body: '',
    url: '/live/'
  };

  try {
    if (event.data) {
      const parsed = event.data.json();
      data = Object.assign(data, parsed);
    }
  } catch (e) {
    if (event.data) {
      data.body = event.data.text();
    }
  }

  // 알림 제목과 알림 내용만 깔끔하게 표시
  const options = {
    body: data.body || '',
    icon: data.icon || 'https://i.ibb.co/GQN2NXgR/image.jpg',
    data: {
      url: data.url || '/live/'
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title || '', options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const targetUrl = (event.notification.data && event.notification.data.url)
    ? event.notification.data.url
    : '/live/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url && client.url.includes('/live') && 'focus' in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
