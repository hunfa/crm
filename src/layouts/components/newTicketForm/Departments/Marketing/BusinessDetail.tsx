import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

const BusinessDetail = () => {
  const {
    formState: { errors },
    control
  } = useFormContext()

  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.businessDetail?.serviceName}>
            <Controller
              name='businessDetail.serviceName'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <TextField
                    label='Service Name'
                    {...field}
                    error={Boolean(errors?.businessDetail?.serviceName)}
                    fullWidth
                  />
                  {errors.businessDetail?.serviceName && (
                    <FormHelperText>{errors.businessDetail.serviceName.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.businessDetail?.location}>
            <Controller
              name='businessDetail.location'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <TextField label='Location' {...field} fullWidth error={Boolean(errors?.businessDetail?.location)} />
                  {errors.businessDetail?.location && (
                    <FormHelperText>{errors.businessDetail.location.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.businessDetail?.adAccount}>
            <Controller
              name='businessDetail.adAccount'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <TextField
                    label='Add Account'
                    {...field}
                    fullWidth
                    error={Boolean(errors?.businessDetail?.adAccount)}
                  />
                  {errors.businessDetail?.adAccount && (
                    <FormHelperText>{errors.businessDetail.adAccount.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.businessDetail?.budget}>
            <InputLabel htmlFor='budget'>Budget</InputLabel>
            <Controller
              name='businessDetail.budget'
              control={control}
              defaultValue=''
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <Select label='Budget' {...field} fullWidth>
                    <MenuItem value='Pending'>Pending</MenuItem>
                    <MenuItem value='Completed'>Completed</MenuItem>
                  </Select>
                  {errors.businessDetail?.budget && (
                    <FormHelperText>{errors.businessDetail.budget.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.businessDetail?.platform}>
            <InputLabel htmlFor='platform'>Platform</InputLabel>
            <Controller
              name='businessDetail.platform'
              control={control}
              defaultValue=''
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <Select label='Platform' {...field} fullWidth>
                    <MenuItem value='Pending'>Pending</MenuItem>
                    <MenuItem value='Completed'>Completed</MenuItem>
                  </Select>
                  {errors.businessDetail?.platform && (
                    <FormHelperText>{errors.businessDetail.platform.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.businessDetail?.clientObj}>
            <Controller
              name='businessDetail.clientObj'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <TextField
                    label='Client Objective'
                    {...field}
                    error={Boolean(errors?.businessDetail?.clientObj)}
                    fullWidth
                  />
                  {errors.businessDetail?.clientObj && (
                    <FormHelperText>{errors.businessDetail.clientObj.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.businessDetail?.websiteUrl}>
            <Controller
              name='businessDetail.websiteUrl'
              control={control}
              rules={{ required: 'Website URL is required' }}
              render={({ field }) => (
                <>
                  <TextField
                    label='Website URL'
                    {...field}
                    error={Boolean(errors?.businessDetail?.websiteUrl)}
                    fullWidth
                  />
                  {errors.businessDetail?.websiteUrl && (
                    <FormHelperText>{errors.businessDetail.websiteUrl.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>
      </Grid>
    </>
  )
}

export default BusinessDetail
