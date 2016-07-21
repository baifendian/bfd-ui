import React, { PropTypes } from 'react'
import TextOverflow from '../TextOverflow'
import classnames from 'classnames'
import Icon from '../Icon'
import './Option.less'

const Option = React.createClass({
  render() {
    const { className, children, select, ...other } = this.props
    return (
      <TextOverflow>
        <li className={classnames('bfd-select-option', className, { select })} {...other}>
          {select ? <Icon type="check" className="icon-check" /> : null}
          {children}
        </li>
      </TextOverflow>
    )
  }
})

Option.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default Option