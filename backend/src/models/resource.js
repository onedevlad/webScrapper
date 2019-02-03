import mongoose from 'mongoose'


const db = mongoose.connection

const ResourceSchema = new mongoose.Schema({
  url: String,
  status: String,
  path: String,
}, { versionKey: false })

export const Resource = mongoose.model('Resource', ResourceSchema)


ResourceSchema.methods.findById = function(_id) {
  return this.Model.findOne({ _id })
}

ResourceSchema.findRunning = function() {
  return this.Model.find({ status: 'RUNNING' })
}

ResourceSchema.findPending = function() {
  return this.Model.find({ status: 'PENDING' })
}

