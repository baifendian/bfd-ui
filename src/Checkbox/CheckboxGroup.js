import React, { PropTypes } from 'react'
import Checkbox from './Checkbox'
import classnames from 'classnames'
import './less/checkboxGroup.less'

const CheckboxGroup = React.createClass({

  getInitialState() {
    return {
      selects: this.props.selects || []
    }
  },

  componentWillReceiveProps(nextProps) {
    nextProps.selects && this.setState({selects: nextProps.selects})  
  },

  update(selects) {
    this.setState({ selects })
    this.props.onChange && this.props.onChange(selects)
  },

  addSelect(value) {
    const selects = this.state.selects
    selects.push(value)
    this.update(selects)
  },

  removeSelect(value) {
    const selects = this.state.selects
    selects.splice(selects.indexOf(value), 1)
    this.update(selects)
  },

  toggleAll(e) {
    const selects = this.state.selects
    if (e.target.checked) {
      Array.prototype.push.apply(selects, this.unSelects)
    } else {
      selects.length = 0
    }
    this.update(selects)
  },

  handleCheckboxChange(value, e) {
    this[(e.target.checked ? 'add' : 'remove') + 'Select'](value)
  },

  render() {
    const { className, values, children, block, toggleable, ...other } = this.props
    const selects = this.state.selects
    const unSelects = []

    delete other.selects

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
        {
          toggleable && checkboxes && checkboxes.length > 1 ? 
          <Checkbox 
            block={block} 
            checked={unSelects.length === 0} 
            onChange={this.toggleAll}
          >
            全选
          </Checkbox> : 
          null
        }
        {checkboxes}
      </div>
    ) 
  }
})

CheckboxGroup.propTypes = {
  selects: PropTypes.array,
  values: PropTypes.array,
  onChange: PropTypes.func,
  block: PropTypes.bool,
  toggleable: PropTypes.bool
}

export default CheckboxGroup