import React from 'react'
import PropTypes from 'prop-types'
import { Progress } from 'reactstrap'


const Wrapper = ({ children }) => (<td className='col-1'>{ children }</td>)

const ProgressComponent = ({ progress=0, status }) => {
  if(status === 'LOADED') progress = 100
  if(status === 'NEW') return <Wrapper />
  if(status === 'PAUSED' && progress === 0) return <Wrapper>N/A</Wrapper>

  return (
    <Wrapper>
      { `${progress} %` }
      <Progress value={progress} color='success'/>
    </Wrapper>
  )
}

ProgressComponent.propTypes = {
  progress: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  status: PropTypes.string.isRequired,
}

export default ProgressComponent
