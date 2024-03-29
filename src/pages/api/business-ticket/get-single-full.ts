import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    try {
      const { ticketId } = req.body
      const ticket = await BusinessTicketModel.findById(ticketId)
        .populate('business_id')
        .populate('created_by', 'user_name')
        .populate('assignee_employees', 'user_name')
        .populate({
          path: 'child_tickets.child_id',
          model: 'DepartTicket'
        })

      if (!ticket) {
        return res.status(404).send('ticket not found')
      }

      return res.send({
        message: 'ticket fetched successfully',
        payload: { ticket }
      })
    } catch (error) {
      console.log(error)
      res.status(500).send('something went wrong')
    }
  } else {
    res.status(500).send('this is a post request')
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
