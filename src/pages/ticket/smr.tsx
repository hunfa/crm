import React from 'react'

import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import SmmForm from 'src/layouts/components/newTicketForm/Departments/SMM'

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
    facebookUrl: '',
    workStatus: '',
    gmbUrl: '',
    websiteUrl: '',
    socialProfile: '',
    loginCred: '',
    notes: ''
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
    serviceName: Yup.string()
      .max(255, 'Service name must not exceed 255 characters')
      .required('Service name is required'),
    facebookUrl: Yup.string()
      .url('Invalid Facebook URL')
      .max(255, 'Facebook URL must not exceed 255 characters')
      .required('Facebook URL is required'),
    workStatus: Yup.string().max(255, 'Work status must not exceed 255 characters').required('Work status is required'),
    gmbUrl: Yup.string()
      .url('Invalid GMB URL')
      .max(255, 'GMB URL must not exceed 255 characters')
      .required('GMB URL is required'),
    websiteUrl: Yup.string()
      .url('Invalid website URL')
      .max(255, 'Website URL must not exceed 255 characters')
      .required('Website URL is required'),
    socialProfile: Yup.string()
      .url('Invalid social profile URL')
      .max(255, 'Social profile URL must not exceed 255 characters')
      .required('Social profile URL is required'),
    loginCred: Yup.string()
      .max(255, 'Login credentials must not exceed 255 characters')
      .required('Login credentials are required'),
    notes: Yup.string().max(255, 'Notes must not exceed 255 characters').required('Notes are required')
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
          <SmmForm />
        </form>
      </FormProvider>
    </>
  )
}

export default Ticket
