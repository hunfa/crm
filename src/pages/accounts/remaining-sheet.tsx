import { Typography } from '@mui/material'
import React from 'react'
import RemainingSheetTable from 'src/layouts/components/tables/RemainingSheetTable'

function RemainingSheet() {
  return (
    <>
      <Typography variant='h4' sx={{ mb: 5 }}>
        Remaining Sheet Table
      </Typography>

      <RemainingSheetTable />
    </>
  )
}

export default RemainingSheet
