import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import config from 'config'
import rootReducer from 'reducers'
import wsMiddleware from 'store/wsMiddleware'
import snackbarMiddleware from 'store/snackbarMiddleware'

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    applyMiddleware(wsMiddleware),
    applyMiddleware(snackbarMiddleware),
    config.appEnv === 'dev'
    ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    : x => x
  ),
)

export default store
