import connectDb from 'src/backend/DatabaseConnection'
import User from '../../../backend/schemas/user.schema'
import jwt, { Secret } from 'jsonwebtoken'

const tokenSecret = process.env.JET_TOKEN_SECRET as Secret
const handler = async (req, res) => {
  console.log('inside api login')
  if (req.method === 'POST') {
    try {
      const { userName, password } = req.body
      const user = await User.findOne({ user_name: userName }, '-password')
      if (!user) return res.status(500).send('Invalid username')

      if (password !== user.password) return res.status(500).send('Invalid password')

      const token = jwt.sign({ user }, tokenSecret)

      return res.send({
        message: 'login successful',
        payload: { user, token }
      })
    } catch (error) {
      res.status(500).send('something went wrong')
    }
  } else {
    res.status(500).send('this is a post request')
  }
}

export default connectDb(handler)
