import AddChannel from './AddModal.jsx'
import RemoveChannel from './RemoveModal.jsx'
import RenameChannel from './RenameModal.jsx'

const MODAL_COMPONENTS = {
  adding: AddChannel,
  removing: RemoveChannel,
  renaming: RenameChannel,
}

const ChannelModal = ({ type, onHide }) => {
  const ModalComponent = MODAL_COMPONENTS[type]

  return ModalComponent ? <ModalComponent onHide={onHide} /> : null
}

export default ChannelModal
