export const getUserData = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const state = getState()
    const firestore = getFirestore()
    firestore.collection('users').where('uid', '==', state.firebase.auth.uid)
    .get().then(querySnapshot => {
      if(querySnapshot.docs.length !== 0){
        querySnapshot.forEach(function(doc) {
          let userData = doc.data()
          userData.docId = doc.id
          dispatch({ type: 'GET_USER_DATA_SUCCESS', userData })
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
            subStatus: 'VALIDATION_STEP_ONE',
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

export const addFriendToFirebase = (newFriend) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const state = getState()
    const firestore = getFirestore()
    firestore.collection("users").doc(state.auth.docId).update({
      friends: firestore.FieldValue.arrayUnion(newFriend)
    }).then(()=>{
      let friendsUpdated = state.auth.friends
      friendsUpdated.push(newFriend)
      dispatch({ type: 'FRIEND_ADDED', friendsUpdated })
    });
  }
}

export const uploadImageToFirebase = (image) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase()
    const storageRef = firebase.storage().ref();

    const state = getState()
    const docId = state.auth.docId

    let folder = 'frontDNI'
    let subStatus = 'VALIDATION_STEP_TWO'
    let status = 'USER_NOT_VALIDATED'
    switch (state.auth.subStatus) {
      case 'VALIDATION_STEP_TWO':
        folder = 'backDNI'
        subStatus = 'VALIDATION_STEP_THREE'
        break;
      case 'VALIDATION_STEP_THREE':
        folder = 'userFace'
        subStatus = 'PENDING_VALIDATION'
        status = 'USER_VALIDATED'
        break;
      default:
        break;
    }

    const imageRef = storageRef.child(`${folder}/${docId}.jpg`);
    var uploadTask = imageRef.put(image)
    uploadTask.on('state_changed', snapshot => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      dispatch({ type: 'UPDATE_UPLOAD_PROGRESS', progress })
    }, null, ()=>{
      uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
        const firestore = getFirestore()
        firestore.collection('users').doc(docId).update({
          [`identityImages.${folder}`]: downloadURL,
          subStatus,
          status
        }).then(result => {
          if(subStatus === 'VALIDATION_STEP_TWO'){
            const url = `https://us-central1-vennecia-3414c.cloudfunctions.net/sendNotificationEmail?userId=${state.auth.docId}`           
            const http = new XMLHttpRequest()
            http.open("GET", url)
            http.addEventListener("readystatechange", function() {
              if(this.readyState === 4) {
                console.log(this.responseText);
              }
            });
            http.send()
          }

          if(subStatus === 'PENDING_VALIDATION'){
            // Me envío un email con la info
            const url = `https://us-central1-vennecia-3414c.cloudfunctions.net/sendNotificationEmail?userId=${state.auth.docId}`           
            const http = new XMLHttpRequest()
            http.open("GET", url)
            http.send()
          }
          const data = { subStatus, status }
          dispatch({ type: 'VALIDATION_STEP_UPDATED', data })
        })
      });
    });
  }
}

export const setUploadCompletedFalse = () => {
  return (dispatch) => {
    dispatch({ type: 'UPLOAD_COMPLETED_FALSE' })   
  }
}