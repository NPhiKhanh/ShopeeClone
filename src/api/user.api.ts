import { User } from '../types/user.type'
import { ResponseApi } from '../types/utils.type'
import { axiosPrivate } from '../utils/axios'

interface BodyUpdateProfile extends Omit<User, '_id' | 'roles' | 'createdAt' | 'updatedAt' | 'email'> {
  password?: string
  new_password?: string
}

export const getProfile = () => axiosPrivate.get<ResponseApi<User>>('/me')

export const updateProfile = (body: BodyUpdateProfile) => axiosPrivate.put<ResponseApi<User>>('/user', body)

export const uploadProfile = (body: FormData) =>
  axiosPrivate.post<ResponseApi<string>>('/user/upload-avatar', body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
