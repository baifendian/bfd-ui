/**
 * 读取、设置当前 Form 组件的数据
 */
export default (form, formItem) => {
  const name = formItem.props.name
  return {
    get() {
      const data = form.state.data[name]
      if (!formItem.props.multiple) {
        return data
      } else {
        if (data instanceof Array) {
          return data[form.multipleMap[formItem.uuid]]
        }
      }
    },
    set(value) {
      let nextData
      if (!formItem.props.multiple) {
        nextData = form.update('set', ['data', name], value)
      } else {
        nextData = form.update('set', ['data', name, form.multipleMap[formItem.uuid]], value)
      }
      form.props.onChange && form.props.onChange(nextData)
      formItem.validate(value)
    }
  }
}