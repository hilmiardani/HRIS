importScripts("https://www.gstatic.com/firebasejs/8.2.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.4/firebase-messaging.js");


firebase.initializeApp({
    apiKey: "AIzaSyBsIXJ96PnsNbNezjUeEzQaQldypcDE5yQ",
    authDomain: "nest-pms.firebaseapp.com",
    projectId: "nest-pms",
    storageBucket: "nest-pms.appspot.com",
    messagingSenderId: "762523051004",
    appId: "1:762523051004:web:c0e25e56df9c467fa54879"
});

if (firebase.messaging.isSupported()) {
    const messaging = firebase.messaging();
}