import { Box } from '@mui/material'
import React from 'react'
import DailySalesChart from 'src/layouts/components/analytics/DailySales'
import MonthlySalesChart from 'src/layouts/components/analytics/MonthlySales'

function OverallSales() {
  return (
    <>
      <MonthlySalesChart />
      <Box sx={{ mt: 12 }}></Box>
      <DailySalesChart />
    </>
  )
}

export default OverallSales
