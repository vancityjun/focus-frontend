import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface alertType {
  message: string[]
  warn: boolean
}

const alertState: alertType = {
  message: [],
  warn: false,
}

const alertSlice = createSlice({
  name: 'alert',
  initialState: alertState,
  reducers: {
    setAlert({ message, warn }, { payload }: PayloadAction<any>) {
      message = payload.message
      warn = payload.warn
    },
    resetAlert({ message, warn }) {
      message = []
      warn = false
    },
  },
})

export const { setAlert } = alertSlice.actions

export default alertSlice.reducer
