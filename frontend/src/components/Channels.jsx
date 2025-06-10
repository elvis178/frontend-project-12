import { Button } from 'react-bootstrap'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { PlusSquare } from 'react-bootstrap-icons'
import ChannelsList from './ChannelsList.jsx'
import { openModal, closeModal } from '../slices/channelModalsSlice.js'
import ChannelModal from './modal/index.jsx'
import { activeChannelSelector } from '../slices/currentChannelSlice.js'

const Channels = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const channelsRef = useRef(null)
  const activeChannel = useSelector(activeChannelSelector)
  const modals = useSelector(state => state.modals)

  const hideModal = () => dispatch(closeModal())
  const showModal = (type, channel) => {
    dispatch(openModal({ type, channel }))
  }

  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.title')}</b>
        <Button
          type="button"
          className="text-primary"
          variant="link"
          onClick={() => showModal('adding', activeChannel)}
        >
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </Button>
        {modals.type === 'adding' && <ChannelModal type="adding" onHide={hideModal} />}
      </div>
      <ChannelsList showModal={showModal} channelsRef={channelsRef} />
      {['removing', 'renaming'].includes(modals.type) && (
        <ChannelModal type={modals.type} onHide={hideModal} />
      )}
    </>
  )
}

export default Channels
