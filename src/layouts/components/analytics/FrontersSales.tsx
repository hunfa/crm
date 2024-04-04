// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import PickersMonthYear from 'src/layouts/components/datePickers/MonthPicker'

const FrontersSalesChart = () => {
  // ** Hook
  const theme = useTheme()
  const [series, setSeries] = useState<any>([
    {
      data: []
    }
  ])
  const [month, setMonth] = useState<DateType>(new Date())
  const [categories, setCategories] = useState([])

  const fetchMonthlySales = async () => {
    const monthNumber = month?.getMonth()
    try {
      const res = await axios.get(`/api/stats/get-top-fronters?month=${monthNumber}&year=${month?.getFullYear()}`, {
        headers: { authorization: localStorage.getItem('token') }
      })

      const temp: any = []
      const newCategories: any = []
      let index = 0
      res.data.payload.stats.forEach((s: any) => {
        if (index < 5) {
          temp.push(s.total_sales)
          newCategories.push(s.user_name)
          index++
        }
      })
      setSeries([
        {
          data: temp
        }
      ])
      setCategories(newCategories)
    } catch (error) {
      console.log(error)
      toast.error('Network error')
    }
  }

  useEffect(() => {
    if (month) {
      fetchMonthlySales()
    }
  }, [month])

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      zoom: { enabled: false },
      toolbar: { show: false },
      height: 100
    },

    colors: ['#ff9f43'],
    stroke: { curve: 'straight' },
    dataLabels: { enabled: true },
    markers: {
      strokeWidth: 7,
      strokeOpacity: 1,
      colors: ['#ff9f43'],
      strokeColors: ['#fff']
    },
    grid: {
      padding: { top: -10 },
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: true }
      }
    },
    tooltip: {
      custom(data: any) {
        return `<div class='bar-chart'  >
          <span>${data.series[data.seriesIndex][data.dataPointIndex]}$</span>
        </div>`
      }
    },
    yaxis: {
      labels: {
        style: { colors: theme.palette.text.disabled }
      }
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: theme.palette.divider },
      crosshairs: {
        stroke: { color: theme.palette.divider }
      },

      labels: {
        style: { colors: theme.palette.text.disabled }
      },
      categories: categories
    }
  }

  return (
    <Card sx={{ minWidth: '600px' }}>
      <CardHeader
        title='Top Fronters'
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
      />
      <CardContent>
        <PickersMonthYear popperPlacement='auto' month={month} setMonth={setMonth} />
        <ApexChartWrapper>
          <ReactApexcharts type='bar' height={400} options={options} series={series} />
        </ApexChartWrapper>
      </CardContent>
    </Card>
  )
}

export default FrontersSalesChart
