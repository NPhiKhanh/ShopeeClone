import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import Input from '../../components/Input'
import { loginAccount } from '../../api/auth.api'
import { setIsAuthenticated, setProfile } from '../../redux/authSlice'
import ButtonSubmit from '../../components/ButtonSubmit'

type Schema = yup.InferType<typeof schema>

const schema = yup
  .object({
    email: yup
      .string()
      .required('Vui lòng điền vào mục này.')
      .email('Email không đúng định dạng')
      .min(5, 'Vui lòng nhập ít nhất 5 ký tự')
      .max(160, 'Vui lòng nhập ít hơn 160 ký tự'),
    password: yup
      .string()
      .required('Vui lòng điền vào mục này.')
      .min(6, 'Vui lòng nhập ít nhất 6 ký tự')
      .max(160, 'Vui lòng nhập ít hơn 160 ký tự')
  })
  .required()
function Login() {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Schema>({
    resolver: yupResolver(schema)
  })
  const loginAccountMutation = useMutation({
    mutationFn: (body: Schema) => loginAccount(body)
  })
  const submitHandler = (data: Schema) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (obj) => {
        dispatch(setIsAuthenticated(true))
        dispatch(setProfile(obj.data.data?.user))
      },
      onError: (error) => {
        console.log(error)
      }
    })
  }
  return (
    <div className='bg-orange'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-30 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4 mx-6'>
            <form className='p-6 rounded bg-white shadow-sm' onSubmit={handleSubmit(submitHandler)}>
              <div className='text-lg lg:text-xl'>Đăng nhập</div>
              <Input
                className='mt-8'
                type='email'
                placeholder='Email'
                errorMessage={errors.email?.message}
                register={register}
                name='email'
              />
              <Input
                className='mt-3'
                type='password'
                placeholder='Mật khẩu'
                errorMessage={errors.password?.message}
                register={register}
                name='password'
              />
              <ButtonSubmit
                className='w-full mt-3 flex justify-center items-center bg-orange p-4 text-white'
                isLoading={loginAccountMutation.isPending}
                disabled={loginAccountMutation.isPending}
              >
                ĐĂNG NHẬP
              </ButtonSubmit>
              <div className='mt-8 text-center'>
                <span className='text-gray-400'>Bạn mới biết đến Shopee?</span>
                <Link className='text-orange ml-1' to='/register'>
                  Đăng Ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
