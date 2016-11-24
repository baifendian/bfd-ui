export default function(validator) {
  return function(props, propName, componentName) {
    if (!('url' in props || 'data' in props)) {
      return new Error(`No \`data\` or \`url\` provided to \`${componentName}\`.`)
    }
    return validator(...arguments)
  }
}
