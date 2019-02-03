import config from 'config'
import { updateResource } from 'actions'

import { wsConnect, wsOpen, wsSend, wsClose, wsDisconnect, wsInvalidCmd } from 'actions/ws'
import { cancelDownloadSuccess, addResourceSuccess, getResourceListSuccess } from 'actions'

let websocket

const resolveAction = wsMessage => {
  const {type, payload} = JSON.parse(wsMessage)
  console.log('received action', type, payload, wsMessage)

  const actions = {
    'UPDATE_RESOURCE': updateResource,
    'CANCELLED_DOWNLOAD': cancelDownloadSuccess,
    'ADDED_RESOURCE': addResourceSuccess,
    'SET_RESOURCE_LIST': getResourceListSuccess,
  }

  if(actions[type]) return actions[type](payload)
  console.log('invalid cmd:', type)
  return wsInvalidCmd(type)
}


export default ({ dispatch }) => next => action => {
  switch (action.type) {
    case wsConnect.toString():
      websocket = new WebSocket(config.API_WS_URL)
      websocket.onopen = () => dispatch(wsOpen())
      websocket.onclose = () => {
        dispatch(wsClose())
        setTimeout(() => dispatch(wsConnect()), 3000)
      }
      websocket.onmessage = ({ data }) => dispatch(resolveAction(data))
      break
    case wsSend.toString(): websocket.send(JSON.stringify(action.payload)); break
    case wsDisconnect.toString(): websocket.close(); break
  }

  return next(action)
}
