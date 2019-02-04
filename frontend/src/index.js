import 'core-js/fn/object/assign'
import React from 'react'
import ReactDOM from 'react-dom'

import App from 'containers/Main'
import { Provider } from 'react-redux'
import store from 'store'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap-reboot.min.css'


// Render the main component into the dom
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'))
