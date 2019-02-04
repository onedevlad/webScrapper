import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { cancelDownload, pauseDownload, resumeDownload } from 'actions'

import { Tr, IndexCell, Url, Status, Progress, Speed, Action } from 'components/Table'


@connect(null, { cancelDownload, pauseDownload, resumeDownload })
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

  render() {
    const {
      index,
      url,
      progress,
      speed,
      status,
      error,
    } = this.props

    return (
      <Tr>
        <IndexCell index={index} />
        <Url url={url} error={error} />
        <Progress progress={progress} status={status} />
        <Speed speed={speed} status={status} />
        <Action
          status={status}
          resumeHandler={this.resumeHandler}
          pauseHandler={this.pauseHandler}
          removeHandler={this.removeHandler}
        />
        <Status status={status} />
      </Tr>
    )
  }
}
