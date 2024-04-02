import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import MuiTable from './MuiTable'
import FronterSheetColumns from './columns/FronterSheetColumns'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { mkConfig, generateCsv, download } from 'export-to-csv'
import { Box, Button, Typography } from '@mui/material'
import dayjs from 'dayjs'

function FronterSheetTable() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [businessList, setBusinessList] = useState([])

  const fetchData = async () => {
    try {
      setIsLoading(true)

      const res = await axios.get('/api/accounting/get-fronter-sheet', {
        headers: { authorization: localStorage.getItem('token') }
      })

      setData(res.data.payload.paymentHistory)
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

  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
    filename: 'Fronter Sheet'
  })

  const handleExportRows = (rows: any[]) => {
    const rowData = rows.map(d => {
      return {
        date: dayjs(d.original.createdAt).format('l'),
        'business name': d.original.business_id.business_name,
        fronter: d.original.fronter_id.user_name,
        'work type': d.original.ticket_id.work_status,
        payment: d.original.received_payment
      }
    })

    const csv = generateCsv(csvConfig)(rowData)
    download(csvConfig)(csv)
  }

  const getTotal = (rows: any[]) => {
    let total = 0
    rows.forEach((r: any) => {
      total = total + r.original.received_payment
    })

    return total
  }

  useEffect(() => {
    fetchData()
    fetchBusinesses()
  }, [])

  const columns: any = useMemo(() => FronterSheetColumns(businessList), [businessList])

  return (
    <>
      <MuiTable
        data={data}
        columns={columns}
        options={{
          state: {
            isLoading: isLoading
          },
          enableFacetedValues: true,
          initialState: {
            showGlobalFilter: true

            // showColumnFilters: true
          },
          renderTopToolbarCustomActions: ({ table }: any) => (
            <Box>
              <Button
                disabled={table.getPrePaginationRowModel().rows.length === 0}
                onClick={() => handleExportRows(table.getPrePaginationRowModel().rows)}
                variant='contained'
                startIcon={<FileDownloadIcon />}
              >
                Export Csv
              </Button>
              <Typography variant='h5' sx={{ mt: 5, mb: 2 }}>{`Total : $${getTotal(
                table.getPrePaginationRowModel().rows
              )}`}</Typography>
            </Box>
          )
        }}
      />
    </>
  )
}

export default FronterSheetTable
