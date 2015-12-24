import './styles/components.css'
import React from 'react'
import demos from './demos'
import model from './model'

export default React.createClass({
  
  mixins: [model],
  
  // componentDidMount() {
  //   this.fetch('/getComponents', {component: this.props.params.name})
  //     .then((res) => {
  //       this.setState({post: res})
  //     })
  // },
  
  render() {
    // if (this.state) {
      var Demo = demos[this.props.params.name]
      return (
        <div>
          <div dangerouslySetInnerHTML={{__html: window.post}}></div>
          <Demo></Demo>
        </div>
      )
    // }
    // return null
    // else {
    //   return <span>loading...</span>
    // }
  }
})