// ShadowEqual except function props.
function isEqual(source, target) {
  if (!source) return true
  return Object.keys(source).every(key => {
    let isEqual = true
    const prop = source[key]
    if (typeof prop !== 'function' && target[key] !== source[key]) {
      isEqual = false
    }
    return isEqual
  })
}

function shouldComponentUpdate(nextProps, nextState) {
  if (nextProps.children) return true
  return !(isEqual(nextProps, this.props) && isEqual(nextState, this.state))
}

export default shouldComponentUpdate