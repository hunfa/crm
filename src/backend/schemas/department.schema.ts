import mongoose from 'mongoose'

const departmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }
  },
  { timestamps: true }
)

const DepartmentModel = mongoose.models.User || mongoose.model('Department', departmentSchema)

export default DepartmentModel
