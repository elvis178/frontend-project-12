import { createSlice } from '@reduxjs/toolkit'

export const defaultChannel = {
  id: '1',
  name: 'general',
  removable: false,
}

const initialState = {
  currentChannel: defaultChannel,
}

const activeChannelSlice = createSlice({
  name: 'activeChannel',
  initialState,
  reducers: {
    selectActiveTab: (state, { payload }) => {
      state.currentChannel = payload
    },
    resetActiveTab: (state) => {
      state.currentChannel = defaultChannel
    },
  },
})

export const activeChannelSelector = state => state.activeChannel.currentChannel
export const { selectActiveTab, resetActiveTab } = activeChannelSlice.actions
export default activeChannelSlice.reducer
