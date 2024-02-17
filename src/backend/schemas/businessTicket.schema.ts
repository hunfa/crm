import mongoose from 'mongoose'
import { PriorityType } from 'src/shared/enums/PriorityType.enum'
import { SaleType } from 'src/shared/enums/SaleType.enum'
import { TicketStatus } from 'src/shared/enums/TicketStatus.enum'
import { WorkStatusValues } from 'src/shared/enums/WorkStatusType.enum'

export const paymentHistorySchema = new mongoose.Schema(
  {
    total_payment: { type: Number, required: true },
    advance_payment: { type: Number, required: true },
    remaining_payment: { type: Number, required: true },
    payment_method: { type: String, required: false },
    refunds: {
      type: [
        {
          refund_amount: { type: Number, required: true },
          refund_date: { type: Date, required: true },
          reason: { type: String, required: false }
        }
      ],
      required: false
    }
  },
  { timestamps: true, validateBeforeSave: true }
)

const businessTicketSchema = new mongoose.Schema(
  {
    status: { type: String, enum: TicketStatus, default: TicketStatus.NOT_STARTED_YET },
    priority: { type: String, enum: PriorityType, default: PriorityType.MEDIUM },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assignee_employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    assignee_depart_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    assignee_depart_name: { type: String, required: true },
    assignor_depart_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    assignor_depart_name: { type: String, required: true },
    outsourced_work: { type: Boolean, default: false },
    client_reporting_date: { type: Date, required: false },
    due_date: { type: Date, required: true },
    fronter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: function () {
        return this.sales_type === SaleType.NEW_SALE
      }
    },
    closer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    business_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Business' },
    business_name: { type: String, required: true },
    sales_type: { type: String, enum: SaleType, required: true },
    work_status: { type: String, required: true, enum: WorkStatusValues },
    notes: { type: String, required: false, default: '' },
    payment_history: { type: [paymentHistorySchema], required: true, ref: 'PaymentHistory' }
  },
  { timestamps: true }
)

export const BusinessTicketModel =
  mongoose.models.BusinessTicket || mongoose.model('BusinessTicket', businessTicketSchema)
