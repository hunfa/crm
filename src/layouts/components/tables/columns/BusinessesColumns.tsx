import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { FormControl, Icon, MenuItem, Select, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { ClientStatusValues } from 'src/shared/enums/ClientStatus.enum'
import { UserRole } from 'src/shared/enums/UserRole.enum'

function BusinessesColumns(handleEdit: any, updateClientStatus: any) {
  const [status, setStatus] = React.useState('')

  const handleStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStatus(event.target.value as string)
  }

  return [
    {
      header: 'Name',
      accessorKey: 'business_name'
    },
    {
      header: 'Email',
      accessorKey: 'business_email'
    },
    {
      header: 'Number',
      accessorKey: 'business_number'
    },
    {
      header: 'Client Status',
      accessorKey: 'status',
      Cell: ({ cell }: any) => {
        const { _id } = cell.row.original
        const defaultValue = cell.getValue() ? cell.getValue() : ''
        const [value, setValue] = useState(defaultValue)
        if (UserRole.TEAM_LEAD) {
          return (
            <>
              <FormControl>
                <Select
                  size='small'
                  sx={{ fontSize: '14px' }}
                  onChange={e => {
                    setValue(e.target.value)
                    updateClientStatus(_id, e.target.value)
                  }}
                  // defaultValue=''
                  value={value}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  {ClientStatusValues.map((e: any) => {
                    return (
                      <MenuItem key={e} value={e}>
                        {e}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </>
          )
        }

        return cell.getValue() ? cell.getValue() : 'Active'
      }
    },
    {
      header: 'Action',
      Cell: ({ cell }: any) => {
        const { _id } = cell.row.original
        return (
          <>
            <Tooltip title='View'>
              <Icon style={{ cursor: 'pointer' }}>
                <VisibilityIcon />
              </Icon>
            </Tooltip>
            <Tooltip title='Edit'>
              <Icon style={{ marginLeft: 15, cursor: 'pointer' }} onClick={() => handleEdit(_id)}>
                <EditIcon />
              </Icon>
            </Tooltip>
          </>
        )
      }
    }
  ]
}

export default BusinessesColumns
