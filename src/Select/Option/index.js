import './index.less'
import React, { PropTypes } from 'react'
import classnames from 'classnames'
import TextOverflow from '../../TextOverflow'
import Icon from '../../Icon'

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
        {children}
        {selected && <Icon type="check" className="bfd-select__option-icon--selected" />}
      </li>
    </TextOverflow>
  )
}

Option.propTypes = {

  // 值，与 Select value 对应，数据类型也要一致
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selected: PropTypes.bool,
  active: PropTypes.bool
}

export default Option