# 加载 Fetch

@FetchBasic
```js
import Fetch from 'bfd/Fetch'
import { Select, Option } from 'bfd/Select'

class FetchBasic extends Component {

  constructor() {
    super()
    this.state = {
      url: '/data/loading.json',
      data: []
    }
  }

  handleChange(value) {
    this.setState({url: '/data/loading.json?type=' + value})
  }

  render() {
    const { url, data } = this.state
    return (
      <div>
        <Select defaultValue="0" onChange={::this.handleChange}>
          <Option value="0">昨天</Option>
          <Option value="1">最近7天</Option>
          <Option value="2">最近30天</Option>
        </Select>
        <Fetch
          defaultHeight={70}
          url={url}
          onSuccess={data => {this.setState({ data })}}
          delay={1000}
        >
          <ol>
            {data.map(item => <li key={item.event}>{item.event}</li>)}
          </ol>
        </Fetch>
      </div>
    )
  }
}
```

## \<Fetch /> 属性

### url `string`
数据源 URL，底层基于 [xhr](xhr) 模块

### onSuccess `function(response)`
加载成功后的回调
> 如`response` 值取决于 [xhr.success](xhr#success)，如果定义了的话

### defaultHeight `number`
默认高度，像素值

### spinnerHeight `number`
加载动画高度，默认 `30px`

### delay `number`
请求延迟，单位毫秒。测试使用，模拟网络延迟
