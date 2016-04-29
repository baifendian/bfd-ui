import React, { PropTypes } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu } from '../Dropdown'
import classnames from 'classnames'
import './index.less'

const Title = React.createClass({

  getInitialState() {
    return {
      title: null
    }
  },

  render() {
    return <div>{this.state.title}</div>
  }
})

const Select = React.createClass({

  getInitialState() {
    return {
      value: ''
    }
  },

  getChildContext() {
    return {
      select: this
    }
  },

  getValue() {
    return 'value' in this.props ? this.props.value : this.state.value
  },

  setValue(value) {
    'value' in this.props || this.setState({ value })
    this.props.onChange && this.props.onChange(value)
    this.refs.dropdown.close()
  },

  setTitle(title) {
    this.title = title
  },

  componentDidMount() {
    this.refs.title.setState({title: this.title})
  },

  componentDidUpdate() {
    this.refs.title.setState({title: this.title})
  },

  render() {  
    const { className, children, disabled, ...other } = this.props
    return (
      <Dropdown ref="dropdown" className={classnames('bfd-select', disabled, className)} disabled={disabled} {...other}>
        <DropdownToggle>
          <Title ref="title"></Title>
          <span className="caret"></span>
        </DropdownToggle>
        <DropdownMenu>
          <ul>{children}</ul>             
        </DropdownMenu>
      </Dropdown>
    )
  }  

})

Select.childContextTypes = {
  select: PropTypes.instanceOf(Select)
}

Select.defaultProps = {
  value: ''
}

Select.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  customProp({ value, onChange }) {
    if (value && !onChange) {
      return new Error('You provided a `value` prop without an `onChange` handler')
    }
  }
}


const Option = React.createClass({

  handleClick() {
    this.context.select.setValue(this.props.value)
  },

  render() {
    const { className, children, ...other } = this.props
    const select = this.context.select
    const selectValue = String(select.getValue())
    const value = String(this.props.value)

    if (selectValue === value) {
      select.setTitle(children)
    }

    let active
    if (selectValue && value) {
      active = selectValue === value
    }

    return <li className={classnames(className, {active})} onClick={this.handleClick} {...other}>{children}</li>
  }
})

Option.contextTypes = {
  select: PropTypes.object
}

Option.defaultProps = {
  value: ''
}

Option.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export { Select, Option }