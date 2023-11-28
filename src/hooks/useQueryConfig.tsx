import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { omitBy, isUndefined } from 'lodash'
import { ProductListConfig } from '../types/product.type'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

function useQueryConfig() {
  const location = useLocation()
  const queryParam: QueryConfig = queryString.parse(location.search)
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParam.page || '1',
      limit: queryParam.limit || 10,
      price_max: queryParam.price_max,
      price_min: queryParam.price_min,
      order: queryParam.order,
      name: queryParam.name,
      rating_filter: queryParam.rating_filter,
      exclude: queryParam.exclude,
      sort_by: queryParam.sort_by,
      category: queryParam.category
    },
    isUndefined
  )
  return queryConfig
}

export default useQueryConfig
