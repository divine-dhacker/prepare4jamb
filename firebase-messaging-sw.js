importScripts("https://www.gstatic.com/firebasejs/12.5.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.5.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDF9rZesIRYwJ0fFM1Q06X8DfZ1_J7e1Yg",
  authDomain: "buddyz-6781f.firebaseapp.com",
  projectId: "buddyz-6781f",
  messagingSenderId: "612185808963",
  appId: "1:612185808963:web:7b4387eca1bd2bf5f074f6"
});

const messaging = firebase.messaging();

// Background messages handler
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message: ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/icon.png" // optional
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});