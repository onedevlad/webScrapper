import { combineReducers } from 'redux'
import { snackbarReducer } from 'react-redux-snackbar'

import resources from 'reducers/resources'
import ws from 'reducers/ws'


export default combineReducers({
  snackbar: snackbarReducer,
  resources,
  ws,
})
