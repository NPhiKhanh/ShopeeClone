import axios from 'axios'
import { toast } from 'react-toastify'
import { clear, getAccessToken, saveAccessToken, saveProfile } from './auth'

export const axiosPrivate = axios.create({
  baseURL: 'https://api-ecom.duthanhduoc.com',
  headers: { 'Content-Type': 'application/json' }
})

axiosPrivate.interceptors.request.use(
  function (config) {
    const accessToken = getAccessToken()
    if (accessToken) {
      config.headers['authorization'] = accessToken
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axiosPrivate.interceptors.response.use(
  function (response) {
    const { url } = response.config
    if (url === '/login' || url === '/register') {
      const accessToken = response.data.data.access_token
      const profile = response.data.data.user
      saveAccessToken(accessToken)
      saveProfile(profile)
    } else if (url === '/logout') {
      clear()
    }
    return response
  },
  function (error) {
    const message = error.response?.data.data?.email || error.response?.data.message || error.message
    toast.error(message)
    return Promise.reject(error)
  }
)
