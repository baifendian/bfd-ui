import './index.less'
import React, { PropTypes, Component } from 'react'
// import ReactDOM from 'react-dom'
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
    // this.codeHeight = ReactDOM.findDOMNode(this.refs.pre).offsetHeight
  }

  handleToggle() {
    this.setState({open: !this.state.open})
  }

  render() {
    const { className, code, children } = this.props
    const { open } = this.state
    const classNames = classnames('demo', {
      'demo--open': open
    }, className)
    return (
      <div className={classNames}>
        <div className="demo__content">{children}</div>
        <div className="demo__toggle">
          <Button transparent icon="angle-double-down" onClick={::this.handleToggle}>
            代码
          </Button>
        </div>
        <div className="demo__code" ref="pre">
          <Pre transparent>{code}</Pre>
        </div>
      </div>
    )
  }
}

Demo.propTypes = {
  code: PropTypes.string.isRequired
}

export default Demo
