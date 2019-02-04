import React from 'react'
import { Row, Col, Table } from 'reactstrap'
import injectSheet from 'react-jss'

import { TableHeader } from 'components/Table'


const styles = {
  Root: {
    marginTop: '2em',
  }
}

const TableComponent = ({ classes, children }) => (
  <Row className={classes.Root}>
    <Col>
      <Table dark>
        <thead>
          <TableHeader />
        </thead>
        <tbody>
          { children }
        </tbody>
      </Table>
    </Col>
  </Row>
)


export default injectSheet(styles)(TableComponent)
