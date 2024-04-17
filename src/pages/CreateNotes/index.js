import { Button, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import CustomChip from 'src/@core/components/mui/chip'
import { rows } from './UserNotesRow'

const statusObj = {
  1: { title: 'active', color: 'primary' },
  2: { title: 'completed', color: 'success' }
}

const TableSelection = () => {
  // ** State
  const [notes, setNotes] = useState(Array.from({ length: rows.length }, () => ''))

  const handleAddNotes = index => {
    // Logic to add notes for a specific row index
    console.log('Adding notes for row', index, ':', notes[index])
    toast.success('Note Added') // Trigger the toast notification
  }

  const columns = [
    {
      flex: 0.25,
      minWidth: 490,
      field: 'full_name',
      headerName: 'Notes',
      renderCell: params => {
        const index = params.row.id - 1 // Assuming row ids start from 1

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              size='small'
              type='string'
              placeholder='Add Notes'
              value={notes[index]}
              onChange={e => {
                const newNotes = [...notes]
                newNotes[index] = e.target.value
                setNotes(newNotes)
              }}
            />
            <Button
              style={{ marginLeft: '5px' }}
              variant='contained'
              color='primary'
              onClick={() => handleAddNotes(index)}
            >
              Add
            </Button>
          </Box>
        )
      }
    },
    {
      flex: 0.175,
      type: 'date',
      minWidth: 120,
      headerName: 'Date',
      field: 'start_date',
      valueGetter: params => new Date(params.value),
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.start_date}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 140,
      field: 'status',
      headerName: 'Status',
      renderCell: params => {
        const status = statusObj[params.row.status]

        return (
          <CustomChip
            rounded
            size='small'
            skin='light'
            color={status?.color}
            label={status?.title}
            sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
          />
        )
      }
    }
  ]

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

  return (
    <Card>
      <CardHeader title='User Notes' style={{ textAlign: 'center', fontSize: '28px' }} />
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        checkboxSelection
        pageSizeOptions={[7, 10, 25, 50]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
    </Card>
  )
}

export default TableSelection
