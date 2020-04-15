const initState = {}

const ticketsReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_BOLICHE_DATA_SUCCESS':
      return {
        ...state,
        ...action.bolicheData
      }

  default:
    return state
  }
}

export default ticketsReducer