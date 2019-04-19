const router = require('express').Router()
const Artist = require('../models/Artist')
const Album = require('../models/Album')
// --> ENDPOINT COMPLETO => localhost:3000/artists/

// Create
router.get('/new', (req, res, next) => {
  Album.find()
    .then(albums => {
      const config = {
        action: '/artists/new',
        button: 'Create',
        title: 'Create a new artist',
        albums,
        artist: {
          name: ''
        },
        method: 'POST'
      }
      res.render('artists/new', config)
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
    .populate({
      path: 'albums',
      populate: {
        path: 'songs',
        model: 'Song'
      }
    })
    .then(artist => {
      res.render('artists/detail', artist)
    })
    .catch(err => {
      res.send(err)
    })
})

router.get('/edit/:id', (req, res, next) => {
  const { id } = req.params
  Artist.findById(id)
    .populate('albums')
    .then(artist => {
      console.log(artist.name)
      const config = {
        title: 'Update artist',
        button: 'Update',
        action: `/artists/edit/${artist._id}`,
        artist,
        albums: artist.albums,
        method: 'PATCH'
      }
      res.render('artists/new', config)
    })
    .catch(err => {
      console.log(err)
    })
})

router.post('/edit/:id', (req, res, next) => {
  console.log('que')
  const { id } = req.params
  Artist.findByIdAndUpdate(id, { $set: { ...req.body } }, { new: true })
    .then(artist => {
      res.redirect(`/artists/${artist._id}`)
    })
    .catch(err => {
      res.send(err)
    })
})

router.get('/delete/:id', (req, res, next) => {
  const { id } = req.params
  Artist.findByIdAndRemove(id)
    .then(() => {
      res.redirect('/artists/all')
    })
    .catch(err => {
      res.send(err)
    })
})

module.exports = router
