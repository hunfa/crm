import React from 'react'

import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Wordpress from 'src/layouts/components/newTicketForm/Departments/Wordpress'

const defaultValues = {
  business: {
    name: '',
    email: ''
  },
  saleDepart: {
    assignor: '',
    supportPerson: '',
    fronter: '',
    closerPerson: ''
  },
  ssmReview: {
    priorityLevel: '',
    department: '',
    deadline: new Date(),
    price: 0,
    advance: 0,
    remaining: 0
  },
  businessDetail: {
    serviceName: '',
    serviceArea: '',
    facebookUrl: '',
    number: '',
    clientName: '',
    country: '',
    state: '',
    zipCode: '',
    street: '',
    referralWebsite: '',
    gmbUrl: '',
    socialProfile: '',
    notes: '',
    websiteType: ''
  }
}

interface FormData {
  business: {
    name: string
    email: string
  }
}

const schema = Yup.object().shape({
  business: Yup.object().shape({
    name: Yup.string().max(255, 'Business name must not exceed 255 characters').required('Business name is required'),
    email: Yup.string().email('Invalid email address').required('Business email is required')
  }),
  saleDepart: Yup.object().shape({
    assignor: Yup.string().max(233, 'Assignor must not exceed 255 characters').required('Assignor is required'),
    supportPerson: Yup.string()
      .max(255, 'Support person must not exceed 255 characters')
      .required('Support person is required'),
    fronter: Yup.string().max(255, 'Fronter must not exceed 255 characters').required('Fronter is required'),
    closerPerson: Yup.string()
      .max(255, 'Closer person must not exceed 255 characters')
      .required('Closer person is required')
  }),
  ssmReview: Yup.object().shape({
    priorityLevel: Yup.string()
      .max(255, 'Priority level must not exceed 255 characters')
      .required('Priority level is required'),
    department: Yup.string().max(255, 'Department must not exceed 255 characters').required('Department is required'),
    deadline: Yup.date().required('Deadline is required'),
    price: Yup.number()
      .required('Price is required')
      .min(1, 'Price must be at least 1')
      .max(1000000000, 'Price must not exceed 10 crore'),
    advance: Yup.number()
      .required('Advance is required')
      .min(1, 'Advance must be at least 1')
      .max(1000000000, 'Advance must not exceed 10 crore'),
    remaining: Yup.number()
      .required('Remaining is required')
      .min(1, 'Remaining must be at least 1')
      .max(1000000000, 'Remaining must not exceed 10 crore')
  }),
  businessDetail: Yup.object().shape({
    serviceName: Yup.string().required('Service Name is required'),
    serviceArea: Yup.string().required('Service Area is required'),
    facebookUrl: Yup.string().url('Please enter a valid URL'),
    number: Yup.string().required('Number is required').matches(/^\d+$/, 'Please enter a valid number'),
    clientName: Yup.string().required('Client Name is required'),
    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required'),
    zipCode: Yup.string().required('Zip Code is required'),
    street: Yup.string().required('Street is required'),
    referralWebsite: Yup.string().url('Please enter a valid URL'),
    gmbUrl: Yup.string().url('Please enter a valid URL'),
    socialProfile: Yup.string().url('Please enter a valid URL'),
    notes: Yup.string(),
    websiteType: Yup.string().required('Website Type is required')
  })
})

const Ticket = () => {
  const methods = useForm({ defaultValues, resolver: yupResolver(schema), mode: 'onChange' })

  const onSubmit = (data: FormData) => {
    do {
      console.log('data', data)
    } while (false)
  }

  return (
    <>
      <FormProvider {...methods}>
        <form noValidate autoComplete='off' onSubmit={methods.handleSubmit(onSubmit)}>
          <Wordpress />
        </form>
      </FormProvider>
    </>
  )
}

export default Ticket
