import React from 'react'
import { Table, Row, Col } from 'reactstrap'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'

import Resource from 'components/Resource'
import NewResource from 'components/Resource/NewResource'
import { getResourceList } from 'actions'
import TableRow from 'components/TableRow'

const styles = {
  Root: {
    marginTop: '2em',
  }
}

@connect(
  ({ resources }) => ({ resources }),
  { getResourceList }
)
class ResourceList extends React.Component {
  componentDidMount() {
    this.props.getResourceList()
  }

  render() {
    const { resources, classes } = this.props
    const resourceCount = Object.keys(resources).length

    return (
      <Row className={classes.Root}>
        <Col>
          <Table dark>
            <thead>
              <TableRow
                type='th'
                index='#'
                url='URL'
                progress='Progress'
                speed='Speed'
                action='Action'
                status='Status'
              />
            </thead>
            <tbody>
              {
                Object.values(resources).map((resource, i) => (
                  <Resource
                    index={i+1}
                    key={resource._id}
                    _id={resource._id}
                    url={resource.url}
                    status={resource.status}
                    error={resource.error}
                    speed={resource.speed || 0}
                    progress={resource.progress || 0}
                  />
                ))
              }
              <NewResource index={resourceCount+1} />
            </tbody>
          </Table>
        </Col>
      </Row>
    )
  }
}

export default injectSheet(styles)(ResourceList)
