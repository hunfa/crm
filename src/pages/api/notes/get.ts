import connectDb from 'src/backend/DatabaseConnection'
import NoteModel from 'src/backend/schemas/note.schema'
import mongoose from 'mongoose'
import { guardWrapper } from 'src/backend/auth.guard'

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const { user_id } = req.body
      const notes = await NoteModel.find({ user_id: mongoose.Types.ObjectId.createFromTime(user_id) })

      return res.send({
        message: 'notes fetched successfully',
        payload: { notes }
      })
    } catch (error) {
      // console.log(error)
      res.status(500).send('something went wrong')
    }
  } else {
    res.status(500).send('this is a get request')
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
