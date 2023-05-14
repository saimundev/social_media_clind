import { configureStore } from '@reduxjs/toolkit'
import authApi from './services/authApi'
import AuthSlice from './features/AuthSlice'
import postApi from './services/postApi'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [postApi.reducerPath]: postApi.reducer,


    auth:AuthSlice,
   
  },

  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat([authApi.middleware,postApi.middleware]),
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch