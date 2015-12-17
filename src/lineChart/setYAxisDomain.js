export default env => {
  let domain = env.seriesDomainManager.get()
  const paddingScale = 0.2
  const padding = (domain[1] - domain[0]) * paddingScale
  domain = [domain[0] >= 0 ? 0 : domain[0] - padding, domain[1] + padding]
  env.yScale.domain(domain)
}