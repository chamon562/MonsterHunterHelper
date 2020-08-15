const express = require('express')
const router = express.Router()
const db = require('../models')
const axios = require('axios')


router.get('/', (req, res)=>{
    db.weapon.findAll()
    .then(findWeapon =>{
        res.render(findWeapon)
    })
    .catch(error =>{
        console.log('ERROR weapon.js', error)
    })
})



module.exports = router