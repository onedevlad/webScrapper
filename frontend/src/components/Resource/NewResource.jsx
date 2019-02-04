import React from 'react'
import { Input, Button, Badge, InputGroup, InputGroupAddon } from 'reactstrap'
import { connect } from 'react-redux'

import { unicodeIcons } from 'utils'
import { addResources } from 'actions'
import TableRow from 'components/TableRow'


@connect(null, { addResources })
export default class NewResource extends React.Component {
  state = { newUrl: 'https://speed.hetzner.de/100MB.bin' }

  addDownload = () => {
    const { addResources } = this.props

    addResources([this.state.newUrl])
    this.setState({ newUrl: '' })
  }

  handleUrlInput = e => this.setState({newUrl: e.target.value})


  resolveInputForm = newUrl => (
    <InputGroup>
      <Input
        type='text'
        placeholder='https://example.com'
        onChange={this.handleUrlInput}
        value={newUrl}
      />
      <InputGroupAddon addonType="append">
        <Button color='primary' onClick={this.addDownload}>{unicodeIcons.play}</Button>
      </InputGroupAddon>
    </InputGroup>
  )

  render() {
    const { index } = this.props
    const { newUrl } = this.state

    return (
      <TableRow
        type='td'
        index={index}
        url={this.resolveInputForm(newUrl)}
        status={<Badge color='primary'>NEW</Badge>}
        progress={null}
        action={null}
        speed={null}
      />
    )
  }
}
