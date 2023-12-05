import { Link } from 'react-router-dom'
import { RootState } from '../../redux/store'
import Popover from '../Popover'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../../main'
import { logoutAccount } from '../../api/auth.api'
import { setIsAuthenticated, setProfile } from '../../redux/authSlice'

function NavHeader() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const profile = useSelector((state: RootState) => state.auth.profile)

  const dispatch = useDispatch()
  const logoutMutation = useMutation({
    mutationFn: () => logoutAccount(),
    onSuccess: () => {
      dispatch(setIsAuthenticated(false))
      dispatch(setProfile(null))
      queryClient.removeQueries({ queryKey: ['cartList'], exact: true })
    }
  })

  const logoutHandler = () => {
    logoutMutation.mutate()
  }
  return (
    <div className='flex justify-between'>
      <div className='flex items-center'>
        <div className='text-sm cursor-pointer text-white border-r-2 border-r-white/40 pr-1 mr-2 hover:text-gray-300'>
          Kênh người bán
        </div>
        <div className='text-sm cursor-pointer text-white border-r-2 border-r-white/40 pr-1 mr-2 hover:text-gray-300'>
          Tải ứng dụng
        </div>
        <div className='text-sm cursor-pointer text-white hover:text-gray-300'>Kết nối</div>
        <svg
          className='ml-1 items-center fill-white'
          xmlns='http://www.w3.org/2000/svg'
          height='1em'
          viewBox='0 0 512 512'
        >
          <path d='M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z' />
        </svg>
        <svg
          className='ml-2 items-center fill-white'
          xmlns='http://www.w3.org/2000/svg'
          height='1em'
          viewBox='0 0 448 512'
        >
          <path d='M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z' />
        </svg>
      </div>

      <div className='flex items-center'>
        <div className='flex items-center mr-4 text-sm cursor-pointer text-white hover:text-gray-300'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-5 h-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0'
            />
          </svg>
          <div className='pl-1'>Thông báo</div>
        </div>
        <div className='flex items-center mr-4 text-sm cursor-pointer text-white hover:text-gray-300'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-5 h-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z'
            />
          </svg>
          <div className='pl-1'>Hỗ trợ</div>
        </div>
        <Popover
          renderPopover={
            <div className='bg-white p-2 rounded-sm shadow-sm min-w-[180px] mr-16'>
              <div className='hover:text-orange cursor-pointer text-sm mb-5'>Tiếng Việt</div>
              <div className='hover:text-orange cursor-pointer text-sm mt-5'>English</div>
            </div>
          }
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-5 h-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
            />
          </svg>
          <div className='px-1'>Tiếng Việt</div>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-4 h-4'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
          </svg>
        </Popover>
        {isAuthenticated && (
          <Popover
            renderPopover={
              <div className='bg-white p-2 border rounded-sm shadow min-w-[180px] mr-16'>
                <Link to='/profile' className='block hover:text-cyan-500 cursor-pointer text-sm mb-5'>
                  Tài khoản của tôi
                </Link>
                <Link to='/' className='block hover:text-cyan-500 cursor-pointer text-sm mt-5'>
                  Đơn mua
                </Link>
                <button className='hover:text-cyan-500 cursor-pointer text-sm mt-5' onClick={logoutHandler}>
                  Đăng xuất
                </button>
              </div>
            }
          >
            <div className='w-6 h-6 mr-2 flex-shrink-0'>
              <img
                src='https://down-vn.img.susercontent.com/file/9da56dccee4d32d3f56fe02556418a29_tn'
                alt='avatar'
                className='w-full h-full rounded-full object-cover'
              />
            </div>
            <div>{profile?.email}</div>
          </Popover>
        )}
        {!isAuthenticated && (
          <div className='flex items-center text-sm cursor-pointer text-white'>
            <Link to='/register' className='mx-3 capitalize hover:text-gray-300'>
              Đăng ký
            </Link>
            <div className='border-r-[1px] border-r-white/40 h-3'></div>
            <Link to='/login' className='mx-3 capitalize hover:text-gray-300'>
              Đăng nhập
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default NavHeader
