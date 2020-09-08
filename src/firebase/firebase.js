import firebase from 'firebase';

// {/* <script src="https://www.gstatic.com/firebasejs/7.19.0/firebase-app.js"></script> */}

//  https://firebase.google.com/docs/web/setup#available-libraries

var config = {
  apiKey: 'AIzaSyB4y7ABKej_pHeXY8WQXrMKr1nFMWfA4Jc',
  authDomain: 'zeequiz.firebaseapp.com',
  databaseURL: 'https://zeequiz.firebaseio.com',
  projectId: 'zeequiz',
  storageBucket: 'zeequiz.appspot.com',
  messagingSenderId: '1095594182248',
  appId: '1:1095594182248:web:cdfadbc78c7ce00abf5ddd',

  // appId: '1:1095594182248:web:88d00ce7e1b5f0b4bf5ddd',
};
// Initialize Firebase
firebase.initializeApp(config);

const messaging = firebase.messaging();

function initNotification() {
  Notification.requestPermission().then((permission) => {
    console.log(permission);
    if (permission === 'granted') {
      messaging
        .getToken()
        .then((currentToken) => {
          if (currentToken) {
            console.log('Token =>');
            console.log(currentToken);
          } else {
            // Show permission request.
            console.log(
              'No Instance ID token available. Request permission to generate one.'
            );
          }
        })
        .catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
        });
    }
  });
}

export { firebase, initNotification };
