import React from 'react'
import { render } from 'react-dom'
import PieChart from 'c/pieChart/index.jsx'


export default React.createClass({

  getInitialState() {
    return {
      post: window.post
    }
  },  
  componentDidMount() {   
    var config = {
      name:'访问来源',
      // radius:{     //设置饼图的半径比例大小。
      //   inner:0.45,
      //   outer:0.6
      // },  
      // lineLabel:{  //设置label和line的位置。
      //   inner:0.5,
      //   outer:0.75
      // },    
      // animation:{    //设置动画时间。
      //   pie:2500,    //加载饼图圆的时间。
      //   lineText:500 //加载线和标签文字的时间。
      // },
      data:[    //初始化数据。
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:848,name:'搜索引擎'},
                {value:348,name:'百分点'}
            ]
    };
    render(<PieChart config={config} />, document.getElementById('demo'))
  },

  render() {
    return <div dangerouslySetInnerHTML={{__html: this.state.post}}></div>
  }
})