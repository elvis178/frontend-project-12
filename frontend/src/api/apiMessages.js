import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiMessages = createApi({
  reducerPath: 'apiMessages',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '/messages',
    }),
    addMessage: builder.mutation({
      query: (newMessage) => ({
        url: 'messages',
        method: 'POST',
        body: newMessage,
      }),
    }),
    deleteMessagesByChannel: builder.mutation({
      query: (channelId) => ({
        url: `messages/channel/${channelId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useDeleteMessagesByChannelMutation,
} = apiMessages;
