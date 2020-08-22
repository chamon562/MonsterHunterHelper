let express = require("express");
let router = express.Router();
let db = require("../models");
const multer = require('multer')
//multer requires a destination and take an object
const upload = multer({ dest: './uploads'})
const cloudinary = require('cloudinary')

router.post('/', upload.single('myFile'), (req,res)=>{
    //result is the call back
    //dthis is our post route
    cloudinary.uploader.upload(req.file.path, (result)=>{
      //if were doing a post route we need to find
      db.cloudpic.findOrCreate({
        where: {url: result.url}
      })
      .then(()=>{
        //redirect whatever our page is our page
        //need a route for it
        res.redirect('profile')
      })
      .catch(err =>{
        console.log('error: ', err)
      })
    
    })
  })

  router.get('/', (req,res)=>{
    //got to find our pic
    db.cloudpic.findAll()
    //what do you want to call this pic? plural
    .then(myPics=>{
        console.log('PROFILE.ejs LINE 34 🐝',myPics)
      //render show and throw in mypics
      res.render('profile', {myPics})
    })
    .catch(err =>{
      console.log('error line 38: ', err)
    })
  })




module.exports = router