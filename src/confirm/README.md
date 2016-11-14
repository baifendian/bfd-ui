/**
 * @title 基本功能
 */
import confirm from 'bfd/confirm'
import Button from 'bfd/Button'

const ConfirmBasic = () => {
  return (
    <Button onClick={() => {
      confirm('确认删除吗', () => {
        console.log(1)
      })
    }}>删除确认</Button>
  )
}

@component confirm