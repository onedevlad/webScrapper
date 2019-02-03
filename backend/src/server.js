import http from 'http'
import WebSocket from 'ws'
import events from 'events'
import express from 'express'

import 'Db'
import recoverDb from 'Db/recover'

import {
  addResource,
  getResourceList,
  pauseDownload,
  cancelDownload,
  resumeDownload,
} from 'controllers/resource'


const app = express()

const eventsEmitter = new events.EventEmitter()
export const wsSend = payload => eventsEmitter.emit('WS_SEND', JSON.stringify(payload))
export const dbRecoveryResumeDownload = payload => eventsEmitter.emit('DB_RECOVERY_RESUME_DOWNLOAD', payload)


const configureWs = app => {
  const server = http.createServer(app)
  const wss = new WebSocket.Server({ server })

  wss.on('connection', ws => {
    recoverDb()

    const bindOnPause = (_id, onPause, onCancel) => ws.once('message', msg => {
      const action = JSON.parse(msg)
      const { type, payload } = action

      if(_id == payload._id) {
        if(type === 'PAUSE_DOWNLOAD') onPause()
        if(type === 'CANCEL_DOWNLOAD') onCancel()
      } else bindOnPause(_id, onPause, onCancel)
    })

    ws.on('message', msg => {
      const action = JSON.parse(msg)
      const { type, payload } = action

      switch(type) {
        case 'ADD_RESOURCE': addResource(payload, bindOnPause); break
        case 'GET_RESOURCE_LIST': getResourceList(); break
        case 'RESUME_DOWNLOAD': resumeDownload(payload, bindOnPause); break
        case 'PAUSE_DOWNLOAD': pauseDownload(payload); break
        case 'CANCEL_DOWNLOAD': cancelDownload(payload); break
      }
    })

    eventsEmitter.once('DB_RECOVERY_RESUME_DOWNLOAD', docs =>
      docs.forEach(({ _id }) =>
        resumeDownload({ _id }, bindOnPause)
        )
    )
    eventsEmitter.on('WS_SEND', msg => ws.readyState === 1 && ws.send(msg))
  })

  server.listen(process.env.SERVER_WS_PORT,
    () => console.log(`\nWebSocket is open on port ${process.env.SERVER_WS_PORT}`)
  )
}

configureWs(app)
