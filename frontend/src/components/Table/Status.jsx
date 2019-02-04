import React from 'react'
import { Badge } from 'reactstrap'


const resolveStatusBadgeColor = status => {
  switch(status) {
    case 'RUNNING': return 'success'
    case 'ERROR':   return 'danger'
    case 'PAUSED':  return 'warning'
    case 'LOADED':  return 'primary'
    case 'PENDING': return 'secondary'
    default:        return 'info'
  }
}


export default ({ status }) => (
  <td className='col-1'>
    <Badge color={resolveStatusBadgeColor(status)}>{status}</Badge>
  </td>
)
