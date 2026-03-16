import { 
  CHANGE_SEARCH_FIELD,
  REQUEST_AVATARS_PENDING,
  REQUEST_AVATARS_SUCCESS,
  REQUEST_AVATARS_FAILED
 } from './constants.js'

const initialStateSearch = {
  searchField: ''
}

export const searchAvatars = (state = initialStateSearch, action = {}) => {
  switch(action.type) {
    case CHANGE_SEARCH_FIELD:
      return Object.assign({}, state, { searchField: action.payload });
    default:
      return state;
  }
}

const initialStateAvatars = {
  isPending: false,
  avatars: [],
  error: ''
}

export const requestAvatars = (state = initialStateAvatars, action = {}) => {
  switch(action.type) {
    case REQUEST_AVATARS_PENDING:
      return Object.assign({}, state, { isPending: true })
    case REQUEST_AVATARS_SUCCESS:
      return Object.assign({}, state, { avatars: action.payload, isPending: false })
    case REQUEST_AVATARS_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false })
    default:
      return state;
  }
}