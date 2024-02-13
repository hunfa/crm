import mongoose from 'mongoose'
import { PriorityType } from 'src/shared/enums/PriorityType.enum'
import { TicketStatus } from 'src/shared/enums/TicketStatus.enum'
import { WorkStatusValues } from 'src/shared/enums/WorkStatusType.enum'

const departTicketSchema = new mongoose.Schema(
  {
    status: { type: String, enum: TicketStatus, default: TicketStatus.NOT_STARTED_YET },
    priority: { type: String, enum: PriorityType, default: PriorityType.MEDIUM },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assignee_employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    assignee_depart_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    assignee_depart_name: { type: String, required: true },
    assignor_depart_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    assignor_depart_name: { type: String, required: true },
    outsourced_work: { type: Boolean, default: false },
    due_date: { type: Date, required: true },
    work_status: { type: String, required: true, enum: WorkStatusValues },
    notes: { type: String, required: false, default: '' }
  },
  { timestamps: true }
)

const DepartTicketModel = mongoose.models.User || mongoose.model('DepartTicket', departTicketSchema)

export default DepartTicketModel
