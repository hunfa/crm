// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { TicketStatus } from 'src/shared/enums/TicketStatus.enum'
import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useRouter } from 'next/router'
import SimpleCard2 from 'src/layouts/components/cards/simpleCard2'
import PickersMonthYear from 'src/layouts/components/datePickers/MonthPicker'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import { useAuth } from 'src/hooks/useAuth'
import { DepartmentValues } from 'src/shared/enums/Department.enum'

const donutColors = {
  series1: '#666CFF',
  series2: '#72E128',
  series3: '#26C6F9',
  series4: '#40CDFA',
  series5: '#FDB528'
}

const BusinessTicketsAnalytics = () => {
  // ** Hook
  const theme = useTheme()
  const [series, setSeries] = useState<any>([100, 0, 0, 0])
  const [counts, setCounts] = useState<any>(null)
  const router = useRouter()
  const [month, setMonth] = useState<DateType>(new Date())
  const [value, setValue] = useState<string>('All')
  const [employees, setEmployees] = useState<any>([])
  const [filterUsers, setFilterUsers] = useState<any>([])
  const { user, departments } = useAuth()
  const [department, setDepartment] = useState<string>('All')

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string)
  }

  const handleDepartmentChange = (event: SelectChangeEvent) => {
    setDepartment(event.target.value as string)
    const temp = employees.filter((e: any) => {
      return e.department_name === event.target.value
    })
    setFilterUsers(temp)
  }

  const fetchData = async () => {
    try {
      let employee_id
      if (value !== 'All') employee_id = value

      let depart: any
      if (department !== 'All') {
        depart = departments.find((d: any) => d.name === department)
        if (!depart) throw new Error('Something went wrong')
      }
      const res = await axios.get(
        `/api/stats/business-tickets-percentage?month=${month?.getMonth()}&year=${month?.getFullYear()}&employee_id=${employee_id}&department_id=${
          depart?._id
        }`,
        {
          headers: { authorization: localStorage.getItem('token') }
        }
      )
      const temp = new Array(4).fill(0)
      const obj: any = {}
      res.data.payload.ticketStats.forEach((t: any) => {
        if (t.status === TicketStatus.NOT_STARTED_YET) {
          temp[0] = t.percentage
          obj[TicketStatus.NOT_STARTED_YET] = t.count
        }
        if (t.status === TicketStatus.PENDING) {
          temp[1] = t.percentage
          obj[TicketStatus.PENDING] = t.count
        }
        if (t.status === TicketStatus.IN_PROGRESS) {
          temp[2] = t.percentage
          obj[TicketStatus.IN_PROGRESS] = t.count
        }
        if (t.status === TicketStatus.COMPLETED) {
          temp[3] = t.percentage
          obj[TicketStatus.COMPLETED] = t.count
        }
      })
      setSeries(temp)
      setCounts(obj)
    } catch (error) {
      console.log(error)
      toast.error('Network error')
    }
  }

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`/api/user/get-all-employees?role=${user?.role}`, {
        headers: { authorization: localStorage.getItem('token') }
      })
      setEmployees(res.data.payload.employees)
    } catch (error) {
      console.log(error)
      toast.error('Network error')
    }
  }
  useEffect(() => {
    fetchData()

    fetchEmployees()
  }, [month, value, department])

  const options: ApexOptions = {
    stroke: { width: 0 },
    labels: [TicketStatus.NOT_STARTED_YET, TicketStatus.PENDING, TicketStatus.IN_PROGRESS, TicketStatus.COMPLETED],
    colors: [donutColors.series1, donutColors.series5, donutColors.series3, donutColors.series2],
    dataLabels: {
      enabled: true,
      formatter: (val: string) => `${parseInt(val, 10)}%`
    },
    legend: {
      position: 'bottom',
      markers: { offsetX: -3 },
      labels: { colors: theme.palette.text.secondary },
      itemMargin: {
        vertical: 3,
        horizontal: 10
      }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: '1.2rem'
            },
            value: {
              fontSize: '1.2rem',
              color: theme.palette.text.secondary,
              formatter: (val: string) => `${parseInt(val, 10)}%`
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 380
          },
          legend: {
            position: 'bottom'
          }
        }
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 320
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: '1rem'
                  },
                  value: {
                    fontSize: '1rem'
                  },
                  total: {
                    fontSize: '1rem'
                  }
                }
              }
            }
          }
        }
      }
    ]
  }

  return (
    <Card>
      <CardHeader
        title='Business Tickets'
        subheaderTypographyProps={{ sx: { color: theme => `${theme.palette.text.disabled} !important` } }}
      />
      <CardContent>
        <Grid container sx={{ mb: 15 }} gap={5}>
          <Grid item xs={12} md={3}>
            <PickersMonthYear popperPlacement='auto' month={month} setMonth={setMonth} styles={{ fullWidth: true }} />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel id='controlled-se'>Select Department</InputLabel>
              <Select
                value={department}
                label='Select Department'
                id='controlled-se'
                onChange={handleDepartmentChange}
                labelId='controlled-se'
              >
                <MenuItem value='All'>All</MenuItem>
                {DepartmentValues.map((u: any) => {
                  return (
                    <MenuItem key={u} value={u}>
                      {u}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel id='controlled-select-label'>Select Employee</InputLabel>
              <Select
                value={value}
                label='Select Sale Employee'
                id='controlled-select'
                onChange={handleChange}
                labelId='controlled-select-label'
                disabled={department === 'All'}
              >
                <MenuItem value='All'>All</MenuItem>
                {filterUsers.map((u: any) => {
                  return (
                    <MenuItem key={u._id} value={u._id}>
                      {u.user_name}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sm={8}>
            <ReactApexcharts type='donut' height={400} options={options} series={series} />
          </Grid>
          <Grid container xs={12} sm={4}>
            <Grid item xs={12} sx={{ cursor: 'pointer' }}>
              <SimpleCard2
                count={counts?.[TicketStatus.NOT_STARTED_YET]}
                icon={'circum:no-waiting-sign'}
                text={'Not Started Yet'}
              />
            </Grid>
            <Grid
              item
              xs={12}
              onClick={() => {
                router.push({
                  pathname: '/view-tickets',
                  query: { status: TicketStatus.PENDING }
                })
              }}
              sx={{ cursor: 'pointer' }}
            >
              <SimpleCard2
                count={counts?.[TicketStatus.PENDING]}
                icon={'ic:outline-pending-actions'}
                text={'Pending'}
                iconColor='warning'
              />
            </Grid>
            <Grid
              item
              xs={12}
              onClick={() => {
                router.push({
                  pathname: '/view-tickets',
                  query: { status: TicketStatus.IN_PROGRESS }
                })
              }}
              sx={{ cursor: 'pointer' }}
            >
              <SimpleCard2
                count={counts?.[TicketStatus.IN_PROGRESS]}
                icon={'carbon:in-progress'}
                text={'In Progress'}
                iconColor='info'
              />
            </Grid>

            <Grid
              item
              xs={12}
              onClick={() => {
                router.push({
                  pathname: '/view-tickets',
                  query: { status: TicketStatus.COMPLETED }
                })
              }}
              sx={{ cursor: 'pointer' }}
            >
              <SimpleCard2
                count={counts?.[TicketStatus.COMPLETED]}
                icon={'fluent-mdl2:completed'}
                text={'Completed'}
                iconColor='success'
              />
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default BusinessTicketsAnalytics
