import { Nav } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { selectActiveTab, activeChannelSelector, defaultChannel } from '../slices/currentChannelSlice.js'
import { useGetChannelsQuery } from '../api/apiChannels.js'
import * as filter from 'leo-profanity'
import { Button, Dropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const ChannelsList = ({ showModal, channelsRef }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { data: channels = [] } = useGetChannelsQuery()
  const activeChannel = useSelector(activeChannelSelector);

  const variant = channel => (channel.id === activeChannel.id ? 'secondary' : '')

  const removableChannel = channel => (
    <Dropdown role="group" className="d-flex btn-group">
      <Button
        className="w-100 rounded-0 text-start text-truncate"
        variant={variant(channel)}
        onClick={() => dispatch(selectActiveTab(channel))}
      >
        <span className="me-1"># </span>
        {filter.clean(channel.name)}
      </Button>
      <Dropdown.Toggle className="flex-grow-0 dropdown-toggle-split" variant={variant(channel)}>
        <span className="visually-hidden">{t('channels.setupChannel')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item role="button" onClick={() => showModal('removing', channel)}>
          {t('channels.dropdownButtonRemove')}
        </Dropdown.Item>
        <Dropdown.Item role="button" onClick={() => showModal('renaming', channel)}>
          {t('channels.dropdownButtonRename')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )

  const notRemovableChannel = channel =>
    !channel.removable && (
      <Button
        type="button"
        className="w-100 rounded-0 text-start text-truncate"
        variant={variant(channel)}
        onClick={() => dispatch(selectActiveTab(channel))}
      >
        <span className="me-1"># </span>
        {channel.name}
      </Button>
    )

  useEffect(() => {
    if (activeChannel.id === defaultChannel.id) {
      channelsRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
    else {
      channelsRef.current.scrollTop = channelsRef.current.scrollHeight
    }
  }, [activeChannel])

  return (
    <Nav
      as="ul"
      id="channels-box"
      className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      ref={channelsRef}
    >
      {channels.map(channel => (
        <Nav.Item as="li" key={channel.id} className="w-100">
          {channel.removable ? removableChannel(channel) : notRemovableChannel(channel)}
        </Nav.Item>
      ))}
    </Nav>
  )
}

export default ChannelsList
