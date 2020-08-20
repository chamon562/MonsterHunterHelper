const express = require("express");
const router = express.Router();
const db = require("../models");
const axios = require("axios");

router.get('/', (req, res) =>{
    db.weapon.findAll()
    .then(weapons =>{
        console.log('profile.js THESE ARE weaponS LINE 8',weapons)
        res.render('wepFave', {weapons})
    })

    .catch((error) => {
        console.log("error", error);
        res.render("error");
      });
})

module.exports = router