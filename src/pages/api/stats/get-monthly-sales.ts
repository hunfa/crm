import dayjs from 'dayjs'
import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import PaymentHistoryModel from 'src/backend/schemas/paymentHistory.schema'
import { PaymentType } from 'src/shared/enums/PaymentType.enum'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const handler = async (req: any, res: any) => {
  if (req.method === 'GET') {
    try {
      const { date } = req.query

      const currentYear = dayjs(date).year()
      const startDate = dayjs().year(currentYear).startOf('year').utc().toDate()

      const endDate = dayjs().year(currentYear).endOf('year').utc().toDate()

      const stats = await PaymentHistoryModel.aggregate([
        {
          $match: { $and: [{ payment_type: PaymentType.Credit }, { createdAt: { $gte: startDate, $lte: endDate } }] }
        },
        {
          $project: {
            month: { $month: '$createdAt' },
            received_payment: 1
          }
        },
        {
          $group: {
            _id: { month: '$month' },
            total_sales: { $sum: '$received_payment' }
          }
        },
        {
          $project: {
            _id: 0,
            month: '$_id.month',
            total_sales: 1
          }
        },
        {
          $sort: { month: 1 }
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
