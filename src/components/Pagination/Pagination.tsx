import classNames from 'classnames'
import { QueryConfig } from '../../pages/ProductList/ProductList'
import { Link } from 'react-router-dom'
import queryString from 'query-string'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

const RANGE = 2
function Pagination({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page)
  const renderPagination = () => {
    let dotPaginationAfter = false
    let dotPaginationBefore = false
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (page <= RANGE * 2 + 1 && page + RANGE < pageNumber && pageNumber < pageSize - 1) {
          if (!dotPaginationAfter) {
            dotPaginationAfter = true
            return (
              <button key={index} className='mr-2 min-w-[40px] py-2 text-gray-500 rounded-sm hover:cursor-pointer'>
                ...
              </button>
            )
          }
          return null
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            // renderDotBefore
            if (!dotPaginationBefore) {
              dotPaginationBefore = true
              return (
                <button key={index} className='mr-2 min-w-[40px] py-2 text-gray-500 rounded-sm hover:cursor-pointer'>
                  ...
                </button>
              )
            }
            return null
            // end renderDotBefore
          } else if (pageNumber < pageSize - RANGE + 1 && pageNumber > page + RANGE) {
            // renderDotAfter
            if (!dotPaginationAfter) {
              dotPaginationAfter = true
              return (
                <button key={index} className='mr-2 min-w-[40px] py-2 text-gray-500 rounded-sm hover:cursor-pointer'>
                  ...
                </button>
              )
            }
            return null
            // end renderDotAfter
          }
        } else if (pageNumber < page - RANGE && pageNumber > RANGE && page >= pageSize - RANGE * 2) {
          // renderDotBefore
          if (!dotPaginationBefore) {
            dotPaginationBefore = true
            return (
              <button key={index} className='mr-2 min-w-[40px] py-2 text-gray-500 rounded-sm hover:cursor-pointer'>
                ...
              </button>
            )
          }
          return null
          // end renderDotBefore
        }
        return (
          <Link
            to={{
              pathname: '/',
              search: queryString.stringify({ ...queryConfig, page: pageNumber })
            }}
            key={index}
            className={classNames('mr-2 min-w-[40px] py-2 text-center text-gray-500 rounded-sm hover:cursor-pointer', {
              'bg-orange text-white': page === pageNumber
            })}
          >
            {pageNumber}
          </Link>
        )
      })
  }
  return (
    <div className='flex justify-center mt-10'>
      {page === 1 ? (
        <button className='mr-2 px-3 py-1 text-gray-500 cursor-not-allowed'>
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
      ) : (
        <Link
          to={{
            pathname: '/',
            search: queryString.stringify({ ...queryConfig, page: page - 1 })
          }}
          className='flex items-center mr-2 px-3 py-1 text-gray-500 hover:cursor-pointer'
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
        </Link>
      )}
      {renderPagination()}
      {page === pageSize ? (
        <button className='ml-2 px-3 py-1 text-gray-500/60 cursor-not-allowed'>
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
      ) : (
        <Link
          to={{
            pathname: '/',
            search: queryString.stringify({ ...queryConfig, page: page + 1 })
          }}
          className='flex items-center mr-2 px-3 py-1 text-gray-500 hover:cursor-pointer'
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
        </Link>
      )}
    </div>
  )
}

export default Pagination
