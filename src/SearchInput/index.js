/**
 * Created by tenglong.jiang on 2016-05-13.
 */
 
import React, { Component, PropTypes } from 'react'
import Button from '../Button'
import ClearableInput from '../ClearableInput'
import classnames from 'classnames'
import './main.less'

class SearchInput extends Component {

  constructor(props) {
    super()
    this.value = ''
  }

  render() {
    const { className, ...other } = this.props
    const size = this.props.size || 'lg'
    const width = this.props.width || '300px'
    this.value = this.props.defaultValue || ''
    return (
      <div className={classnames('bfd-search_input', className, size)} {...other}>        
        <ClearableInput style={{width: width}} defaultValue={this.value} size={size} onChange={::this.handleChange} inline placeholder={this.props.placeholder || ''}/>
        <Button size={size} onClick={::this.handleClick} icon="search">{this.props.label || '搜索'}</Button>
      </div>
    )
  }

  handleChange(v) {
    this.value = v
    this.props.onChange && this.props.onChange(v)
  }

  handleClick() {
    if (typeof this.props.onSearch == 'function') {
      this.props.onSearch(this.value)
    }
  }
}

SearchInput.propTypes = {
  onSearch: React.PropTypes.func.isRequired
}

export default SearchInput