import { User } from '../types/user.type'

export const saveAccessToken = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken)
}
export const saveProfile = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
export const clear = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('profile')
}
export const getAccessToken = () => localStorage.getItem('accessToken') || ''

export const getProfile = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : ''
}
