export const getBolicheData = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore()
    firestore.collection('boliches').where('name', '==', 'Faxion')
    .get().then(querySnapshot => {
      if(querySnapshot.docs.length !== 0){
        querySnapshot.forEach(function(doc) {
          dispatch({ type: 'GET_BOLICHE_DATA_SUCCESS', bolicheData: doc.data() })
        });
      }
    }).catch(err => {
      console.log(err)
    })
  }
}