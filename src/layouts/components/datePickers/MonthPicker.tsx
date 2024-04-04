// ** Third Party Imports
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'

// ** Types

// ** Custom Component Imports
import CustomInput from './PickersCustomInput'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const PickersMonthYear = ({
  popperPlacement,
  month,
  setMonth,
  styles
}: {
  popperPlacement: ReactDatePickerProps['popperPlacement']
  month: any
  setMonth: any
  styles?: any
}) => {
  return (
    <div>
      <DatePickerWrapper>
        <DatePicker
          selected={month}
          id='month-picker'
          showMonthYearPicker
          dateFormat='MM/yyyy'
          popperPlacement={popperPlacement}
          onChange={(date: Date) => setMonth(date)}
          customInput={<CustomInput label='Select Month' {...styles} />}
        />
      </DatePickerWrapper>
    </div>
  )
}

export default PickersMonthYear
