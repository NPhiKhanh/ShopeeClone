import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../../../redux/store'
import { getAvatarURL } from '../../../../utils/utils'

function UserSideNav() {
  const profile = useSelector((state: RootState) => state.auth.profile)

  return (
    <>
      <div className='flex items-center py-4'>
        <Link to='/user/profile' className='w-12 h-12 rounded-3xl flex-shrink-0'>
          <img src={getAvatarURL(profile?.avatar)} alt='avatar' className='w-full h-full rounded-full object-cover' />
        </Link>
        <div className='flex flex-col justify-center pl-4'>
          <div className='mb-1 truncate font-semibold'>phikhanh46</div>
          <Link to='/user/profile' className='flex items-baseline text-gray-500 capitalize'>
            <svg viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg' className='mr-1 w-3 h-3 fill-current'>
              <path
                d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
                fill='#9B9B9B'
                fillRule='evenodd'
              ></path>
            </svg>
            Sửa hồ sơ
          </Link>
        </div>
      </div>

      <div className='mt-7'>
        <Link to='/user/profile' className='mb-4 flex items-center capitalize transition-colors'>
          <div className='w-5 h-5 mr-3 flex-shrink-0'>
            <img
              src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4'
              alt=''
              className='w-full h-full'
            />
          </div>
          Tài khoản của tôi
        </Link>
        <Link to='/user/profile' className='mb-4 flex items-center capitalize transition-colors'>
          <div className='w-5 h-5 mr-3 flex-shrink-0'>
            <img
              src='https://down-vn.img.susercontent.com/file/f0049e9df4e536bc3e7f140d071e9078'
              alt=''
              className='w-full h-full'
            />
          </div>
          Đơn mua
        </Link>
        <Link to='/user/password' className='mb-4 flex items-center capitalize transition-colors'>
          <div className='w-5 h-5 mr-3 flex-shrink-0'>
            <img
              src='https://down-vn.img.susercontent.com/file/f0049e9df4e536bc3e7f140d071e9078'
              alt=''
              className='w-full h-full'
            />
          </div>
          Đổi mật khẩu
        </Link>
      </div>
    </>
  )
}

export default UserSideNav
