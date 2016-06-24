import React from 'react'
import Tree from 'c/Tree'
import SelectTree from 'c/Tree/SelectTree'
import Pre from '../Pre'
import { Props, Prop } from '../Props'
import Warn from '../Warn'
import Panel from '../Panel'

const codeData = `[{
        name: '数据工厂',
        open: true,
        children: [{
          name: 'adsdsd'
        }, {
          name: 'ioio'
        }, {
          name: 'tutrut',
          children: [{
            name: 'dasd'
          }]
        }]
      }, {
        name: '配置中心',
      }, {
        name: '配置中心2',
        children: [{
          name: 'dsads'
        }]
      }]`

const data = [{
  name: '数据工厂',
  open: true,
  children: [{
    name: 'adsdsd'
  }, {
    name: 'ioio'
  }, {
    name: 'tutrut',
    children: [{
      name: 'dasd'
    }]
  }]
}, {
  name: '配置中心',
}, {
  name: '配置中心2',
  children: [{
    name: 'dsads'
  }]
}]


// =======================================================================

const codeBasic = `import Tree from 'bfd-ui/lib/Tree/Tree'

export default React.createClass({

  getInitialState() {
    return {
      data: ${codeData}
    }
  },

  render() {
    return <Tree data={this.state.data} />
  }
})`

const Basic = React.createClass({

  getInitialState() {
    return {
      data: data
    }
  },

  render() {
    return <Tree data={this.state.data} />
  }
})


// =======================================================================

const codeCustomRender = `import Tree from 'bfd-ui/lib/Tree/Tree'

export default React.createClass({

  getInitialState() {
    return {
      data: ${codeData}
    }
  },

  render() {
    return <Tree data={this.state.data} render={data => <a href="">{data.name}</a>} />
  }
})`

const CustomRender = React.createClass({

  getInitialState() {
    return {
      data: data
    }
  },

  render() {
    return <Tree data={this.state.data} render={data => <a href="">{data.name}</a>} />
  }
})


// =======================================================================

const codeCustomIcon = `import Tree from 'bfd-ui/lib/Tree/Tree'

export default React.createClass({

  getInitialState() {
    return {
      data: ${codeData}
    }
  },

  render() {
    return <Tree data={this.state.data} getIcon={data => 'tag'} />
  }
})`

const CustomIcon = React.createClass({

  getInitialState() {
    return {
      data: data
    }
  },

  render() {
    return <Tree data={this.state.data} getIcon={data => 'tag'} />
  }
})


// =======================================================================

const codeDynamic = `import SelectTree from 'bfd-ui/lib/Tree/SelectTree'

export default React.createClass({
  
  getInitialState() {
    return {
      data: [{
        name: '数据工厂',
        isParent: true
      }, {
        name: '配置中心',
        isParent: true
      }]
    }
  },

  render() {
    return <Tree data={this.state.data} getUrl={data => '/data/tree-children.json'} />
  }
})
`

const Dynamic = React.createClass({

  getInitialState() {
    return {
      data: [{
        name: '数据工厂',
        isParent: true
      }, {
        name: '配置中心',
        isParent: true
      }]
    }
  },

  render() {
    return <Tree data={this.state.data} getUrl={data => '/data/tree-children.json'} />
  }
})


// =======================================================================

const codeSelectable = `import SelectTree from 'bfd-ui/lib/Tree/SelectTree'

export default React.createClass({
  
  getInitialState() {
    return {
      data: [{
        name: '数据工厂',
        open: true,
        children: [{
          name: 'adsdsd',
          checked: true
        }]
      }, {
        name: '配置中心',
        children: [{
          name: 'dsads'
        }]
      }, {
        name: '配置中心2'
      }]
    }
  },

  render() {
    return <SelectTree data={this.state.data} />
  }
})`

const Selectable = React.createClass({
  
  getInitialState() {
    return {
      data: [{
        name: '数据工厂',
        open: true,
        children: [{
          name: 'adsdsd'
        }]
      }, {
        name: '配置中心',
        children: [{
          name: 'dsads'
        }]
      }, {
        name: '配置中心2'
      }]
    }
  },

  render() {
    return <SelectTree data={this.state.data} />
  }
})

export default () => {
  return (
    <div>
      <h1>树 @hai.jiang</h1>

      <Panel title="基础展示" code={codeBasic}>
        <Basic />
      </Panel>

      <Panel title="自定义节点" code={codeCustomRender}>
        <CustomRender />
      </Panel>

      <Panel title="自定义图标" code={codeCustomIcon}>
        <CustomIcon />
      </Panel>

      <Panel title="动态数据" code={codeDynamic}>
        <p>数据量过大时，适合动态加载，需要指定 isParent 字段以及 getUrl 属性</p>
        <Dynamic />
      </Panel>

      <Panel title="节点可选择" code={codeSelectable}>
        <Selectable />
      </Panel>

      <h2>Tree</h2>
      <Props>
        <Prop name="data" type="array" required>
          <p>数据源，固定字段格式如下</p>
          <Pre>
{`[{
  name: '配置中心', // 显示的字符,
  open: true, // 是否展开，默认不展开就不需要这个字段了
  isParent: true, // 是否父节点，用于动态加载场景
  children: [] //子节点
}]`}
          </Pre>
        </Prop>
        <Prop name="onChange" type="function">
          <p>状态改变后的回调</p>
        </Prop>
        <Prop name="render" type="function">
          <p>节点渲染逻辑，参数为当前节点数据，默认渲染 data.name</p>
        </Prop>
        <Prop name="getIcon" type="function">
          <p>设置图标，参数为当前节点数据，可动态判断</p>
          <Pre>
{`<Tree getIcon={data => data.open ? 'folder-open' : 'folder'} />`}
          </Pre>
        </Prop>
        <Prop name="getUrl" type="function">
          <p>设置动态加载的数据源 URL，参数为当前节点数据，可动态判断</p>
          <Pre>
{`<Tree getUrl={data => '/api/node?pid=' + data.id} />`}
          </Pre>
          <p>返回格式同 data 属性</p>
          <Warn>动态加载方式需同时指定 isParent 字段以及 getUrl 属性</Warn>
        </Prop>
      </Props>

      <h2>SelectTree</h2>
      <Props>
        <Prop name="data" type="array">
          <p>数据源，多一个 checked 字段，格式如下</p>
          <Pre>
{`[{
  name: '配置中心', // 显示的字符,
  open: true, // 是否展开，默认不展开就不需要这个字段了
  checked: true, // 是否选中，默认不选中就不需要这个字段了
  children: [] //子节点
}]`}
          </Pre>
        </Prop>
        <p>其他属性同 Tree</p>
      </Props>
    </div>
  )
}