import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import { Dropdown, DropdownToggle, DropdownMenu } from '../Dropdown'
import Fetch from '../Fetch'
import Icon from '../Icon'
import './index.less'

class SelectDropdown extends Component {

  close() {
    this.refs.dropdown.close()
  }

  render() {
    
    const { 
      className, children, title, url, hasPropValue, caret, onLoad, ...other 
    } = this.props

    const Toggle = url && hasPropValue ? (
      <Fetch url={url} onSuccess={onLoad}>{title}</Fetch>
    ) : title
      
    return (
      <Dropdown 
        ref="dropdown" 
        className={classnames('bfd-select-dropdown', {
          'bfd-select-dropdown--caretable': caret
        }, className)} 
        {...other}
      >
        <DropdownToggle>
          {Toggle}
          {caret && <Icon type="caret-down" className="bfd-select-dropdown__caret" />}
        </DropdownToggle>
        <DropdownMenu>
          {
            url && !hasPropValue ? 
              <Fetch url={url} onSuccess={onLoad}>{children}</Fetch> :
              children
          }
        </DropdownMenu>
      </Dropdown>
    )
  }
}

SelectDropdown.propTypes = {
  title: PropTypes.element.isRequired,
  url: PropTypes.string,
  hasPropValue: PropTypes.bool,
  caret: PropTypes.bool
}

export default SelectDropdown