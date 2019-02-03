import path from 'path'
import del from 'del'

import loadFile from 'controllers/queue'
import { Resource } from 'models/resource'

import { wsSend } from 'src/server'


export const findById = _id => Resource.findOne({ _id })

export const findRunning = () => Resource.find({ status: 'RUNNING' })
export const findPending = () => Resource.find({ status: 'PENDING' })


export const getResourceList = () =>
  Resource.find()
  .then(docs => wsSend({type: 'SET_RESOURCE_LIST', payload: docs}))
  .catch(err => console.log(err))


export const addResource = ({ url }, bindOnPause) => {
  const resource = new Resource({ url, status: 'PENDING' })

  return resource.save()
  .then(file => {
    wsSend({ type: 'ADDED_RESOURCE', payload: file })
    return file
  })
  .then(({ _id }) => {
    return Resource.findOneAndUpdate({ _id }, {
      path: path.resolve(__dirname, '../output', _id.toString())
    })
  })
  .then(file => loadFile({ _id: file._id, bindOnPause }))
  .catch(err => console.log(err))
}

export const cancelDownload = ({ _id }) =>
  Resource.findOneAndRemove({ _id })
  .then(file => del([file.path]))
  .then(() => wsSend({ type: 'CANCELLED_DOWNLOAD', payload: { _id } }))
  .catch(err => console.log(err))

export const pauseDownload = ({ _id }) =>
  Resource.findOneAndUpdate({ _id, status: 'RUNNING' }, { status: 'PAUSED' }, { new: true })
  .then(payload =>
     payload && wsSend({ type: 'UPDATE_RESOURCE', payload })
  )

export const resumeDownload = ({ _id }, bindOnPause) =>
  updateDownloadStatus(_id, 'PENDING')
  .then(() => loadFile({ _id, bindOnPause }))

export const updateDownloadStatus = (_id, status) =>
  Resource.findOneAndUpdate({ _id }, { status }, { new: true })
  .then(payload =>
    payload && wsSend({ type: 'UPDATE_RESOURCE', payload })
  )
