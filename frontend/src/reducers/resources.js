import { createReducer } from 'redux-act'

import {
  addedResource,
  setResourceList,
  updatedResource,
  cancelledDownload,
} from 'shared/wsActions'


const initialState = {}

const reduceCollection = arr => arr.reduce((acc, v) => ({...acc, [v._id]: v}), {})

export default createReducer({
  [addedResource]: (state, payload) => ({
    ...state,
    ...reduceCollection([payload]),
  }),
  [setResourceList]: (state, payload) => ({
    ...state,
    ...reduceCollection(payload),
  }),
  [cancelledDownload]: (state, payload) =>
    reduceCollection(
      Object.values(state).filter(resource => resource._id !== payload._id)
    ),
  [updatedResource]: (state, payload) => ({
    ...state,
    [payload._id]: {
      ...state[payload._id],
      ...payload,
    },
  })
}, initialState)
