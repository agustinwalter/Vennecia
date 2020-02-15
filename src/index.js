import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './store/reducers/rootReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createFirestoreInstance, getFirestore, reduxFirestore } from 'redux-firestore'
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase'
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAalF_hxudmFYSesA-7sKl1fiXO2aVzCl8",
  authDomain: "vennecia-3414c.firebaseapp.com",
  databaseURL: "https://vennecia-3414c.firebaseio.com",
  projectId: "vennecia-3414c",
  storageBucket: "vennecia-3414c.appspot.com",
  messagingSenderId: "228819535006",
  appId: "1:228819535006:web:b2f857ea3878986005e78f",
  measurementId: "G-3HJVM9K07N"
}

firebase.initializeApp(firebaseConfig)
firebase.firestore()

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebase, firebaseConfig)
  )
);

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>, 
  document.getElementById('root')
);

serviceWorker.unregister();