import { createAction } from 'redux-act'
import { fetch } from 'whatwg-fetch'

import { wsSend } from 'actions/ws'
import config from 'config'
const { API_REST_URL: API } = config


export const updateResource = createAction('Update resource status/progress')

export const getResourceListSuccess = createAction('Received resource list')
export const getResourceList = () => dispatch =>
  dispatch(wsSend({ type: 'GET_RESOURCE_LIST' }))

export const addResourceSuccess = createAction('Request adding a new resource')
export const addResource = url => dispatch =>
  dispatch(wsSend({ type: 'ADD_RESOURCE', payload: {url} }))

export const cancelDownloadSuccess = createAction('Downloading cancelled successfully')
export const cancelDownload = _id => dispatch =>
  dispatch(wsSend({ type: 'CANCEL_DOWNLOAD', payload: { _id } }))

export const pauseDownload = _id => dispatch =>
  dispatch(wsSend({ type: 'PAUSE_DOWNLOAD', payload: { _id } }))

export const resumeDownload = _id => dispatch =>
  dispatch(wsSend({ type: 'RESUME_DOWNLOAD', payload: { _id } }))
