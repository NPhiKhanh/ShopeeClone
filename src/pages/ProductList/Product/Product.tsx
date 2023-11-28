import { Link } from 'react-router-dom'
import { Product as ProductType } from '../../../types/product.type'
import ProductStar from '../../../components/ProductStar'
import { generateUrlName } from '../../../utils/utils'

interface List {
  productList: ProductType
}

function Product({ productList }: List) {
  const nameUrl = generateUrlName({ name: productList.name, id: productList._id })
  return (
    <Link to={`/${nameUrl}`}>
      <div className='flex flex-col pb-3 bg-white shadow hover:cursor-pointer hover:translate-y-[-0.0625rem] transition-transform duration-100'>
        <div className='w-full pt-[100%] relative'>
          <img
            src={productList.image}
            alt={productList.name}
            className='object-contain w-full h-full absolute top-0 left-0 bg-white'
          />
        </div>
        <div className='flex flex-col p-2 overflow-hidden'>
          <div className='min-h-[2rem] whitespace-normal break-normal line-clamp-2 text-xs'>{productList.name}</div>
          <div className='mt-2 h-5 flex items-center overflow-hidden'>
            <div className='line-through text-gray-400 mr-1 truncate text-sm'>
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                productList.price_before_discount
              )}
            </div>
            <div className='text-orange truncate text-sm'>
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(productList.price)}
            </div>
          </div>
          <div className='mt-3 flex items-center justify-start'>
            <ProductStar star={productList.rating} />
            <div className='text-xs truncate ml-1'>
              {`Đã bán ${new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 })
                .format(productList.sold)
                .replace('.', ',')
                .toLocaleLowerCase()}`}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Product
