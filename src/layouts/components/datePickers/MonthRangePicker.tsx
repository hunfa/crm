// ** MUI Imports
import Box from '@mui/material/Box'

// ** Third Party Imports
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'

// ** Custom Component Imports
import CustomInput from './PickersCustomInput'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const MonthRangePicker = ({
  popperPlacement,
  startDate,
  setStartDate,
  endDate,
  setEndDate
}: {
  popperPlacement: ReactDatePickerProps['popperPlacement']
  startDate: any
  setStartDate: any
  endDate: any
  setEndDate: any
}) => {
  const handleChange = ([newStartDate, newEndDate]: any) => {
    setStartDate(newStartDate)
    setEndDate(newEndDate)
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }} className='demo-space-x'>
      <div>
        <DatePickerWrapper>
          <DatePicker
            popperPlacement={popperPlacement}
            onChange={handleChange}
            selectsRange
            startDate={startDate}
            endDate={endDate}
            dateFormat='MM/yyyy'
            showMonthYearPicker
            customInput={<CustomInput label='Select Month Range' />}
          />
        </DatePickerWrapper>
      </div>
    </Box>
  )
}

export default MonthRangePicker
