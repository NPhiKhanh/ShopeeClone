import { AuthResponse } from '../types/auth.type'
import { axiosPrivate } from './../utils/axios'

export const registerAccount = (body: { email: string; password: string }) =>
  axiosPrivate.post<AuthResponse>('/register', JSON.stringify(body))

export const loginAccount = (body: { email: string; password: string }) =>
  axiosPrivate.post<AuthResponse>('/login', JSON.stringify(body))

export const logoutAccount = () => axiosPrivate.post('/logout')
