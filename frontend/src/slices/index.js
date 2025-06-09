import { combineReducers } from '@reduxjs/toolkit';
import { apiChannels } from '../api/apiChannels';
import { apiMessages } from '../api/apiMessages';
import activeChannelReducer from './currentChannelSlice';
import modalsReducer from './channelModalsSlice';

const rootReducer = combineReducers({
  [apiChannels.reducerPath]: apiChannels.reducer,
  [apiMessages.reducerPath]: apiMessages.reducer,
  activeChannel: activeChannelReducer,
  modals: modalsReducer,
});

export default rootReducer;
