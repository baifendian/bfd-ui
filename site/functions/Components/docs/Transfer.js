import React from 'react'
import Pre from 'public/Pre'
import { Props, Prop } from 'public/Props'
import Transfer from 'bfd/Transfer'


export default React.createClass({
  componentDidMount() {
    //this.setState({
    //  targetData : [{id:12, label:"jiangtl"},{id:13, label:"roloy"}]
    //});
  },
  getInitialState: function() {
    const sourceData = [
      {id: 1, label: "张三", description: '描述1'},
      {id: 2, label: "李四", description: '描述2'},
      {id: 3, label: "李五", description: '描述3'},
      {id: 4, label: "李六", description: '描述4'},
      {id: 5, label: "李七五", description: '描述5'},
      {id: 6, label: "李八", description: '描述6'},
      {id: 7, label: "李九四", description: '描述7'},
      {id: 8, label: "李十", description: '描述8'},
      {id: 9, label: "李时珍", description: '描述9'}
    ];
    const targetData = [
      {id: 10, label: "张三疯", description: '描述10'},
      {id: 11, label: "王二小", description: '描述11'}
    ];
    return {
      sourceData: sourceData,
      targetData: targetData
    };
  },
  handleChange: function(sourceData, targetData) {
    this.setState({
      sourceData: sourceData,
      targetData: targetData
    })
  },
  handleSearch: function(label, keyValue) {
    return label.indexOf(keyValue) != -1;
  },
  render() {
    return (
      <div>
        <h1>传输框 @tenglong.jiang</h1>
        <h2>Transfer</h2>
        <Pre>
        {`
import Transfer from 'bfd-ui/lib/Transfer'

const App = React.createClass({
  handleSearch: function(label, keyValue) {
    return label.indexOf(keyValue) != -1;
  },
  render() {
    var sourceData = [
      {id: 1, label: '张三', description: '描述1'},
      {id: 2, label: '李四', description: '描述2'},
      {id: 3, label: '李五', description: '描述3'},
      {id: 4, label: '李六', description: '描述4'},
      {id: 5, label: '李七五', description: '描述5'},
      {id: 6, label: '李八', description: '描述6'},
      {id: 7, label: '李九四', description: '描述7'},
      {id: 8, label: '李十', description: '描述8'},
      {id: 9, label: '李时珍', description: '描述9'}
    ];
    var targetData = [
      {id: 10, label: '张三疯', description: '描述10'},
      {id: 11, label: '王二小', description: '描述11'}
    ];
    return <Transfer height={200} title={"已选的用户"} sdata={sourceData} tdata={targetData} onSearch={this.handleSearch} render={item => \`\${item.label}-\${item.description}\`} />
  }
})`
        }
        </Pre>
        <Transfer 
          height={200} 
          title="已选的用户" 
          sdata={this.state.sourceData} 
          tdata={this.state.targetData}
          onChange={this.handleChange}
          onSearch={this.handleSearch}
          render={item => `${item.label}-${item.description}`}
        />
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
          <Prop name="onChange" type="function">
            <p>传输框值改变后的回调函数。参数为改变后的值, 第一个参数：sdata, 第二个参数：tdata</p>
          </Prop>
          <Prop name="onSearch" type="function">
            <p>搜索框关键词与列表数据匹配规则函数, 第一个参数为列表项数据, 第二个参数为搜索关键词</p>
          </Prop>
          <Prop name="render" type="function">
            <p>每行数据渲染函数</p>
          </Prop>       
        </Props>
      </div>
    )
  }
}) 