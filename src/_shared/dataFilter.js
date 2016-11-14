import invariant from 'invariant'

export default (instance, response) => {
  if (instance.props.dataFilter) {
    response = instance.props.dataFilter(data)
    invariant(
      !!response,
      `'dataFilter' should return a new data, check the 'dataFilter' of '${instance.constructor.name}'.`
    )
  }
  return response
}
