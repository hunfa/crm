import dayjs from 'dayjs'

const CloserSheetColumns: any = (businessList: any) => {
  return [
    {
      header: 'Date',
      accessorFn: (originalRow: any) => dayjs(originalRow.createdAt),
      filterVariant: 'date-range',
      Cell: ({ cell }: any) => {
        const value = cell.getValue()

        return dayjs(value).format('l')
      },
      accessorKey: 'createdAt',
      size: 20
    },
    {
      header: 'Business Name',
      accessorKey: 'business_id.business_name',
      filterVariant: 'autocomplete',
      filterSelectOptions: businessList,
      filterFn: 'equals'
    },

    {
      header: 'Closer',
      accessorKey: 'closer_id.user_name',
      filterVariant: 'autocomplete',
      filterFn: 'equals'
    },
    {
      header: 'Work Type',
      accessorKey: 'ticket_id.work_status',
      filterVariant: 'autocomplete',
      filterFn: 'equals'
    },
    {
      header: 'Sale Type',
      accessorKey: 'sales_type'
    },
    {
      header: 'Payment ($)',
      accessorKey: 'received_payment'
    }
  ]
}

export default CloserSheetColumns
