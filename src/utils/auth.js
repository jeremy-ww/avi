import firebase from 'firebase/app'
import 'firebase/auth'

firebase.initializeApp({
  apiKey: 'AIzaSyDs7UXdh_B6W-vxZz8iYjUOBbmUpn9pFuw',
  authDomain: 'avi-api-server.firebaseapp.com',
  databaseURL: 'https://avi-api-server.firebaseio.com',
  projectId: 'avi-api-server',
  storageBucket: 'avi-api-server.appspot.com',
  messagingSenderId: '877863753032'
})

export {
  firebase
}

export default async () => {
  return firebase.auth().getRedirectResult()
}
