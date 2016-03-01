import React, { PropTypes } from 'react'
import './main.less'

const CheckboxGroup = React.createClass({

  getDefaultProps: function() {
    return {
      selects: []
    }
  },

  childContextTypes: {
    getCheckboxGroupSelects: PropTypes.func,
    setCheckboxGroupSelects: PropTypes.func
  },

  getChildContext() {
    return {
      getCheckboxGroupSelects: () => this.props.selects,
      setCheckboxGroupSelects: (value, isAdd) => {
        const selects = this.props.selects
        if (isAdd) {
          selects.push(value)
        } else {
          selects.splice(selects.indexOf(value), 1)
        }
        this.props.onChange(selects)
      }
    }
  },

  render() {
    let children
    if (this.props.values) {
      // 自动构建 values 与 label 相同的 Checkbox
      children = this.props.values.map((value, i) => <Checkbox key={i} value={value}>{value}</Checkbox>)
    } else {
      children = this.props.children
    }
    return <div className="checkbox-group">{children}</div>
  }
})

const Checkbox = React.createClass({

  contextTypes: {
    getCheckboxGroupSelects: PropTypes.func,
    setCheckboxGroupSelects: PropTypes.func
  },

  componentWillMount() {
    this.isGroup = !!this.context.getCheckboxGroupSelects
  },

  render() {
    const { children, ...other } = this.props

    if (this.isGroup) {

      // 选项卡组的逻辑单独处理
      other.checked = this.context.getCheckboxGroupSelects().indexOf(this.props.value) > -1
      other.onChange = e => {
        this.context.setCheckboxGroupSelects(e.target.value, e.target.checked)
      }
    }

    return (
      <label className="bfd-checkbox checkbox-inline">
        <input type="checkbox" {...other}/>
        <span className="status"></span>
        {children}
      </label>
    )
  }
})

export { CheckboxGroup, Checkbox }