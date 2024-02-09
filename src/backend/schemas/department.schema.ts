import mongoose from 'mongoose'

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true }
})

const Department = mongoose.models.User || mongoose.model('Department', departmentSchema)

export default Department
