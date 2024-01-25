import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface LoadingState {
  isLoading: boolean
}

const initialState: LoadingState = {
  isLoading: false
}

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload
    }
  }
})

export const { setLoading } = loadingSlice.actions

export const selectLoading = (state: RootState) => state.loadingReducer

export default loadingSlice.reducer
