const express = require("express");
const router = express.Router();
const db = require("../models");
const axios = require("axios");

// shows weapon type and name
router.get("/", (req, res) => {
  // console.log('weapons route')
  let weaponsUrl = "https://mhw-db.com/weapons";
  axios
    .get(weaponsUrl)
    .then(function (apiResponse) {
      let weapons = apiResponse.data;
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
  console.log('id WEAPON LINE 26')
  let id = req.params.id;
  // console.log("weapons.js LINE 30 req.params.id is: ", id);
  let weaponsUrl = `https://www.mhw-db.com/weapons/${id}`;
  axios
    .get(weaponsUrl)
    .then(function (apiResponse) {
      let weapons = apiResponse.data;
      db.comment.findAll({
        where: {weaponId: id}
      })
      .then(foundComments =>{
        console.log('LINE 38 ',foundComments)
        res.render("weapons/show", { weapons, comments: foundComments });
      })
    })
    .catch((error) => {
      console.log("error", error);
      res.render("error");
    });
});



router.post('/:id', (req, res) => {
  db.comment.create({
    name: req.body.name,
    content: req.body.content,
    // user: req.user.id,
    weaponId:  req.params.id,
    // monsterId:  req.params.id,
    // armorId:  req.params.id
  })
  .then((comment) => {
    console.log(`REDIRECTING TO/weapon/${req.params.id}`)
    res.redirect(`/weapon/${req.params.id}`);
  })
  .catch((error) => {
    console.log("weapon.js Line 75 ERROR ", error)
    res.status(400).render('main/404')
  })
})


module.exports = router;
