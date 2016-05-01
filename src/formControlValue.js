/**
 * Get and set value of formControl which inside Form and FormItem
 */

function formControlValue(formControl) {
  
  const { form, formItem } = formControl.context
  const name = formItem.props.name
  const data = form.props.data[name]

  return {
    get() {
      if (!formItem.props.multiple) {
        return data
      } else {
        if (data instanceof Array) {
          return data[form.multipleMap[formItem.uuid]]
        }
      }
    },

    set(value) {
      const formData = form.props.data

      if (!formItem.props.multiple) {
        formData[name] = value
      } else {
        data instanceof Array || (formData[name] = [])
        formData[name][form.multipleMap[formItem.uuid]] = value
      }

      form.props.onChange && form.props.onChange(form.props.data)
      formItem.validate(value)
    }
  }
}

export default formControlValue