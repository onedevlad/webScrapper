import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { connect } from 'react-redux'
import { Snackbar } from 'react-redux-snackbar'

import Header from 'components/Header'
import Dashboard from 'containers/Dashboard'

import { wsConnect } from 'actions/ws'


@connect(state => ({
  wsReady: state.ws.connectionReady,
}), { wsConnect })
export default class App extends React.Component {
  componentDidMount() {
    this.props.wsConnect()
  }

  render() {
    const { wsReady } = this.props

    return (
      <Container fluid>
        <Header />
        { wsReady
          ? <Dashboard />
          : <h5>Establishing WebSocket connection. Please wait...</h5>
        }
        <Snackbar />
      </Container>
    )
  }
}
