import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useAuth } from 'src/hooks/useAuth'
import MuiTable from './MuiTable'
import BusinessesColumns from './columns/BusinessesColumns'

function BusinessesTable() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  const fetchBusinesses = async () => {
    try {
      const res = await axios.get('/api/business/get-all', {
        headers: { authorization: localStorage.getItem('token') }
      })
      setData(res.data.payload.businesses)
    } catch (error) {
      console.error(error)
    }
  }

  const handleEdit = (businessId: string) => {
    router.push({
      pathname: '/business-update',
      query: { businessId }
    })
  }
  const updateClientStatus = (businessId: string) => {
    console.log(`updatedClientStatus for ${businessId}`)
  }

  const columns = useMemo(() => BusinessesColumns(handleEdit, updateClientStatus), [handleEdit])

  useEffect(() => {
    fetchBusinesses()
  }, [])

  // Render the MuiTable component only when columns are initialized
  return (
    <>
      {columns && (
        <MuiTable
          data={data}
          columns={columns}
          options={{
            state: {
              isLoading: isLoading
            }
          }}
        />
      )}
    </>
  )
}

export default BusinessesTable
