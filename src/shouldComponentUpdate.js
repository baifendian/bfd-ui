function shouldComponentUpdate(keys, nextProps, nextState) {
  return keys.every(key => {
    if (key in nextProps) return this.props[key] !== nextProps[key]
    if (key in nextState) return this.state[key] !== nextState[key]
  })
}

export default shouldComponentUpdate