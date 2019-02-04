import path from 'path'
import http from 'http'
import WebSocket from 'ws'
import events from 'events'
import express from 'express'

import 'Db'
import recoverDb from 'Db/recover'

import {
  addResources,
  getResourceList,
  pauseDownload,
  cancelDownload,
  resumeDownload,
} from 'controllers/resource'

import {
  getResourceListRequest,
  addResourcesRequest,
  cancelDownloadRequest,
  pauseDownloadRequest,
  resumeDownloadRequest
} from 'shared/wsActions'

import { handleError } from 'utils'


const eventsEmitter = new events.EventEmitter()
export const wsSend = payload => eventsEmitter.emit('WS_SEND', JSON.stringify(payload))
export const dbRecoveryResumeDownload = payload => eventsEmitter.emit('DB_RECOVERY_RESUME_DOWNLOAD', payload)


const configureWs = app => {
  const server = http.createServer(app)
  const wss = new WebSocket.Server({ server })

  wss.on('connection', ws => {
    recoverDb()

    const bindOnPause = (_id, onPause, onCancel) => ws.once('message', msg => {
      try {
        const action = JSON.parse(msg)
        const { type, payload } = action

        if(payload && (_id == payload._id)) {
          if(type === pauseDownloadRequest.toString())  onPause()
          if(type === cancelDownloadRequest.toString()) onCancel()
        } else bindOnPause(_id, onPause, onCancel)
      } catch (e) { handleError(e) }
    })

    ws.on('message', msg => {
      try {
        const action = JSON.parse(msg)
        const { type, payload } = action

        switch(type) {
          case addResourcesRequest.toString(): addResources(payload, bindOnPause); break
          case getResourceListRequest.toString(): getResourceList(); break
          case resumeDownloadRequest.toString():  resumeDownload(payload, bindOnPause); break
          case pauseDownloadRequest.toString():   pauseDownload(payload); break
          case cancelDownloadRequest.toString():  cancelDownload(payload); break
          default: handleError(`Unrecognised command: ${type}`)
        }
      } catch(e) { handleError(e) }
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

const configureHttp = app => {
  app.use(express.static(path.join(__dirname, '../../frontend/build')))
  app.listen(process.env.SERVER_HTTP_PORT,
    () => console.log(`HTTP server is running on port ${process.env.SERVER_HTTP_PORT}`)
  )
}

const app = express()
configureWs(app)
configureHttp(app)
