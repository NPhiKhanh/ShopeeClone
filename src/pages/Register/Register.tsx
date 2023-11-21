import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { registerAccount } from '../../api/auth.api'
import { omit } from 'lodash'
import Input from '../../components/Input'
import { setIsAuthenticated, setProfile } from '../../redux/authSlice'
import ButtonSubmit from '../../components/ButtonSubmit'

type Schema = yup.InferType<typeof schema>

const schema = yup
  .object({
    email: yup
      .string()
      .email('Email không đúng định dạng')
      .min(5, 'Vui lòng nhập ít nhất 5 ký tự')
      .max(160, 'Vui lòng nhập ít hơn 160 ký tự')
      .required('Vui lòng điền vào mục này.'),
    password: yup
      .string()
      .required('Vui lòng điền vào mục này.')
      .min(6, 'Vui lòng nhập ít nhất 6 ký tự')
      .max(160, 'Vui lòng nhập ít hơn 160 ký tự'),
    confirm_password: yup
      .string()
      .required('Vui lòng điền vào mục này.')
      .min(6, 'Vui lòng nhập ít nhất 6 ký tự')
      .max(160, 'Vui lòng nhập ít hơn 160 ký tự')
      .oneOf([yup.ref('password')], 'Vui lòng nhập lại đúng mật khẩu.')
  })
  .required()

function Register() {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Schema>({
    resolver: yupResolver(schema)
  })
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<Schema, 'confirm_password'>) => registerAccount(body)
  })
  const submitHandler = (data: Schema) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
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
              <div className='text-lg lg:text-xl'>Đăng ký</div>
              <Input
                className='mt-8'
                type='email'
                placeholder='Email'
                name='email'
                errorMessage={errors.email?.message}
                register={register}
              />
              <Input
                className='mt-3'
                type='password'
                placeholder='Password'
                name='password'
                errorMessage={errors.password?.message}
                register={register}
              />
              <Input
                className='mt-3'
                type='password'
                placeholder='Confirm password'
                name='confirm_password'
                errorMessage={errors.confirm_password?.message}
                register={register}
              />
              <ButtonSubmit
                className='w-full mt-3 flex justify-center items-center bg-orange p-4 text-white'
                isLoading={registerAccountMutation.isPending}
                disabled={registerAccountMutation.isPending}
              >
                ĐĂNG KÝ
              </ButtonSubmit>
              <div className='mt-8 text-center'>
                <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                <Link className='text-orange ml-1' to='/login'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
