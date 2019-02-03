import React from 'react'
import { Row, Col, Button } from 'reactstrap'
import injectSheet from 'react-jss'
import { connect } from 'react-redux'

import { addResource } from 'actions'


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

@connect(null, { addResource })
class FileForm extends React.Component {
  handleUpload = event => {
    const file = event.target.files[0]
    if (!file) return
    
    const fileReader = new FileReader()
    fileReader.onloadend = e => this.readFile(e.target.result)
    fileReader.readAsText(file)
  }

  readFile = content => {
    const { addResource } = this.props

    try {
      const resourceList = JSON.parse(content)
      if(!Array.isArray(resourceList)) throw new Exception('Input data is not an array')

      resourceList.forEach(addResource)
    } catch(e) {
      console.log(e)
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
              <input type='file' hidden onChange={this.handleUpload} />
            </label>
          </Button>
        </Col>
      </Row>
    )
  }
}

export default injectSheet(styles)(FileForm)
