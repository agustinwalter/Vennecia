const initState = {
  general: {
    loadingApp: true
  }
}

const venneciaReducer = (state = initState, action) => {
  switch (action.type) {
    case 'USER_DATA_OBTAINED': return userDataObtained(state, action);
    case 'APP_READY': return appReady(state);
    case 'LOGIN_SUCCESS': return userDataObtained(state, action);
    case 'SIGNOUT_SUCCESS': return signOut(state);
    case 'UPDATE_UPLOAD_PROGRESS': return updateUploadProgress(state, action);
    case 'VALIDATION_STEP_UPDATED': return validationStepUpdated(state, action);
    case 'UPLOADING_IMAGE': return uploadingImage(state);
    case 'GET_BOLICHE_DATA_SUCCESS': return getBolicheDataSucces(state, action);
    case 'UPDATE_CANT_OF_TICKETS': return updateCantOfTickets(state, action);
    case 'UPDATE_CANT_OF_TICKETS_2': return updateCantOfTickets2(state, action);
    case 'PEOPLE_LIST_CREATED': return peopleListCreated(state, action);
    case 'PEOPLE_LIST_UPDATED': return peopleListUpdated(state, action);
    case 'REMOVE_TICKET': return removeTicket(state, action);
    case 'ADD_TICKET': return addTicket(state, action);
    default: return state;
  }
}

const userDataObtained = (state, action) => {
  let newState = state
  newState.user = {
    ...state.user,
    ...action.userData
  }
  newState.general = {
    ...state.general,
    loadingApp: false
  }
  if(action.userData.status === 'USER_NOT_VALIDATED'){
    newState.validationProcess = {}
  }else if(action.userData.status === 'USER_VALIDATED'){
    delete newState['.validationProcess']
    newState.purchaseDetails = {}
  }
  return newState;
}

const appReady = (state) => {
  let newState = state
  newState.general = {
    ...state.general,
    loadingApp: false
  }
  return newState;
}

const signOut = (state) => {
  let newState = state
  newState.user = {}
  newState.validationProcess = {}
  return newState;
}

const updateUploadProgress = (state, action) => {
  let newState = state
  newState.validationProcess = {
    ...state.validationProcess,
    uploadProgress: action.progress
  }
  console.log('Actualizando progreso de carga de imágen, estado actual:')
  console.log(state)
  return newState;
}

const validationStepUpdated = (state, action) => {
  let newState = state
  newState.validationProcess = {
    ...state.validationProcess,
    uploadProgress: 0,
    statusImage: 'NOT_LOADED'
  }
  newState.user = {
    ...state.user,
    status: action.data.status,
    subStatus: action.data.subStatus
  }
  console.log('Imagen subida a Firebase, estado actual:')
  console.log(state)
  return newState;
}

const uploadingImage = (state) => {
  let newState = state
  newState.validationProcess = {
    ...state.validationProcess,
    statusImage: 'UPLOADING'
  }
  return newState;
}

const getBolicheDataSucces = (state, action) => {
  let newState = state
  newState.purchaseDetails = {
    ...state.purchaseDetails,
    ...action.purchaseDetails
  }
  return newState;
}

const updateCantOfTickets = (state, action) => {
  let newState = state
  newState.purchaseDetails = {
    ...state.purchaseDetails,
    cantOfTickets: action.newCant
  }
  return newState;
}

const updateCantOfTickets2 = (state, action) => {
  let newState = state
  newState.purchaseDetails = {
    ...state.purchaseDetails,
    cantOfTickets: action.data.newCant,
    assignedTickets: action.data.newCant,
    peopleList: action.data.peopleList
  }
  return newState;
}

const peopleListCreated = (state, action) => {
  let newState = state
  newState.purchaseDetails = {
    ...state.purchaseDetails,
    peopleList: action.peopleList
  }
  return newState;
}

const peopleListUpdated = (state, action) => {
  let newState = state
  newState.purchaseDetails.peopleList = action.data.peopleList
  newState.user.friends = action.data.friends
  return newState;
}

const removeTicket = (state, action) => {
  let newState = state
  newState.purchaseDetails = {
    ...state.purchaseDetails,
    peopleList: action.peopleList,
    assignedTickets: state.purchaseDetails.assignedTickets - 1
  }
  return newState;
}

const addTicket = (state, action) => {
  let newState = state
  newState.purchaseDetails = {
    ...state.purchaseDetails,
    peopleList: action.peopleList,
    assignedTickets: state.purchaseDetails.assignedTickets + 1
  }
  return newState;
}

export default venneciaReducer