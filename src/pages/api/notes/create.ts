import connectDb from 'src/backend/DatabaseConnection'
import Note from 'src/backend/schemas/note.schema'
import { guardWrapper } from 'src/backend/auth.guard'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { description } = req.body
      const newNote = new Note({
        description,
        user_id: req.user._id
      })
      const savedNote = await newNote.save()
      if (!savedNote) return res.status(500).send('Not able to save note')

      return res.send({
        message: 'Note Saved',
        payload: {}
      })
    } catch (error) {
      // console.log(error)
      res.status(500).send('something went wrong')
    }
  } else {
    res.status(500).send('this is a post request')
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
