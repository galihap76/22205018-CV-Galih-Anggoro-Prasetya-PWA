## Mata Kuliah Pemrograman Perangkat Bergerak

Repositori ini di gunakan untuk memenuhi tugas mata kuliah pemrograman perangkat bergerak dalam membuat sebuah website dengan fitur sebagai berikut :

- PWA
- Indexed DB
- Firebase Cloud Messaging

## Firebase Config

```javascript
const firebaseConfig = {
        apiKey: "************",
        authDomain: "***********",
        databaseURL: "***********",
        projectId: "***********",
        storageBucket: "***********",
        messagingSenderId: "***********",
        appId: "***********",
        measurementId: "***********",
};
```

Pada firebase config, tentu saya akan konfigurasikan pada dashboard firebase milik saya pada <a href="https://console.firebase.google.com/u/0/?hl=id">console firebase</a>.

## VAPID Keys

```javascript
  getToken(messaging, {
              serviceWorkerRegistration: registration,
              vapidKey: "***********",
})
```

VAPID Keys yang tentu nya saya dapatkan pada console firebase saya.

## Penutup

Sekian terima kasih!
