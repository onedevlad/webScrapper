import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'

const styles = {
  Root: {
    whiteSpace: 'nowrap',
  },
}

const Wrapper = injectSheet(styles)(
  ({ children, classes }) => <td className={['col-1', classes.Root].join(' ')}>{ children }</td>
)


const Speed = ({ speed=0, status }) => (
  status === 'RUNNING'
  ? <Wrapper> { `${speed} KB/s` }</Wrapper>
  : <Wrapper />
)

Speed.propTypes = {
  speed: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  status: PropTypes.string.isRequired,
}

export default Speed
