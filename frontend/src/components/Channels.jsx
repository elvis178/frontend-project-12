import { Nav, Button, Dropdown } from 'react-bootstrap';
import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as filter from 'leo-profanity';
import { PlusSquare } from 'react-bootstrap-icons';
import { useGetChannelsQuery } from '../api/apiChannels.js';
import { selectActiveTab, activeChannelSelector, defaultChannel } from '../slices/currentChannelSlice.js';
import AddChannel from './modal/AddModal.jsx';
import RemoveChannel from './modal/RemoveModal.jsx';
import RenameChannel from './modal/RenameModal.jsx';
import { closeModal, openModal } from '../slices/channelModalsSlice.js';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channelsRef = useRef(null);
  const { data: channels = [] } = useGetChannelsQuery();
  const activeChannel = useSelector(activeChannelSelector);
  const modals = useSelector((state) => state.modals);

  const variant = (channel) => (channel.id === activeChannel.id ? 'secondary' : '');

  const hideModal = () => dispatch(closeModal());
  const showModal = (type, channel) => {
    dispatch(openModal({ type, channel }));
  };

  const renderChannelButton = (channel) => (
    <Button
      className="w-100 rounded-0 text-start text-truncate"
      variant={variant(channel)}
      onClick={() => dispatch(selectActiveTab(channel))}
    >
      <span className="me-1"># </span>
      {channel.removable ? filter.clean(channel.name) : channel.name}
    </Button>
  );

  const renderRemovableChannel = (channel) => (
    <Dropdown role="group" className="d-flex btn-group">
      {renderChannelButton(channel)}
      <Dropdown.Toggle className="flex-grow-0 dropdown-toggle-split" variant={variant(channel)}>
        <span className="visually-hidden">{t('channels.setupChannel')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item 
          role="button" 
          onClick={() => showModal('removing', channel)}
        >
          {t('channels.dropdownButtonRemove')}
        </Dropdown.Item>
        <Dropdown.Item 
          role="button" 
          onClick={() => showModal('renaming', channel)}
        >
          {t('channels.dropdownButtonRename')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  useEffect(() => {
    if (!channelsRef.current) return;
    
    if (activeChannel.id === defaultChannel.id) {
      channelsRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      channelsRef.current.scrollTop = channelsRef.current.scrollHeight;
    }
  }, [activeChannel]);

  return (
    <>
      {modals.type === 'adding' && <AddChannel onHide={hideModal} />}
      {modals.type === 'removing' && <RemoveChannel onHide={hideModal} />}
      {modals.type === 'renaming' && <RenameChannel onHide={hideModal} />}

      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.title')}</b>
        <Button
          type="button"
          className="text-primary"
          variant="link"
          onClick={() => showModal('adding', activeChannel)}
          aria-label={t('channels.addChannel')}
        >
          <PlusSquare size={20} />
        </Button>
      </div>

      <Nav
        as="ul"
        id="channels-box"
        className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
        ref={channelsRef}
      >
        {channels.map((channel) => (
          <Nav.Item as="li" key={channel.id} className="w-100">
            {channel.removable ? renderRemovableChannel(channel) : renderChannelButton(channel)}
          </Nav.Item>
        ))}
      </Nav>
    </>
  );
};

export default Channels;