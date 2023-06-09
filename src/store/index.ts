import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './reducers'
import { memeApi } from './services/meme.api'

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(memeApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
