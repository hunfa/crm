// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import YearPicker from 'src/layouts/components/datePickers/YearPicker'

const MonthlySalesChart = () => {
  const theme = useTheme()
  const [series, setSeries] = useState<any>([
    {
      data: []
    }
  ])

  const [year, setYear] = useState(new Date())
  const [total, setTotal] = useState(0)

  const fetchMonthlySales = async (data: any[]) => {
    try {
      const res = await axios.get(`/api/stats/get-monthly-sales?date=${year}`, {
        headers: { authorization: localStorage.getItem('token') }
      })

      const temp = [...data]
      let totalAmount = 0
      res.data.payload.stats.forEach((s: any) => {
        temp[s.month - 1] = s.total_sales
        totalAmount += s.total_sales
      })
      setSeries([
        {
          data: temp
        }
      ])
      setTotal(totalAmount)
    } catch (error) {
      console.log(error)
      toast.error('Network error')
    }
  }

  useEffect(() => {
    if (year) {
      // const months = getMonthNamesInRange(startDate, endDate)

      const series = new Array(12).fill(0)

      // setMonths(months)

      setSeries([
        {
          data: series
        }
      ])
      fetchMonthlySales(series)
    }
  }, [year])

  // function getMonthNamesInRange(startDate: Date, endDate: Date): string[] {
  //   const startMonth = dayjs(startDate).month()
  //   const endMonth = dayjs(endDate).month()

  //   const monthNames: string[] = []

  //   for (let i = startMonth; i <= endMonth; i++) {
  //     monthNames.push(dayjs().month(i).format('MMM'))
  //   }

  //   return monthNames
  // }

  // const hunfa = (data: any) => {
  //   if (data.dataPointIndex === 0) return 0
  //   if (data.series[data.seriesIndex][data.dataPointIndex - 1] === 0) return 100

  //   const change =
  //     ((data.series[data.seriesIndex][data.dataPointIndex] - data.series[data.seriesIndex][data.dataPointIndex - 1]) /
  //       data.series[data.seriesIndex][data.dataPointIndex - 1]) *
  //     100

  //   if (change > 0) {
  //     console.log(`Month ${data.dataPointIndex + 1}: Profit of ${change.toFixed(2)}%`)
  //     return change.toFixed(2)
  //   } else if (change < 0) {
  //     console.log(`Month ${data.dataPointIndex + 1}: Loss of ${Math.abs(change).toFixed(2)}%`)
  //     return change.toFixed(2)
  //   } else {
  //     console.log(`Month ${data.dataPointIndex + 1}: No change in sales`)
  //     return 0
  //   }
  // }

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      zoom: { enabled: false },
      toolbar: { show: false }
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
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  }

  return (
    <Card>
      <CardHeader
        title='Monthly Sales Report'
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
        action={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant='h6' sx={{ mr: 5 }}>
              Total: ${total}
            </Typography>
          </Box>
        }
      />
      <CardContent>
        <YearPicker popperPlacement='auto' year={year} setYear={setYear} />
        <ApexChartWrapper>
          <ReactApexcharts type='line' height={400} options={options} series={series} />
        </ApexChartWrapper>
      </CardContent>
    </Card>
  )
}

export default MonthlySalesChart
