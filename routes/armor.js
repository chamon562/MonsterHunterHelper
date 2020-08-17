const express = require("express");
const router = express.Router();
const db = require("../models");
const axios = require("axios");

router.get('/', (req, res)=>{
    // console.log('armors route')
   
    let armorsUrl = 'https://mhw-db.com/armor/sets'
    axios.get(armorsUrl)
    .then(function(apiResponse){
        let armors = apiResponse.data
        // console.log('--------------------')
        // console.log(armors)
        // console.log('--------------------')
        // render from views folder and name of exact ejs file
        res.render('armor/armors', {armors})
    })
    .catch(error =>{
        console.log('error', error)
        res.render('error')
    })
  })




module.exports = router;