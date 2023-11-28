import AsideFilter from './AsideFilter'
import Product from './Product'
import SortProduct from './SortProduct'
import { useQuery } from '@tanstack/react-query'
import { getAllProducts, getCategory } from '../../api/product.api'
import Pagination from '../../components/Pagination'
import { ProductListConfig } from '../../types/product.type'
import useQueryConfig from '../../hooks/useQueryConfig'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

function ProductList() {
  const queryConfig = useQueryConfig()

  const { data: products } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => getAllProducts(queryConfig),
    staleTime: 3 * 60 * 1000
  })
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategory()
  })

  return (
    <div className='my-10'>
      <div className='max-w-7xl mx-auto px-8'>
        {products && (
          <div className='grid grid-cols-12 gap-4'>
            <div className='col-span-2 pt-2'>
              <AsideFilter categories={categoriesData?.data.data || []} queryConfig={queryConfig} />
            </div>
            <div className='col-span-10 ml-4'>
              <SortProduct queryConfig={queryConfig} pageSize={products.data.data.pagination.page_size} />
              <div className='mt-7 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2'>
                {products.data.data.products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Product productList={product} />
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={products.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductList
