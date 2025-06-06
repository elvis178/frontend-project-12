/* eslint-disable @stylistic/semi */
/* eslint-disable @stylistic/arrow-parens */
import { StrictMode } from 'react';
import i18next from 'i18next';
import { Provider } from 'react-redux';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import * as filter from 'leo-profanity';
import { io } from 'socket.io-client';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { apiMessages } from './api/apiMessages.js';
import activeChannelReducer from './slices/currentChannelSlice.js';
import modalsReducer from './slices/channelModalsSlice.js';
import App from './App.jsx';
import resources from './locales/index.js';
import { apiChannels } from './api/apiChannels.js';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });

  const rootReducer = combineReducers({
    [apiChannels.reducerPath]: apiChannels.reducer,
    [apiMessages.reducerPath]: apiMessages.reducer,
    activeChannel: activeChannelReducer,
    modals: modalsReducer,
  });

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
      .concat(apiChannels.middleware, apiMessages.middleware),
  });

  const socket = io();

  socket.on('newChannel', (payload) => {
    store.dispatch(apiChannels.util.updateQueryData('getChannels', undefined, (draft) => {
      draft.push(payload);
    }));
  });

  socket.on('removeChannel', (payload) => {
    store.dispatch(apiChannels.util.updateQueryData('getChannels', undefined, (draft) => {
      draft.filter((channel) => channel.id !== payload);
    }));
  });

  socket.on('renameChannel', (payload) => {
    store.dispatch(apiChannels.util.updateQueryData('getChannels', undefined, (draft) => {
      const channel = draft.find((c) => c.id === payload.id);
      channel.name = payload.name;
    }));
  });

  socket.on('newMessage', (payload) => {
    store.dispatch(apiMessages.util.updateQueryData('getMessages', undefined, (draft) => {
      draft.push(payload);
    }));
  });

  const rollbarConfig = {
    accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
    environment: 'production',
  };

  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  return (
    <RollbarProvider config={rollbarConfig}>
      <I18nextProvider i18n={i18n}>
        <ErrorBoundary>
          <Provider store={store}>
            <StrictMode>
              <App />
              <ToastContainer />
            </StrictMode>
          </Provider>
        </ErrorBoundary>
      </I18nextProvider>
    </RollbarProvider>
  );
};

export default init;
