export default function(validator, extendFn) {
  return function(...args) {
    let error = extendFn(...args)
    if (error) return new Error(args[2] + ': ' + error)
    return validator(...args)
  }
}
