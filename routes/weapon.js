const express = require("express");
const router = express.Router();
const db = require("../models");
const axios = require("axios");

// router.get('/', (req, res)=>{
//     db.weapon.findAll()
//     .then(findWeapon =>{
//         res.render('weapons/show', {findWeapon})
//     })
//     .catch(error =>{
//         console.log('ERROR weapon.js', error)
//     })
// })

// shows weapon type and name
router.get("/", (req, res) => {
  // console.log('weapons route')

  let weaponsUrl = "https://mhw-db.com/weapons";
  axios
    .get(weaponsUrl)
    .then(function (apiResponse) {
      let weapons = apiResponse.data;
      // console.log('--------------------')
      console.log(weapons);
      // console.log('--------------------')
      // render from views folder and name of exact ejs file
      res.render("weapons/weapons", { weapons });
    })
    .catch((error) => {
      console.log("error", error);
      res.render("error");
    });
});
// had to '/:name" to reference the name being
// clicked from weapons.ejs line 7 <a href="/weapon/<%= w.name %>">
// <p><%= w.name %></p>
router.get("/:id", (req, res) => {
  let id = req.params.id;
  // console.log("weapons.js LINE 30 req.params.id is: ", id);
  let weaponsUrl = `https://www.mhw-db.com/weapons/${id}`;
  // console.log('WEAPONS.JS LINE 32', weaponsUrl)
  // let weaponsUrl = 'https://www.mhw-db.com/weapons'
  // console.log("LINE 34 weapons.js ", weaponsUrl);
  axios
    .get(weaponsUrl)
    .then(function (apiResponse) {
      let weapons = apiResponse.data;
      // console.log(weapons)
      // console.log('weaponsData weapons.js LINE 36', weaponsData)
      // console.log(weapons)
      // for(let i = 0; i < weapons.length; i++){
      //   let eachWeapon = weapons[i]
      //   let image = eachWeapon.assets.image
      //   console.log('weapon.js line 39 eachWeapon.assets.image',image)
      // console.log('weapons.js LINE 43', eachWeapon)
      // }
      res.render("weapons/show", { weapons });
    })
    .catch((error) => {
      console.log("error", error);
      res.render("error");
    });
});


router.get('/:id', (req, res) => {
  db.weapon.findOne({
    where: { id: req.params.id },
    //db.comment added to include to show the comment from the database
    include: [db.weapon, db.comment],
  })
  .then((weapon) => {
    if (!weapon) throw Error()
    //to show weapon.author
    console.log(weapon.user)
    console.log(weapon.comments)
    //articles tables is joining tables to itself
    res.render('weapon/show', { weapon })
  })
  .catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
  })
})

router.post('/:id', (req, res) => {
  db.comment.create({
    name: req.body.name,
    content: req.body.content,
    weaponId: req.params.weaponId
  })
  .then((comment) => {
    res.redirect(`/weapon/${req.params.id}`);
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

// router.post('/')

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
