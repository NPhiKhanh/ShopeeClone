import { InputHTMLAttributes } from 'react'
import type { UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string
  classNameError?: string
  errorMessage?: string
  register?: UseFormRegister<any>
}

function Input({
  name,
  className,
  classNameError = 'mt-1 text-red-600 min-h-[1rem] text-sm',
  classNameInput = 'w-full p-3 border border-gray-300 focus:border-gray-500 rounded-sm',
  errorMessage,
  register,
  ...rest
}: Props) {
  const registerForm = register && name ? register(name) : {}
  return (
    <div className={className}>
      <input className={classNameInput} {...registerForm} {...rest} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}

export default Input
