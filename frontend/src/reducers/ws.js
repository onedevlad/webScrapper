import { createReducer } from 'redux-act'

import { wsOpen, wsClose } from 'actions/ws'

const initialState = {
  connectionReady: false,
}


export default createReducer({
  [wsOpen]: state => ({ ...state, connectionReady: true }),
  [wsClose]: state => ({ ...state, connectionReady: false }),
}, initialState)
