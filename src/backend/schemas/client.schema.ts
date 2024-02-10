import mongoose from 'mongoose'

const clientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone_number: { type: String, required: true },
    business_hours: { type: String, required: true },
    email: { type: String, required: true }
  },
  { timestamps: true }
)

const ClientModel = mongoose.models.User || mongoose.model('client', clientSchema)

export default ClientModel
