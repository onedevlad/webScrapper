import http from 'http'
import url from 'url'
import https from 'https'

import { wsSend } from 'src/server'
import { setError } from 'shared/wsActions'

import { findResourceById } from 'controllers/resource'


export const handleError = msg => wsSend(setError(msg.toString()))


export const validateResource = _id => new Promise(async (resolve, reject) => {
  const resource = await findResourceById(_id).catch(handleError)
  if(!resource) return reject()

  const { hostname, path, port, protocol } = resource

  const client = protocol === 'https:' ? https : http
  const request = client.request({ hostname, path, port, method: 'HEAD' }, ({ headers, statusCode }) => {
    if(statusCode < 200 || statusCode > 400) return reject(`HTTP ${statusCode}`)

    const supportedMIMETypes = process.env.SUPPORTED_MIME_TYPES.split(' ')
    const resourceMIME = (headers['content-type'] || '').split(';')[0]

    if(!supportedMIMETypes.includes(resourceMIME)) return reject('Filetype not allowed')
    setTimeout(() => resolve(true), 4000)
    // resolve(true)
  })

  request.on('error', err => console.log(err) || reject('Unable to connect'))
  request.end()
})
