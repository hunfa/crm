import BusinessModel from 'src/backend/schemas/business.schema'

export const getBusinessWithName = (name: string) => {
  return BusinessModel.findOne({ business_name: name })
}
