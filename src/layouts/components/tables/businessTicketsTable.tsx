import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { mapFormPageRoutes } from 'src/constants'
import { useAuth } from 'src/hooks/useAuth'
import { Department } from 'src/shared/enums/Department.enum'
import MuiTable from './MuiTable'
import businessTicketsColumns from './columns/businessTicketsTableColumns'
let filteredData: any = []
function BusinessTicketsTable() {
  const [data, setData] = useState([])
  const [employees, setEmployees] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()
  const router = useRouter()
  const [businessList, setBusinessList] = useState([])

  const fetchData = async () => {
    try {
      setIsLoading(true)

      // Make both API requests concurrently
      const [usersResponse, dataResponse] = await Promise.all([
        axios.get('/api/user/get-employees-department-wise', {
          headers: { authorization: localStorage.getItem('token') }
        }),
        axios.get('/api/business-ticket/get-all', {
          headers: { authorization: localStorage.getItem('token') }
        })
      ])
      console.log('usersResponse', usersResponse)
      console.log('dataResponse', dataResponse)

      // Destructure the responses
      const { data: usersData } = usersResponse
      const { data: ticketsData } = dataResponse

      // Set the state for users and data
      setEmployees(usersData.payload.users)
      setData(ticketsData.payload.tickets)
    } catch (error) {
      console.error(error)
      toast.error('Network error. Please refresh the page.')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchBusinesses = async () => {
    try {
      const res = await axios.get('/api/business/get-all-names', {
        headers: { authorization: localStorage.getItem('token') }
      })
      setBusinessList(() => {
        return res.data?.payload?.businesses.map((b: any) => b.business_name)
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
    fetchBusinesses()
  }, [])

  const fetchAgain = () => {
    fetchData()
  }

  const assignedEmployeeToTicket = async (user_name: string | 'Not Assigned', ticketId: string) => {
    const userFound: any = employees.find((e: any) => e.user_name === user_name)

    try {
      const res: any = await axios.post(
        '/api/business-ticket/assign-to-employee',
        {
          ticketId,
          user_name,
          employee_id: userFound?._id
        },
        { headers: { authorization: localStorage.getItem('token') } }
      )
      toast.success(res.data?.message)
    } catch (error: any) {
      console.log(error)
      toast.error(error.response?.data)
    }
  }

  const updateTicketStatus = async (ticketId: string, status: string) => {
    try {
      const res: any = await axios.post(
        '/api/business-ticket/update-status',
        {
          ticketId,
          status
        },
        { headers: { authorization: localStorage.getItem('token') } }
      )
      toast.success(res.data.message)
    } catch (error: any) {
      console.log(error)
      toast.error(error.response.data)
    }
  }

  const handleTicketEdit = (depart_name: Department, ticketId: string) => {
    const page: string = mapFormPageRoutes[depart_name]

    router.push({
      pathname: page,
      query: { ticketId }
    })
  }

  const handleView = (ticketId: string, department: string) => {
    router.push({
      pathname: '/view-ticket',
      query: { ticketId, depart: department }
    })
  }

  const columns: any = useMemo(
    () =>
      businessTicketsColumns(
        user,
        employees,
        assignedEmployeeToTicket,
        updateTicketStatus,
        handleTicketEdit,
        fetchAgain,
        businessList,
        handleView
      ),
    [employees, businessList]
  )

  return (
    <>
      {/* <Card sx={{ mb: 8 }}>
        <CardHeader title='Filters' />
        <CardContent>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={3}>
              <FormControl>
                <InputLabel id='validation-Department' htmlFor='validation-Department'>
                  Select Department
                </InputLabel>
                <Select
                  // size='small'
                  style={{ width: '200px' }}
                  onChange={e => {
                    setSelectedDepartment(e.target.value)
                  }}
                  value={selectedDepartment}
                  label='Select Department'
                  // displayEmpty
                  labelId='validation-Department'
                >
                  <MenuItem value='All'>All</MenuItem>
                  {DepartmentValues.map((e: any) => {
                    return (
                      <MenuItem key={e} value={e}>
                        {e}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={3}>
              <FormControl>
                <InputLabel id='validation-supportPerson' htmlFor='validation-supportPerson'>
                  Select Business
                </InputLabel>
                <Select
                  style={{ width: '200px' }}
                  // size='small'
                  onChange={e => {
                    setSelectedBusiness(e.target.value)
                  }}
                  value={selectedBusiness}
                  label='Select Business'
                  labelId='validation-sale_type'
                >
                  <MenuItem value='All'>All</MenuItem>
                  {businessList.map((e: any) => {
                    return (
                      <MenuItem key={e.business_name} value={e.business_name}>
                        {e.business_name}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={3}>
              <FormControl>
                <InputLabel id='validation-Status' htmlFor='validation-Status'>
                  Select Status
                </InputLabel>
                <Select
                  style={{ width: '200px' }}
                  // size='small'
                  onChange={e => {
                    setSelectedStatus(e.target.value)
                  }}
                  value={selectedStatus}
                  label='Select Status'
                  labelId='validation-Status'
                >
                  <MenuItem value='All'>All</MenuItem>
                  {TicketStatusValues.map((e: any) => {
                    return (
                      <MenuItem key={e} value={e}>
                        {e}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button onClick={handleClear} variant='contained'>
                Clear Filters
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card> */}
      <MuiTable
        data={data}
        columns={columns}
        options={{
          state: {
            isLoading: isLoading
          }
        }}
      />
    </>
  )
}

export default BusinessTicketsTable
