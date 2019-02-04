import mongoose from 'mongoose'
import dotenv from 'dotenv'

import { handleError } from 'util'

dotenv.config()

const connectDB = uri => {
  mongoose.connect(uri, { useNewUrlParser: true, dbName: 'webScrapper' })
  mongoose.connection.on('error', ({message}) => handleError(`Unable to establish database connection: ${message}`))
  mongoose.set('debug', process.env.NODE_ENV === 'development')
}

connectDB(process.env.MONGOOSE_URI)
