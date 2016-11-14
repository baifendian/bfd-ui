/**
 * @title 基本功能
 */
import Editable from 'bfd/Editable'

const EditableBasic = () => {
  return (
    <Editable defaultValue="我可以修改哦" />
  )
}

/**
 * @title 初始化编辑状态
 */
import Editable from 'bfd/Editable'

const EditableEditing = () => {
  return (
    <Editable defaultValue="我可以修改哦" defaultEditing />
  )
}

@component Editable