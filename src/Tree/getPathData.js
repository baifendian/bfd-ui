export default (path, data) => {
  const pathData = []
  path.forEach(key => {
    data = data[key]
    if (key !== 'children') {
      pathData.push(data)
    }
  })
  return pathData
}
