import User from 'src/backend/schemas/user.schema'
import connectDb from '../../../backend/DatabaseConnection'
import jwt from 'jsonwebtoken'

const tokenSecret = 'hunfaisagoodboy'
const handler = async (req, res) => {
  console.log('inside veriyf')
  if (req.method === 'POST') {
    try {
      const { token } = req.headers
      const decoded = jwt.verify(token, tokenSecret)

      const user = await User.findOne({ user_name: decoded.user.user_name }, '-password')
      if (!user) return res.status(500).send('user not found')

      return res.send({
        message: 'token verify successful',
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
