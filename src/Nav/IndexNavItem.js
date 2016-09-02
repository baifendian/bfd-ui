import React, { PropTypes } from 'react'
import NavItem from './NavItem'

const IndexNavItem = props => <NavItem index {...props} />

IndexNavItem.propTypes = {

  // 菜单图标，参考 Icon 组件 type 属性
  icon: PropTypes.string,

  // 菜单标题
  title: PropTypes.string
}

export default IndexNavItem