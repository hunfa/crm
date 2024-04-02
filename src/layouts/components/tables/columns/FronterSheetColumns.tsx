import dayjs from 'dayjs'

const FronterSheetColumns: any = (businessList: any) => {
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
      filterSelectOptions: businessList,
      filterFn: 'equals'
    },

    {
      header: 'Fronter',
      accessorKey: 'fronter_id.user_name',
      filterVariant: 'autocomplete',
      filterFn: 'equals'
    },
    {
      header: 'Work Type',
      accessorKey: 'ticket_id.work_status',
      filterFn: 'equals'
    },
    {
      header: 'Payment ($)',
      accessorKey: 'received_payment'
    }
  ]
}

export default FronterSheetColumns
