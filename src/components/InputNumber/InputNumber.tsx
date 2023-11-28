import { InputHTMLAttributes, forwardRef } from 'react'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string
  classNameError?: string
  errorMessage?: string
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumber(
  {
    className,
    classNameError = 'mt-1 text-red-600 min-h-[1rem] text-sm',
    classNameInput = 'w-full p-3 border border-gray-300 focus:border-gray-500 rounded-sm',
    errorMessage,
    onChange,
    ...rest
  },
  ref
) {
  const OnChangeHanlder = (e: React.ChangeEvent<HTMLInputElement>) => {
    if ((/^\d+$/.test(e.target.value) || e.target.value === '') && onChange) {
      onChange(e)
    }
  }
  return (
    <div className={className}>
      <input className={classNameInput} onChange={OnChangeHanlder} {...rest} ref={ref} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
})

export default InputNumber
