import mongoose from 'mongoose'
import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'

export const getAllTicketsTeamLead = async (req: any, res: any) => {
  let businessId = req.query.businessId

  let filters = {}
  if (businessId !== 'undefined') {
    businessId = new mongoose.Types.ObjectId(businessId)

    filters = { business_id: businessId }
  }
  const tickets = await BusinessTicketModel.find({ assignee_depart_id: req.user.department_id, ...filters })
    .populate({ path: 'business_id', select: 'business_name' })
    .populate({ path: 'assignee_employees', select: 'user_name' })
    .sort({ createdAt: -1 })

  return res.send({
    message: 'tickets fetched successfully',
    payload: { tickets }
  })
}
