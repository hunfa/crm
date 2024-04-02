// ** MUI Imports
import Box from '@mui/material/Box'

// ** Third Party Imports
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'

// ** Types

// ** Custom Component Imports
import CustomInput from './PickersCustomInput'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const PickersMonthYear = ({
  popperPlacement,
  month,
  setMonth
}: {
  popperPlacement: ReactDatePickerProps['popperPlacement']
  month: any
  setMonth: any
}) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }} className='demo-space-x'>
      <div>
        <DatePickerWrapper>
          <DatePicker
            selected={month}
            id='month-picker'
            showMonthYearPicker
            dateFormat='MM/yyyy'
            popperPlacement={popperPlacement}
            onChange={(date: Date) => setMonth(date)}
            customInput={<CustomInput label='Select Month' />}
          />
        </DatePickerWrapper>
      </div>
    </Box>
  )
}

export default PickersMonthYear
