const router = require('express').Router()
const Album = require('../models/Album')

router.get('/new', (req, res, next) => res.render('albums/new'))

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
