// import firebase from 'firebase';
// let self = this;
importScripts('https://www.gstatic.com/firebasejs/7.19.1/firebase-app.js');
// self.importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-app.js');
importScripts(
    'https://www.gstatic.com/firebasejs/7.18.0/firebase-messaging.js'
);

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register('./firebase-messaging-sw.js')
//     .then(function (registration) {
//       console.log('Registration successful, scope is:', registration.scope);
//     })
//     .catch(function (err) {
//       console.log('Service worker registration failed, error:', err);
//     });
// }

firebase.initializeApp({
    apiKey: 'AIzaSyB4y7ABKej_pHeXY8WQXrMKr1nFMWfA4Jc',
    authDomain: 'zeequiz.firebaseapp.com',
    databaseURL: 'https://zeequiz.firebaseio.com',
    projectId: 'zeequiz',
    storageBucket: 'zeequiz.appspot.com',
    messagingSenderId: '1095594182248',
    appId: '1:1095594182248:web:22ddb0d65cd7907ebf5ddd',
});
// firebase.messaging. useServiceWorker('./sw.js');
firebase.messaging();

/*
apiKey: "AIzaSyB4y7ABKej_pHeXY8WQXrMKr1nFMWfA4Jc",
    authDomain: "zeequiz.firebaseapp.com",
    databaseURL: "https://zeequiz.firebaseio.com",
    projectId: "zeequiz",
    storageBucket: "zeequiz.appspot.com",
    messagingSenderId: "1095594182248",
    appId: "1:1095594182248:web:cdfadbc78c7ce00abf5ddd" */