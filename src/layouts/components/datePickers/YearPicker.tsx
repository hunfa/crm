// ** MUI Imports
import Box from '@mui/material/Box'

// ** Third Party Imports
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'

// ** Custom Component Imports
import CustomInput from './PickersCustomInput'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const YearPicker = ({
  popperPlacement,
  year,
  setYear
}: {
  popperPlacement: ReactDatePickerProps['popperPlacement']
  year: any
  setYear: any
}) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }} className='demo-space-x'>
      <div>
        <DatePickerWrapper>
          <DatePicker
            showYearPicker
            selected={year}
            id='year-picker'
            dateFormat='MM/yyyy'
            popperPlacement={popperPlacement}
            onChange={(date: Date) => setYear(date)}
            customInput={<CustomInput label='Select Year' />}
          />
        </DatePickerWrapper>
      </div>
    </Box>
  )
}

export default YearPicker
