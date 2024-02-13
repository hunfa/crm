import { UserRole } from '../../shared/enums/UserRole.enum'

import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    user_name: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: UserRole, required: true },
    department_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: function () {
        return this.role !== UserRole.ADMIN
      }
    },
    department_name: { type: String, required: true }
  },
  { timestamps: true }
)

const UserModel = mongoose.models.User || mongoose.model('User', userSchema)

export default UserModel
