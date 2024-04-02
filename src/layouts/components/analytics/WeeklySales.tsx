// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

import ReactApexcharts from 'src/@core/components/react-apexcharts'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'

// Extend dayjs with the weekOfYear plugin
dayjs.extend(weekOfYear)

const WeeklySalesChart = ({ oTotalWeekSales }: any) => {
  // ** Hook
  const theme = useTheme()

  const series = [
    {
      data: oTotalWeekSales
    }
  ]

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
      categories: [1, 2, 3, 4, 5]
    }
  }

  return (
    <Card sx={{ boxShadow: 'none', mt: 5 }}>
      <CardHeader
        title='Weekly Sales Report'
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
      />
      <CardContent>
        <ApexChartWrapper>
          <ReactApexcharts type='bar' options={options} series={series} height={400} />
        </ApexChartWrapper>
      </CardContent>
    </Card>
  )
}

export default WeeklySalesChart
