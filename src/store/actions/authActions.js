export const getUserData = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const state = getState()
    const firestore = getFirestore()
    firestore.collection('users').where('uid', '==', state.firebase.auth.uid)
    .get().then(querySnapshot => {
      if(querySnapshot.docs.length !== 0){
        querySnapshot.forEach(function(doc) {
          dispatch({ type: 'GET_USER_DATA_SUCCESS', userData: doc.data() })
        });
      }
    }).catch(err => {
      console.log(err)
    })
  }
}

export const signIn = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase()
    let provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then(result => {

      dispatch({ type: 'GETTING_DATA', status: true })

      const firestore = getFirestore()
      firestore.collection('users').where('uid', '==', result.user.uid)
      .get().then(querySnapshot => {
        if(querySnapshot.docs.length !== 0){
          // Ya estaba registrado
          querySnapshot.forEach(function(doc) {
            dispatch({ type: 'LOGIN_SUCCESS', userData: doc.data() })
          });
        }else{
          // Es la primera vez que ingresa, creo los datos
          const userData = {
            uid: result.user.uid,
            status: 'USER_NOT_VALIDATED',
            createdAt: new Date()
          }
          firestore.collection('users')
          .add(userData).then(result => {
            dispatch({ type: 'LOGIN_SUCCESS', userData })
          }).catch(err => {
            dispatch({ type: 'LOGIN_ERROR', err })
          })
        }
      }).catch(err => {
        dispatch({ type: 'LOGIN_ERROR', err })
      })

    }).catch(err => {
      dispatch({ type: 'LOGIN_ERROR', err })
    })
  }
}

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase()
    firebase.auth().signOut()
    .then(result => {
      dispatch({ type: 'SIGNOUT_SUCCESS' })
    })
  }
}