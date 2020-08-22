const express = require("express");
const router = express.Router();
const db = require("../models");
const axios = require("axios");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/", (req, res) => {
  db.weapon
    .findAll()
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
  db.weapon
    .findOrCreate({
      where: {
        name: req.body.name,
        userId: req.user.id,
        apiId: req.body.apiId,
      },
    })
    .then(() => {
      res.redirect("wepFave");
    })
    .catch((err) => {
      console.log("favorites.js Line 49 error", err);
      res.render("error");
    });
});
// :id to reference the model id when doing a put route to change to another
// takes in two objects the first is what i wanna change which is the name
// the second is what do i wanna change which is where the id req.params.id
router.put("/:id", (req, res) => {
  db.weapon.update(
    //start with what I want to change within the model which is name
      {name: req.body.name},
    //where? the id object {id: req.params.id }
      {where: {id: req.params.id}}
    )
    .then(() => {
      res.redirect("/wepFave");
    })
    .catch((error) => {
      console.log("wepFave.js Line 47 error", error);
      res.render("error");
    });
});

router.delete("/:id", (req, res) => {
  db.weapon.destroy({
      //still have access this params in .then
      where: {id: req.params.id}
    })
    //delete the project but not the category
    .then(() => {
      res.redirect("/wepFave");
    })
    .catch((error) => {
      console.log("wepFave.js Line 66 error 🐯", error);
      res.render("error", error);
    });
});



module.exports = router;
