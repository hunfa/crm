import mongoose from 'mongoose'
import { PriorityType } from 'src/shared/enums/PriorityType.enum'
import { TicketStatus } from 'src/shared/enums/TicketStatus.enum'

const ticketSchema = new mongoose.Schema(
  {
    status: { type: String, enum: TicketStatus, default: TicketStatus.NOT_STARTED_YET },
    priority: { type: String, enum: PriorityType, default: PriorityType.MEDIUM },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assignee_depart: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    assignor_depart: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true }
  },
  { timestamps: true }
)

const TicketModel = mongoose.models.User || mongoose.model('Ticket', ticketSchema)

export default TicketModel
