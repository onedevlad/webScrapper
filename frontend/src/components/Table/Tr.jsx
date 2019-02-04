import React from 'react'
import injectSheet from 'react-jss'


const styles = {
  Root: {
    '& > *': {
      textAlign: 'center',
    }
  }
}

const Tr = ({ children, classes }) => <tr className={['d-flex', classes.Root].join(' ')}>{ children }</tr>


export default injectSheet(styles)(Tr)
