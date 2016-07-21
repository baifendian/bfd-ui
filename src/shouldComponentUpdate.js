function shouldComponentUpdate(keys, nextProps, nextState) {
  return keys.every(key => {
    let shouldUpdate = false
    if (key in nextProps) {
      if (this.props[key] !== nextProps[key]) shouldUpdate = true
    }
    if (!shouldUpdate && key in nextState) {
      if (this.state[key] !== nextState[key]) shouldUpdate = true
    }
    return shouldUpdate
  })
}

export default shouldComponentUpdate