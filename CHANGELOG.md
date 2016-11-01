- MultipleSelect 全选置顶
- Tooltip、TextOverflow 新增属性 direction，支持自定义方向
- Tooltip 新增属性 triggerMode，支持自定义触发方式


## v1.2.0

`2016-10-21`

- 新增组件 Tooltip
- Percentage 新增属性 width 及样式升级
- DropdownMenu、DatePicker 样式升级
- 修复 NavItem blank 模式下 URL 变化的问题
- 修复 Checkbox、Radio 不支持 onMouseDown 等事件的问题
- 优化 Modal 性能，关闭状态下不再渲染
- 优化 Tabs 性能，重新渲染时隐藏的 TabPanel 不再渲染；TabPanel 增加淡入效果
- 优化 TextOverflow 交互效果并自适应显示位置
- 修复 Slider 宽度自适应问题


## v1.1.1

`2016-10-13`

- Tree、TreeSelect 新增属性 shouldNodeSelectable、shouldNodeCheckable
- Dropdown 自适应向上或向下展开
- 修复 ClearableInput、FormInput 额外占用 tabindex 的问题；修复 Select、Checkbox、Radio 等组件不响应 键盘 tab 切换的问题
- 修复 TextOverflow 子节点嵌套时不显示的问题
- Checkbox 新增属性 indeterminate，实现半勾选状态，并同步 Tree、CheckboxGroup
- Fetch 新增属性 spinnerHeight，控制加载动画的尺寸；修复异步回调时组件不存在的问题
- SearchInput 支持回车触发查询


## v1.1.0

`2016-09-29`

- 新增组件 TreeSelect
- Tree 新增属性 onSelect、checkable、onCheck；修复字体过大时样式问题
- MultipleSelect 新增属性 placeholder
- 修复 Form 中使用 DatePicker 选中日期后触发 submit 的问题
- 修复 Fetch 组件容器高度不随内容变化而变化的问题
- 修复 FixedTable 数据二次加载问题
- 修复 Upload 同一文件二次上传问题
- 修复 DataTable 单字节字符过多不自动换行问题


## v1.0.0

`2016-09-23`

- 第一个正式公开版本
- 修复 TextOverflow IE 下兼容问题


## v0.10.0

`2016-09-18`

> 自 `v0.10.0` 起新发布的版本，less 会编译成 css，即去除了编译 less 相关的依赖，需要的话请单独安装

- 新增组件 Spinner、Panel、FixedTable
- FormSubmit 新增 toggleProcess 接口
- 修复 Checkbox、Radio click 事件冒泡两次的问题
- 修复 react 15.x 环境下未知属性错误提醒的问题
- 预编译 less，不再依赖项目的 webpack less 相关配置
- NavItem 新增 blank 属性，实现新窗口打开
- DataTable 支持单个排序，支持复选框跨页选中记忆
- 修复 Paging 页码省略号显示问题，跳转问题
- Upload 新增 onUploading 上传进行中事件


## v0.9.1

`2016-09-09`

- 新增组件 Paging
- Dropdown 展开时添加三角标志；DropdownMenu 新增 right 属性，实现右对齐
- 修复 Select 搜索框宽度未自适应的问题
- Form 新增 FormSubmit 子组件；更新验证失败后的样式；新增 onSubmit 属性，自定义提交后的行为；优化验证方式，数据更新后自动验证
- xhr() 返回当前 XMLHttpRequest 对象; 新增全局配置 getUrl，实现动态 url
- 修复 Radio 无 children 时不可用的问题
- Fetch 新增 defaultHeight 属性，定义初始化高度
- 优化 Select 无匹配项时的显示
- Select、MultipleSelect 新增 dataFilter 属性，处理 url 模式的数据格式


## v0.8.0

`2016-09-05`

> 自 `v0.8.0` 起，去除了 bootstrap 的依赖，如果项目代码用到了 bootstrap 的特性，升级后请单独引入 `bfd-bootstrap` 模块

- Select、MultipleSelect 新增 data 属性
- Modal 新增 onToggle 属性
- CheckboxGroup、Form 新增 defaultSelects 属性
- Switch 新增 defaultOn 属性
- Row 新增 fluid 属性，流式布局
- message.danger 修改为自动关闭
- 导航组件新增 IndexNavItem，与 IndexRoute 对应
- 修复 Tree 动态加载数据父级重置后无法更新的问题
- Editable 支持回车完成
