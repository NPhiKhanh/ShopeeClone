import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProductList from './pages/ProductList'
import Register from './pages/Register'
import Login from './pages/Login'
import RegisterLayout from './layouts/RegisterLayout'
import MainLayout from './layouts/MainLayout/MainLayout'
import Profile from './pages/User/pages/Profile'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import CartLayout from './layouts/CartLayout/CartLayout'
import UserLayout from './pages/User/layouts/UserLayout'
import ChangePassword from './pages/User/pages/ChangePassword'
import HistoryPurchase from './pages/User/pages/HistoryPurchase'

function App() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const ProtectedRoute = () => (isAuthenticated ? <Outlet /> : <Navigate to='/login' />)
  const RejectedRoute = () => (!isAuthenticated ? <Outlet /> : <Navigate to='/' />)
  return (
    <>
      <Routes>
        <Route path='/' element={<RejectedRoute />}>
          <Route
            path='/login'
            element={
              <RegisterLayout>
                <Login />
              </RegisterLayout>
            }
          />
          <Route
            path='/register'
            element={
              <RegisterLayout>
                <Register />
              </RegisterLayout>
            }
          />
        </Route>

        <Route path='/' element={<ProtectedRoute />}>
          <Route
            path='/cart'
            element={
              <CartLayout>
                <Cart />
              </CartLayout>
            }
          />
          <Route
            path='/user'
            element={
              <MainLayout>
                <UserLayout />
              </MainLayout>
            }
          >
            <Route path='/user/profile' element={<Profile />} />
            <Route path='/user/password' element={<ChangePassword />} />
            <Route path='/user/historyPurchase' element={<HistoryPurchase />} />
          </Route>
        </Route>

        <Route
          path='/'
          index={true}
          element={
            <MainLayout>
              <ProductList />
            </MainLayout>
          }
        />

        <Route
          path=':nameId'
          element={
            <MainLayout>
              <ProductDetail />
            </MainLayout>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
