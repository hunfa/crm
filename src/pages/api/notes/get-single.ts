import connectDb from 'src/backend/DatabaseConnection'
import NoteModel from 'src/backend/schemas/note.schema'
import { guardWrapper } from 'src/backend/auth.guard'

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const { note_id } = req.body
      const note = await NoteModel.findById(note_id)

      if (!note) {
        return res.status(404).send({
          message: 'Note not found',
          payload: {}
        })
      }

      return res.send({
        message: 'note fetched successfully',
        payload: { note }
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
