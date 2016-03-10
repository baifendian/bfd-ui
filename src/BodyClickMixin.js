/**
 * 点击空白区域后，浮层消失的功能，组件需要自定义 handleBodyClick 事件响应 
 */

export default {
  componentDidMount() {
    window.addEventListener('click', this.handleBodyClick)  
  },

  componentWillUnmount() {
    window.removeEventListener('click', this.handleBodyClick)
  }
}