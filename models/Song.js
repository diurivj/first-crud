const mongoose = require('mongoose')
const Schema = mongoose.Schema

const songSchema = new Schema(
  {
    title: String,
    duration: Number
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = mongoose.model('Song', songSchema)
