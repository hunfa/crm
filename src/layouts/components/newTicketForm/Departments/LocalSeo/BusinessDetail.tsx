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
              rules={{ required: 'Service Name is required' }}
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
          <FormControl fullWidth error={!!errors.businessDetail?.facebookUrl}>
            <Controller
              name='businessDetail.facebookUrl'
              control={control}
              rules={{ required: 'Facebook URL is required' }}
              render={({ field }) => (
                <>
                  <TextField
                    label='Facebook URL'
                    {...field}
                    fullWidth
                    error={Boolean(errors?.businessDetail?.facebookUrl)}
                  />
                  {errors.businessDetail?.facebookUrl && (
                    <FormHelperText>{errors.businessDetail.facebookUrl.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.businessDetail?.workStatus}>
            <InputLabel htmlFor='workStatus'>Work Status</InputLabel>
            <Controller
              name='businessDetail.workStatus'
              control={control}
              defaultValue=''
              rules={{ required: 'Work Status is required' }}
              render={({ field }) => (
                <>
                  <Select label='Work Status' {...field} fullWidth>
                    <MenuItem value='Pending'>Pending</MenuItem>
                    <MenuItem value='Completed'>Completed</MenuItem>
                  </Select>
                  {errors.businessDetail?.workStatus && (
                    <FormHelperText>{errors.businessDetail.workStatus.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.businessDetail?.gmbUrl}>
            <Controller
              name='businessDetail.gmbUrl'
              control={control}
              rules={{ required: 'Google My Business URL is required' }}
              render={({ field }) => (
                <>
                  <TextField
                    label='Google My Business URL'
                    {...field}
                    error={Boolean(errors?.businessDetail?.gmbUrl)}
                    fullWidth
                  />
                  {errors.businessDetail?.gmbUrl && (
                    <FormHelperText>{errors.businessDetail.gmbUrl.message}</FormHelperText>
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

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.businessDetail?.socialProfile}>
            <Controller
              name='businessDetail.socialProfile'
              control={control}
              rules={{ required: 'Social Profile is required' }}
              render={({ field }) => (
                <>
                  <TextField
                    label='Social Profile'
                    {...field}
                    error={Boolean(errors?.businessDetail?.socialProfile)}
                    fullWidth
                  />
                  {errors.businessDetail?.socialProfile && (
                    <FormHelperText>{errors.businessDetail.socialProfile.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.businessDetail?.loginCred}>
            <Controller
              name='businessDetail.loginCred'
              control={control}
              rules={{ required: 'Login Credentials are required' }}
              render={({ field }) => (
                <>
                  <TextField
                    label='Login Credentials'
                    {...field}
                    error={Boolean(errors?.businessDetail?.loginCred)}
                    fullWidth
                  />
                  {errors.businessDetail?.loginCred && (
                    <FormHelperText>{errors.businessDetail.loginCred.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.businessDetail?.notes}>
            <Controller
              name='businessDetail.notes'
              control={control}
              rules={{ required: 'Notes are required' }}
              render={({ field }) => (
                <>
                  <TextField label='Notes' {...field} error={Boolean(errors?.businessDetail?.notes)} fullWidth />
                  {errors.businessDetail?.notes && (
                    <FormHelperText>{errors.businessDetail.notes.message}</FormHelperText>
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
