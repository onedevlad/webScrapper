import React from 'react'
import { connect } from 'react-redux'

import { addResources } from 'actions'
import { setError } from 'shared/wsActions'

import FileFormComponent from 'components/FileForm'


@connect(null, { addResources, setError })
export default class FileForm extends React.Component {
  handleUpload = file => {
    if (!file) return
    
    const fileReader = new FileReader()
    fileReader.onloadend = e => this.readFile(e.target.result)
    fileReader.readAsText(file)
  }

  readFile = content => {
    const { addResources, setError } = this.props

    try {
      const resourceList = JSON.parse(content)
      if(!Array.isArray(resourceList)) throw new Exception('Input data is not an array')

      addResources(resourceList)
    } catch(e) {
      setError(e.toString())
    }
  }

  render() {
    return(
      <FileFormComponent handleUpload={this.handleUpload} />
    )
  }
}
