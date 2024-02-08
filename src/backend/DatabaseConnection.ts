import mongoose from 'mongoose'

const connectDb = handler => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res)
  }

  await mongoose.connect('mongodb+srv://hunfa:hunfa@cluster0.z2kbwem.mongodb.net/crm')

  return handler(req, res)
}

export default connectDb
