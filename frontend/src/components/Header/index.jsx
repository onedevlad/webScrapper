import React from 'react'
import { Row, Col } from 'reactstrap'
import injectSheet from 'react-jss'

const styles = {
  Root: {
    marginTop: '2em',
    marginBottom: '2em',
  },
  Header: {
    textAlign: 'center',
  }
}

const Header = ({ classes }) => (
  <Row className={classes.Root}>
    <Col>
      <h1 className={classes.Header}>WebScrapper</h1>
    </Col>
  </Row>
)

export default injectSheet(styles)(Header)
