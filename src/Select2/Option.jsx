import React, { PropTypes } from 'react'
import TextOverflow from '../TextOverflow'
import classnames from 'classnames'
import './Option.less'

const Option = React.createClass({
  render() {
    const { className, children, active, ...other } = this.props
    return (
      <TextOverflow>
        <li className={classnames('bfd-select-option', className, { active })} {...other}>{children}</li>
      </TextOverflow>
    )
  }
})

Option.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default Option