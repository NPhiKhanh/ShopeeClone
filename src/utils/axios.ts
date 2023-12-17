import axios, { AxiosError, HttpStatusCode } from 'axios'
import { toast } from 'react-toastify'
import { clear, getAccessToken, saveAccessToken, saveProfile } from './auth'
import { useDispatch } from 'react-redux'
import { setIsAuthenticated, setProfile } from '../redux/authSlice'
import config from '../constants/config'

export const axiosPrivate = axios.create({
  baseURL: config.baseURL,
  headers: {
    'Content-Type': 'application/json',
    expires: 10,
    expires_refresh_token: 60 * 60
  }
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
  function (error: AxiosError) {
    const dispatch = useDispatch()
    if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
      const data: any | undefined = error.response?.data
      const message = data.message || error.message
      toast.error(message)
    }
    if (error.response?.status === HttpStatusCode.Unauthorized) {
      clear()
      dispatch(setIsAuthenticated(false))
      dispatch(setProfile(''))
    }

    return Promise.reject(error)
  }
)
