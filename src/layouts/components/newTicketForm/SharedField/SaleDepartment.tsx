import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { CommonFormType } from 'src/interfaces/forms.interface'
import { SaleType, SaleTypeValues } from 'src/shared/enums/SaleType.enum'

const SaleDepartment = () => {
  const {
    formState: { errors },
    control,
    watch,
    setValue
  } = useFormContext<CommonFormType>()

  const [saleUsers, setsaleUsers] = useState<[]>([])
  const saleType = watch('saleDepart.sale_type')

  useEffect(() => {
    const getBusiness = async () => {
      try {
        const res = await axios.get('/api/user/get-sales-user', {
          headers: { authorization: localStorage.getItem('token') }
        })
        setsaleUsers(res.data.payload.salesUsers)
      } catch (error) {
        console.error(error)
      }
    }
    getBusiness()
  }, [])

  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel
              id='validation-supportPerson'
              error={Boolean(errors?.saleDepart?.sale_type)}
              htmlFor='validation-supportPerson'
            >
              Sale Type
            </InputLabel>
            <Controller
              name='saleDepart.sale_type'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  label='Sale Type'
                  onChange={onChange}
                  error={Boolean(errors?.saleDepart?.sale_type)}
                  labelId='validation-sale_type'
                  aria-describedby='validation-sale_type'
                >
                  {SaleTypeValues.map(v => {
                    if (v === SaleType.RECURRING_SALE) return

                    return (
                      <MenuItem key={v} value={v}>
                        {v}
                      </MenuItem>
                    )
                  })}
                </Select>
              )}
            />
            {errors?.saleDepart?.sale_type && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-closerPerson-select'>
                {errors.saleDepart.sale_type.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel
              id='validation-supportPerson-select'
              error={Boolean(errors?.saleDepart?.closer)}
              htmlFor='validation-supportPerson-select'
            >
              Closer Person
            </InputLabel>
            <Controller
              name='saleDepart.closer'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  label='Closer Person'
                  onChange={e => {
                    const closer: any = saleUsers.find((user: any) => user.user_name === e.target.value)
                    setValue('saleDepart.closer_id', closer._id)
                    onChange(e)
                  }}
                  error={Boolean(errors?.saleDepart?.closer)}
                  labelId='validation-closerPerson-select'
                  aria-describedby='validation-closerPerson-select'
                >
                  {saleUsers.length > 0 &&
                    saleUsers.map((u: any) => {
                      return (
                        <MenuItem key={u._id} value={u.user_name}>
                          {u.user_name}
                        </MenuItem>
                      )
                    })}
                </Select>
              )}
            />
            {errors?.saleDepart?.closer && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-closerPerson-select'>
                Closer person is required
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        {saleType === SaleType.NEW_SALE && (
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
                    onChange={e => {
                      const fronter: any = saleUsers.find((user: any) => user.user_name === e.target.value)
                      setValue('saleDepart.fronter_id', fronter._id)
                      onChange(e)
                    }}
                    error={Boolean(errors?.saleDepart?.fronter)}
                    labelId='validation-fronter-select'
                    aria-describedby='validation-fronter-select'
                  >
                    {saleUsers.length > 0 &&
                      saleUsers.map((u: any) => {
                        return (
                          <MenuItem key={u._id} value={u.user_name}>
                            {u.user_name}
                          </MenuItem>
                        )
                      })}
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
        )}
      </Grid>
    </>
  )
}

export default SaleDepartment
