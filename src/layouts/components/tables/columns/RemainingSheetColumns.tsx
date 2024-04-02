import dayjs from 'dayjs'

const RemainingSheetColumns: any = (businessList: any) => {
  return [
    {
      header: 'Date',
      accessorFn: (originalRow: any) => dayjs(originalRow.createdAt),
      filterVariant: 'date-range',
      Cell: ({ cell }: any) => {
        const value = cell.getValue()

        return dayjs(value).format('l')
      }
    },
    {
      header: 'Business Name',
      accessorKey: 'business_id.business_name',
      filterVariant: 'autocomplete',
      filterSelectOptions: businessList
    },

    {
      header: 'Work Type',
      accessorKey: 'ticket_id.work_status',
      filterVariant: 'autocomplete'
    },
    {
      header: 'Remaining Balance ($)',
      accessorKey: 'remaining_payment'
    }
  ]
}

export default RemainingSheetColumns
