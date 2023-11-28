import { Cart, CartListStatus } from '../types/cart.type'
import { ResponseApi } from '../types/utils.type'
import { axiosPrivate } from '../utils/axios'

export const addToCart = (body: { product_id: string; buy_count: number }) =>
  axiosPrivate.post<ResponseApi<Cart>>('/purchases/add-to-cart', body)

export const getPurchases = (params: { status: CartListStatus }) =>
  axiosPrivate.get<ResponseApi<Cart[]>>('/purchases', { params })
