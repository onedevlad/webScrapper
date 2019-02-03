import { createReducer } from 'redux-act'

import {
  addResourceSuccess,
  getResourceListSuccess,
  cancelDownloadSuccess,
  updateResource,
} from 'actions'

const initialState = {}

const reduceCollection = arr => arr.reduce((acc, v) => ({...acc, [v._id]: v}), {})


export default createReducer({
  [addResourceSuccess]: (state, payload) => ({
    ...state,
    ...reduceCollection([payload]),
  }),
  [getResourceListSuccess]: (state, payload) => ({
    ...state,
    ...reduceCollection(payload),
  }),
  [cancelDownloadSuccess]: (state, payload) =>
    reduceCollection(
      Object.values(state).filter(resource => resource._id !== payload._id)
    ),
  [updateResource]: (state, payload) => ({
    ...state,
    [payload._id]: {
      ...state[payload._id],
      ...payload,
    },
  })
}, initialState)
