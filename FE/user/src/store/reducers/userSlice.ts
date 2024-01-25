import { createSlice } from '@reduxjs/toolkit'
import { UserInfoOutput } from '~/services/user/dto'
import { RootState } from '../store'

export interface UserState {
  user: UserInfoOutput | null
  isLoading: boolean
}

const initialState: UserState = {
  user: null,
  isLoading: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = { ...action.payload }
    },
    removeUser: (state) => {
      state.user = null
    }
  }
})

export const { updateUser, removeUser } = userSlice.actions

export const selectUserProfile = (state: RootState) => state.usersReducer

export default userSlice.reducer
