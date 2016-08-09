import './checkboxGroup.less'
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import update from 'react-update'
import Checkbox from './Checkbox'
import shouldComponentUpdate from '../shouldComponentUpdate'

class CheckboxGroup extends Component {

  constructor(props) {
    super()
    this.update = update.bind(this)
    this.state = {
      selects: props.selects || []
    }
  }

  componentWillReceiveProps(nextProps) {
    nextProps.selects && this.update('set', 'selects', nextProps.selects)
  }

  shouldComponentUpdate = shouldComponentUpdate

  change(...args) {
    const selects = this.update(args)
    this.props.onChange && this.props.onChange(selects)
  }

  addSelect(value) {
    this.change('push', 'selects', value)
  }

  removeSelect(value) {
    this.change('splice', 'selects', this.state.selects.indexOf(value))
  }

  toggleAll(e) {
    const selects = e.target.checked ? this.state.selects.concat(this.unSelects) : []
    this.change('set', { selects })
  }

  handleCheckboxChange(value, e) {
    this[(e.target.checked ? 'add' : 'remove') + 'Select'](value)
  }

  render() {
    const { className, values, children, block, toggleable, ...other } = this.props
    const selects = this.state.selects
    const unSelects = []

    let checkboxes
    if (values) {
      checkboxes = values.map((value, i) => {
        const checked = selects.indexOf(value) !== -1
        checked || unSelects.push(value)
        return (
          <Checkbox 
            key={i} 
            value={value} 
            checked={checked} 
            onChange={this.handleCheckboxChange.bind(this, value)}
            block={block}
          >
            {value}
          </Checkbox>
        )
      })
    } else {
      checkboxes = React.Children.map(children, (Checkbox, i) => {
        if (!Checkbox) return
        const props = Checkbox.props
        const value = props.value
        
        const checked = selects.indexOf(value) !== -1

        if (!checked && !props.disabled) {
          unSelects.push(value)
        }

        return React.cloneElement(Checkbox, {
          key: i,
          checked: selects.indexOf(value) !== -1,
          block: props.block || block, 
          onChange: this.handleCheckboxChange.bind(this, value)
        })
      })
    }

    this.unSelects = unSelects

    return (
      <div 
        className={classnames('bfd-checkbox-group', className)} 
        {...other}
      >
        {toggleable && checkboxes && checkboxes.length > 1 && (
          <Checkbox 
            block={block} 
            checked={unSelects.length === 0} 
            onChange={::this.toggleAll}
          >
            全选
          </Checkbox>
        )}
        {checkboxes}
      </div>
    ) 
  }
}

CheckboxGroup.propTypes = {
  selects: PropTypes.array,
  values: PropTypes.array,
  onChange: PropTypes.func,
  block: PropTypes.bool,
  toggleable: PropTypes.bool
}

export default CheckboxGroup