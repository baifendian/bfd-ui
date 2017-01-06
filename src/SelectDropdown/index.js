/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import { Dropdown, DropdownToggle, DropdownMenu } from '../Dropdown'
import Fetch from '../Fetch'
import Icon from '../Icon'
import './index.less'

class SelectDropdown extends Component {

  close() {
    this.dropdown.close()
  }

  render() {

    const {
      className, children, title, url, hasPropValue, caret, onLoad, onToggle, minWidth,
      disabled, ...other
    } = this.props

    if (minWidth) {
      other.style = Object.assign(other.style || {}, { minWidth })
    }

    return (
      <Dropdown
        aligned
        onToggle={onToggle}
        disabled={disabled}
        ref={dropdown => this.dropdown = dropdown}
      >
        <DropdownToggle className={classnames('bfd-select-dropdown', {
          'bfd-select-dropdown--caretable': caret
        }, className)} {...other}>
          {url && hasPropValue ? (
            <Fetch
              spinnerHeight={20}
              defaultHeight={28}
              url={url}
              onSuccess={onLoad}
            >
              {title}
            </Fetch>
          ) : title}
          {caret && <Icon type="caret-down" className="bfd-select-dropdown__caret" />}
        </DropdownToggle>
        <DropdownMenu className="bfd-select-dropdown__popover">
          {url && !hasPropValue ? (
            <Fetch
              url={url}
              defaultHeight={30}
              spinnerHeight={20}
              onSuccess={onLoad}
            >
              {children}
            </Fetch>
          ) : children}
        </DropdownMenu>
      </Dropdown>
    )
  }
}

SelectDropdown.propTypes = {
  title: PropTypes.element.isRequired,
  url: PropTypes.string,
  hasPropValue: PropTypes.bool,
  caret: PropTypes.bool,
  disabled: PropTypes.bool,
  minWidth: PropTypes.number,
  onLoad: PropTypes.func,
  onToggle: PropTypes.func
}

export default SelectDropdown
