import ButtonSubmit from '../../../../components/ButtonSubmit'
import Input from '../../../../components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { getProfile, saveProfile } from '../../../../utils/auth'
import InputNumber from '../../../../components/InputNumber'
import { useEffect, useRef, useState, useMemo } from 'react'
import DateSelect from '../../components/DateSelect'
import { updateProfile, uploadProfile } from '../../../../api/user.api'
import { useDispatch } from 'react-redux'
import { setProfile } from '../../../../redux/authSlice'
import { toast } from 'react-toastify'
import { getAvatarURL } from '../../../../utils/utils'
import config from '../../../../constants/config'

type Schema = yup.InferType<typeof schema>

const schema = yup.object({
  name: yup.string().max(160, 'Độ dài tối đa là 160 ký tự'),
  phone: yup.string().max(20, 'Độ dài tối đa là 20 ký tự'),
  address: yup.string().max(160, 'Độ dài tối đa là 160 ký tự'),
  avatar: yup.string().max(1000, 'Độ dài tối đa là 1000 ký tự'),
  date_of_birth: yup.date().max(new Date(), 'Hãy chọn một ngày trong quá khứ')
})

function Profile() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File>()
  const previewFile = useMemo(() => (file ? URL.createObjectURL(file) : ''), [file])

  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile
  })

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile
  })

  const uploadAvatarMutation = useMutation({
    mutationFn: uploadProfile
  })

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<Schema>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(schema)
  })

  const avatarProfile = watch('avatar')

  useEffect(() => {
    if (profileData) {
      setValue('name', profileData.name)
      setValue('phone', profileData.phone)
      setValue('address', profileData.address)
      setValue('avatar', profileData.avatar)
      setValue('date_of_birth', profileData.date_of_birth ? new Date(profileData.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profileData])

  const dispatch = useDispatch()

  const uploadHandler = () => {
    inputRef.current?.click()
  }

  const inputFileHanlder = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pictureFile = e.currentTarget.files?.[0]
    if (pictureFile && pictureFile?.size > config.maxSizePicture && pictureFile.type.includes('image')) {
      toast.warn('Vui lòng chọn hình ảnh có kích thước nhỏ hơn 1 MB', { autoClose: 2000 })
    } else {
      setFile(pictureFile)
    }
    console.log(pictureFile)
  }

  const submitHandler = async (
    data: Exclude<Schema['name' | 'avatar' | 'address' | 'date_of_birth' | 'phone'], undefined>
  ) => {
    let avatarName = avatarProfile
    if (file) {
      const form = new FormData()
      form.append('image', file)
      const responseFile = await uploadAvatarMutation.mutateAsync(form)
      avatarName = responseFile.data.data
      setValue('avatar', avatarName)
    }
    const result = await updateProfileMutation.mutateAsync({
      ...data,
      date_of_birth: data.date_of_birth.toISOString(),
      avatar: avatarName
    })
    dispatch(setProfile(result.data.data))
    saveProfile(result.data.data)
    refetch()
    toast.success(result.data.message, { autoClose: 1000 })
  }

  return (
    <div className='rouded-sm px-2 pb-10 md:px-7 md:pb-20 shadow'>
      <div className='py-4'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ sơ của tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <form className='mt-4 flex flex-col-reverse md:flex-row md:items-start' onSubmit={handleSubmit(submitHandler)}>
        <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <div className='flex flex-wrap flex-col sm:flex-row items-baseline'>
            <div className='w-[20%] pt-3 sm:text-right text-gray-500 capitalize'>Email</div>
            <div className='w-[80%] sm:pl-5'>
              <div className='pt-3 text-gray-700'>{profileData?.email}</div>
            </div>
          </div>
          <div className='mt-6 flex flex-wrap flex-col sm:flex-row items-baseline'>
            <div className='w-[20%] pt-3 sm:text-right text-gray-500 capitalize'>Tên</div>
            <div className='w-[70%] sm:pl-5'>
              <Input
                classNameInput='w-full px-3 py-2 border border-gray-300 focus:border-gray-500 rounded-sm'
                name='name'
                placeholder='Tên'
                register={register}
                errorMessage={errors.name?.message}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-wrap flex-col sm:flex-row items-baseline'>
            <div className='w-[20%] pt-3 sm:text-right text-gray-500 capitalize'>Số điện thoại</div>
            <div className='w-[70%] sm:pl-5'>
              <Controller
                name='phone'
                control={control}
                render={({ field }) => (
                  <InputNumber
                    type='number'
                    classNameInput='w-full px-3 py-2 border border-gray-300 focus:border-gray-500 rounded-sm'
                    placeholder='Số Điện thoại'
                    errorMessage={errors.phone?.message}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                    }}
                  />
                )}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-wrap flex-col sm:flex-row items-baseline'>
            <div className='w-[20%] pt-3 sm:text-right text-gray-500 capitalize'>Địa chỉ</div>
            <div className='w-[70%] sm:pl-5'>
              <Input
                classNameInput='w-full px-3 py-2 border border-gray-300 focus:border-gray-500 rounded-sm'
                name='address'
                placeholder='Địa chỉ'
                register={register}
                errorMessage={errors.address?.message}
              />
            </div>
          </div>
          <Controller
            name='date_of_birth'
            control={control}
            render={({ field }) => (
              <DateSelect errorMessage={errors.date_of_birth?.message} onChange={field.onChange} value={field.value} />
            )}
          />
          <div className='mt-10 flex flex-wrap flex-col sm:flex-row items-baseline'>
            <div className='w-[20%] pt-3 sm:text-right text-gray-500 capitalize'></div>
            <div className='w-[70%] sm:pl-5'>
              <ButtonSubmit className='flex items-center h-9 px-5 bg-orange text-center text-sm text-white hover:bg-orange/80'>
                Lưu
              </ButtonSubmit>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <div className='my-5 w-24 h-24'>
            <img src={previewFile || getAvatarURL(avatarProfile)} alt='' className='w-full h-full object-cover' />
          </div>
          <input ref={inputRef} className='hidden' type='file' accept='.jpg,.jpeg,.png' onChange={inputFileHanlder} />
          <button
            type='button'
            className='flex items-center justify-end h-10 rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
            onClick={uploadHandler}
          >
            Chọn ảnh
          </button>
          <div className='mt-3 text-gray-400'>
            <div>Dung lượng file tối đa 1 MB</div>
            <div>Định dạng: .JPG, .PNG</div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Profile
