import React from 'react'
import { Button } from 'reactstrap'

import { unicodeIcons } from 'utils'


export default ({ status, resumeHandler, pauseHandler, removeHandler }) => {
  const resumeAllowedStatuses = ['PAUSED', 'ERROR']
  const pauseAllowedStatuses = ['RUNNING']

  return (
    <td className='col-2'>
      {
        resumeAllowedStatuses.includes(status)
          && <Button color='warning' size='sm' onClick={resumeHandler}>{unicodeIcons.play}</Button>
      }
      {
        pauseAllowedStatuses.includes(status)
          && <Button color='success' size='sm' onClick={pauseHandler}>{unicodeIcons.pause}</Button>
      }
      {' '}
      {
        status !== 'NEW' && status !== 'VALIDATING'
          && <Button color='danger' size='sm' onClick={removeHandler}>{unicodeIcons.stop}</Button>
      }
    </td>
  )
}
