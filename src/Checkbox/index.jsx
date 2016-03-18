import React, { PropTypes } from 'react'
import './main.less'

const CheckboxGroup = React.createClass({

  propTypes: {
    selects: PropTypes.array,
    onChange: PropTypes.func
  },

  getInitialState() {
    return {
      selects: this.props.selects || []
    }
  },

  componentWillReceiveProps(nextProps) {
    this.setState({selects: nextProps.selects})  
  },

  childContextTypes: {
    getCheckboxGroupSelects: PropTypes.func,
    setCheckboxGroupSelects: PropTypes.func
  },

  getChildContext() {
    return {
      getCheckboxGroupSelects: () => this.state.selects,
      setCheckboxGroupSelects: (value, isAdd) => {
        const selects = this.state.selects
        if (isAdd) {
          selects.push(value)
        } else {
          selects.splice(selects.indexOf(value), 1)
        }
        this.props.onChange && this.props.onChange(selects)
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

  propTypes: {
    children: PropTypes.node.isRequired
  },

  contextTypes: {
    getCheckboxGroupSelects: PropTypes.func,
    setCheckboxGroupSelects: PropTypes.func
  },

  componentWillMount() {
    this.isGroup = !!this.context.getCheckboxGroupSelects
  },

  render() {
    const { children, ...props } = this.props

    if (this.isGroup) {

      // 选项卡组的逻辑单独处理
      const selects = this.context.getCheckboxGroupSelects()
      if (selects.length) {
        props.checked = selects.indexOf(this.props.value) > -1
      }
      
      props.onChange = e => {
        this.context.setCheckboxGroupSelects(e.target.value, e.target.checked)
      }
    }

    return (
      <div className="bfd-checkbox checkbox-inline">
        <label>
          <input type="checkbox" {...props}/>
          <span className="status"></span>
          {children}
        </label>
      </div>
    )
  }
})

export { CheckboxGroup, Checkbox }