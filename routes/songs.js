const router = require('express').Router()
const Song = require('../models/Song')

router.get('/new', (req, res, next) => res.render('songs/new'))

router.post('/new', (req, res, next) => {
  Song.create({ ...req.body })
    .then(song => {
      res.send(song)
    })
    .catch(err => {
      res.send(err)
    })
})

module.exports = router
