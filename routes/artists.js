const router = require('express').Router()
const Artist = require('../models/Artist')
const Album = require('../models/Album')
// --> ENDPOINT COMPLETO => localhost:3000/artists/

// Create
router.get('/new', (req, res, next) => {
  Album.find()
    .then(albums => {
      res.render('artists/new', { albums })
    })
    .catch(err => {
      res.send(err)
    })
})

router.post('/new', (req, res, next) => {
  Artist.create({ ...req.body })
    .then(artist => {
      res.send(artist)
    })
    .catch(err => {
      res.send(err)
    })
})

module.exports = router
