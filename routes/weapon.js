const express = require('express')
const router = express.Router()
const db = require('../models')
const axios = require('axios')



// router.get('/', (req, res)=>{
//     db.weapon.findAll()
//     .then(findWeapon =>{
//         res.render('weapons', {findWeapon})
//     })
//     .catch(error =>{
//         console.log('ERROR weapon.js', error)
//     })
// })

router.get('/', (req, res)=>{
    console.log('weapons route')
   
    let weaponsUrl = 'https://mhw-db.com/weapons'
    axios.get(weaponsUrl)
    .then(function(apiResponse){
        let weapons = apiResponse.data
        console.log('--------------------')
        // console.log(weapons)
        console.log('--------------------')
        // render from views folder and name of exact ejs file
        res.render('weapons', {weapons})
    })
    .catch(error =>{
        console.log('error', error)
        res.render('error')
    })
})



module.exports = router