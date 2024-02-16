import mongoose from 'mongoose'
import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import BusinessModel from 'src/backend/schemas/business.schema'
import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'
import { createNewBusiness } from 'src/backend/utils/business/createNewBusiness'
import { getBusinessWithName } from 'src/backend/utils/business/getBusinessWithName'
import { SaleType } from 'src/shared/enums/SaleType.enum'
import { UserRole } from 'src/shared/enums/UserRole.enum'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const {
        status,
        priority,
        created_by,
        assignee_depart_id,
        assignee_depart_name,
        assignor_depart_id,
        assignor_depart_name,
        outsourced_work,
        client_reporting_date,
        due_date,
        fronter,
        closer,
        sales_type,
        notes,
        payment_history,
        business_name,
        business_number,
        business_hours,
        business_email,
        state,
        country,
        street,
        zipcode,
        social_profile,
        website_url,
        work_status
      } = req.body

      const { role } = req.user

      if (!(role === UserRole.ADMIN || role === UserRole.SALE_EMPLOYEE))
        return res
          .status(403)
          .send({ message: 'Permission denied.Only Admin and Sales can create ticket', payload: {} })

      const business = await getBusinessWithName(business_name)
      let busines_id = business?._id
      if (business?.work_status.includes(work_status)) {
        return res.status(400).send({
          message: 'Business already exists with this work status.',
          payload: {}
        })
      }
      let newBusiness
      if (!business) {
        //create new business
        newBusiness = await createNewBusiness({
          business_name,
          business_number,
          business_hours,
          business_email,
          state,
          country,
          street,
          zipcode,
          social_profile,
          website_url,
          work_status: [work_status]
        })
        busines_id = newBusiness?._id
      } else {
        await BusinessModel.findByIdAndUpdate(business._id, { $push: { work_status: work_status } })
      }

      const payload = {
        status,
        priority,
        created_by,
        assignee_depart_id: new mongoose.Types.ObjectId(assignee_depart_id),
        assignee_depart_name ,
        assignor_depart_id : new mongoose.Types.ObjectId(assignor_depart_id),,
        assignor_depart_name,
        outsourced_work,
        client_reporting_date,
        due_date,
        closer,
        business_id: busines_id,
        sales_type,
        notes,
        payment_history
      }
      if (sales_type === SaleType.NEW_SALE) payload.fronter = fronter

      const newTicket = new BusinessTicketModel(payload)

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
