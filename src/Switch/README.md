/**
 * @title 基本功能
 */
import Switch from 'bfd/Switch'

const SwitchBasic = () => {
  return <Switch defaultOn />
}

/**
 * @title 带文字
 */
import Switch from 'bfd/Switch'

const SwitchWithLabel = () => {
  return <Switch labelOn="打开" labelOff="关闭" />
}

@component Switch