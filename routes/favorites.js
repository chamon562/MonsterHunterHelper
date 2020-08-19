let express = require("express");
let router = express.Router();
let db = require("../models");
const weapon = require('../models/weapon')
const axios = require("axios");

// router.get("/:id", (req, res) => {
//   let id = req.params.id;
//   console.log("favorites.js LINE 30 req.params.id is: ", id);
//   let weaponsUrl = `https://www.mhw-db.com/weapons/${id}`;
//   axios.get(weaponsUrl)
//     .then(function (apiResponse) {
//       let weapons = apiResponse.data;
//       console.log(weapons)
//       res.render("weapons/show", { weapons });
//     })
//     .catch((error) => {
//       console.log("error", error);
//       res.render("error");
//     });
// });

router.get('/', (req, res) => {
  db.weapon.findAll()
    .then(weapons => {
      console.log("LINE 10 favorite.js", weapons);
      res.render("profile", {weapons});
    })
    .catch((error) => {
      console.log("ERROR Line 14 profile.ejs 🐵🙈🙉🙊", error);
    });
});




router.post("/", (req, res) => {
  //db.pokemon is the name of the data table
  db.weapon.findOrCreate({
      where: {
        name: req.body.name, 
        userId: req.user.id
      }
    })
    .then(() => {
      //redirected to my pokemon page
      res.redirect("/profile");
    })
    .catch((err) => {
      console.log("favorites.js Line 49 error", err);
      res.render("error");
    });
});





module.exports = router;
