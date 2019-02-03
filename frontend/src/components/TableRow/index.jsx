import React from 'react'
import injectSheet from 'react-jss'

const styles = {
  Url: {
    wordWrap: 'break-word',
  },
  Centered: {
    textAlign: 'center',
  },
}

const TableRow = ({ index, url, progress, speed, action, status, type: Cell, classes }) => {
  const resolveClass = (size, style) => `col-${size} ${style}`

  return (
    <tr className='d-flex'>
      <Cell className={resolveClass(1, classes.Centered)}>{ index }</Cell>
      <Cell className={resolveClass(6, classes.Url)}>{ url }</Cell>
      <Cell className={resolveClass(1, classes.Centered)}>{ progress }</Cell>
      <Cell className={resolveClass(1, classes.Centered)}>{ speed }</Cell>
      <Cell className={resolveClass(2, classes.Centered)}>{ action }</Cell>
      <Cell className={resolveClass(1, classes.Centered)}>{ status }</Cell>
    </tr>
  )
}

export default injectSheet(styles)(TableRow)
