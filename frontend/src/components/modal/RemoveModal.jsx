import { useSelector } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useRemoveChannelMutation, useGetChannelsQuery } from '../../api/apiChannels'

const RemoveChannel = ({ onHide }) => {
  const { t } = useTranslation()
  const [removeChannel] = useRemoveChannelMutation()
  const channel = useSelector(state => state.modals.channel)
  const { refetch } = useGetChannelsQuery()

  const handleRemove = async (id) => {
    try {
      await removeChannel(id)
      await refetch()
      toast.success(t('channels.delete'))
      onHide()
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <Modal show="true" onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className="h4">{t('modal.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modal.removeText')}</p>
        <div className="d-flex justify-content-end">
          <Button type="button" className="me-2" variant="secondary" onClick={onHide}>{t('modal.cancel')}</Button>
          <Button type="submit" variant="danger" onClick={() => handleRemove(channel.id)}>{t('modal.removeButton')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default RemoveChannel
