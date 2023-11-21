import { Category, Product, ProductList, ProductListConfig } from '../types/product.type'
import { ResponseApi } from '../types/utils.type'
import { axiosPrivate } from '../utils/axios'

export const getAllProducts = (params: ProductListConfig) =>
  axiosPrivate.get<ResponseApi<ProductList>>('/products', { params })

export const getProductDetail = (id: string) => axiosPrivate.get<ResponseApi<Product>>(`products/${id}`)

export const getCategory = () => axiosPrivate.get<ResponseApi<Category[]>>('/categories')
