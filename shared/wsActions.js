import { createAction } from 'redux-act'

// Client -> Server commands
export const getResourceListRequest = createAction('GET_RESOURCE_LIST_REQUEST')
export const addResourcesRequest = createAction('ADD_RESOURCES_REQUEST')
export const cancelDownloadRequest = createAction('CANCEL_DOWNLOAD_REQUEST')
export const pauseDownloadRequest = createAction('PAUSE_DOWNLOAD_REQUEST')
export const resumeDownloadRequest = createAction('RESUME_DOWNLOAD_REQUEST')

// Server -> Client commands
export const setResourceList = createAction('SET_RESOURCE_LIST')
export const cancelledDownload = createAction('CANCELLED_DOWNLOAD')
export const updatedResource = createAction('UPDATED_RESOURCE')
export const addedResource = createAction('ADDED_RESOURCE')
export const setError = createAction('SET_ERROR')

