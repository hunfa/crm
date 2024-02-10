import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

const SaleDepartment = () => {
  const {
    formState: { errors },
    control
  } = useFormContext()

  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Controller
              name='saleDepart.assignor'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Assignor'
                  onChange={onChange}
                  error={Boolean(errors?.saleDepart?.assignor)}
                  aria-describedby='validation-basic-assignor'
                />
              )}
            />
            {errors?.saleDepart?.assignor && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-business-name'>
                Assignor is required
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel
              id='validation-supportPerson-select'
              error={Boolean(errors?.saleDepart?.supportPerson)}
              htmlFor='validation-supportPerson-select'
            >
              Support Person
            </InputLabel>
            <Controller
              name='saleDepart.supportPerson'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  label='Support Person'
                  onChange={onChange}
                  error={Boolean(errors?.saleDepart?.supportPerson)}
                  labelId='validation-supportPerson-select'
                  aria-describedby='validation-supportPerson-select'
                >
                  <MenuItem value='UK'>UK</MenuItem>
                  <MenuItem value='USA'>USA</MenuItem>
                  <MenuItem value='Australia'>Australia</MenuItem>
                  <MenuItem value='Germany'>Germany</MenuItem>
                </Select>
              )}
            />
            {errors?.saleDepart?.supportPerson && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-supportPerson-select'>
                Support person is required
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel
              id='validation-supportPerson-select'
              error={Boolean(errors?.saleDepart?.closerPerson)}
              htmlFor='validation-supportPerson-select'
            >
              Closer Person
            </InputLabel>
            <Controller
              name='saleDepart.closerPerson'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  label='Closer Person'
                  onChange={onChange}
                  error={Boolean(errors?.saleDepart?.closerPerson)}
                  labelId='validation-closerPerson-select'
                  aria-describedby='validation-closerPerson-select'
                >
                  <MenuItem value='UK'>UK</MenuItem>
                  <MenuItem value='USA'>USA</MenuItem>
                  <MenuItem value='Australia'>Australia</MenuItem>
                  <MenuItem value='Germany'>Germany</MenuItem>
                </Select>
              )}
            />
            {errors?.saleDepart?.closerPerson && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-closerPerson-select'>
                Closer person is required
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel
              id='validation-fronter-select'
              error={Boolean(errors?.saleDepart?.fronter)}
              htmlFor='validation-fronter-select'
            >
              Fronter Person
            </InputLabel>
            <Controller
              name='saleDepart.fronter'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  label='Fronter Person'
                  onChange={onChange}
                  error={Boolean(errors?.saleDepart?.fronter)}
                  labelId='validation-fronter-select'
                  aria-describedby='validation-fronter-select'
                >
                  <MenuItem value='UK'>UK</MenuItem>
                  <MenuItem value='USA'>USA</MenuItem>
                  <MenuItem value='Australia'>Australia</MenuItem>
                  <MenuItem value='Germany'>Germany</MenuItem>
                </Select>
              )}
            />
            {errors?.saleDepart?.fronter && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-fronter-select'>
                Fronter Person is required
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
      </Grid>
    </>
  )
}

export default SaleDepartment
