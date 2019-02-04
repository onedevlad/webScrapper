import React, { Fragment } from 'react'
import { Badge, Button, Progress } from 'reactstrap'
import { connect } from 'react-redux'

import { unicodeIcons } from 'utils'
import { cancelDownload, pauseDownload, resumeDownload } from 'actions'
import { wsSend } from 'actions/ws'
import TableRow from 'components/TableRow'


@connect(null, { cancelDownload, pauseDownload, resumeDownload, wsSend })
export default class Resource extends React.Component {
  removeHandler = () => {
    const { cancelDownload, _id } = this.props
    cancelDownload(_id)
  }

  pauseHandler = () => {
    const { pauseDownload, _id } = this.props
    pauseDownload(_id)
  }

  resumeHandler = () => {
    const { resumeDownload, _id } = this.props
    resumeDownload(_id)
  }

  resolveStatusBadgeColor = status => {
    switch(status) {
      case 'RUNNING': return 'success'
      case 'ERROR':   return 'danger'
      case 'PAUSED':  return 'warning'
      case 'LOADED':  return 'primary'
      case 'PENDING': return 'secondary'
      default:        return 'info'
    }
  }

  resolveControls = status => {
    const Play = () =>  <Button color='warning' size='sm' onClick={this.resumeHandler}>{unicodeIcons.play}</Button>
    const Pause = () => <Button color='success' size='sm' onClick={this.pauseHandler}>{unicodeIcons.pause}</Button>

    const ControlButton = () => {
      switch(status) {
        case 'PAUSED':  return <Play />
        case 'RUNNING': return <Pause />
        case 'ERROR':   return <Play />
        default:        return null
      }
    }

    return (
      <Fragment>
        <ControlButton />
        {' '}
        <Button color='danger' size='sm' onClick={this.removeHandler}>{unicodeIcons.stop}</Button>
      </Fragment>
    )
  }

  resolveProgress = progress => (
    <Fragment>
     { `${progress} %` }
     <Progress value={progress} color='success'/>
    </Fragment>
  )

  resolveStatus = status => (
    <Badge color={this.resolveStatusBadgeColor(status)}>{status}</Badge>
  )

  resolveSpeed = speed => `${speed} KB/s`

  resolveUrl = (url, error) => (
    <Fragment>
      {
        error
        ? <Fragment><Badge color='danger'>{error}</Badge>{' '}</Fragment>
        : null
      }
      { url }
    </Fragment>
  )


  render() {
    const { index, url, error, status, progress, speed } = this.props

    return (
      <TableRow
        type='td'
        index={index}
        url={this.resolveUrl(url, error)}
        action={this.resolveControls(status)}
        progress={this.resolveProgress(progress)}
        status={this.resolveStatus(status)}
        speed={this.resolveSpeed(speed)}
      />
    )
  }
}
