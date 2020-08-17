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
      // FLASH MESSAGE
      passport.authenticate('local', {
        successRedirect: '/',
        // flash message for the user to see
        successFlash:'Account created and logging in'
      })(req, res)
      // before passport authenticate 
      // res.redirect('/')
    } else {
      // Email already exist
      console.log('Email already exist')
    // FLASH MESSAGE 
    //error is the event put a comma when we say 
    // alerts.error is gona look for that key 'error'
      req.flash('error', 'Email already exist. Please try again.')
      res.redirect('/auth/signup')
    }
  })
  .catch(err =>{
    console.log('Error auth.js', err)
    // better to redirect useer back to sign up page
    // messages that we write out so be nice t  peple
    req.flash('error',`Error, ufnortunatley..${err}`)
    res.redirect('/auth/signup')
  })
})
//FLASH Message
// pass in local and check in and so some redirects success redirect fail go back to login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/auth/login',
  successFlash: 'Welcome back.',
  failureFlash: 'Either email or password is incorrect. Please try again'
}))

// router.post('/login',(req, res)=>{
  
// })


// req.body just an boject that we add data to

// making log out
router.get('/logout', (req, res)=>{
  req.logout()
  //FLASH MESSAGE added in success as he key
  req.flash('success','See you soon. Logging out.')
  res.redirect('/')

})



module.exports = router;
