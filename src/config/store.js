import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './userAuthSlice'

export const store = configureStore({
  reducer: {
    user_auth: counterReducer,
  },
})