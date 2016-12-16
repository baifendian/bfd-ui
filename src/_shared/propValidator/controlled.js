export default function(validator, callbackName = 'onChange') {
  return function(props, propName, componentName) {
    if (propName in props && !props[callbackName] && !props.disabled) {
      return new Error(
        `You provided a \`${propName}\` prop to \`${componentName}\` without an \`${callbackName}\` handler.`
      )
    }
    return validator(...arguments)
  }
}
