import mongoose from 'mongoose'
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
    zipcode: { type: String, required: true },
    social_profile: { type: String, required: false },
    website_url: { type: String, required: false },
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

const BusinessModel = mongoose.models.User || mongoose.model('Business', businessSchema)

export default BusinessModel
