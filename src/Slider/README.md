/**
 * @title 拖动条
 */
import { Component } from 'react'
import Slider from 'bfd/Slider'

class SliderDemo extends Component {

  render() {
    return (
      <Slider defaultValue={40} tickValue={5} start={0} end={100} suffix="%" onSliding={::this.handleSliding} onSlid={::this.handleSlid}/>
    )
  }

  handleSliding(value) {
    console.log('sliding:', value);
  }

  handleSlid(value) {
    console.log('slid:', value);
  }
}

@component Slider