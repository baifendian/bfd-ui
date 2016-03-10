import React from 'react'
import { render } from 'react-dom'
import DatePicker from 'c/DatePicker/index.jsx'

const App = React.createClass({

  getInitialState() {
    return {
      date: '2016-03-05'
    }
  },

  componentDidMount() {
    // setTimeout(()=> {
    //   this.setState({date: '2015-01-01'})
    // }, 1000)  
  },

  render() {
    return <DatePicker date={this.state.date}/>
  }
})

export default () => {
  // render(<DatePicker date="2015-01-01"/>, document.getElementById('demo'))
  render(<App/>, document.getElementById('demo'))
}