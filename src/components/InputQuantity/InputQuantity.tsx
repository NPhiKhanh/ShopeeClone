import InputNumber, { InputNumberProps } from '../InputNumber'

interface Props extends InputNumberProps {
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onChangeNumber?: (value: number) => void
  onFocusOut?: (value: number) => void
  classNameWrapper?: string
}

function InputQuantity({
  max,
  classNameWrapper = 'ml-10 flex items-center',
  onIncrease,
  onDecrease,
  onChangeNumber,
  onFocusOut,
  value,
  ...rest
}: Props) {
  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let valueInput = Number(e.currentTarget.value)
    if (max != undefined && valueInput > max) {
      valueInput = max
    } else if (valueInput < 1) {
      valueInput = 1
    }
    onChangeNumber && onChangeNumber(valueInput)
  }

  const focusOutHanlder = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    onFocusOut && onFocusOut(Number(e.currentTarget.value))
  }

  const increaseHandler = () => {
    let valueInput = Number(value) + 1
    if (max != undefined && valueInput > max) {
      valueInput = max
    }
    onIncrease && onIncrease(valueInput)
  }
  const decreaseHanlder = () => {
    let valueInput = Number(value) - 1
    if (valueInput < 1) {
      valueInput = 1
    }
    onDecrease && onDecrease(valueInput)
  }

  return (
    <div className={classNameWrapper}>
      <button
        className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'
        onClick={decreaseHanlder}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-3 h-3'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15' />
        </svg>
      </button>
      <InputNumber
        value={value}
        classNameError='hidden'
        classNameInput='h-8 w-12 border-t border-b border-gray-300 p-1 text-center outline-none'
        onChange={handlerChange}
        onBlur={focusOutHanlder}
        {...rest}
      />
      <button
        className='flex h-8 w-8 items-center justify-center rounded-r-sm border border-gray-300 text-gray-600'
        onClick={increaseHandler}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-3 h-3'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
        </svg>
      </button>
    </div>
  )
}

export default InputQuantity
