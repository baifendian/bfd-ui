function shouldComponentUpdate(keys, nextProps, nextState) {
  return !keys.every(key => {
    let isEqual = true
    if (key in nextProps) {
      if (this.props[key] !== nextProps[key]) isEqual = false
    }
    if (isEqual && key in nextState) {
      if (this.state[key] !== nextState[key]) isEqual = false
    }
    return isEqual
  })
}

export default shouldComponentUpdate