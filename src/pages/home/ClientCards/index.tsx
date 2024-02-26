// ** MUI Imports
import { Grid } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
// Icon
// ** Third Party Imports
import { ApexOptions } from 'apexcharts'
import Icon from 'src/@core/components/icon'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Custom Components Imports

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

const series = [{ data: [0, 20, 5, 30, 15, 45] }]

const ClientCards = () => {
  // ** Hook
  const theme = useTheme()

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    tooltip: { enabled: false },
    grid: {
      strokeDashArray: 6,
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: true }
      },
      yaxis: {
        lines: { show: false }
      },
      padding: {
        top: -15,
        left: -7,
        right: 7,
        bottom: -15
      }
    },
    stroke: { width: 3 },
    colors: [hexToRGBA(theme.palette.info.main, 1)],
    markers: {
      size: 6,
      offsetY: 2,
      offsetX: -1,
      strokeWidth: 3,
      colors: ['transparent'],
      strokeColors: 'transparent',
      discrete: [
        {
          size: 6,
          seriesIndex: 0,
          strokeColor: theme.palette.info.main,
          fillColor: theme.palette.background.paper,
          dataPointIndex: series[0].data.length - 1
        }
      ],
      hover: { size: 7 }
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: {
      labels: { show: false }
    }
  }
  const textColor = theme.palette.mode === 'dark' ? 'common.white' : 'common.black'

  return (
    <>
      <Typography
        variant='h4'
        sx={{
          display: 'flex',
          mb: 2.75,
          mt: 2.75,
          justifyContent: 'center',
          alignItems: 'center',
          color: textColor,
          '& svg': { mr: 2.5 }
        }}
      >
        Client Cards
      </Typography>
      <Grid container spacing={6} mb={'20px'}>
        <Grid item xs={6}>
          <Card sx={{ ml: '20px', mt: '20px', pt: '20px', pb: '20px', border: 0, color: 'common.white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }} mb='20px'>
                <Typography variant='h6' sx={{ mr: 1.75 }}>
                  22k
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { color: 'primary' } }}>
                  <CustomAvatar skin='light' variant='rounded' sx={{ mr: 4 }}>
                    <Icon icon='arcticons:forticlient-vpn' fontSize='30px' />
                  </CustomAvatar>
                </Box>
              </Box>
              <Typography variant='body2' color={textColor}>
                Active Clients
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ mt: '20px', pt: '20px', pb: '20px', border: 0, color: 'common.white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }} mb='20px'>
                <Typography variant='h6' sx={{ mr: 1.75 }}>
                  22k
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { color: 'warning' } }}>
                  <CustomAvatar skin='light' variant='rounded' sx={{ mr: 4 }} color='success'>
                    <Icon icon='arcticons:opensstpclient' fontSize='30px' />
                  </CustomAvatar>
                </Box>
              </Box>
              <Typography variant='body2' color={textColor}>
                Not Active Clients
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default ClientCards
