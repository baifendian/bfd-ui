import React from 'react'
import Version from './Version'
import Pre from './Pre'

function ChangeLog() {
  return (
    <div>
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
          <li>查询下拉框: SearchSelect</li>
        </ul>
      </Version>
    </div>
  )
}

export default ChangeLog