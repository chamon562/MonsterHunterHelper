const express = require("express");
const router = express.Router();
const db = require("../models");
const axios = require("axios");


router.get('/', (req, res)=>{
    // console.log('monster route')
   
    let monstersUrl = 'https://mhw-db.com/monsters'
    axios.get(monstersUrl)
    .then(function(apiResponse){
        let monsters = apiResponse.data
        // console.log('--------------------')
        console.log(monsters)
        // console.log('--------------------')
        // render from views folder and name of exact ejs file
        res.render('monster/monsters', {monsters})
    })
    .catch(error =>{
        console.log('error', error)
        res.render('error')
    })
  })
  
  router.get('/:id', (req, res)=> { 
   
      res.render('monster/show')
})




module.exports = router;