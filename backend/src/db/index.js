import mongoose from 'mongoose'
import dotenv from 'dotenv'


dotenv.config()

const connectDB = uri => {
  mongoose.connect(uri, { useNewUrlParser: true, dbName: 'webScrapper' })
  mongoose.connection.on('error', ({message}) => {throw new Error(`Unable to establish database connection: ${message}`)})
  mongoose.set('debug', true)
}

connectDB(process.env.MONGOOSE_URI)
