import { Link, useNavigate } from 'react-router-dom'
import ButtonSubmit from '../../../components/ButtonSubmit'
import { QueryConfig } from '../ProductList'
import { Category } from '../../../types/product.type'
import classNames from 'classnames'
import queryString from 'query-string'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import InputNumber from '../../../components/InputNumber'
import { Controller, useForm } from 'react-hook-form'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}
type Schema = yup.InferType<typeof schema>

const schema = yup.object({
  price_min: yup.string().test({
    name: 'price-not-allow',
    message: 'Vui lòng điền khoảng giá phù hợp',
    test: function (value) {
      const price_min = value
      const { price_max } = this.parent
      if (price_min !== '' && price_max !== '') {
        return Number(price_max) >= Number(price_min)
      }
      return price_min !== '' || price_max !== ''
    }
  }),
  price_max: yup.string().test({
    name: 'price-not-allow',
    message: 'Vui lòng điền khoảng giá phù hợp',
    test: function (value) {
      const price_max = value
      const { price_min } = this.parent
      if (price_min !== '' && price_max !== '') {
        return Number(price_max) >= Number(price_min)
      }
      return price_min !== '' || price_max !== ''
    }
  })
})

function AsideFilter({ queryConfig, categories }: Props) {
  const { category } = queryConfig
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<Schema>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    shouldFocusError: false,
    resolver: yupResolver(schema)
  })

  const navigate = useNavigate()
  const submitHandler = (data: Schema) => {
    navigate({
      pathname: '/',
      search: queryString.stringify({ ...queryConfig, price_min: data.price_min, price_max: data.price_max })
    })
    console.log(data)
  }
  return (
    <div>
      <Link to='/' className='flex items-center mb-5 font-bold capitalize'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-5 h-5 mr-2'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
        </svg>
        Tất cả danh mục
      </Link>
      <ul>
        {categories.map((item) => {
          const isActiveCategory = category === item._id
          return (
            <li className='py-1 pl-3' key={item._id}>
              <Link
                to={{
                  pathname: '/',
                  search: queryString.stringify({ ...queryConfig, category: item._id })
                }}
                className={classNames('text-sm', { 'relative text-orange font-semibold': isActiveCategory })}
              >
                {isActiveCategory && (
                  <svg viewBox='0 0 4 7' className='w-2 h-2 fill-orange absolute top-1 left-[-10px]'>
                    <polygon points='4 3.5 0 0 0 7'></polygon>
                  </svg>
                )}
                {item.name}
              </Link>
            </li>
          )
        })}
      </ul>
      <Link to='/' className='flex items-center mt-8 font-bold uppercase'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-5 h-5 mr-2'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z'
          />
        </svg>
        BỘ lọc tìm kiếm
      </Link>
      <div className='bg-gray-300 h-[1px] my-4'></div>
      <div className='my-5'>
        <div className='mb-2 capitalize text-sm'>Khoảng giá</div>
        <form className='my-3' onSubmit={handleSubmit(submitHandler)}>
          <div className='flex items-baseline'>
            <Controller
              name='price_min'
              control={control}
              render={({ field }) => (
                <InputNumber
                  type='number'
                  classNameInput='px-1 py-2 w-full border border-gray-300 focus:border-gray-500 text-xs rounded-sm'
                  placeholder='đ TỪ'
                  classNameError='hidden'
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    trigger('price_max')
                  }}
                />
              )}
            />
            <div className='text-gray-400 mx-2 shrink-0 '>-</div>
            <Controller
              name='price_max'
              control={control}
              render={({ field }) => (
                <InputNumber
                  type='number'
                  classNameInput='px-1 py-2 w-full border border-gray-300 focus:border-gray-500 text-xs rounded-sm'
                  placeholder='đ ĐẾN'
                  classNameError='hidden'
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    trigger('price_min')
                  }}
                />
              )}
            />
          </div>
          <div className='my-2 text-red-600 min-h-[1rem] text-xs'>{errors.price_min?.message}</div>
          <ButtonSubmit className='bg-orange hover:bg-orange/90 hover:cursor-pointer uppercase text-white py-[6px] w-full text-sm'>
            Áp dụng
          </ButtonSubmit>
        </form>
      </div>
      <div className='bg-gray-300 h-[1px] my-4'></div>
      <div className='capitalize text-sm'>Đánh giá</div>
      <ul className='my-3'>
        <li className='pl-2 py-1'>
          <Link to='' className='flex items-center text-sm'>
            {Array(5)
              .fill(0)
              .map((item, index) => (
                <svg viewBox='0 0 9.5 8' key={index} className='w-4 h-4 mx-[2px]'>
                  <defs>
                    <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                      <stop offset='0' stopColor='#ffca11'></stop>
                      <stop offset='1' stopColor='#ffad27'></stop>
                    </linearGradient>
                    <polygon
                      id='ratingStar'
                      points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                    ></polygon>
                  </defs>
                  <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth='1'>
                    <g transform='translate(-876 -1270)'>
                      <g transform='translate(155 992)'>
                        <g transform='translate(600 29)'>
                          <g transform='translate(10 239)'>
                            <g transform='translate(101 10)'>
                              <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar'></use>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              ))}
            <span className='ml-1'>trở lên</span>
          </Link>
        </li>
        <li className='pl-2 py-1'>
          <Link to='' className='flex items-center text-sm'>
            {Array(5)
              .fill(0)
              .map((item, index) => (
                <svg viewBox='0 0 9.5 8' key={index} className='w-4 h-4 mx-[2px]'>
                  <defs>
                    <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                      <stop offset='0' stopColor='#ffca11'></stop>
                      <stop offset='1' stopColor='#ffad27'></stop>
                    </linearGradient>
                    <polygon
                      id='ratingStar'
                      points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                    ></polygon>
                  </defs>
                  <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth='1'>
                    <g transform='translate(-876 -1270)'>
                      <g transform='translate(155 992)'>
                        <g transform='translate(600 29)'>
                          <g transform='translate(10 239)'>
                            <g transform='translate(101 10)'>
                              <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar'></use>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              ))}
            <span className='ml-1'>trở lên</span>
          </Link>
        </li>
      </ul>
      <div className='bg-gray-300 h-[1px] my-4'></div>
      <ButtonSubmit className='bg-orange hover:cursor-pointer uppercase text-white mt-2 py-[6px] w-full text-sm'>
        Xóa tất cả
      </ButtonSubmit>
    </div>
  )
}

export default AsideFilter
