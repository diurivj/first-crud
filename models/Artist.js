const mongoose = require('mongoose')
const Schema = mongoose.Schema

const artistSchema = new Schema(
  {
    name: String,
    genre: String,
    nationality: String,
    recordLabel: String,
    albums: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Album'
      }
    ],
    year: Number
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = mongoose.model('Artist', artistSchema)
