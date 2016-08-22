/**
 * @title 基本功能
 */
import TableTree from 'bfd/TableTree'

class TableTreeBasic extends Component {

  constructor() {
    super()
    this.columns = [{
      title: '资源名称',
      key: 'name'
    }, {
      title: '授权状态',
      render: item => item.status === 1 ? '已授权' : '未授权'
    }, {
      title: '授权用户',
      render: item => <a href="">查看用户</a>
    }]
  }

  render() {
    return <TableTree url="/data/tableTree.json" columns={this.columns} />
  }
}

@component TableTree