const express = require('express')
const router = express.Router()
const db = require('../models')
const axios = require('axios')


router.get('/', (req, res)=>{
    db.weapon.findAll()
    .then(findWeapon =>{
        res.render('weapons', {findWeapon})
    })
    .catch(error =>{
        console.log('ERROR weapon.js', error)
    })
})

router.get('/:type', (req, res)=>{
    let type = req.params.type
    let weaponUrl = `https://mhw-db.com/weapons/${type}`
    axios.get(weaponUrl)
    .then(function(apiResponse){
        
        let weapon = apiResponse.data
        console.log(weapon)
        res.render('weapons', {weapon})
    })
    .catch(error =>{
        console.log('error', error)
        res.render('error')
    })
})



module.exports = router