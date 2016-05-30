import React, { PropTypes } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu } from '../Dropdown'
import classnames from 'classnames'
import TextOverflow from '../TextOverflow'
import Fetch from '../Fetch'
import './Select.less'

const Select = React.createClass({

  getInitialState() {
    return {
      value: 'value' in this.props ? this.props.value : this.props.defaultValue
    }
  },

  componentWillReceiveProps(nextProps) {
    'value' in nextProps && this.setState({
      value: nextProps.value
    })  
  },

  handleLoad(list) {
    this.setState({ list })
  },

  getOptionWithProps(Option) {
    const { value, children } = Option.props
    let isActive = false
    if (this.state.value === value) {
      this.title = children
      isActive = true
    }
    return React.cloneElement(Option, {
      active: isActive,
      onClick: () => {
        this.refs.dropdown.close()
        this.setState({ value })
        this.props.onChange && this.props.onChange(value)
      }
    })
  },

  render() {
    const { className, children, disabled, url, render, defaultOption, ...other } = this.props
    const { list } = this.state

    let OptionsWithProps
    if (url) {
      OptionsWithProps = (list || []).map((...rest) => {
        return this.getOptionWithProps(render.apply(this, rest))
      })
      defaultOption && OptionsWithProps.unshift(this.getOptionWithProps(defaultOption))
    } else {
      OptionsWithProps = React.Children.map(children, this.getOptionWithProps)
    }

    return (
      <Dropdown ref="dropdown" className={classnames('bfd-select2', { disabled }, className)} disabled={disabled} {...other}>
        <DropdownToggle>
          <Fetch url={url} onSuccess={this.handleLoad}>
            <TextOverflow>
              <div className="title">{this.title}</div>
            </TextOverflow>
            <span className="caret"></span>
          </Fetch>
        </DropdownToggle>
        <DropdownMenu>
          <ul>{OptionsWithProps}</ul>
        </DropdownMenu>
      </Dropdown>
    )
  }
})

Select.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  url: PropTypes.string,
  render: PropTypes.func,
  defaultOption: PropTypes.element,
  customProp({ value, onChange, url, render }) {
    if (value && !onChange) {
      return new Error('You provided a `value` prop without an `onChange` handler')
    }
    if (url && !render) {
      return new Error('You provided a `url` prop without an `render` handler')
    }
  }
}

export default Select