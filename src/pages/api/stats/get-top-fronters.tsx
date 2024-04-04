import dayjs from 'dayjs'
import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import PaymentHistoryModel from 'src/backend/schemas/paymentHistory.schema'
import { PaymentType } from 'src/shared/enums/PaymentType.enum'
import { SaleType } from 'src/shared/enums/SaleType.enum'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const handler = async (req: any, res: any) => {
  if (req.method === 'GET') {
    try {
      const { month, year } = req.query

      const selectedMonth = parseInt(month)
      const selectedYear = parseInt(year)

      const startDate = dayjs().year(selectedYear).month(selectedMonth).startOf('month').utc().toDate()
      const endDate = dayjs().year(selectedYear).month(selectedMonth).endOf('month').utc().toDate()

      const stats = await PaymentHistoryModel.aggregate([
        {
          $match: {
            $and: [
              { sales_type: SaleType.NEW_SALE },
              { payment_type: PaymentType.Credit },
              { createdAt: { $gte: startDate, $lte: endDate } }
            ]
          }
        },
        {
          $group: {
            _id: '$fronter_id',
            total_sales: { $sum: '$received_payment' }
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: '_id',
            foreignField: '_id',
            as: 'fronter'
          }
        },
        {
          $project: {
            user_name: { $arrayElemAt: ['$fronter.user_name', 0] },
            total_sales: 1
          }
        },
        {
          $sort: { total_sales: -1 }
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
