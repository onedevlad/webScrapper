import url from 'url'
import http from 'http'
import https from 'https'

import { wsSend } from 'src/server'
import { setError } from 'shared/wsActions'


export const handleError = msg => wsSend(setError(msg.toString()))


// export const validateResource = resource => new Promise((resolve, reject) => {
//   const { hostname, protocol, path, port } = url.parse(resource)

//   const client = protocol === 'https:' ? https : http
//   console.log(path)

//   const request = client.request({ hostname, path, port, method: 'HEAD' }, ({ headers, statusCode }) => {
//     if(statusCode < 200 || statusCode > 400) return reject(`HTTP ${statusCode}`)

//     const supportedMIMETypes = process.env.SUPPORTED_MIME_TYPES.split(' ')
//     const resourceMIME = (headers['content-type'] || '').split(';')[0]
//     if(!supportedMIMETypes.includes(resourceMIME)) return reject('Filetype not allowed')
//     resolve(true)
//   })

//   request.on('error', () => reject('Invalid URL'))
//   request.end()
// })
