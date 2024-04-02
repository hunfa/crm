// ** React Imports
import { useState, forwardRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

// ** Third Party Imports
import format from 'date-fns/format'
import addDays from 'date-fns/addDays'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

interface PickerProps {
  label?: string
  end: Date | number
  start: Date | number
}

const CustomInput = forwardRef((props: PickerProps, ref) => {
  const startDate = format(props.start, 'MM/dd/yyyy')
  const endDate = props.end !== null ? -format(props.end, 'MM/dd/yyyy') : null
  const value = `${startDate} - ${endDate ? endDate : ''}`

  return <TextField inputRef={ref} label={props.label || ''} {...props} value={value} />
})

const PickersRange = ({ popperPlacement }: { popperPlacement: ReactDatePickerProps['popperPlacement'] }) => {
  // ** States
  const [startDate, setStartDate] = useState<DateType>(new Date())
  const [endDate, setEndDate] = useState<DateType>(addDays(new Date(), 15))

  const handleOnChange = (dates: any) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }} className='demo-space-x'>
      <div>
        <DatePickerWrapper>
          <DatePicker
            selectsRange
            endDate={endDate}
            selected={startDate}
            startDate={startDate}
            id='date-range-picker'
            onChange={handleOnChange}
            shouldCloseOnSelect={false}
            popperPlacement={popperPlacement}
            customInput={
              <CustomInput label='Date Range' start={startDate as Date | number} end={endDate as Date | number} />
            }
          />
        </DatePickerWrapper>
      </div>
    </Box>
  )
}

export default PickersRange
