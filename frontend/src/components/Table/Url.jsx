import React, { Fragment } from 'react'
import { Badge } from 'reactstrap'
import injectSheet from 'react-jss'


const styles = {
  Root: {
    textAlign: 'left !important',
    wordBreak: 'break-all',
    // wordWrap: 'break-word',
  }
}

const Wrapper = injectSheet(styles)(
  ({ children, classes }) => <td className={['col-6', classes.Root].join(' ')}>{ children }</td>
)


export default ({ url, error, children }) => (
  children
  ? <Wrapper>{ children }</Wrapper>
  : (
    <Wrapper>
      {
        error
          ? <Fragment><Badge color='danger'>{error}</Badge><br/></Fragment>
          : null
      }
      {url}
    </Wrapper>
  )
)
