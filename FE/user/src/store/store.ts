import { configureStore } from '@reduxjs/toolkit'
import { loadingSlice, projectSlice, userSlice } from './reducers'
import { alertSlice } from './reducers/AlertSlice'

export const store = configureStore({
  reducer: {
    usersReducer: userSlice.reducer,
    loadingReducer: loadingSlice.reducer,
    projectReducer: projectSlice.reducer,
    alertReducer: alertSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
