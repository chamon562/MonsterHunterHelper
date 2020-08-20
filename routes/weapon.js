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
      // console.log('--------------------')
      // console.log(weapons);
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

      res.render("weapons/show", { weapons });
    })
    .catch((error) => {
      console.log("error", error);
      res.render("error");
    });
});

module.exports = router;
