import config from 'config'

import { wsConnect, wsOpen, wsSend, wsClose, wsDisconnect } from 'actions/ws'
import { setError } from 'shared/wsActions'


let websocket


export default ({ dispatch }) => next => action => {
  switch (action.type) {
    case wsConnect.toString():
      websocket = new WebSocket(config.API_WS_URL)
      websocket.onopen = () => dispatch(wsOpen())
      websocket.onclose = () => {
        dispatch(wsClose())
        setTimeout(() => dispatch(wsConnect()), config.WS_RECONNECT_TIMEOUT)
      }
      websocket.onmessage = ({ data }) => {
        try {
          dispatch(JSON.parse(data))
        } catch(e) { dispatch(setError(e)) }
      }
      break
    case wsSend.toString(): websocket.send(JSON.stringify(action.payload)); break
    case wsDisconnect.toString(): websocket.close(); break
  }

  return next(action)
}
