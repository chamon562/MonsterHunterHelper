let express = require('express')
let db = require('../models')
let router = express.Router()
const weapon = require('../models/weapon')

router.post('/', (req, res)=>{
    // lets say i want to set a variable for the name in the database
    let name = req.body.name
    console.log(name)
    let comment = req.body.comment
    console.log(comment)
    // req.body is just an object
    // get article id too because in the form in show.ejs
    let userId = req.body.userId
    //you can pass in req.body 
    db.comment.create({
        name: name,
        content: comment,
        userId: userId
    })
    // get back a comment
    .then(comment =>{
        res.redirect(`/weapon/${userId}`)
    })
    .catch(error=>{
        console.log('error', error)
    })
})


module.exports = router