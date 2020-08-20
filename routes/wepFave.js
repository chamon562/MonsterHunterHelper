const express = require("express");
const router = express.Router();
const db = require("../models");
const axios = require("axios");

router.get("/", (req, res) => {
  db.weapon.findAll()
    .then((weapons) => {
      console.log("profile.js THESE ARE weaponS LINE 8", weapons);
      res.render("wepFave", { weapons });
    })
    .catch((error) => {
      console.log("error", error);
      res.render("error");
    });
});

router.post("/", (req, res) => {
  console.log("LINE 20 🐼", req.body);
    db.weapon.findOrCreate({
      where: {
        name: req.body.name,
        userId: req.user.id,
        apiId: req.body.apiId
      }
    })
    .then(() => {
      res.redirect("/wepFave");
    })
    .catch((err) => {
      console.log("favorites.js Line 49 error", err);
      res.render("error");
    });
});
module.exports = router;
