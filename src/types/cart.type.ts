import { Product } from './product.type'

export type CartStatus = -1 | 1 | 2 | 3 | 4 | 5
export type CartListStatus = CartStatus | 0

export interface Cart {
  _id: string
  buy_count: number
  price: number
  price_before_discount: number
  status: CartStatus
  user: string
  product: Product
  createdAt: string
  updatedAt: string
}

export interface NewCartList extends Cart {
  disabled: boolean
  checked: boolean
}
