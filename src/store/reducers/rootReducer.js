import venneciaReducer from './venneciaReducer'
import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'

const rootReducer = combineReducers({
  vennecia: venneciaReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
})

export default rootReducer