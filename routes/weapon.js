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
router.get("/:name", (req, res) => {
  let name = req.params.name;
  // console.log("weapons.js LINE 30 req.params.name is: ", name);
  let weaponsUrl = `https://www.mhw-db.com/weapons/${name}`;
  axios
    .get(weaponsUrl)
    .then(function (apiResponse) {
      let weapons = apiResponse.data;

      res.render("weapons/show", { weapons });
    })
    .catch((error) => {
      console.log("error", error);
      res.render("error");
    });
});

// GET /weapons/:id - display a specific post and its author
// ('/:id') already in weapons and its parameter is :id i find it in where {id:req.params.id}
router.get('/:id', (req, res) => {
  db.weapon.findOne({
    where: { id: req.params.id },
    //db.comment added to include to show the comment from the database
    include: [db.usergit, db.comment],
  })
  .then((weapons) => {
    if (!weapons) throw Error()
    //to show weapon.user
    console.log(weapons.user)
    console.log(weapons.comment)
    //weapons tables is joining tables to itself
    res.render('weapons/show', { weapon })
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
    userId: req.user.id
  })
  .then((comment) => {
    res.redirect(`/weapons/${req.params.id}`);
  })
  .catch((error) => {
    console.log("weapon.js Line 74 ERROR ", error)
    res.status(400).render('main/404')
  })
})


module.exports = router;
