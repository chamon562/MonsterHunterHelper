const express = require('express');
const router = express.Router();
const db = require('../models')
const passport = require('../config/ppConfig')

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post('/signup', (req, res)=>{
  // console.log(req.body)
  db.user.findOrCreate({
    //search first by email
    where: {email: req.body.email},
    // if that doesnt exist create user
    defaults: {
      name: req.body.name,
      password: req.body.password
    }
  })
  // missing make an array created
  .then(([user,created]) =>{
    if (created){
      // if created, success and then redirect to home
      console.log(`${user.name} was created`)
      res.redirect('/')
    } else {
      // Email already exist
      console.log('Email already exist')
      res.redirect('/auth/signup')
    }
  })
  .catch(err =>{
    console.log('Error auth.js', err)
    // better to redirect useer back to sign up page
    res.redirect('/auth/signup')
  })
})
// pass in local and check in and so some redirects success redirect fail go back to login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login'
}))

module.exports = router;
