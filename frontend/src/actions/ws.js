import { createAction } from 'redux-act'


export const wsConnect = createAction('Initiate WebSocket connection')
export const wsOpen = createAction('Establish Websocket connection')
export const wsSend = createAction('Send data over WebSocket')
export const wsClose = createAction('WebSocket has shut down')
export const wsDisconnect = createAction('Kill WebSocket')

