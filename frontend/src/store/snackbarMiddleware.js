import { showSnack } from 'react-redux-snackbar'

import { setError } from 'shared/wsActions'


export default ({ dispatch }) => next => action =>
  action.type === setError.toString()
  ? dispatch(
      showSnack(setError.toString(), {
        label: action.payload,
        timeout: 5000,
      })
    )
  : next(action)
