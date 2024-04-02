import { Typography } from '@mui/material'
import React from 'react'
import CloserSheetTable from 'src/layouts/components/tables/CloserSheetTable'

function CloserSheet() {
  return (
    <>
      <Typography variant='h4' sx={{ mb: 5 }}>
        Closer Sheet Table
      </Typography>

      <CloserSheetTable />
    </>
  )
}

export default CloserSheet
