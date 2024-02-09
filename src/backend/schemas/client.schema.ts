import mongoose from 'mongoose'

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone_number: { type: String, required: true },
  businessHours: { type: String, required: true },
  email: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  street: { type: String, required: true },
  zipcode: { type: String, required: true },
  socialProfile: { type: String, required: true },
  WebsiteURL: { type: String, required: true }
})

const Client = mongoose.models.User || mongoose.model('client', clientSchema)

export default Client
