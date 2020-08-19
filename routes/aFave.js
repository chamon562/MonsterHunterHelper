let express = require("express");
let router = express.Router();
let db = require("../models");
const armor = require("../models/weapon");
const axios = require("axios");

router.get("/", (req, res) => {
  db.armor.findAll()
    .then((armors) => {
      console.log("LINE 10 favorite.js", armors);
      res.render("profile", { armors });
    })
    .catch((error) => {
      console.log("ERROR Line 14 aFave.js 🐵🙈🙉🙊", error);
    });
});

router.post("/", (req, res) => {
  //db.pokemon is the name of the data table
  db.armor.findOrCreate({
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
      console.log("mFave.js Line 31 error", err);
      res.render("error");
    });
});

module.exports = router;
