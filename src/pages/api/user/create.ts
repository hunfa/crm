import connectDb from 'src/backend/DatabaseConnection'
import { guardWrapper } from 'src/backend/auth.guard'
import { UserRole } from 'src/shared/enums/UserRole.enum'
import UserModel from 'src/backend/schemas/user.schema'
import DepartmentModel from 'src/backend/schemas/department.schema'

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    try {
      const { user_name, password, role, department_name } = req.body

      if (!(req.user.role === UserRole.ADMIN))
        return res.status(500).send('You are not authorized to perform this action')

      const userExists = await UserModel.findOne({ user_name })

      if (userExists) return res.status(500).send('User with that username already exists')

      const department = await DepartmentModel.findOne({ name: department_name })

      if (!department) return res.status(500).send('Error Occured')

      const temp: any = {
        user_name,
        password,
        role,
        department_id: department._id,
        department_name
      }

      const newUser = new UserModel(temp)
      const savedUser = await newUser.save()

      if (!savedUser) return res.status(500).send('Not able to create new user. Please try again')

      return res.send({
        message: 'User Created Successfully',
        payload: { user: savedUser }
      })
    } catch (error) {
      console.log(error)
      res.status(500).send('something went wrong')
    }
  } else {
    res.status(500).send('this is a post request')
  }
}

// Apply the guard wrapper to the original handler
const guardedHandler = guardWrapper(handler)

export default connectDb(guardedHandler)
