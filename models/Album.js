const mongoose = require('mongoose')
const Schema = mongoose.Schema

const albumSchema = new Schema(
  {
    name: String,
    songs: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Song'
      }
    ],
    duration: Number,
    year: Number
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = mongoose.model('Album', albumSchema)
