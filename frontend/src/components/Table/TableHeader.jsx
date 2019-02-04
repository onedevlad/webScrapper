import React from 'react'
import injectSheet from 'react-jss'

import { Tr } from 'components/Table'


const styles = {
  UrlTitle: {
    textAlign: 'left !important',
  },
}

const TableHeader = ({ classes }) => (
  <Tr>
    <th className='col-1'>#</th>
    <th className={['col-6', classes.UrlTitle].join(' ')}>URL</th>
    <th className='col-1'>Progress</th>
    <th className='col-1'>Speed</th>
    <th className='col-2'>Action</th>
    <th className='col-1'>Status</th>
  </Tr>
)

export default injectSheet(styles)(TableHeader)
