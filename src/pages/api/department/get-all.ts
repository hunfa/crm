import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import DepartmentModel from 'src/backend/schemas/department.schema'

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const departments = await DepartmentModel.find({})

      return res.send({
        message: 'departments fetched successfully',
        payload: { departments }
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
