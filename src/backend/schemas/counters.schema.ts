import mongoose from 'mongoose'

const countersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }
  },
  { timestamps: true }
)

const CountersModel = mongoose.models.Department || mongoose.model('Counter', countersSchema)

export default CountersModel
