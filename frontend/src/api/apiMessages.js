/* eslint-disable @stylistic/semi */
/* eslint-disable @stylistic/arrow-parens */
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
      query: (newMessege) => ({
        url: 'messages',
        method: 'POST',
        body: newMessege,
      }),
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
} = apiMessages;
