import { Outlet } from 'react-router-dom'
import UserSideNav from '../../components/UserSideNav'

function UserLayout() {
  return (
    <div className='py-8 text-sm'>
      <div className='max-w-7xl mx-auto px-8'>
        <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
          <div className='md:col-span-2'>
            <UserSideNav />
          </div>
          <div className='md:col-span-10'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserLayout
