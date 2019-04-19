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

router.get('/all', (req, res, next) => {
  Artist.find()
    .then(artists => {
      res.render('artists/all', { artists })
    })
    .catch(err => {
      res.send(err)
    })
})

router.get('/:id', (req, res, next) => {
  const { id } = req.params
  Artist.findById(id)
    .populate('albums')
    .then(artist => {
      res.render('artists/detail', artist)
    })
    .catch(err => {
      res.send(err)
    })
})

module.exports = router
