import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import DailySalesChart from 'src/layouts/components/analytics/DailySales'
import MonthlySalesChart from 'src/layouts/components/analytics/MonthlySales'

function OverallSales() {
  const [value, setValue] = useState<string>('All')
  const [saleUsers, setSaleUsers] = useState([])

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string)
  }

  const fetchSaleUsers = async () => {
    try {
      const res = await axios.get('/api/user/get-sales-user', {
        headers: { authorization: localStorage.getItem('token') }
      })
      setSaleUsers(res.data.payload.salesUsers)
    } catch (error) {
      console.log(error)
      toast.error('Network error')
    }
  }

  useEffect(() => {
    fetchSaleUsers()
  }, [])

  return (
    <>
      <FormControl>
        <InputLabel id='controlled-select-label'>Select Sale Employee</InputLabel>
        <Select
          value={value}
          label='Select Sale Employee'
          id='controlled-select'
          onChange={handleChange}
          labelId='controlled-select-label'
          sx={{ width: 200, mb: 10 }}
        >
          <MenuItem value='All'>All</MenuItem>
          {saleUsers.map((u: any) => {
            return (
              <MenuItem key={u._id} value={u._id}>
                {u.user_name}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
      <MonthlySalesChart username={value} />
      <Box sx={{ mt: 12 }}></Box>
      <DailySalesChart username={value} />
    </>
  )
}

export default OverallSales
