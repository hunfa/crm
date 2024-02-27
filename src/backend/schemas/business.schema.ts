import mongoose from 'mongoose'
import { ClientStatusValues } from 'src/shared/enums/ClientStatus.enum'
import { WorkStatusValues } from 'src/shared/enums/WorkStatusType.enum'

const businessSchema = new mongoose.Schema(
  {
    business_name: { type: String, required: true, unique: true },
    business_number: { type: String, required: false },
    business_hours: { type: String, required: false },
    business_email: { type: String, required: true },
    state: { type: String, required: false },
    country: { type: String, required: false },
    street: { type: String, required: false },
    zip_code: { type: String, required: false },
    social_profile: { type: String, required: false },
    website_url: { type: String, required: false },
    gmb_url: { type: String, required: false, trim: true },
    client_status: [
      {
        type: String,
        enum: ClientStatusValues
      }
    ],
    work_status: [
      {
        type: String,
        enum: WorkStatusValues,
        required: true
      }
    ]
  },
  { timestamps: true }
)

const BusinessModel = mongoose.models.Business || mongoose.model('Business', businessSchema)

export default BusinessModel
