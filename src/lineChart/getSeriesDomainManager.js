import d3 from 'd3'

export default series => {

  const domains = []
  let extractDomain = []
  series.forEach((serie, i) => {
    domains[i] = d3.extent(serie.data, d => d)
    extractDomain = extractDomain.concat(domains[i])
  })

  return {

    get: () => d3.extent(extractDomain, d => d),
    
    add: index => {
      Array.prototype.push.apply(extractDomain, domains[index])
    },
    
    remove: index => {
      let domain = domains[index]
      extractDomain.splice(extractDomain.indexOf(domain[0]), 1)
      extractDomain.splice(extractDomain.indexOf(domain[1]), 1)
    }
  }
}