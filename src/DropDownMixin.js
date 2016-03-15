export default {

  // 存储所有的组件实例，当前打开后，其他关闭
  instances: [],

  getInitialState() {
    return {
      isOpen: false
    }
  },

  handleToggle() {
    this.setState({isOpen: !this.state.isOpen})
    if (this.instances.length > 1) {
      this.instances.forEach(instance => {
        if (instance !== this) {
          // 关闭其他组件
          instance.setState({isOpen: false})
        }
      })
    }
  },

  handleBodyClick() {
    this.setState({isOpen: false})
  },

  stopPropagation(e) {
    e.stopPropagation()
  },

  componentDidMount() {
    this.instances.push(this)
    window.addEventListener('click', this.handleBodyClick)
  },

  componentWillUnmount() {
    this.instances.splice(this.instances.indexOf(this), 1)
    window.removeEventListener('click', this.handleBodyClick)
  }
}