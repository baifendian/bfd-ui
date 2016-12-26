export default function(validator, extendFn) {
  return function(...args) {
    const error = extendFn(...args)
    if (error) return new Error(args[2] + ': ' + error)
    return validator(...args)
  }
}
