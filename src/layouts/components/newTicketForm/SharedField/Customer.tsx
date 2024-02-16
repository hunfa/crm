import { FormControl, FormHelperText, Grid, TextField } from '@mui/material'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

const Customer = () => {
  const {
    formState: { errors },
    control
  } = useFormContext()

  return (
    <div>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Controller
              name='business.name'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Business Name'
                  onChange={onChange}
                  error={Boolean(errors?.business?.name)}
                  aria-describedby='validation-basic-first-name'
                />
              )}
            />
            {errors?.business?.name && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-business-name'>
                {errors?.business?.name?.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Controller
              name='business.email'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Business Email'
                  onChange={onChange}
                  error={Boolean(errors?.business?.email)}
                  aria-describedby='validation-basic-last-name'
                />
              )}
            />
            {errors?.business?.email && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-last-name'>
                {errors?.business?.email.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
      </Grid>
    </div>
  )
}

export default Customer
