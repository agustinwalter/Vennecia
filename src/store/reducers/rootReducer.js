import authReducer from './authReducer'
import ticketsReducer from './ticketsReducer'
import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'

const rootReducer = combineReducers({
  auth: authReducer,
  tickets: ticketsReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
})

export default rootReducer