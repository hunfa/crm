import React from 'react'
import LocalSeoForm from 'src/layouts/components/newTicketForm/Departments/LocalSeo'

import { useForm, FormProvider } from 'react-hook-form'

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
    deadline: '',
    price: '',
    advance: '',
    remaining: ''
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

const Ticket = () => {
  const methods = useForm({ defaultValues })

  const onSubmit = (data: FormData) => {
    do {
      console.log('data', data)
    } while (false)
  }

  return (
    <>
      <FormProvider {...methods}>
        <form noValidate autoComplete='off' onSubmit={methods.handleSubmit(onSubmit)}>
          <LocalSeoForm />
        </form>
      </FormProvider>
    </>
  )
}

export default Ticket
