import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
)

const NoteModel = mongoose.models.User || mongoose.model('Note', noteSchema)

export default NoteModel
