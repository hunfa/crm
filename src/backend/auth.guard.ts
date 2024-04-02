import BusinessModel from './schemas/business.schema'
import { BusinessTicketModel } from './schemas/businessTicket.schema'
import DepartTicketModel from './schemas/departTicket.schema'
import DepartmentModel from './schemas/department.schema'
import PaymentHistoryModel from './schemas/paymentHistory.schema'
import PaymentSessionModel from './schemas/paymentSession.schema'
import UserModel from './schemas/user.schema'
import { isAuthenticated } from './utils/isAuthenticated'

export const guardWrapper = (handler: any) => async (req: any, res: any) => {
  try {
    // Check if the request is authenticated or has the necessary permissions

    if (isAuthenticated(req) === false) {
      return res.status(401).send('Unauthorized')
    }

    DepartmentModel.schema
    UserModel.schema
    BusinessModel.schema
    BusinessTicketModel.schema
    DepartTicketModel.schema
    PaymentSessionModel.schema
    PaymentHistoryModel.schema

    // If authenticated, proceed to the original handler
    return await handler(req, res)
  } catch (error) {
    console.error('Guard wrapper error:', error)

    return res.status(500).send('Internal Server Error')
  }
}
