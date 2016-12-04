import classlist from 'classlist'

class ToggleNode {

  static END_EVENT = 'transitionend'

  constructor(node, openedClassName, reflowTrigger) {
    this.node = node
    this.openedClassName = openedClassName
    this.reflowTrigger = reflowTrigger || (() => {
      this.node.offsetWidth
    })
  }

  open() {
    this.node.style.display = 'block'
    this.reflowTrigger()
    classlist(this.node).add(this.openedClassName)
  }

  close() {
    classlist(this.node).remove(this.openedClassName)
    const onTransitionEnd = () => {
      this.node.style.display = 'none'
      this.node.removeEventListener(ToggleNode.END_EVENT, onTransitionEnd)
    }
    this.node.addEventListener(ToggleNode.END_EVENT, onTransitionEnd)
  }
}

export default ToggleNode
