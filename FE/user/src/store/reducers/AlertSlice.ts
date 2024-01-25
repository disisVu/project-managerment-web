import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface AlertSlice {
  isOpen: boolean
  title: string
  content: string
  confirm: boolean
  id: string
}

const initialState: AlertSlice = {
  isOpen: false,
  title: '',
  content: '',
  confirm: false,
  id: ''
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.isOpen = action.payload.isOpen
      state.title = action.payload.title
      state.content = action.payload.content
      state.id = action.payload.id
      state.confirm = action.payload.confirm
    },
    setCloseAlert: (state, action) => {
      state.isOpen = false
      state.title = ''
      state.content = ''
      state.id = action.payload.id
      state.confirm = action.payload.confirm
    },
    removeAlert: (state) => {
      state.isOpen = false
      state.title = ''
      state.content = ''
      state.id = ''
      state.confirm = false
    }
  }
})

export const { setAlert, setCloseAlert, removeAlert } = alertSlice.actions

export const selectAlert = (state: RootState) => state.alertReducer

export default alertSlice.reducer
