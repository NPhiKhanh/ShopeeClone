import { createSlice } from '@reduxjs/toolkit'
import { getAccessToken, getProfile } from '../utils/auth'
import { User } from '../types/user.type'

interface AuthState {
  isAuthenticated: boolean
  profile: User | null
}
const initialState: AuthState = {
  isAuthenticated: Boolean(getAccessToken()),
  profile: getProfile()
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload
    },
    setProfile: (state, action) => {
      state.profile = action.payload
    }
  }
})

export const { setIsAuthenticated, setProfile } = authSlice.actions

export default authSlice.reducer
