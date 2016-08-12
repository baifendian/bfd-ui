import './index.less'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import Button from 'bfd/Button'
import Pre from 'public/Pre'

class Demo extends Component {

  constructor(props) {
    super()
    this.state = {
      open: false
    }
  }

  componentDidMount() {
    this.codeHeight = ReactDOM.findDOMNode(this.refs.pre).offsetHeight
  }

  handleToggle() {
    this.setState({open: !this.state.open})
  }

  render() {
    const { className, title, desc, code, children } = this.props
    const { open } = this.state
    const classNames = classnames('demo', {
      'demo--open': open
    }, className)
    return (
      <div className={classNames}>
        <h2 className="demo__title">{title}</h2>
        <div className="demo__content">{children}</div>
        {desc && <div className="demo__desc">{desc}</div>}
        <div className="demo__toggle">
          <Button transparent icon="angle-double-down" onClick={::this.handleToggle}>
            代码
          </Button>
        </div>
        <div className="demo__code" ref="pre">
          <Pre>{code}</Pre>
        </div>
      </div>
    )
  }
}

export default Demo