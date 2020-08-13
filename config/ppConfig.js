const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const db = require('../models')

// passport 'serialized; your info when you log in
// make it easier to login 
// use passport and do serialized with passport and take id that we get back
// and serialized that
// -Convert the user based on the id 
passport.serializeUser((user, cb)=>{
    cb(null, user.id)
})
// passport deserializeduser take in object grab the id look up the id in the database 
passport.deserializeUser((id, cb)=>{
    // cb is callback null, with id
    cb(null, id)
    .catch(cb())

})

passport.use(new localStrategy({
    // email is our username field and password is pasword field
    // these are the fields that will get chcked in our database
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, cb) =>{
    db.user.findOne({
        where: {email}
    })
    .then(user =>{
        // check to see if user is a real user
        if(!user || !user.validPassword(password)){
            cb(null, false)

        } else{
            cb(null, user)
        }
    })
    .catch(cb())
}))

module.exports = passport