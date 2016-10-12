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
    this.refs.dropdown.close()
  }

  render() {

    const {
      className, children, title, url, hasPropValue, caret, onLoad, ...other
    } = this.props

    const Toggle = url && hasPropValue ? (
      <Fetch spinnerHeight={20} url={url} onSuccess={onLoad}>{title}</Fetch>
    ) : title

    return (
      <Dropdown
        ref="dropdown"
        className={classnames('bfd-select-dropdown', {
          'bfd-select-dropdown--caretable': caret
        }, className)}
        {...other}
      >
        <DropdownToggle tabIndex="0">
          {Toggle}
          {caret && <Icon type="caret-down" className="bfd-select-dropdown__caret" />}
        </DropdownToggle>
        <DropdownMenu>
          {
            url && !hasPropValue ? (
              <Fetch
                url={url}
                defaultHeight={30}
                spinnerHeight={20}
                onSuccess={onLoad}
              >
                {children}
              </Fetch>
            ) : children
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
