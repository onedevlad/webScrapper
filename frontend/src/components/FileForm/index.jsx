import React from 'react'
import { Row, Col, Button } from 'reactstrap'
import injectSheet from 'react-jss'


const styles = {
  Root: {
    marginTop: '2em',
    textAlign: 'center',
  },
  Label: {
    margin: 0,
    cursor: 'pointer',
  },
  Hint: {
    color: '#aaa',
    fontSize: '0.75em',
  },

}

@injectSheet(styles)
export default class FileForm extends React.Component {
  handleChange = event => {
    this.props.handleUpload(event.target.files[0])
    event.target.value = ''
  }

  render() {
    const { classes } = this.props

    return (
      <Row className={classes.Root}>
        <Col>
          <Button color='primary'>
            <label className={classes.Label}>
              Upload resource list
              <input type='file' hidden onChange={this.handleChange} />
            </label>
          </Button>
          <br/>
          <span className={classes.Hint}>(Expecting a JSON array of URL strings)</span>
        </Col>
      </Row>
    )
  }
}

