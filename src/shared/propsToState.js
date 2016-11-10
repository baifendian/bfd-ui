export default (nextProps, keys) => {
  const newState = {}
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (key in nextProps) {
      newState[key] = nextProps[key]
    }
  }
  return newState
}
