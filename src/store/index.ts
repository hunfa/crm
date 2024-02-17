import { configureStore } from '@reduxjs/toolkit'
import department from './department'

export const store = configureStore({
  reducer: { department },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
