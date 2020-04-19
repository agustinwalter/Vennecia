const initState = {
  authError: null,
  status: 'USER_NOT_LOGGED',
  userDataLoaded: false,
  gettingData: false,
  friendsList: []
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
        ...state,
        status: 'USER_NOT_LOGGED'
      }

    case 'GETTING_DATA':
      return {
        ...state,
        gettingData: action.status
      }

    case 'FRIEND_ADDED':
      return {
        ...state,
        friends: action.friendsUpdated
      }

    default:
      return state
  }
}

export default authReducer