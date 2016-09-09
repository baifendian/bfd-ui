## 0.9.0

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

## 0.8.0

`2016-09-05`

- Select、MultipleSelect 新增 data 属性
- Modal 新增 onToggle 属性
- CheckboxGroup、Form 新增 defaultSelects 属性
- Switch 新增 defaultOn 属性
- Row 新增 fluid 属性，流式布局
- message.danger 修改为自动关闭
- 导航组件新增 IndexNavItem，与 IndexRoute 对应
- 修复 Tree 动态加载数据父级重置后无法更新的问题
- Editable 支持回车完成