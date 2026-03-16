import { 
  CHANGE_SEARCH_FIELD,
  REQUEST_AVATARS_PENDING,
  REQUEST_AVATARS_SUCCESS,
  REQUEST_AVATARS_FAILED
 } from './constants.js'

export const setSearchField = (text) => ({
  type: CHANGE_SEARCH_FIELD,
  payload: text
})

export const requestAvatars = () => (dispatch) => {
  dispatch({ type: REQUEST_AVATARS_PENDING });
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_AVATARS_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_AVATARS_FAILED, payload: error }))
}