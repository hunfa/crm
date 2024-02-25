import React, { useState, useEffect } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import axios from 'axios'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'

const TableColumns = () => {
  const [businesses, setBusinesses] = useState([])

  useEffect(() => {
    const getBusiness = async () => {
      try {
        const res = await axios.get('/api/business/get-all', {
          headers: { authorization: localStorage.getItem('token') }
        })
        setBusinesses(res.data.payload.businesses)
      } catch (error) {
        console.error(error)
      }
    }
    getBusiness()
  }, [])

  const handleEdit = id => {
    // Placeholder for edit action
    console.log(`Editing business with ID ${id}`)
  }

  const handleView = id => {
    // Placeholder for view action
    console.log(`Viewing business with ID ${id}`)
  }

  const columns: GridColDef[] = [
    {
      field: '_id',
      headerName: 'ID',
      width: 150
    },
    {
      field: 'business_name',
      headerName: 'Business Name',
      width: 200
    },
    {
      field: 'business_email',
      headerName: 'Business Email',
      width: 200
    },
    {
      field: 'business_hours',
      headerName: 'Business Hours',
      width: 200
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: params => (
        <div>
          {/* Edit icon */}
          <IconButton aria-label='edit' onClick={() => handleEdit(params.row._id)}>
            <EditIcon />
          </IconButton>
          {/* View icon */}
          <IconButton aria-label='view' onClick={() => handleView(params.row._id)}>
            <VisibilityIcon />
          </IconButton>
        </div>
      )
    }
  ]

  // Map businesses data to include an `id` property for each row
  const rows = businesses.map(business => ({
    id: business._id, // Use `_id` property as the `id`
    ...business
  }))

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  )
}

export default TableColumns
