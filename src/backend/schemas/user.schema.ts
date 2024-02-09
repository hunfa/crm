import { UserRole } from '../enums/UserRole.enum'

import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user_name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: UserRole, required: true },
  department_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: function () {
      return this.role !== UserRole.ADMIN
    }
  }
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User
