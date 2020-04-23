export const loadUserData = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const state = getState()
    // console.log('Obteniendo datos de: ' + state.firebase.auth.uid)
    const firestore = getFirestore()
    firestore.collection('users').where('uid', '==', state.firebase.auth.uid)
    .get().then(querySnapshot => {
      if(querySnapshot.docs.length !== 0){
        querySnapshot.forEach(doc => {
          const userData = {
            docId: doc.id,
            isAdmin: doc.data().isAdmin,
            status: doc.data().status,
            subStatus: doc.data().subStatus,
            friends: doc.data().friends
          }
          dispatch({ type: 'USER_DATA_OBTAINED', userData })
        });
      }
    }).catch(err => { console.log(err) })
  }
}

export const appReady = () => {
  return (dispatch) => {
    dispatch({ type: 'APP_READY' })
  }
}

export const signIn = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase()
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(result => {
      const firestore = getFirestore()
      firestore.collection('users').where('uid', '==', result.user.uid)
      .get().then(querySnapshot => {
        if(querySnapshot.docs.length !== 0){
          // Ya estaba registrado
          querySnapshot.forEach(doc => {
            const userData = {
              docId: doc.id,
              isAdmin: doc.data().isAdmin,
              status: doc.data().status,
              subStatus: doc.data().subStatus,
              friends: doc.data().friends
            }
            dispatch({ type: 'LOGIN_SUCCESS', userData })
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
          }).catch(err => { console.log(err) })
        }
      }).catch(err => { console.log(err) })
    }).catch(err => { console.log(err) })
  }
}

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase()
    firebase.auth().signOut()
    .then(() => { dispatch({ type: 'SIGNOUT_SUCCESS' }) })
  }
}

export const uploadImageToFirebase = (image) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch({ type: 'UPLOADING_IMAGE' })

    const firebase = getFirebase()
    const storageRef = firebase.storage().ref();
    const state = getState()

    console.log('Subiendo imágen a Firebase, estado actual:')
    console.log(state)
    
    const docId = state.vennecia.user.docId
    let folder = 'frontDNI'
    let status = 'USER_NOT_VALIDATED'
    let subStatus = 'VALIDATION_STEP_TWO'
    switch (state.vennecia.user.subStatus) {
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
          // if(subStatus === 'VALIDATION_STEP_TWO'){
          //   const url = `https://us-central1-vennecia-3414c.cloudfunctions.net/sendNotificationEmail?userId=${state.auth.docId}`           
          //   const http = new XMLHttpRequest()
          //   http.open("GET", url)
          //   http.addEventListener("readystatechange", function() {
          //     if(this.readyState === 4) {
          //       console.log(this.responseText);
          //     }
          //   });
          //   http.send()
          // }

          if(subStatus === 'PENDING_VALIDATION'){
            // Me envío un email con la info
            const url = `https://us-central1-vennecia-3414c.cloudfunctions.net/sendNotificationEmail?userId=${docId}`           
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

export const getBolicheData = () => {
  return (dispatch, getState, { getFirestore }) => {
    const state = getState()
    const firestore = getFirestore()
    firestore.collection('boliches').where('name', '==', 'Faxion')
    .get().then(querySnapshot => {
      if(querySnapshot.docs.length !== 0){
        querySnapshot.forEach(function(doc) {
          const purchaseDetails = {
            cantOfTickets: 1,
            assignedTickets: 1,
            ticketsFor: [state.vennecia.user.docId],
            ticketPrice: doc.data().ticketPrice
          }
          dispatch({ type: 'GET_BOLICHE_DATA_SUCCESS', purchaseDetails })
        });
      }
    }).catch(err => {
      console.log(err)
    })
  }
}

export const setCantOfTickets = (newCant) => {
  return (dispatch, getState) => {    
    const state = getState()
    const assignedTickets = state.vennecia.purchaseDetails.assignedTickets
    if(assignedTickets > newCant){
      const peopleList = state.vennecia.purchaseDetails.peopleList
      let cont = 0
      for (let i = 0; i < peopleList.length; i++) {
        if(peopleList[i].hasTicket && cont < newCant){
          cont++
        }else if(peopleList[i].hasTicket && cont === newCant){
          peopleList[i].hasTicket = false
        }
      }
      const data = {
        newCant,
        peopleList
      }
      dispatch({ type: 'UPDATE_CANT_OF_TICKETS_2', data })
    }else dispatch({ type: 'UPDATE_CANT_OF_TICKETS', newCant })

  }
}

export const generatePeopleList = () => {
  return (dispatch, getState, { getFirestore }) => {
    const state = getState()

    let peopleList = [{
      name: state.firebase.auth.displayName,
      image: state.firebase.auth.photoURL,
      docId: state.vennecia.user.docId,
      hasTicket: true
    }]
    
    const friendsDocIds = state.vennecia.user.friends
    
    if(friendsDocIds){
      const firestore = getFirestore()
      friendsDocIds.forEach(friendDocId => {
        firestore.collection('usersName').doc(friendDocId)
        .get().then(doc => {
          if(doc.exists){
            const newFriend = {
              name: doc.data().name,
              image: doc.data().image,
              docId: friendDocId,
              hasTicket: false
            }
            peopleList.push(newFriend)
  
            if(peopleList.length === friendsDocIds.length + 1)
              dispatch({ type: 'PEOPLE_LIST_CREATED', peopleList })
          }
        }).catch(err => {
          console.log(err)
        })
      });
    }else dispatch({ type: 'PEOPLE_LIST_CREATED', peopleList })
  }
}

export const updateTicketToFriend = (docId, remove) => {
  return (dispatch, getState) => {
    const state = getState()
    const peopleList = state.vennecia.purchaseDetails.peopleList
    for (let i = 0; i < peopleList.length; i++) {
      if (peopleList[i].docId === docId){
        if(remove){
          peopleList[i].hasTicket = false 
          dispatch({ type: 'REMOVE_TICKET', peopleList })
        }else{
          peopleList[i].hasTicket = true 
          dispatch({ type: 'ADD_TICKET', peopleList })
        } 
        break;
      } 
    }
  }
}

export const switchTicketToFriend = (docId) => {
  return (dispatch, getState) => {
    const state = getState()
    const peopleList = state.vennecia.purchaseDetails.peopleList
    
    for (let i = 0; i < peopleList.length; i++) {
      if (peopleList[i].hasTicket){
        peopleList[i].hasTicket = false; 
        break;
      } 
    }

    for (let i = 0; i < peopleList.length; i++) {
      if (peopleList[i].docId === docId){
        peopleList[i].hasTicket = true; 
        dispatch({ type: 'PEOPLE_LIST_CREATED', peopleList })
        break;
      } 
    }

  }
}

export const addFriendToFirebase = (friend) => {
  return (dispatch, getState, { getFirestore }) => {
    const state = getState()
    const peopleList = state.vennecia.purchaseDetails.peopleList

    const friends = state.vennecia.user.friends || []

    if(!friends.includes(friend.docId)){
      peopleList.push(friend)
      friends.push(friend.docId)
      const data = {
        peopleList,
        friends
      }
      dispatch({ type: 'PEOPLE_LIST_UPDATED', data })
  
      const docId = state.vennecia.user.docId
      const firestore = getFirestore()
      firestore.collection('users').doc(docId).update({
        friends: firestore.FieldValue.arrayUnion(friend.docId)
      })
    }
  }
}