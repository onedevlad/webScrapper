import React from 'react'
import { Input, Button, Badge, InputGroup, InputGroupAddon } from 'reactstrap'
import { connect } from 'react-redux'

import { unicodeIcons } from 'utils'
import { addResources } from 'actions'

import { Tr, IndexCell, Url, Status, Progress, Speed, Action } from 'components/Table'


const InputForm = ({ newUrl, handleUrlInput, addDownload }) => (
  <InputGroup>
    <Input
      type='text'
      placeholder='https://example.com'
      onChange={handleUrlInput}
      value={newUrl}
    />
    <InputGroupAddon addonType="append">
      <Button color='primary' onClick={addDownload}>{unicodeIcons.play}</Button>
    </InputGroupAddon>
  </InputGroup>
)


@connect(null, { addResources })
export default class NewResource extends React.Component {
  state = { newUrl: 'https://speed.hetzner.de/100MB.bin' }

  addDownload = () => {
    const { addResources } = this.props

    addResources([this.state.newUrl])
    this.setState({ newUrl: '' })
  }

  handleUrlInput = e => this.setState({newUrl: e.target.value})

  render() {
    const { index } = this.props
    const { newUrl } = this.state
    const status = 'NEW'

    return (
      <Tr>
        <IndexCell index={index} />
        <Url>
          <InputForm
            newUrl={newUrl}
            addDownload={this.addDownload}
            handleUrlInput={this.handleUrlInput}
          />
        </Url>
        <Progress status={status} />
        <Speed status={status} />
        <Action status={status} />
        <Status status={status} />
      </Tr>
    )
  }
}
