let express = require("express");
let router = express.Router();
let db = require("../models");
const monster = require("../models/weapon");
const axios = require("axios");

router.get("/", (req, res) => {
  db.monster.findAll().then((monsters) => {
      console.log("LINE 11 mFave.js", monsters);
      res.render("mFave", { monsters });
    })
    .catch((error) => {
      console.log("ERROR Line 14 mFave.js 🐵🙈🙉🙊", error);
    });
});

router.post("/", (req, res) => {
  //db.pokemon is the name of the data table
  db.monster.findOrCreate({
      where: {
        name: req.body.name,
        userId: req.user.id,
        apiId: req.body.apiId
      }
    })
    .then(() => {
      res.redirect("mFave");
    })
    .catch((err) => {
      console.log("mFave.js Line 34 error", err);
      res.render("error");
    });
});


module.exports = router;

