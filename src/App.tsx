import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProductList from './pages/ProductList'
import Register from './pages/Register'
import Login from './pages/Login'
import RegisterLayout from './layouts/RegisterLayout'
import MainLayout from './layouts/MainLayout/MainLayout'
import Profile from './pages/Profile'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'
import ProductDetail from './pages/ProductDetail'

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
            path='/profile'
            element={
              <MainLayout>
                <Profile />
              </MainLayout>
            }
          />
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
          path=':id'
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
