import mongoose from 'mongoose'

const connectDb = (handler: any) => async (req: any, res: any) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res)
  }

  await mongoose.connect('mongodb+srv://rankbpo:rankbpo123@crmrankbpo.ae4ccof.mongodb.net/crm')

  return handler(req, res)
}

export default connectDb
