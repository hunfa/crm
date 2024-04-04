import dayjs from 'dayjs'
import connectDb from 'src/backend/DatabaseConnection'
import { BusinessTicketModel } from 'src/backend/schemas/businessTicket.schema'
import utc from 'dayjs/plugin/utc'
import mongoose from 'mongoose'

dayjs.extend(utc)

const handler = async (req: any, res: any) => {
  if (req.method === 'GET') {
    try {
      const { month, year, employee_id, department_id } = req.query

      const selectedMonth = parseInt(month)

      const selectedYear = parseInt(year)

      const startDate = dayjs().year(selectedYear).month(selectedMonth).startOf('month').utc().toDate()
      const endDate = dayjs().year(selectedYear).month(selectedMonth).endOf('month').utc().toDate()

      const stats = await BusinessTicketModel.aggregate([
        {
          $match: {
            $and: [
              {
                createdAt: {
                  $gte: startDate,
                  $lte: endDate
                }
              },
              ...(employee_id !== 'undefined'
                ? [{ assignee_employees: new mongoose.Types.ObjectId(employee_id) }]
                : []),
              ...(department_id !== 'undefined'
                ? [{ assignee_depart_id: new mongoose.Types.ObjectId(department_id) }]
                : [])
            ]
          }
        },
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        },
        {
          $project: {
            _id: 0,
            status: '$_id',
            count: 1,
            percentage: { $multiply: [{ $divide: ['$count', { $sum: '$count' }] }, 100] }
          }
        }
      ])

      // Extract the results from the aggregation
      const ticketStats = stats.map((stat: any) => ({
        status: stat.status,
        count: stat.count,
        percentage: stat.percentage
      }))

      return res.send({
        message: 'Ticket statistics fetched successfully',
        payload: { ticketStats }
      })
    } catch (error) {
      console.log(error)
      res.status(500).send('Something went wrong')
    }
  } else {
    res.status(500).send('This is a GET request')
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = handler

export default connectDb(guardedHandler)
