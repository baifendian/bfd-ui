import './index.less'
import React, { PropTypes } from 'react'
import classnames from 'classnames'

const Col = props => {
  const { children, className, col, left, right, ...other} = props
  const classNames = classnames(
    'bfd-col',
    col && col.split(' ').map(v => 'bfd-col--' + v),
    {
      'bfd-col--right': right
    },
    className
  )
  return <div className={classNames} {...other}>{children}</div>
}

Col.propTypes = {

  // 布局规则，col="md-6 sm-5"，参考 bootstrap 布局用法
  col: PropTypes.string,

  // 是否右浮动
  right: PropTypes.bool
}

export default Col