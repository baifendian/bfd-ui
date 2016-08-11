import './Option.less'
import React, { PropTypes } from 'react'
import classnames from 'classnames'
import TextOverflow from '../TextOverflow'
import Icon from '../Icon'

const Option = props => {
  const { className, children, selected, active, ...other } = props
  const classNames = classnames(
    'bfd-select__option', 
    {
      'bfd-select__option--active': active,
      'bfd-select__option--selected': selected
    },
    className
  )
  return (
    <TextOverflow>
      <li className={classNames} {...other}>
        {selected && <Icon type="check" className="bfd-select__option-icon--selected" />}
        {children}
      </li>
    </TextOverflow>
  )
}

Option.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selected: PropTypes.bool,
  active: PropTypes.bool
}

export default Option