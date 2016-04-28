function warning() {}

if (process.env.NODE_ENV !== 'production') {
  warning = message => {
    message = 'Warning: ' + message
    if (typeof console !== 'undefined') {
      console.error(message)
    } else {
      throw new Error(message)
    }
  }
}

export default warning