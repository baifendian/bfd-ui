import 'bfd-bootstrap'
import React from 'react'
import Icon from '../Icon'
import {
  findAllByType
} from '../util/ReactUtils'
import classnames from 'classnames'
import './main.less'

const Line = React.createClass({
  render() {
    const width = this.props.width
    const height = this.props.height
    const index = this.props.index
    const current = this.props.current
    const max = this.props.max;
    const w = width >= height ? height : width
    const y = (height / 2) - (height / 4) - 10
    const radius = w / 4

    const leftLineStyle = {
      left: '0px',
      top: Math.floor(y + radius) + 'px',
      width: (width / 2) + 'px',
      float: 'left'
    }

    const rightLineStyle = {
      left: width / 2 + radius + 'px',
      top: Math.floor(y + radius) + 'px',
      width: (width / 2) + 'px'
    }

    let classNameLeft = 'line_wait'
    let classNameRight = 'line_wait'
    if (index < current) {
      classNameLeft = 'line_finish'
      classNameRight = 'line_finish'
    } else if (index == current) {
      classNameLeft = 'line_finish'
      classNameRight = 'line_wait'
    }

    if (index == 0) {
      classNameLeft = 'line_hide'
    }
    if (index == max - 1) {
      classNameRight = 'line_hide'
    }

    return (
      <div>
        <div style={leftLineStyle} className={classnames('line', classNameLeft)}></div>
        <div style={rightLineStyle} className={classnames('line', classNameRight)}></div>
      </div>
    )
  }
})

const Title = React.createClass({
  render() {
    const title = this.props.title
    const index = this.props.index
    const current = this.props.current
    const height = this.props.height
    const y = (height / 2) - (height / 4) - 10
    const top = y * 2 + 'px'
    let className = 'title_process'
    if (index < current) {
      className = "title_finish"
    } else if (index > current) {
      className = "title_wait";
    }
    return (<div style={{top: top}} className={classnames('title', className)}>{title}</div>)
  }
})

const Circle = React.createClass({
  handleClick() {
    const index = this.props.index
    const title = this.props.title
    this.props.onStep && this.props.onStep(index, title)
  },
  render() {
    const width = this.props.width
    const height = this.props.height
    const index = this.props.index
    const current = this.props.current
    const icon = this.props.icon
    const w = width >= height ? height : width;
    const x = (width / 2) - (w / 4);
    const y = (height / 2) - (height / 4) - 10;
    const radius = w / 4;
    const fontSize = radius;
    const style = {
      width: (w / 2) + 'px',
      height: (w / 2) + 'px',
      left: x + 'px',
      top: y + 'px',
      borderRadius: radius + 'px',
      fontSize: fontSize + 'px',
      lineHeight: (w / 2) + 'px'
    }

    let NavIcon = index + 1
    if (icon) {
      NavIcon = <Icon type={icon} />
    }

    let className = "circle_process"
    if (index < current) {
      className = "circle_finish"
    } else if (index > current) {
      className = "circle_wait";
    }

    return (<div style={style} onClick={this.handleClick} className={classnames('circle', className)}>{NavIcon}</div>)
  }
})

const Step = React.createClass({
  render() {
    const style = {
      width: this.props.width + 'px',
      height: this.props.height + 'px'
    }
    const index = this.props.index
    const max = this.props.max

    return <div style={style} className='box'>
      <Line {...this.props} />
      <Circle {...this.props} />
      <Title {...this.props} />
    </div>
  }
})

const Steps = React.createClass({
  getInitialState() {
    return {
      width: 0,
      height: 0
    }
  },
  render() {

    let rows = [];
    const {
      children,
      ...other
    } = this.props
    delete other.current
    delete other.onStepClick
    const items = findAllByType(children, Step);
    items.map((item, index) => {
      rows.push(<Step 
        key={index} 
        index={index}         
        current={this.props.current || 0}
        icon = {item.props.icon}
        max={items.length}
        width={this.state.width} 
        height={this.state.height} 
        title={item.props.title || ''}
        onStep={this.props.onStepClick}
        />)
    })

    return (
      <div 
        ref='container' 
        style={{height:this.props.height+'px'}} 
        className={classnames('bfd-steps', this.props.className)} {...other}>
        {rows}
      </div>
    )
  },
  componentDidMount() {
    const container = this.refs.container
    if (!parseInt(getComputedStyle(container).height, 10)) {
      container.style.height = '100%'
    }

    const width = this.refs.container.clientWidth
    const height = this.refs.container.clientHeight
    const {
      children
    } = this.props;
    const items = findAllByType(children, Step);
    this.setState({
      width: width / items.length,
      height: height
    })
  }
})

export {
  Steps,
  Step
}