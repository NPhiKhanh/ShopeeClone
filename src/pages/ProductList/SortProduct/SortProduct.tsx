import classNames from 'classnames'
import { QueryConfig } from '../ProductList'
import { ProductListConfig } from '../../../types/product.type'
import { Link, useNavigate } from 'react-router-dom'
import queryString from 'query-string'
import { omit } from 'lodash'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

function SortProduct({ queryConfig, pageSize }: Props) {
  const navigate = useNavigate()
  const page = Number(queryConfig.page)
  const { sort_by = 'createdAt', order } = queryConfig
  const isActiveSortButton = (value: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === value
  }
  const sortHanlder = (value: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate(
      omit(
        {
          pathname: '/',
          search: queryString.stringify({ ...queryConfig, sort_by: value })
        },
        ['order']
      )
    )
  }

  const sortPriceHanlder = (value: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: '/',
      search: queryString.stringify({ ...queryConfig, sort_by: 'price', order: value })
    })
  }

  return (
    <div className='flex items-center justify-between px-5 gap-2'>
      <div className='text-gray-500 text-sm'>Sắp xếp theo</div>
      <div className='flex flex-1 items-stretch justify-start h-8 gap-2'>
        <div className='flex ml-2 gap-2'>
          <button
            className={classNames('shadow capitalize px-4 rounded-sm text-sm hover:bg-orange/50 hover:text-white', {
              'bg-orange shadow text-white': isActiveSortButton('view')
            })}
            onClick={() => sortHanlder('view')}
          >
            Phổ biến
          </button>
          <button
            className={classNames('shadow capitalize px-4 rounded-sm text-sm hover:bg-orange/50 hover:text-white', {
              'bg-orange shadow text-white': isActiveSortButton('createdAt')
            })}
            onClick={() => sortHanlder('createdAt')}
          >
            Mới nhất
          </button>
          <button
            className={classNames('shadow capitalize px-4 rounded-sm text-sm hover:bg-orange/50 hover:text-white', {
              'bg-orange shadow text-white': isActiveSortButton('sold')
            })}
            onClick={() => sortHanlder('sold')}
          >
            Bán chạy
          </button>
        </div>
        <select
          className='px-4 capitalize text-sm text-left'
          value={order || ''}
          onChange={(e) => sortPriceHanlder(e.target.value)}
        >
          <option value='' disabled>
            Giá
          </option>
          <option value='asc'>Giá: Thấp đến cao</option>
          <option value='desc'>Giá: Cao đến thấp</option>
        </select>
      </div>
      <div className='flex items-center'>
        <div className='text-sm mr-3'>
          <span className='text-orange'>{page}</span>
          <span>/{pageSize}</span>
        </div>
        <div className='ml-2 flex'>
          {page === 1 ? (
            <span className='flex items-center px-3 h-10 rounded-tl-sm rounded-bl-sm text-gray-400  cursor-not-allowed border shadow'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-3 h-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
              </svg>
            </span>
          ) : (
            <Link
              to={{
                pathname: '/',
                search: queryString.stringify({ ...queryConfig, page: page - 1 })
              }}
              className='flex items-center px-3 h-10 rounded-tl-sm rounded-bl-sm hover:bg-orange hover:text-white border shadow'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-3 h-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
              </svg>
            </Link>
          )}
          {page === pageSize ? (
            <span className='flex items-center px-3 h-10 rounded-tr-sm rounded-br-sm text-gray-400 cursor-not-allowed border shadow'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-3 h-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
              </svg>
            </span>
          ) : (
            <Link
              to={{
                pathname: '/',
                search: queryString.stringify({ ...queryConfig, page: page + 1 })
              }}
              className='flex items-center px-3 h-10 rounded-tr-sm rounded-br-sm hover:bg-orange hover:text-white border shadow'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-3 h-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default SortProduct
