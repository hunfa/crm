import BusinessModel from '../schemas/business.schema'

export const checkBusinessWithSameWorkTypeAlreadyExists = (name: string, workStatus: string) => {
  return BusinessModel.findOne({ business_name: name, work_status: workStatus })
}
