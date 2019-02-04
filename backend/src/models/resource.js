import mongoose from 'mongoose'


const db = mongoose.connection

const ResourceSchema = new mongoose.Schema({
  url: String,
  status: String,
  error: String,
  path: String,
}, { versionKey: false })


export const Resource = mongoose.model('Resource', ResourceSchema)
