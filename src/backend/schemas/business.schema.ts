import mongoose from 'mongoose'

const businessSchema = new mongoose.Schema(
  {
    business_name: { type: String, required: true },
    business_number: { type: String, required: true },
    business_hours: { type: String, required: true },
    business_email: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    street: { type: String, required: true },
    zipcode: { type: String, required: true },
    social_profile: { type: String, required: true },
    website_url: { type: String, required: true }
  },
  { timestamps: true }
)

const BusinessModel = mongoose.models.User || mongoose.model('Business', businessSchema)

export default BusinessModel
