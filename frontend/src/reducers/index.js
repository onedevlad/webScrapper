import { combineReducers } from 'redux'

import resources from 'reducers/resources'
import ws from 'reducers/ws'


export default combineReducers({
  resources,
  ws,
})
