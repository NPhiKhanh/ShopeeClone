import { range } from 'lodash'
import { useEffect, useState } from 'react'

interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
}

function DateSelect({ onChange, value, errorMessage }: Props) {
  const [dateVlue, setDateValue] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  })

  const changeHanlder = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target
    setDateValue((prev) => ({
      ...prev,
      [name]: Number(value)
    }))
  }
  useEffect(() => {
    if (onChange) {
      onChange(new Date(dateVlue.year, dateVlue.month, dateVlue.date))
    }
  }, [dateVlue])
  return (
    <div className='mt-2 flex flex-wrap flex-col sm:flex-row items-baseline'>
      <div className='w-[20%] pt-3 sm:text-right text-gray-500 capitalize'>Ngày sinh</div>
      <div className='w-[70%] sm:pl-5'>
        <div className='flex justify-between'>
          <select
            name='date'
            onChange={(e) => changeHanlder(e)}
            value={dateVlue.date}
            className='h-10 w-[32%] rouded-sm border border-black/10 px-3 cursor-pointer hover:border-orange'
          >
            <option disabled value=''>
              Ngày
            </option>
            {range(1, 32).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            name='month'
            onChange={(e) => changeHanlder(e)}
            value={dateVlue.month}
            className='h-10 w-[32%] rouded-sm border border-black/10 px-3 cursor-pointer hover:border-orange'
          >
            <option disabled value=''>
              Tháng
            </option>
            {range(0, 12).map((item) => (
              <option value={item} key={item}>
                {item + 1}
              </option>
            ))}
          </select>
          <select
            name='year'
            onChange={(e) => changeHanlder(e)}
            value={dateVlue.year}
            className='h-10 w-[32%] rouded-sm border border-black/10 px-3 cursor-pointer hover:border-orange'
          >
            <option disabled value=''>
              Năm
            </option>
            {range(1990, 2024).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='mt-1 text-red-600 min-h-[1rem] text-sm'>{errorMessage}</div>
    </div>
  )
}

export default DateSelect
