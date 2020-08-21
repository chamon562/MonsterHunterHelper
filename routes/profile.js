let express = require("express");
let router = express.Router();
let db = require("../models");

router.get('/', (req, res) =>{
    db.weapon.findAll()
    .then(weapons =>{
        // console.log('profile.js THESE ARE weaponS LINE 8',weapons)
        res.render('profile', {weapons})
    })

    .catch((error) => {
        console.log("error", error);
        res.render("error");
      });
})

router.get('/new', (req, res) =>{
    db.monster.findAll()
    .then(monsters =>{
        // console.log('profile.js LINE 21 THESE ARE MONSTERS ',monsters)
        res.render('profile', {monsters})
    })
    .catch((error) => {
        console.log("error", error);
        res.render("error");
      });
})




module.exports = router