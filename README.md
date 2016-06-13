## 百分点 UI 组件库

http://ui.baifendian.com

### 开始编写一个组件

```sh
# 创建组件文件夹
$ mkdir src/YourComponent

# 创建组件入口
$ touch src/YourComponent/index.jsx
```

### 编写 Demo、文档

```sh
$ touch site/public/components/YourComponent.jsx

$ npm start
```
查看 http://localhost:4001/components/YourComponent


### 开发规范

1. 开发过程中发现可复用的部分，向团队提出来，避免重复造轮子

1. 依赖的组件如果功能不满足需求，可联系组件的作者处理，不得直接修改他人组件

1. 修复某个 bug 后，commit 时可自动关联和关闭 bug，包含关键字（fix #bug号）即可，如 `git commit -m "fix #33"`

1. 每个组件的根元素设置 className 为 bfd-xxx，如 bfd-datepicker，并作为 CSS 的命名空间

1. 组件库本身依赖 bootstrap，所以 bootstrap 支持的部分不需要单独写样式，到时候更新 bfd-bootstrap 即可

1. 注意代码规范 http://git.baifendian.com/front-end/style-guide

1. 同一个主版本下每次修改需要保证向下兼容，如 v1.1 到 v1.2

1. 因为要考虑向下兼容，所以产生很多多余的、设计不合理的代码等，可以记录下来，等到主版本升级后再一起解决

1. 代码更新时记录对用户来说有必要的修改说明，因为发布新版本时需要放在 changeLog 里

1. 每个组件根目录下建立 `__tests__` 文件夹来写单元测试