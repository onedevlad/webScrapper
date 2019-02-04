import path from 'path'
import del from 'del'
import URL from 'url'

import loadFile from 'controllers/queue'
import { Resource } from 'models/resource'
import { wsSend } from 'src/server'
import { handleError } from 'utils'
import {
  setResourceList,
  addedResource,
  updatedResource,
  cancelledDownload,
  setError,
} from 'shared/wsActions'


export const findResourceById = _id => Resource.findOne({ _id }).catch(handleError)

export const findRunning = () => Resource.find({ status: 'RUNNING' }).catch(handleError)
export const findPending = () => Resource.find({ status: 'PENDING' }).catch(handleError)

export const addResources = (resources, bindOnPause) =>
  resources.forEach(url => {
    const resource = new Resource({ url, status: 'PENDING' })

    return resource.save()
    .then(file => {
      wsSend(addedResource(file))
      return file
    })
    .then(({ _id, url }) => {
      const folder = path.resolve(__dirname, '../../output')
      const originalFileName = path.parse(URL.parse(url).pathname || '')
      const filename = (originalFileName.name && originalFileName.ext)
        ? `${originalFileName.name}.${_id}${originalFileName.ext}`
        : `${_id}.dat`

      return Resource.findOneAndUpdate({ _id }, {
        path: path.join(folder, filename)
      })
    })
    .then(file => loadFile({ _id: file._id, bindOnPause }))
    .catch(handleError)
  })

export const getResourceList = () =>
  Resource.find()
  .then(docs => wsSend(setResourceList(docs)))
  .catch(handleError)

export const addResource = ({ url }, bindOnPause) => {
  const resource = new Resource({ url, status: 'PENDING' })

  return resource.save()
  .then(file => {
    wsSend(addedResource(file))
    return file
  })
  .then(({ _id, url }) => {
    const folder = path.resolve(__dirname, '../../output')
    const originalFileName = path.parse(URL.parse(url).pathname || '')
    const filename = (originalFileName.name && originalFileName.ext)
      ? `${originalFileName.name}.${_id}${originalFileName.ext}`
      : `${_id}.dat`

    return Resource.findOneAndUpdate({ _id }, {
      path: path.join(folder, filename)
    })
  })
  .then(file => loadFile({ _id: file._id, bindOnPause }))
  .catch(handleError)
}

export const cancelDownload = ({ _id }) =>
  Resource.findOneAndRemove({ _id })
  .then(file => file && del([file.path]))
  .then(() => wsSend(cancelledDownload({ _id })))
  .catch(handleError)

export const pauseDownload = ({ _id }) =>
  Resource.findOneAndUpdate({ _id, status: 'RUNNING' }, { status: 'PAUSED' }, { new: true })
  .then(doc =>
     doc && wsSend(updatedResource(doc))
  )
  .catch(handleError)

export const resumeDownload = ({ _id }, bindOnPause) =>
  Resource.findOneAndUpdate({ _id }, { status: 'PENDING', error: null }, { new: true })
  .then(doc => {
    loadFile({ _id, bindOnPause })
    return doc
  })
  .then(doc =>
    doc && wsSend(updatedResource(doc))
  )
  .catch(handleError)

export const updateDownloadStatus = (_id, status) =>
  Resource.findOneAndUpdate({ _id }, { status }, { new: true })
  .then(doc =>
    doc && wsSend(updatedResource(doc))
  )
  .catch(handleError)

export const setDownloadError = (_id, error) =>
  Resource.findOneAndUpdate({ _id }, { status: 'ERROR', error }, { new: true })
  .then(doc => doc && wsSend(updatedResource(doc)))
  .catch(handleError)
