const initState = {
  authError: null,
  status: 'USER_NOT_LOGGED',
  subStatus: 'VALIDATION_STEP_ONE',
  userDataLoaded: false,
  gettingData: false
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        authError: null,
        ...action.userData,
        gettingData: false
      }

    case 'GET_USER_DATA_SUCCESS':
      return {
        ...state,
        authError: null,
        ...action.userData,
        userDataLoaded: true
      }

    case 'LOGIN_ERROR':
      console.log('login error')
      console.log(action.err)
      return {
        ...state,
        authError: 'Login failed'
      }

    case 'SIGNOUT_SUCCESS':
      return {
        authError: null,
        status: 'USER_NOT_LOGGED',
        userDataLoaded: false,
        gettingData: false
      }

    case 'GETTING_DATA':
      return {
        ...state,
        gettingData: action.status
      }

    case 'VALIDATION_STEP_UPDATED':
      return {
        ...state,
        subStatus: action.data.subStatus,
        status: action.data.status,
        uploadCompleted: true
      }

    case 'UPDATE_UPLOAD_PROGRESS':
      return {
        ...state,
        uploadProgress: action.progress
      }

    case 'UPLOAD_COMPLETED_FALSE':
      return {
        ...state,
        uploadCompleted: false
      }

    default:
      return state
  }
}

export default authReducer