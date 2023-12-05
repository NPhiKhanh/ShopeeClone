import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllProducts, getProductDetail } from '../../api/product.api'
import ProductStar from '../../components/ProductStar'
import DOMPurify from 'dompurify'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Product as ProductType, ProductListConfig } from '../../types/product.type'
import { getIdFromUrl } from '../../utils/utils'
import Product from '../ProductList/Product'
import InputQuantity from '../../components/InputQuantity'
import { addToCart } from '../../api/cart.api'
import { queryClient } from '../../main'
import { toast } from 'react-toastify'

function ProductDetail() {
  const navigate = useNavigate()

  const { nameId } = useParams()
  const id = getIdFromUrl(nameId as string)

  const [cartCount, setCartCount] = useState(1)

  const { data: productDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductDetail(id as string)
  })
  const productDetail = productDetailData?.data.data

  const queryConfig: ProductListConfig = { limit: '20', page: '1', category: productDetail?.category._id }
  const { data: productRelative } = useQuery({
    queryKey: ['productRelative', queryConfig],
    queryFn: () => getAllProducts(queryConfig),
    staleTime: 3 * 60 * 1000,
    enabled: Boolean(productDetail)
  })

  const addToCartMutation = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }) => addToCart(body)
  })
  const addToCartHanlder = () => {
    addToCartMutation.mutate(
      { product_id: productDetail?._id as string, buy_count: cartCount },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: ['cartList'] })
          toast.success(data.data.message, { autoClose: 2000 })
        }
      }
    )
  }

  const buyProduct = () => {
    addToCartMutation.mutate(
      { product_id: productDetail?._id as string, buy_count: cartCount },
      {
        onSuccess: (data) => {
          navigate({ pathname: '/cart' }, { state: { purchaseId: data.data.data._id } })
        }
      }
    )
  }

  // IMG hanlder
  const [indexImg, setIndexImg] = useState([0, 5])
  const [currentImg, setCurrentImg] = useState('')
  const imgRef = useRef<HTMLImageElement>(null)
  const imgList = useMemo(
    () => (productDetail ? productDetail.images.slice(...indexImg) : []),
    [productDetail, indexImg]
  )

  useEffect(() => {
    if (productDetail && productDetail.images.length > 0) {
      setCurrentImg(productDetail.images[0])
    }
  }, [productDetail])

  const nextSliderHandler = () => {
    if (indexImg[1] < (productDetail as ProductType).images.length) {
      setIndexImg((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const prevSliderHandler = () => {
    if (indexImg[0] > 0) {
      setIndexImg((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const imgZoomInHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const img = imgRef.current as HTMLImageElement
    const { naturalWidth, naturalHeight } = img
    const { offsetX, offsetY } = e.nativeEvent
    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)
    img.style.width = naturalWidth + 'px'
    img.style.height = naturalHeight + 'px'
    img.style.top = top + 'px'
    img.style.left = left + 'px'
    img.style.maxWidth = 'unset'
  }
  // End IMG hanlder

  const cartCountHandler = (value: number) => {
    setCartCount(value)
  }

  if (!productDetail) return null

  return (
    <div className='mt-16'>
      <div className='max-w-7xl mx-auto px-8'>
        <div className='grid grid-cols-12 gap-4'>
          <div className='col-span-5'>
            <div
              className='relative w-full pt-[100%] cursor-zoom-in overflow-hidden'
              onMouseMove={imgZoomInHandler}
              onMouseLeave={() => imgRef.current?.removeAttribute('style')}
            >
              <img
                src={currentImg}
                alt={productDetail.name}
                className='object-contain w-full h-full pointer-events-none absolute top-0 left-0 bg-white'
                ref={imgRef}
              />
            </div>
            <div className='relative mt-3 grid grid-cols-5 gap-2'>
              <button
                className='absolute left-0 top-1/2 z-10 -translate-y-1/2 h-9 w-5 bg-gray-400/80 text-white'
                onClick={prevSliderHandler}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-5 h-5'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </button>
              {imgList.map((item) => {
                const isActive = item === currentImg
                return (
                  <div
                    className='w-full pt-[100%] relative cursor-pointer'
                    key={item}
                    onMouseEnter={() => setCurrentImg(item)}
                  >
                    <img
                      src={item}
                      alt={productDetail.name}
                      className='object-contain w-full h-full absolute top-0 left-0 bg-white'
                    />
                    {isActive && <div className='absolute inset-0 border-2 border-orange' />}
                  </div>
                )
              })}
              <button
                className='absolute right-0 top-1/2 z-10 -translate-y-1/2 h-9 w-5 bg-gray-400/80 text-white'
                onClick={nextSliderHandler}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-5 h-5'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </button>
            </div>
          </div>

          <div className='col-span-7 pt-5 pl-5 pr-9'>
            <div className='line-clamp-2 font-medium max-h-14 text-xl break-words'>
              <span>{productDetail.name}</span>
            </div>
            <div className='mt-3 flex items-center'>
              <div className='flex items-center'>
                <span className='mr-1 border-b border-b-orange text-orange'>{productDetail.rating}</span>
                <ProductStar
                  star={productDetail.rating}
                  activeStar='fill-orange text-orange w-4 h-4'
                  nonActiveStar='fill-gray-300 text-gray-300 w-4 h-4'
                />
              </div>
              <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
              <div>
                <span>
                  {new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 })
                    .format(productDetail.sold)
                    .replace('.', ',')
                    .toLocaleLowerCase()}
                </span>
                <span className='ml-1 text-gray-500'>Đã bán</span>
              </div>
            </div>
            <div className='mt-8 flex items-center px-5 py-4'>
              <div className='text-gray-500 line-through'>
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                  productDetail.price_before_discount
                )}
              </div>
              <div className='ml-3 text-3xl font-medium text-orange'>
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(productDetail.price)}
              </div>
              <div className='ml-3 bg-orange font-semibold text-white uppercase text-xs py-[1px] px-1 rounded-sm'>
                {Math.round((1 - productDetail.price / productDetail.price_before_discount) * 100)}% Giảm
              </div>
            </div>
            <div className='mt-8 flex items-center px-5'>
              <div className='capitalize text-gray-500 text-sm'>Số lượng</div>
              <InputQuantity
                onChangeNumber={cartCountHandler}
                onIncrease={cartCountHandler}
                onDecrease={cartCountHandler}
                value={cartCount}
                max={productDetail.quantity}
              />
              <div className='ml-6 text-sm text-gray-500'>{productDetail.quantity} sản phẩm có sẵn</div>
            </div>
            <div className='mt-8 px-5 flex items-center'>
              <button
                className='h-12 flex items-center justify-center rounded-sm border bg-orange/10 border-orange px-5 capitalize text-orange shadow-sm hover:bg-white'
                onClick={addToCartHanlder}
              >
                <svg
                  enableBackground='new 0 0 15 15'
                  viewBox='0 0 15 15'
                  x='0'
                  y='0'
                  className='mr-[10px] h-5 w-5 fill-current stroke-orange text-orange'
                >
                  <g>
                    <g>
                      <polyline
                        fill='none'
                        points='.5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeMiterlimit='10'
                      ></polyline>
                      <circle cx='6' cy='13.5' r='1' stroke='none'></circle>
                      <circle cx='11.5' cy='13.5' r='1' stroke='none'></circle>
                    </g>
                    <line
                      fill='none'
                      strokeLinecap='round'
                      strokeMiterlimit='10'
                      x1='7.5'
                      x2='10.5'
                      y1='7'
                      y2='7'
                    ></line>
                    <line
                      fill='none'
                      strokeLinecap='round'
                      strokeMiterlimit='10'
                      x1='9'
                      x2='9'
                      y1='8.5'
                      y2='5.5'
                    ></line>
                  </g>
                </svg>
                Thêm vào giỏ hàng
              </button>
              <button
                onClick={buyProduct}
                className='h-12 ml-4 px-5 min-w-[5rem] flex items-center justify-center rounded-sm shadow-sm outline-none hover:bg-opacity-90 bg-orange text-white capitalize'
              >
                Mua ngay
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='max-w-7xl mx-auto px-8 mt-10'>
        <div className='px-4 text-lg capitalize text-slate-700'>Mô tả sản phẩm</div>
        <div className='mx-4 mt-12 mb-4 text-sm leading-loose'>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(productDetail.description)
            }}
          />
        </div>
      </div>
      <div className='max-w-7xl mx-auto px-8 mt-10'>
        <div className='font-medium text-gray-500 uppercase'>có thể bạn cũng thích</div>
        {productRelative && (
          <div className='mt-7 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2'>
            {productRelative.data.data.products.map((product) => (
              <div className='col-span-1' key={product._id}>
                <Product productList={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetail
