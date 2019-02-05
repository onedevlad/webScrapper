import mongoose from 'mongoose'
import dotenv from 'dotenv'


dotenv.config()

const connectDB = uri => {
  mongoose.connect(uri, { useNewUrlParser: true, dbName: 'webScrapper' })
  mongoose.connection.on('error', ({ message }) => {
    console.log(`Unable to establish database connection: ${message}`)
    process.exit()
  })
  mongoose.set('debug', process.env.NODE_ENV === 'development')
  mongoose.set('useFindAndModify', false)
}

connectDB(process.env.MONGOOSE_URI)
