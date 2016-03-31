import React from 'react'
import Pre from '../Pre'
import { Props, Prop } from '../Props'
import Transfer from 'c/Transfer'


export default React.createClass({
  componentDidMount() {
    //this.setState({
    //  targetData : [{id:12, label:"jiangtl"},{id:13, label:"roloy"}]
    //});
  },
  getInitialState: function () {
    const sourceData = [
      {id : 1, label : "张三"},
      {id : 2, label : "李四"},
      {id : 3, label : "李五"},
      {id : 4, label : "李六"},
      {id : 5, label : "李七五"},
      {id : 6, label : "李八"},
      {id : 7, label : "李九四"},
      {id : 8, label : "李十"},
      {id : 9, label : "李时珍"}
    ];
    const targetData = [
      {id : 10, label : "张三疯"},
      {id : 11, label : "王二小"}
    ];
    return {
      sourceData : sourceData,
      targetData : targetData
    };
  },
  render() {
    return (
      <div>
        <h1>传输框</h1>
        <h2>Transfer</h2>
        <Pre>
        {`
import { Transfer } from 'bfd-ui/lib/Transfer'

const App = React.createClass({
  render() {
    var sourceData = [
      {id : 1, label : "张三"},
      {id : 2, label : "李四"},
      {id : 3, label : "李五"},
      {id : 4, label : "李六"},
      {id : 5, label : "李七五"},
      {id : 6, label : "李八"},
      {id : 7, label : "李九四"},
      {id : 8, label : "李十"},
      {id : 9, label : "李时珍"}
    ];
    var targetData = [
      {id : 10, label : "张三疯"},
      {id : 11, label : "王二小"}
    ];
    return <Transfer height={200} title={"已选的用户"} sdata={sourceData} tdata={targetData} />
  }
})`
        }
        </Pre>
        <Transfer height={200} title="已选的用户" sdata={this.state.sourceData} tdata={this.state.targetData} />
        <div className="clearfix"></div>

        <Props>          
          <Prop name="height" type="Number">
            <p>两个传输框高度，默认200px</p>
          </Prop>
          <Prop name="title" type="String">
            <p>右侧传输框上方标题</p>
          </Prop>
          <Prop name="sdata" type="Array">
            <p>源数据，包含id、label属性</p>
          </Prop>
          <Prop name="tdata" type="Array">
            <p>目标数据，包含id、label属性</p>
          </Prop>          
        </Props>
      </div>
    )
  }
}) 