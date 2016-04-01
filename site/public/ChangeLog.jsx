import React from 'react'
import Version from './Version'

function ChangeLog() {
  return (
    <div>
      <Version version="0.0.19" date="2016-04-01">
        <p>组件：</p>
        <ul>
          <li>线图：LineChart</li>
          <li>饼图：PieChart</li>
          <li>散点图：ScatterPlot</li>
          <li>气泡图：BubbleChart</li>
          <li>环形百分比：Percentage</li>
          <li>模态框：Modal, ModalHeader, ModalBody</li>
          <li>日期选择：DatePicker, DateRange</li>
          <li>导航：Nav, NavItem</li>
          <li>选项卡：Tabs, TabList, Tab, TabPanel</li>
          <li>全局提示：message</li>
          <li>数据表格&分页：DataTable</li>
          <li>表单：Form, FormItem</li>
          <li>单选框：Radio, RadioGroup</li>
          <li>复选框：Checkbox, CheckboxGroup</li>
          <li>下拉框：Select</li>
          <li>AJAX加载管理：Fetch</li>
          <li>下拉菜单：Dropdown, DropdownToggle, DropdownMenu</li>
          <li>穿梭框：Transfer</li>
          <li>树：Tree, SelectTree</li>
          <li>查询下拉框：SearchSelect</li>
        </ul>
      </Version>
    </div>
  )
}

export default ChangeLog