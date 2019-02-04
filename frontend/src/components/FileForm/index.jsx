import React from 'react'
import { Row, Col, Button } from 'reactstrap'
import injectSheet from 'react-jss'
import { connect } from 'react-redux'

import { addResources } from 'actions'
import { setError } from 'shared/wsActions'


const styles = {
  Root: {
    marginTop: '2em',
    textAlign: 'center',
  },
  Label: {
    margin: 0,
    cursor: 'pointer',
  }
}

@connect(null, { addResources, setError })
class FileForm extends React.Component {
  handleUpload = event => {
    const file = event.target.files[0]
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
    } finally {
      this.refs.fileInput.value = null
    }
  }

  render() {
    const { classes } = this.props

    return(
      <Row className={classes.Root}>
        <Col>
          <Button color='primary'>
            <label className={classes.Label}>
              Upload resource list
              <input type='file' ref='fileInput' hidden onChange={this.handleUpload} />
            </label>
          </Button>
        </Col>
      </Row>
    )
  }
}

export default injectSheet(styles)(FileForm)
