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

// import { validateResource } from 'utils'


const q = async.queue(async ({ _id, bindOnPause }, done) => {
  const file = await findResourceById(_id)

  // Removed from queue before downloading started
  if(!file) return done()

  // const isResourceValid = await validateResource(file.url)
  //   .catch(err => {
  //     setDownloadError(file._id, err)
  //     return false
  //   })

  // if(!isResourceValid) return done()

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

  dl.on('progress', stats =>
    wsSend(
      updatedResource({
        _id: file._id,
        progress: stats.progress,
        speed: parseFloat(stats.speed),
      })
    )
  )

  dl.once('end', (status = 'LOADED') => {
    const exit = () => { dl.pause(); done() }

    if(status === 'CANCELLED') exit()
    else updateDownloadStatus(file._id, status).finally(exit)
  })

  dl.on('error', error => {
    setDownloadError(file._id, error)

    dl.emit('end', 'ERROR')
  })

}, process.env.CONCURRENT_DOWNLOADS)

export default q.push
