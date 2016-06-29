import React, { PropTypes } from 'react'
import Checkbox from './Checkbox'
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'
import classnames from 'classnames'
import './less/checkboxGroup.less'

const CheckboxGroup = React.createClass({

  getInitialState() {
    return {
      selects: this.props.selects || []
    }
  },

  addSelect(value) {
    const selects = this.state.selects
    selects.push(value)
    this.props.onChange && this.props.onChange(selects)
  },

  removeSelect(value) {
    const selects = this.state.selects
    selects.splice(selects.indexOf(value), 1)
    this.props.onChange && this.props.onChange(selects)
  },

  render() {
    const { className, values, children, block, ...other } = this.props

    let checkboxes
    if (values) {
      checkboxes = values.map((value, i) => {
        return <Checkbox key={i} value={value} block={block}>{value}</Checkbox>
      })
    } else {
      checkboxes = React.Children.map(children, (Checkbox, i) => {
        const props = Checkbox.props
        const value = props.value
        return React.cloneElement(Checkbox, {
          key: i,
          checked: this.state.selects.indexOf(value) !== -1,
          block: props.block || block, 
          onChange: e => {
            this[(e.target.checked ? 'add' : 'remove') + 'Select'](value)
          }
        })
      })
    }
    return (
      <div 
        className={classnames('bfd-checkbox-group', className)} 
        {...other}
      >
        {checkboxes}
      </div>
    ) 
  }
})

CheckboxGroup.propTypes = {
  selects: PropTypes.array,
  values: PropTypes.array,
  onChange: PropTypes.func,
  block: PropTypes.bool
}

export default CheckboxGroup