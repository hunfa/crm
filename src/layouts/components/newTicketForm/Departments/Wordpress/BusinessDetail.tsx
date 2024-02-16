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
                    fullWidth
                    error={Boolean(errors.businessDetail?.serviceName)}
                  />
                  <FormHelperText>{errors.businessDetail?.serviceName?.message || ''}</FormHelperText>
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.businessDetail?.serviceArea}>
            <Controller
              name='businessDetail.serviceArea'
              control={control}
              render={({ field }) => (
                <>
                  <TextField label='Service Area' {...field} fullWidth error={!!errors.businessDetail?.serviceArea} />
                  <FormHelperText>{errors.businessDetail?.serviceArea?.message || ''}</FormHelperText>
                </>
              )}
              rules={{ required: true }}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.businessDetail?.facebookUrl}>
            <Controller
              name='businessDetail.facebookUrl'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <TextField
                    label='Facebook URL'
                    {...field}
                    fullWidth
                    error={Boolean(errors.businessDetail?.facebookUrl)}
                  />
                  <FormHelperText>{errors.businessDetail?.facebookUrl?.message || ''}</FormHelperText>
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.businessDetail?.number}>
            <Controller
              name='businessDetail.number'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <TextField
                    label='Number'
                    type='number'
                    {...field}
                    fullWidth
                    error={Boolean(errors.businessDetail?.number)}
                  />
                  <FormHelperText>{errors.businessDetail?.number?.message || ''}</FormHelperText>
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.businessDetail?.clientName}>
            <Controller
              name='businessDetail.clientName'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <TextField
                    label='Client Name'
                    {...field}
                    fullWidth
                    error={Boolean(errors.businessDetail?.clientName)}
                  />
                  <FormHelperText>{errors.businessDetail?.clientName?.message || ''}</FormHelperText>
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.businessDetail?.country}>
            <Controller
              name='businessDetail.country'
              rules={{ required: true }}
              control={control}
              render={({ field }) => (
                <>
                  <TextField label='Country' {...field} fullWidth error={Boolean(errors.businessDetail?.country)} />
                  <FormHelperText>{errors.businessDetail?.country?.message || ''}</FormHelperText>
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.businessDetail?.state}>
            <Controller
              name='businessDetail.state'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <TextField label='State' {...field} fullWidth error={Boolean(errors.businessDetail?.state)} />
                  <FormHelperText>{errors.businessDetail?.state?.message || ''}</FormHelperText>
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.businessDetail?.zipCode}>
            <Controller
              name='businessDetail.zipCode'
              rules={{ required: true }}
              control={control}
              render={({ field }) => (
                <>
                  <TextField label='Zip Code' {...field} fullWidth error={Boolean(errors.businessDetail?.zipCode)} />
                  <FormHelperText>{errors.businessDetail?.zipCode?.message || ''}</FormHelperText>
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.businessDetail?.street}>
            <Controller
              name='businessDetail.street'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <TextField label='Street' {...field} fullWidth error={Boolean(errors.businessDetail?.street)} />
                  <FormHelperText>{errors.businessDetail?.street?.message || ''}</FormHelperText>
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.businessDetail?.referralWebsite}>
            <Controller
              name='businessDetail.referralWebsite'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <TextField
                    label='Referral Website'
                    {...field}
                    fullWidth
                    error={Boolean(errors.businessDetail?.referralWebsite)}
                  />
                  <FormHelperText>{errors.businessDetail?.referralWebsite?.message || ''}</FormHelperText>
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.businessDetail?.gmbUrl}>
            <Controller
              rules={{ required: true }}
              name='businessDetail.gmbUrl'
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    label='Google My Business URL'
                    {...field}
                    fullWidth
                    error={Boolean(errors.businessDetail?.gmbUrl)}
                  />
                  <FormHelperText>{errors.businessDetail?.gmbUrl?.message || ''}</FormHelperText>
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
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <TextField
                    label='Social Profile'
                    {...field}
                    fullWidth
                    error={Boolean(errors.businessDetail?.socialProfile)}
                  />
                  <FormHelperText>{errors.businessDetail?.socialProfile?.message || ''}</FormHelperText>
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
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <TextField label='Notes' {...field} fullWidth error={Boolean(errors.businessDetail?.notes)} />
                  <FormHelperText>{errors.businessDetail?.notes?.message || ''}</FormHelperText>
                </>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          {/* <FormControl fullWidth error={!!errors.businessDetail?.websiteType}>
            <Controller
              name='businessDetail.websiteType'
              rules={{ required: true }}
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    label='Website Type'
                    {...field}
                    fullWidth
                    error={Boolean(errors.businessDetail?.websiteType)}
                  />
                  <FormHelperText>{errors.businessDetail?.websiteType?.message || ''}</FormHelperText>
                </>
              )}
            />
          </FormControl> */}

          <FormControl fullWidth error={Boolean(errors.businessDetail?.websiteType)}>
            <InputLabel htmlFor='WebsiteType'>Website Type</InputLabel>
            <Controller
              name='businessDetail.websiteType'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <Select label='Website Type' {...field} fullWidth>
                    <MenuItem value='redesign'>Redesign Website</MenuItem>
                    <MenuItem value='ecommerce'>Ecommerce</MenuItem>
                    <MenuItem value='single-page-website'>Single Page Website</MenuItem>
                    <MenuItem value='full'>Full</MenuItem>
                  </Select>
                  <FormHelperText>{errors.businessDetail?.websiteType?.message || ''}</FormHelperText>
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
