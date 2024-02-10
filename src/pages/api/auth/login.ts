import connectDb from 'src/backend/DatabaseConnection'
import UserModel from '../../../backend/schemas/user.schema'
import jwt, { Secret } from 'jsonwebtoken'

const tokenSecret = process.env.JWT_SECRET as Secret

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { user_name, password } = req.body
      const user = await UserModel.findOne({ user_name })
      if (!user) return res.status(500).send('Invalid username')
      if (password !== user.password) return res.status(500).send('Invalid password')

      const token = jwt.sign({ user }, tokenSecret)

      return res.send({
        message: 'login successful',
        payload: { user, token }
      })
    } catch (error) {
      // console.log(error)
      res.status(500).send('something went wrong')
    }
  } else {
    res.status(500).send('this is a post request')
  }
}

export default connectDb(handler)
