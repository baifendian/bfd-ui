import React, { PropTypes } from 'react'
import xhr from '../xhr'
import { Select, Option } from '../Select2'

export default ComposedComponent => React.createClass({

  displayName: 'AjaxSelect()',

  propTypes: {
    url: PropTypes.string.isRequired,
    render: PropTypes.func,
    defaultOption: PropTypes.element
  },

  getInitialState() {
    return {
      value: 'value' in this.props ? this.props.value : this.props.defaultValue,
      isLoading: true
    }
  },

  componentWillMount() {
    this.fetch()
  },

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.url !== nextProps.url) {
      this.fetch()
      return false
    }
    return true
  },

  fetch() {
    this.setState({
      isLoading: true
    })
    xhr({
      url: this.props.url,
      success: data => {
        this.setState({
          data,
          isLoading: false
        })
      }
    })
  },

  componentWillReceiveProps(nextProps) {
    'value' in nextProps && this.setState({
      value: nextProps.value
    })  
  },

  handleChange(value) {
    this.setState({ value })
    this.props.onChange && this.props.onChange(value)
  },

  render() {
    const { isLoading, data } = this.state
    const { url, render, defaultOption, ...other } = this.props
    let Options
    if (isLoading) {
      other.value = '__loading'
      Options = <Option value="__loading">加载中</Option>
    } else {
      other.value = this.state.value
      Options = (data || []).map(this.props.render)
      if (defaultOption) {
        Options.unshift(defaultOption)
      }
    }
    other.onChange = this.handleChange
    return <ComposedComponent {...other}>{Options}</ComposedComponent>
  }
})