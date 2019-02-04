import { createAction } from 'redux-act'
import { fetch } from 'whatwg-fetch'

import { wsSend } from 'actions/ws'
import {
  getResourceListRequest,
  addResourceRequest,
  cancelDownloadRequest,
  pauseDownloadRequest,
  resumeDownloadRequest
} from 'shared/wsActions'

console.log(pauseDownloadRequest)


export const getResourceList = () => dispatch =>
  dispatch(wsSend(getResourceListRequest()))

export const addResource = url => dispatch =>
  dispatch(wsSend(addResourceRequest({ url })))

export const cancelDownload = _id => dispatch =>
  dispatch(wsSend(cancelDownloadRequest({ _id })))

export const pauseDownload = _id => dispatch =>
  dispatch(wsSend(pauseDownloadRequest({ _id })))

export const resumeDownload = _id => dispatch =>
  dispatch(wsSend(resumeDownloadRequest({ _id })))
