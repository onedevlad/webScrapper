import { createAction } from 'redux-act'
import { fetch } from 'whatwg-fetch'

import { wsSend } from 'actions/ws'
import {
  getResourceListRequest,
  addResourcesRequest,
  cancelDownloadRequest,
  pauseDownloadRequest,
  resumeDownloadRequest
} from 'shared/wsActions'


export const getResourceList = () => dispatch =>
  dispatch(wsSend(getResourceListRequest()))

export const addResources = resources => dispatch =>
  dispatch(wsSend(addResourcesRequest(resources)))

export const cancelDownload = _id => dispatch =>
  dispatch(wsSend(cancelDownloadRequest({ _id })))

export const pauseDownload = _id => dispatch =>
  dispatch(wsSend(pauseDownloadRequest({ _id })))

export const resumeDownload = _id => dispatch =>
  dispatch(wsSend(resumeDownloadRequest({ _id })))
