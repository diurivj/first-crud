const router = require('express').Router()
const Album = require('../models/Album')
const Song = require('../models/Song')

router.get('/new', (req, res, next) => {
  Song.find()
    .then(songs => {
      res.render('albums/new', { songs })
    })
    .catch(err => {
      res.send(err)
    })
})

router.post('/new', (req, res, next) => {
  Album.create({ ...req.body })
    .then(album => {
      res.send(album)
    })
    .catch(err => {
      res.send(err)
    })
})

module.exports = router
