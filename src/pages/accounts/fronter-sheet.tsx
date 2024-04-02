import { Typography } from '@mui/material'
import React from 'react'
import FronterSheetTable from 'src/layouts/components/tables/FronterSheetTable'

function FronterSheet() {
  return (
    <>
      <Typography variant='h4' sx={{ mb: 5 }}>
        Fronter Sheet Table
      </Typography>

      <FronterSheetTable />
    </>
  )
}

export default FronterSheet
