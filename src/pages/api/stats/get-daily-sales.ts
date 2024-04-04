import dayjs from 'dayjs'
import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import PaymentHistoryModel from 'src/backend/schemas/paymentHistory.schema'
import { PaymentType } from 'src/shared/enums/PaymentType.enum'
import utc from 'dayjs/plugin/utc'
import mongoose from 'mongoose'

dayjs.extend(utc)

const handler = async (req: any, res: any) => {
  if (req.method === 'GET') {
    try {
      const { month, user_name, year } = req.query

      const selectedMonth = parseInt(month)

      const selectedYear = parseInt(year)

      const startDate = dayjs().year(selectedYear).month(selectedMonth).startOf('month').utc().toDate()
      const endDate = dayjs().year(selectedYear).month(selectedMonth).endOf('month').utc().toDate()

      const stats = await PaymentHistoryModel.aggregate([
        {
          $match: {
            $and: [
              { payment_type: PaymentType.Credit },
              { createdAt: { $gte: startDate, $lte: endDate } },
              ...(user_name !== 'undefined'
                ? [
                    {
                      $or: [
                        { fronter_id: new mongoose.Types.ObjectId(user_name) },
                        { closer_id: new mongoose.Types.ObjectId(user_name) }
                      ]
                    }
                  ]
                : [])
            ]
          }
        },
        {
          $project: {
            dayOfMonth: { $dayOfMonth: '$createdAt' },
            full_date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            received_payment: 1
          }
        },
        {
          $group: {
            _id: '$dayOfMonth',
            total_sales: { $sum: '$received_payment' },
            full_date: { $first: '$full_date' }
          }
        },
        {
          $project: {
            _id: 0,
            date: '$_id',
            total_sales: 1,
            full_date: 1
          }
        },
        {
          $sort: { date: 1 }
        }
      ])

      return res.send({
        message: 'payment history fetched successfully',
        payload: { stats }
      })
    } catch (error) {
      console.log(error)
      res.status(500).send('something went wrong')
    }
  } else {
    res.status(500).send('this is a get request')
  }
}

const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
