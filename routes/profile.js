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
        where: {
            url: result.url, 
            userId: req.user.id
        }
      })
      .then(()=>{
        //redirect whatever our page is our page
        //need a route for it
        res.redirect('/profile')
      })
      .catch(err =>{
        console.log('error: ', err)
      })
    
    })
  })

  router.get('/', (req,res)=>{
    //got to find our pic
    db.cloudpic.findAll({
        where: {userId: req.user.id}
    })
    //what do you want to call this pic? plural
    .then(myPics=>{
        console.log('PROFILE.ejs LINE 39 🐝',myPics)
      //render show and throw in mypics
      res.render('profile', {myPics})
    })
    .catch(err =>{
      console.log('error line 44: ', err)
    })
  })

  router.delete("/:id", (req, res) => {
    db.cloudpic.destroy({
        
        //still have access this params in .then
        where: {id: req.params.id}
      })
      //delete the project but not the category
      .then(() => {
        res.redirect("/profile");
      })
      .catch((error) => {
        console.log("profile.js Line 59 error 🐯", error);
        res.render("error", error);
      });
  });



module.exports = router