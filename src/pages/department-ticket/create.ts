import mongoose from 'mongoose'
import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import DepartTicketModel from 'src/backend/schemas/departTicket.schema'
import { UserRole } from 'src/shared/enums/UserRole.enum'

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    try {
      const { priority, assignee_depart_id, assignee_depart_name, due_date, work_status, notes } = req.body

      const { role } = req.user

      if (!(role === UserRole.SALE_EMPLOYEE))
        return res.status(403).send({ message: 'Permission denied.Sales cannot create department ticket', payload: {} })

      const payload = {
        priority,
        created_by: req.user._id,
        assignee_depart_id: new mongoose.Types.ObjectId(assignee_depart_id),
        assignee_depart_name,
        assignor_depart_id: req.user.department_id,
        assignor_depart_name: req.user.department_name,
        due_date,
        notes,
        work_status
      }

      const newTicket = new DepartTicketModel(payload)

      const result = await newTicket.save()

      if (!result) return res.status(500).send('Not able to create ticket.Please try again')

      return res.send({
        message: 'Ticket Created',
        payload: { _id: result._id }
      })
    } catch (error) {
      // console.log(error)
      res.status(500).send('something went wrong')
    }
  } else {
    res.status(500).send('this is a post request')
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
