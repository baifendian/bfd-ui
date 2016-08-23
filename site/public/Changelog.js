import React from 'react'
import Version from './Version'
import Pre from './Pre'

function ChangeLog() {
  return (
    <div>
      <Version version="0.7.6" date="2016-08-19">
        <ol>
          <li>修复分页显示的问题</li>
          <li>修复 DataTable 切换分页后复选框的问题</li>
          <li>修复 IE 下 DatePicker 日期异常的问题</li>          
          <li>去除 IE 下 input 默认的清空标识</li>
          <li>Tree render 回调添加 path 参数，方便操作数据</li>
          <li>TableTree columns 配置 render 回调添加 path 参数，方便操作数据</li>
        </ol>
      </Version>

      <Version version="0.7.0" date="2016-08-08">
        <p>新增组件: </p>
        <ul>
          <li>输入框: Input</li>
          <li>按钮组: ButtonGroup</li>
        </ul>
        <p>其他: </p>
        <ol>
          <li>Nav 组件多级菜单样式调整</li>
          <li>Button size 属性新增 lg 类型</li>          
          <li>Col 新增 right 属性，实现右浮动</li>
          <li>修复 Select value 重置后搜索框不重置的问题</li>
          <li>xhr 新增全局 header 配置，设置所有请求的请求头</li>          
          <li>SearchInput 新增 defaultValue属性，设定默认值</li>
        </ol>
      </Version>

      <Version version="0.6.1" date="2016-08-03">
        <ol>
          <li>修复 NavItem href 未更新的问题</li>
          <li>Modal 新增 open 属性，控制打开状态</li>
        </ol>
      </Version>

      <Version version="0.6.0" date="2016-07-29">
        <p>新增组件: </p>
        <ul>
          <li>布局: Row, Col</li>
        </ul>
        <p>其他: </p>
        <ol>
          <li>Button 新增 icon、circle、transparent、disabled 属性；type 可选值更新</li>
          <li>Modal 新增 onClose 属性</li>
        </ol>
      </Version>

      <Version version="0.5.4" date="2016-07-27">
        <ol>
          <li>Tree 新增 dataFilter 属性，过滤 getUrl 方式返回的数据</li>
          <li>SelectTree 新增 onSelect 属性，用于处理复选框选中逻辑</li>
          <li>DataTable 新增排序事件 onOrder</li>
          <li>SplitPanel 新增拖拽事件 onSplit</li>
        </ol>
      </Version>
      
      <Version version="0.5.2" date="2016-07-21">
        <ol>
          <li>修复 NavItem 首次进入页面高亮时没有展开的问题</li>
          <li>xhr 新增全局设置: error, timeout, onTimeout</li>
          <li>修复 Select value 重置空值时 placeholder 不显示的问题；没有内容时的样式问题</li>
          <li>修复 shouldComponentUpdate 算法 bug，解决组件状态不更新的问题</li>
          <li>Steps 增加鼠标划过效果；Step 新增 icon 图标配置项</li>
          <li>Slider 解决在移动过程中滑块有少许偏差的问题</li>
          <li>SearchInput 新增 onChange 事件</li>
        </ol>
      </Version>

      <Version version="0.5.0" date="2016-07-15">
        <p>新增组件: </p>
        <ul>
          <li>分栏: SplitPanel</li>
        </ul>
        <p>其他: </p>
        <ol>
          <li>Select 添加 searchable 属性，支持搜索</li>
          <li>SearchInput 新增 label 属性，更改搜索按钮文本；新增 size 属性，设定组件尺寸</li>
          <li>修复 DataTable 序号列显示错误问题</li>
          <li>修复 Tabs 切回后 TabPanel 重新 Mount 的问题</li>
          <li>ClearableInput 添加 focus 方法，控制 input focus 行为</li>
        </ol>
      </Version>

      <Version version="0.4.0" date="2016-07-13">
        <p>新增组件: </p>
        <ul>
          <li>表格树: TableTree</li>
        </ul>
        <p>其他: </p>
        <ol>
          <li>优化图表组件容器结构</li>
          <li>修复 Tree getUrl 方式返回空时的问题；getUrl 回调参数添加当前节点路径下数据集合；整体样式调整；添加 defaultData 属性实现不可控特性</li>
          <li>修复 wrapper 型组件遍历子组件时出现空值造成的问题</li>
          <li>ClearableInput 添加 onClear 属性，响应清空事件</li>
        </ol>
      </Version>

      <Version version="0.3.10" date="2016-07-08">
        <ol>
          <li>CheckboxGroup 新增 toggleable 属性，控制启用全选功能；修复 selects 属性改变后不更新的问题</li>
          <li>修复 LineChart data 属性更新后未重绘、只有一条数据 tooltip 显示错误的问题</li>
          <li>修改 Editable  onChange 触发规则，不再验证值是否改变</li>
          <li>修复 DataTable 更新 currentPage 无效的问题</li>
          <li>SearchInput 清空时，自动触发 onSearch</li>
        </ol>
      </Version>
      
      <Version version="0.3.9" date="2016-07-05">
        <ol>
          <li>TabPanel 调整为激活时渲染，解决初始化渲染时因隐藏导致的一系列问题</li>
          <li>NavItem 修改为默认折叠状态，增加 defaultOpen 来控制默认展开状态</li>
          <li>message 添加 close 方法，关闭消息</li>
          <li>Steps 新增 onStepClick 属性，响应单条步骤点击事件</li>
          <li>修复 DataTable data 属性指定 currentPage 无效的问题</li>
        </ol>
      </Version>
      
      <Version version="0.3.3" date="2016-06-29">
        <ol>
          <li>xhr 模块 data 属性支持所有类型请求（GET、HEAD 请求本身机制问题除外）</li>
          <li>
            <p>Select2、Form2 支持 Select、Form 镜像方式调用</p>
            <Pre>{
`import { Select, Option } from 'bfd-ui/lib/Select'
import { Form, FormItem } from 'bfd-ui/lib/Form'`}</Pre>
          </li>
          <li>
            <p>DatePicker、Tree 支持直接调用</p>
            <Pre>{
`import DatePicker from 'bfd-ui/lib/DatePicker'
import Tree from 'bfd-ui/lib/Tree'
`}</Pre>
          </li>
          <li>Tree 新增 onActive 属性，响应节点点中后的处理</li>
          <li>Modal 新增 lock 属性，控制遮罩层点击后是否关闭</li>
          <li>Checkbox 新增 defaultChecked 属性；修复无文本时的样式问题；</li>
          <li>当 CheckboxGroup 定义 selects 属性时，取消强制定义 onChange 属性；定义 block 属性时，Checkbox 自动为 block 模式，无需单独定义</li>
          <li>Radio value 属性支持 number 类型</li>
          <li>RadioGroup 新增 defaultValue 属性；value、defaultValue 支持 number 类型</li>
          <li>DataTable 新增 onCheckboxSelect 属性，支持批量选择；修复页码赋值无效问题；增加列宽度配置</li>
        </ol>
      </Version>

      <Version version="0.3.2" date="2016-06-24">
        <ol>
          <li>Editable 新增 onCancel 属性</li>
          <li>修复 ClearableInput 为 disabled 时仍然可以清空的问题</li>
          <li>修复 MultipleSelect 搜索内容过长时溢出的问题</li>
          <li>Tree 新增 getUrl 属性，支持动态加载</li>
          <li>修复 Slider 刻度显示的问题</li>
          <li>修复 xhr 无法跨域发送 PUT、DELETE 请求的问题</li>
        </ol>
      </Version>
      
      <Version version="0.3.1" date="2016-06-17">
        <p>新增组件: </p>
        <ul>
          <li>按钮: Button</li>
        </ul>
        <p>其他: </p>
        <ol>
          <li>修复 MultipleSelect children 为空时错误的问题</li>
          <li>修复 Modal 关闭时报错的问题</li>
          <li>Tree 新增 render、getIcon 属性，实现自定义节点、图标</li>
          <li>Select2 新增 size 属性，设置控件尺寸</li>
          <li>Editable 新增 defaultEditing 属性，控制默认编辑状态</li>
        </ol>
      </Version>
      <Version version="0.2.2" date="2016-06-13">
        <ol>
          <li>Switch 新增 labelOn、labelOff 属性，作为辅助提示信息</li>
          <li>Select2 新增 placeholder 属性</li>
          <li>Dropdown 新增 onToggle 属性</li>
          <li>MultipleSelect 支持搜索并新增 tagable 属性，支持自定义输入</li>
          <li>优化了 AutoComplete 交互体验</li>
        </ol>
      </Version>
      <Version version="0.2.0" date="2016-06-06">
        <p>新增组件: </p>
        <ul>
          <li>开关: Switch</li>
          <li>
            <p>图标: Icon</p>
            <p>Icon 组件依赖 font-awesome，webpack file-loader 文件后缀需要加上版本号</p>
            <Pre>{
`{
  test: /\\.(eot|woff|woff2|ttf|svg|png|jpg)(\\?v=[\\d\\.]+)?$/,
  loader: 'file?name=files/[hash].[ext]'
}`}</Pre>
          </li>
        </ul>
        <p>其他: </p>
        <ol>
          <li>修复 ClearableInput 清空无效的问题</li>
          <li>Modal instance.close 方法添加回调函数作为参数</li>
          <li>NavItem icon 升级为 font-awesome 图标</li>
          <li>修复 DateTable 不发送请求问题</li>
          <li>修复分页错误的问题</li>
        </ol>
      </Version>
      <Version version="0.1.9" date="2016-06-01">
        <ol>
          <li>修复 MultipleSelect onChange 回调参数错误的问题</li>
          <li>处理 MultipleSelect 无 Option 时的场景，设置为禁用状态</li>
        </ol>
      </Version>
      <Version version="0.1.8" date="2016-05-31">
        <p>新增组件: </p>
        <ul>
          <li>文件上传: Upload</li>
          <li>自动完成: AutoComplete</li>
        </ul>
        <p>其他: </p>
        <ol>
          <li>Select2 render、defaultOption 配置更新，无需手动设置 key 属性</li>
          <li>xhr 新增 beforeSend 配置</li>
          <li>MultipleSelect 新增 url、render 属性，实现 ajax 数据源</li>
          <li>ClearableInput 新增 defaultValue 属性，同时支持 input 所有属性</li>
          <li>DatePicker 支持清空操作，新增 defaultDate 属性</li>
          <li>DateRange 新增 defaultStart、defaultEnd 属性</li>
          <li>Dropdown 增加 open 属性，控制打开状态</li>
        </ol>
      </Version>
      <Version version="0.1.7" date="2016-05-30">
        <p>新增组件: </p>
        <ul>
          <li>拖动条: Slider</li>
          <li>文字溢出: TextOverflow</li>
        </ul>
        <p>其他: </p>
        <ol>
          <li>Select2 新增 url、render、defaultOption 属性，实现 ajax 数据源</li>
          <li>MultipleSelect 设计为复选框方式，且支持全选</li>
          <li>Checkbox value 属性支持 number 类型</li>
        </ol>
      </Version>
      <Version version="0.1.6" date="2016-05-20">
        <p>新增组件: </p>
        <ul>
          <li>多选列表: MultipleSelect</li>
          <li>可编辑的: Editable</li>
        </ul>
        <p>其他: </p>
        <ol>
          <li>message.success 样式更新</li>
          <li>message.danger 添加手动关闭后的回调功能</li>
          <li>Modal 打开时，message 位置调整</li>
          <li>input、button 等基础控件默认高度调整，Checkbox、Select2 等组件对应调整</li>
          <li>Select2 新增 defaultValue 属性，修正 disabled 样式、文字过长等问题</li>
          <li>DatePicker 每周设置为从周一开始</li>
          <li>Form2 中 FormItem 支持 required 属性</li>
          <li>Tree、SelectTree 新增 defaultData 属性</li>
          <li>Steps 样式调整</li>
          <li>SearchInput 样式调整</li>
          <li>Transfer 新增 onSearch 属性，自定义搜索规则函数</li>
        </ol>
      </Version>
      <Version version="0.1.5" date="2016-05-16">
        <p>新增组件: </p>
        <ul>
          <li>搜索框: SearchInput</li>
        </ul>
        <p>其他: </p>
        <ol>
          <li>
            <p>Form2、Select2 支持别名，支持和旧版混用</p>
            <Pre>{`import { Select2, Option2 } from 'bfd-ui/lib/Select2'`}</Pre>
          </li>
          <li>修正 message z-index 的位置</li>
          <li>修复 Dropdown 及下游组件（Select、DatePicker ...）水平对齐的问题</li>
          <li>Checkbox、Radio 控件高度修正，与 input、button 等一致</li>
          <li>Dropdown 恢复使用 click 方式控制</li>
        </ol>
      </Version>
      <Version version="0.1.4" date="2016-05-12">
        <p>新增组件: </p>
        <ul>
          <li>步骤条: Steps、Step</li>
        </ul>
        <p>其他: </p>
        <ol>
          <li>Form2、Select2 className 修正，解决与 Form、Select 冲突的问题</li>
          <li>Dropdown 关闭采用 mousedown 触发，防止 click 事件阻止冒泡后无效的问题</li>
          <li>解决 xhr 模块 cancel 的问题</li>
          <li>修复 Transfer 搜索框搜索不准确的问题</li>
        </ol>
      </Version>
      <Version version="0.1.3" date="2016-05-06">
        <ol>
          <li>Transfer 每行显示信息调整为可配置，增加 render 渲染函数</li>
          <li>Fetch error 状态样式更新</li>
          <li>xhr 添加全局设置: baseUrl、dataFilter、success</li>
          <li>FormItem multiple bug 修复</li>
          <li>Select2 下拉后最大高度限制</li>
          <li>Datepicker 解决外部赋值后当前日期未更新的问题</li>
          <li>ClearableInput 支持 type 属性，默认 type 为 ‘text’</li>
          <li>message 避免重复调用</li>
        </ol>
      </Version>
      <Version version="0.1.0" date="2016-04-29">
        <p>新增组件: </p>
        <ul>
          <li>新版表单: Form、FormItem 及其生态圈组件 FormInput、FormSelect、FormTextarea</li>
          <li>新版选择列表: Select、Option</li>
          <li>AJAX 请求: xhr</li>
          <li>柱状图: ColumnChart</li>
          <li>堆叠柱状图: StackedColumnChart</li>
        </ul>
        <p>其他: </p>
        <ol>
          <li>Modal 实时获取 body 的 className，解决因动态变化导致的意外问题</li>
          <li>Confirm 修改为 confirm，直接代码调用</li>
          <li>Fetch 加载中样式更新</li>
          <li>修复 Modal 打开并重绘时带来的问题</li>
          <li>Nav 添加 href 作为 baseURL</li>
          <li>message 样式更新，danger 类型调整为手动关闭</li>
          <li>Datepicker、DateRange 日期默认修正为空 <a href="http://git.baifendian.com/front-end/bfd-ui/issues/50">#50</a></li>
        </ol>
      </Version>
      <Version version="0.0.22" date="2016-04-16">
        <p>新增组件: </p>
        <ul>
          <li>可清空的输入框: ClearableInput</li>
          <li>确认提示: Confirm</li>
        </ul>
        <p>其他: </p>
        <ol>
          <li>修复当页面没有垂直滚动条时，Modal 打开时抖动的问题 <a href="http://git.baifendian.com/front-end/bfd-ui/issues/40">#40</a></li>
          <li>Fix <a href="http://git.baifendian.com/front-end/bfd-ui/issues/39">#39</a></li>
          <li>修复 Select 只有一个 Option 报错的问题 <a href="http://git.baifendian.com/front-end/bfd-ui/issues/37">#37</a></li>
          <li>Pie 新增 colors、legend 属性 <a href="http://git.baifendian.com/front-end/bfd-ui/issues/29">#29</a></li>
          <li>Nav 新增 onItemClick 属性，回调参数为 NavItem 的 props</li>
          <li>Modal 使用 open、handleClose 来控制开关状态，原有 refs 方式仍然支持</li>
          <li>Tree 添加 onChange 属性，同步 data 状态</li>
        </ol>
      </Version>
      <Version version="0.0.21" date="2016-04-08">
        <ol>
          <li>Select 更新禁用状态样式 <a href="http://git.baifendian.com/front-end/bfd-ui/issues/34">#34</a></li>
          <li>Select 下拉支持滚动条 <a href="http://git.baifendian.com/front-end/bfd-ui/issues/31">#31</a></li>
          <li>修复 DataTable howRow 无效的问题 <a href="http://git.baifendian.com/front-end/bfd-ui/issues/26">#26</a></li>
          <li>修复 Datepicker 跨月高亮的问题 <a href="http://git.baifendian.com/front-end/bfd-ui/issues/25">#25</a></li>
          <li>修复 Form 错误提示不正常消失的问题 <a href="http://git.baifendian.com/front-end/bfd-ui/issues/24">#24</a></li>
          <li>修复 Select 多选几次后，偶尔就会出现空白的问题 <a href="http://git.baifendian.com/front-end/bfd-ui/issues/17">#17</a></li>
          <li>
            <p>Tree、SelectTree 修正为按需调用（原有调用方式仍然支持）</p>
            <Pre>{`
import Tree from 'bfd-ui/lib/Tree/Tree'
import SelectTree from 'bfd-ui/lib/Tree/SelectTree'`}</Pre>
          </li>
          <li>修复 Tabs 组件 onChange 不触发的问题</li>
          <li>修复 DateRange 组件 onSelect 不触发的问题</li>
          <li>Radio 添加 disabled 属性，hover 与 active 样式覆盖到后面的文本；RadioGroup 组件添加 .bfd-radio-group 类</li>
          <li>Checkbox 添加 disabled 属性，hover 与 active 样式覆盖到后面的文本</li>
          <li>message 组件文字颜色、背景色、提示框宽度调整</li>
          <li>DataTable data 属性支持自动分页</li>
          <li>分页样式、布局调整</li>
          <li>LineChart 样式调整</li>
        </ol>
      </Version>
      <Version version="0.0.20" date="2016-04-01">
        <p>组件: </p>
        <ul>
          <li>线图: LineChart</li>
          <li>饼图: PieChart</li>
          <li>散点图: ScatterPlot</li>
          <li>气泡图: BubbleChart</li>
          <li>环形百分比: Percentage</li>
          <li>模态框: Modal, ModalHeader, ModalBody</li>
          <li>日期选择: DatePicker, DateRange</li>
          <li>导航: Nav, NavItem</li>
          <li>选项卡: Tabs, TabList, Tab, TabPanel</li>
          <li>全局提示: Message</li>
          <li>数据表格&分页: DataTable</li>
          <li>表单: Form, FormItem</li>
          <li>单选框: Radio, RadioGroup</li>
          <li>复选框: Checkbox, CheckboxGroup</li>
          <li>下拉框: Select</li>
          <li>AJAX加载管理: Fetch</li>
          <li>下拉菜单: Dropdown, DropdownToggle, DropdownMenu</li>
          <li>穿梭框: Transfer</li>
          <li>树: Tree, SelectTree</li>
        </ul>
      </Version>
    </div>
  )
}

export default ChangeLog