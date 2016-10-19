/**
 * @title 基本功能
 */
import { Modal, ModalHeader, ModalBody } from 'bfd/Modal'
import Button from 'bfd/Button'

class ModalBasic extends Component {

  handleOpen() {
    this.refs.modal.open()
  }

  render() {
    return (
      <div>
        <Button onClick={::this.handleOpen}>点击打开</Button>
        <Modal ref="modal">
          <ModalHeader>
            <h4>test</h4>
          </ModalHeader>
          <ModalBody>
            内容
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

@component Modal/Modal
