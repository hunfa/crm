import React, { useState } from 'react'
import BusinessDetails from 'src/layouts/components/newTicketForm/SharedField/BusinessDetails'
import * as yup from 'yup'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { BusinessDetails as BusinessDetailsType } from 'src/interfaces/forms.interface'
import { useRouter } from 'next/router'
import axios from 'axios'
import toast from 'react-hot-toast'
import { mapResponseForBusiness } from 'src/utils/mapResponseForBusiness'
import SubmitButton from 'src/layouts/components/newTicketForm/SharedField/FormButton'
import { Card, CardContent, CardHeader, Typography } from '@mui/material'

function BusinessUpdate() {
  const router = useRouter()
  const { businessId } = router.query
  const [apiLoading, setApiLoading] = useState(false)

  const defaultValuesI: BusinessDetailsType = {
    business_name: '',
    business_email: '',
    business_number: '',
    business_hours: '',
    state: '',
    country: '',
    zip_code: '',
    street: '',
    website_url: '',
    social_profile: ''
  }

  const defaultValues = async () => {
    if (!businessId) return defaultValuesI
    try {
      setApiLoading(true)
      const res = await axios.get(`/api/business/${businessId}`, {
        headers: { authorization: localStorage.getItem('token') }
      })
      return mapResponseForBusiness(res.data.payload.Business)
    } catch (error) {
      toast.error('Network error. Please refresh the page')
    } finally {
      setApiLoading(false)
    }
  }

  const schema: yup.ObjectSchema<BusinessDetailsType> = yup.object().shape({
    business_name: yup
      .string()
      .max(200, 'Business Name cannot exceed 200 characters')
      .required('Business Name is required'),
    business_email: yup
      .string()
      .email('Invalid email')
      .max(200, 'Business Email cannot exceed 200 characters')
      .required('Business Email is required'),
    business_number: yup.string().max(200, 'Business Number cannot exceed 200 characters'),
    business_hours: yup.string().max(200, 'Business Hours cannot exceed 200 characters'),
    state: yup.string().max(200, 'State cannot exceed 200 characters'),
    country: yup.string().max(200, 'Country cannot exceed 200 characters'),
    zip_code: yup.string().max(200, 'Zip Code cannot exceed 200 characters'),
    street: yup.string().max(200, 'Street cannot exceed 200 characters'),
    website_url: yup.string().max(200, 'Website URL cannot exceed 200 characters'),
    social_profile: yup.string().max(200, 'Social Profile cannot exceed 200 characters'),
    gmb_url: yup.string().max(200, 'GMB URL cannot exceed 200 characters')
  })

  const onSubmit = async (data: BusinessDetailsType) => {
    const requestData = {
      business_name: data.business_name,
      business_email: data.business_email,
      business_number: data.business_number,
      business_hours: data.business_hours,
      state: data.state,
      country: data.country,
      zip_code: data.zip_code,
      street: data.street,
      website_url: data.website_url,
      social_profile: data.social_profile,
      gmb_url: data.gmb_url
    }
    await axios
      .put('/api/business/update', requestData, { headers: { authorization: localStorage.getItem('token') } })
      .then(() => {
        toast.success('Business updated successfully')
      })
      .catch(error => {
        console.error('Error:', error)
        toast.error(error?.response?.data || 'Something went wrong')
      })
  }

  const methods = useForm({ defaultValues, resolver: yupResolver(schema), mode: 'onChange' })
  return (
    <>
      <FormProvider {...methods}>
        <form noValidate autoComplete='off' onSubmit={methods.handleSubmit(onSubmit)}>
          {!apiLoading && (
            <>
              <Card>
                <CardHeader
                  title={
                    <Typography variant='h5' color={'primary'}>
                      Update Business Details
                    </Typography>
                  }
                />
                <CardContent>
                  <BusinessDetails />

                  <SubmitButton
                    sx={{ mt: 10 }}
                    beforeText={'Update'}
                    afterText={'Updating'}
                    fullWidth
                    variant='contained'
                  />
                </CardContent>
              </Card>
            </>
          )}
        </form>
      </FormProvider>
    </>
  )
}

export default BusinessUpdate
