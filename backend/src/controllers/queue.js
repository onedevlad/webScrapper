import async from 'async'
import path from 'path'
import Downloader from 'filedownloader'

import { updatedResource, setError } from 'shared/wsActions'

import { wsSend } from 'src/server'
import {
  updateDownloadStatus,
  cancelDownload,
  findResourceById,
  setDownloadError,
} from 'controllers/resource'

import { validateResource } from 'utils'


const q = async.queue(async ({ _id, bindOnPause }, done) => {
  await updateDownloadStatus(_id, 'VALIDATING')

  const isResourceValid = await validateResource(_id)
    .catch(err => {
      setDownloadError(_id, err)
      return false
    })

  if(!isResourceValid) return done()

  const file = await findResourceById(_id)

  // Removed from queue before downloading started
  if(!file) return done()

  const dl = new Downloader({
    saveto: path.dirname(file.path),
    saveas: path.basename(file.path),
    url: file.url,
  })

  bindOnPause(
    file._id,
    () => dl.emit('end', 'PAUSED'),
    () => dl.emit('end', 'CANCELLED')
  )

  dl.on('start', () => updateDownloadStatus(file._id, 'RUNNING'))

  dl.on('progress', ({ progress, speed }) => {
    if(parseFloat(progress) > 100) progress = 0

    wsSend(
      updatedResource({
        _id: file._id,
        progress: parseFloat(progress),
        speed: parseFloat(speed),
      })
    )
  })

  dl.once('end', (status = 'LOADED') => {
    if(status !== 'CANCELLED') updateDownloadStatus(file._id, status)

    dl.pause()
    done()
  })

  dl.on('error', error => {
    setDownloadError(file._id, error)

    dl.emit('end', 'ERROR')
  })

}, process.env.CONCURRENT_DOWNLOADS)

export default q.push
