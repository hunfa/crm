import mongoose from 'mongoose'
import { TicketStatus } from 'src/enums/TicketStatus.enum'

const ticketSchema = new mongoose.Schema(
  {
    status: { type: String, enum: TicketStatus, default: TicketStatus.NOT_STARTED_YET }
  },
  { timestamps: true }
)

const TicketModel = mongoose.models.User || mongoose.model('Ticket', ticketSchema)

export default TicketModel
