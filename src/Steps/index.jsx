import 'bfd-bootstrap'
import React from 'react'
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
    if(index < current) {
      classNameLeft = 'line_finish'
      classNameRight = 'line_finish'
    } else if(index == current) {
      classNameLeft = 'line_finish'
      classNameRight = 'line_wait'
    }

    if(index == 0) {
      classNameLeft = 'line_hide'
    }
    if(index == max - 1) {
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
    if(index < current) {
      className = "title_finish"
    } else if(index > current) {
      className = "title_wait";
    }
    return (<div style={{top: top}} className={classnames('title', className)}>{title}</div>)
  }
})

const Circle = React.createClass({
  render() {
    const width = this.props.width
    const height = this.props.height
    const index = this.props.index
    const current = this.props.current
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

    let className = "circle_process"
    if(index < current) {
      className = "circle_finish"
    } else if(index > current) {
      className = "circle_wait";
    }

    return (<div style={style} className={classnames('circle', className)}>{index + 1}</div>)
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

    let data = this.props.children
    if(!data) {
      return;
    }
    if(!(data instanceof Array)) {
      data = [data]
    }
    return {
      width: 0,
      height: 0,
      data : data
    }
  },
  render() {
    let rows = [];
    this.state.data.map((item, index) => {
      rows.push(<Step 
        key={index} 
        index={index}         
        current={this.props.current || 0}
        max={this.state.data.length}
        width={this.state.width} 
        height={this.state.height} 
        title={item.props.title || ''}/>)
    })
    
    return (
      <div 
        ref='container' 
        style={{height:this.props.height+'px'}} 
        className={classnames('bfd-steps', this.props.className)}>
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
    
    this.setState({
      width : width / this.state.data.length,
      height : height
    })
  }
})

export {
  Steps,
  Step
}