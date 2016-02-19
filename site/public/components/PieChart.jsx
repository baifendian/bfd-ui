import React from 'react'
import { render } from 'react-dom'
import PieChart from 'c/pieChart/index.jsx'

const config = {
      name:'访问来源',        
      data:[    //初始化数据。
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:848,name:'搜索引擎'},               
                {value:35, name:'测试1'},
                {value:35, name:'测试2'},
                {value:2, name:'测试3'},               
                {value:8,name:'测试4'},
                {value:348,name:'百分点'}
            ]
    }

export default () => {
  render(<PieChart config={config} />, document.getElementById('demo'))
}
