const express = require("express");
const router = express.Router();
const db = require("../models");
const axios = require("axios");


   

  router.post('/new', (req, res) =>{
      const data = req.body
      console.log(data)
    db[data.cat].findOrCreate({
        where: {name: data.name, userId:req.user.id}
    })
    .then(()=>{
        //redirected to my pokemon page 
        res.redirect('/');
      })
      .catch((err) =>{
        console.log('error', err)
        res.send('error')
    
      })
      console.log(req.user.id)
    
    //   res.json(data)
  })




module.exports = router;