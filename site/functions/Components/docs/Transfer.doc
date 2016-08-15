/**
 * @title 穿梭框
 */
import { Component } from 'react'
import Transfer from 'bfd/Transfer'

class TransferDemo extends Component {

  constructor(props) {
    super()
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
    this.state = {
      sourceData: sourceData,
      targetData: targetData
    };
  }

  render() {
    return (
      <Transfer 
        height={200} 
        title="已选的用户" 
        sdata={this.state.sourceData} 
        tdata={this.state.targetData}
        onChange={::this.handleChange}
        onSearch={::this.handleSearch}
        render={item => `${item.label}-${item.description}`}
      />
    )
  }

  handleChange(sourceData, targetData) {
    this.setState({
      sourceData: sourceData,
      targetData: targetData
    })
  }

  handleSearch(label, keyValue) {
    return label.indexOf(keyValue) != -1;
  }
}

@component Transfer