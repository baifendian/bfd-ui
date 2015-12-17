export default config => {

  let series = Object.keys(config.cols).map(key => {
    return {
      key, name: config.cols[key], data: []
    }
  })

  let categories = []
  const category = config.category

  config.data.forEach(item => {
    categories.push(item[category])
    series.forEach(serie => {
      serie.data.push(item[serie.key])
    })
  })

  return {
    categories, series
  }
}