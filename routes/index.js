require('dotenv').config()

const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

router.get('/', (req, res, next) => {
  res.render('index')
})

router.get('/signup', (req, res, next) => {
  const config = {
    action: '/signup',
    button: 'signup'
  }
  res.render('auth/signup', config)
})

router.post('/signup', (req, res, next) => {
  const salt = bcrypt.genSaltSync(Number(process.env.ROUNDS))
  User.create({
    ...req.body,
    password: bcrypt.hashSync(req.body.password, salt)
  })
    .then(user => {
      res.send(user)
    })
    .catch(err => {
      if (String(err.errmsg).includes('E11000 duplicate key')) {
        res.render('auth/signup', { err: 'Ese usuario ya existe' })
      } else {
        res.send(err)
      }
    })
})

router.get('/login', (req, res, next) => {
  const config = {
    action: '/login',
    button: 'login'
  }
  res.render('auth/signup', config)
})

router.post('/login', (req, res, next) => {
  const { username, password } = req.body
  User.findOne({ username })
    .then(user => {
      if (!bcrypt.compareSync(password, user.password))
        return res.send('Alto ahí loca')
      req.session.currentUser = user
      req.app.locals.loggedUser = user
      res.redirect('/private')
    })
    .catch(err => res.send(err))
})

router.get('/private', isLogged, (req, res, next) => {
  res.render('private')
})

router.get('/logout', (req, res, next) => {
  req.session.destroy()
  res.redirect('/private')
})

function isLogged(req, res, next) {
  if (!req.session.currentUser) return res.redirect('/login')
  next()
}

module.exports = router
