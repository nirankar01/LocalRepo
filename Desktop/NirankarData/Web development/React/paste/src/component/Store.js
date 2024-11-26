import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from './redux/PasteSlice'

export const store = configureStore({
  reducer: {
    counter: pasteReducer,
  },
})