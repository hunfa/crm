import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import axios from 'axios'
import { FormControl, MenuItem, Select } from '@mui/material'
import toast from 'react-hot-toast'

export default function AddCreditPaymentDialog({ session, pushNewPaymentInPaymentHistories, saleUsers }: any) {
  const [open, setOpen] = React.useState(false)
  const [amount, setAmount] = React.useState<number | null>(null)
  const [, setApiLoading] = React.useState(false)
  const regex = /^[0-9]+$/
  const handleClickOpen = () => {
    setOpen(true)
  }
  const [value, setValue] = React.useState('')
  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (e: any) => {
    if (!e.target.value) {
      setAmount(e.target.value)

      return
    }
    if (!regex.test(e.target.value)) return
    setAmount(Number(e.target.value))
  }

  const handleSubmit = async () => {
    try {
      if (!value || !amount) {
        toast.error('PLease fill all fields')

        return
      }
      const userFound: any = saleUsers.find((e: any) => e.user_name === value)

      if (!userFound) {
        toast.error('Network error')

        return
      }
      setApiLoading(true)
      const res = await axios.patch(
        `/api/business-ticket/add-credit-payment`,
        {
          received_payment: amount,
          id: session._id,
          total_payment: session.total_payment,
          session_remaining_payment: session.remaining_payment,
          closer_id: userFound._id
        },
        {
          headers: { authorization: localStorage.getItem('token') }
        }
      )
      setApiLoading(false)
      setOpen(false)

      pushNewPaymentInPaymentHistories(res.data.payload.paymentHistory, res.data.payload.session)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <React.Fragment>
      <Button variant='contained' onClick={handleClickOpen} sx={{ mb: 10 }}>
        Add Received payment
      </Button>
      <Dialog open={open} onClose={handleClose} keepMounted={false}>
        <DialogTitle>Add Received Payment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            name='amount'
            label='Received Amount'
            type='text'
            fullWidth
            onChange={handleChange}
            value={amount}
          />
          <FormControl>
            <Select
              fullWidth
              sx={{ mt: 2 }}
              onChange={e => {
                setValue(e.target.value)
              }}
              value={value}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value='' disabled>
                Select Closer
              </MenuItem>
              {saleUsers.map((e: any) => {
                return (
                  <MenuItem key={e.user_name} value={e.user_name}>
                    {e.user_name}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleSubmit}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
