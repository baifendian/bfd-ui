/**
 * @title 基本功能
 */
import TreeSelect from 'bfd/TreeSelect'
import Checkbox from 'bfd/Checkbox'

const TreeSelectBasic = () => {
  const data = [{
    name: '节点0',
    value: '0',
    open: true,
    children: [{
      name: '节点0-0',
      value: '0-0'
    }]
  }, {
    name: '节点1',
    value: '1',
    open: true,
    children: [{
      name: '节点1-0',
      value: '1-0'
    }, {
      name: '节点1-1',
      value: '1-1'
    }]
  }]
  return (
    <TreeSelect
      defaultData={data}
      onChange={value => console.log(value)}
      getIcon={data => data.open ? 'folder-open' : 'folder'}
    />
  )
}


/**
 * @title URL 数据
 */
import TreeSelect from 'bfd/TreeSelect'

const TreeSelectURL = () => {
  return (
    <TreeSelect
      defaultValue="1"
      url="/data/tree-select.json"
      onChange={value => console.log(value)}
    />
  )
}


/**
 * @title 多选
 */
import TreeSelect from 'bfd/TreeSelect'

const TreeSelectMultiple = () => {
  return (
    <TreeSelect
      multiple
      defaultValue={['0', '1']}
      url="/data/tree-select.json"
      onChange={value => console.log(value)}
    />
  )
}


/**
 * @title 单选时节点是否可选择
 */
import TreeSelect from 'bfd/TreeSelect'

const TreeSelectable = () => {
  return (
    <TreeSelect
      url="/data/tree-select.json"
      shouldNodeSelectable={item => !item.children}
      onChange={value => console.log(value)}
    />
  )
}


/**
 * @title 多选时节点是否可勾选
 */
import TreeSelect from 'bfd/TreeSelect'

const TreeSelectCheckable = () => {
  return (
    <TreeSelect
      multiple
      defaultValue={['0-0', '1-0']}
      url="/data/tree-select.json"
      shouldNodeCheckable={item => !item.children}
      onChange={value => console.log(value)}
    />
  )
}


/**
 * @title 禁用
 */
import TreeSelect from 'bfd/TreeSelect'

const TreeSelectDisabled = () => {
  return (
    <TreeSelect disabled />
  )
}

@component TreeSelect
