import { useSelector, useDispatch } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useRemoveChannelMutation, useGetChannelsQuery } from '../../api/apiChannels'
import { useDeleteMessagesByChannelMutation } from '../../api/apiMessages'
import { activeChannelSelector, selectActiveTab, resetActiveTab } from '../../slices/currentChannelSlice'

const RemoveChannel = ({ onHide }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [removeChannel] = useRemoveChannelMutation()
  const [deleteMessagesByChannel] = useDeleteMessagesByChannelMutation()
  const channel = useSelector(state => state.modals.channel)
  const activeChannel = useSelector(activeChannelSelector)
  const { data: channels = [], refetch } = useGetChannelsQuery()

  const handleRemove = async (id) => {
    try {
      await deleteMessagesByChannel(id)
      await removeChannel(id)
      await refetch()

      if (activeChannel.id === id) {
        const remaining = channels.filter(c => c.id !== id)
        if (remaining.length > 0) {
          dispatch(selectActiveTab(remaining[0]))
        }
        else {
          dispatch(resetActiveTab())
        }
      }

      toast.success(t('channels.delete'))
      onHide()
    }
    catch (error) {
      console.error('Ошибка при удалении канала:', error)
      toast.error(t('errors.axiosError'))
    }
  }

  if (!channel) return null

  return (
    <Modal show={true} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className="h4">{t('modal.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modal.removeText')}</p>
        <div className="d-flex justify-content-end">
          <Button type="button" className="me-2" variant="secondary" onClick={onHide}>
            {t('modal.cancel')}
          </Button>
          <Button
            type="submit"
            variant="danger"
            onClick={() => handleRemove(channel.id)}
          >
            {t('modal.removeButton')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default RemoveChannel
