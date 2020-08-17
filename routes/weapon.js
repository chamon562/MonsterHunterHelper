const express = require("express");
const router = express.Router();
const db = require("../models");
const axios = require("axios");

// shows weapon type and name
router.get('/', (req, res)=>{
  // console.log('weapons route')
 
  let weaponsUrl = 'https://mhw-db.com/weapons'
  axios.get(weaponsUrl)
  .then(function(apiResponse){
      let weapons = apiResponse.data
      // console.log('--------------------')
      // console.log(weapons)
      // console.log('--------------------')
      // render from views folder and name of exact ejs file
      res.render('weapons/weapons', {weapons})
  })
  .catch(error =>{
      console.log('error', error)
      res.render('error')
  })
})
// had to '/:name" to reference the name being 
// clicked from weapons.ejs line 7 <a href="/weapon/<%= w.name %>">
// <p><%= w.name %></p>
router.get('/:name', (req, res)=>{
    // let id = req.params.id
    // console.log('weapons.js req.params.id is: ',id)
    axios.get(weaponsUrl)
    .then(function(apiResponse){
        let weapons = apiResponse.data
        // console.log(weapons)
        for(let i = 0; i < weapons.length; i++){
          let eachWeapon = weapons[i]
        //   let image = eachWeapon.assets.image
          console.log(eachWeapon)
        }
        res.render('weapons/show', {weapons})
    })
    .catch(error =>{
        console.log('error', error)
        res.render('error')
    })
  
})


// router.get('/', (req, res)=>{
//     db.weapon.findAll()
//     .then(findWeapon =>{
//         res.render('weapons', {findWeapon})
//     })
//     .catch(error =>{
//         console.log('ERROR weapon.js', error)
//     })
// })

// router.get('/', (req, res)=>{
//     // console.log('weapons route')

//     let weaponsUrl = 'https://mhw-db.com/weapons'
//     axios.get(weaponsUrl)
//     .then(function(apiResponse){
//         let weapons = apiResponse.data
//         // console.log('--------------------')
//         // console.log(weapons)
//         // console.log('--------------------')
//         // render from views folder and name of exact ejs file
//         res.render('weapons', {weapons})
//     })
//     .catch(error =>{
//         console.log('error', error)
//         res.render('error')
//     })
// })

module.exports = router;
