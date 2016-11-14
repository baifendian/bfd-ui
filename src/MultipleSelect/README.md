/**
 * @title 基本功能
 */
import { MultipleSelect, Option } from 'bfd/MultipleSelect'

const MultipleSelectBasic = () => {
  return (
    <MultipleSelect defaultValues={['1', '2']} onChange={values => console.log(values)}>
      <Option value="0">苹果</Option>
      <Option value="1">三星</Option>
      <Option value="2">小米</Option>
    </MultipleSelect>
  )
}

/**
 * @title URL 数据源
 */
import { MultipleSelect, Option } from 'bfd/MultipleSelect'

const MultipleSelectURL = () => {
  return (
    <MultipleSelect
      defaultValues={[1, 2]}
      url="/data/MultipleSelect.json"
      render={item => <Option value={item.id}>{item.name}</Option>}
    />
  )
}

/**
 * @title 自定义标签
 */
import { MultipleSelect, Option } from 'bfd/MultipleSelect'

const MultipleSelectTagable = () => {
  return (
    <MultipleSelect defaultValues={['质量好']} tagable>
      <Option>质量好</Option>
      <Option>便宜</Option>
      <Option>外观漂亮</Option>
    </MultipleSelect>
  )
}

/**
 * @title 禁用
 */
import { MultipleSelect } from 'bfd/MultipleSelect'

const MultipleSelectDisabled = () => {
  return (
    <MultipleSelect disabled/>
  )
}

@component MultipleSelect
