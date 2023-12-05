import { Cart, CartListStatus } from '../types/cart.type'
import { ResponseApi } from '../types/utils.type'
import { axiosPrivate } from '../utils/axios'

export const addToCart = (body: { product_id: string; buy_count: number }) =>
  axiosPrivate.post<ResponseApi<Cart>>('/purchases/add-to-cart', body)

export const getProductInCart = (params: { status: CartListStatus }) =>
  axiosPrivate.get<ResponseApi<Cart[]>>('/purchases', { params })

export const updateProductInCart = (body: { product_id: string; buy_count: number }) =>
  axiosPrivate.put<ResponseApi<Cart>>('/purchases/update-purchase', body)

export const deleteProductInCart = (id: string[]) =>
  axiosPrivate.delete<ResponseApi<{ deleted_count: number }>>('/purchases', { data: id })

export const buyProductInCart = (body: { product_id: string; buy_count: number }[]) =>
  axiosPrivate.post<ResponseApi<Cart[]>>('/purchases/buy-products', body)
