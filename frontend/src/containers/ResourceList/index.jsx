import React from 'react'
import { connect } from 'react-redux'

import { getResourceList } from 'actions'
import Resource from 'containers/Resource'
import NewResource from 'containers/NewResource'
import { Table } from 'components/Table'


@connect(
  ({ resources }) => ({ resources }),
  { getResourceList }
)
export default class ResourceList extends React.Component {
  componentDidMount() {
    this.props.getResourceList()
  }

  render() {
    const { resources, classes } = this.props
    const resourceCount = Object.keys(resources).length

    return (
      <Table>
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
      </Table>
    )
  }
}
