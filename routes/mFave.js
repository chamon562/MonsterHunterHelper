let express = require("express");
let router = express.Router();
let db = require("../models");
const monster = require("../models/weapon");
const axios = require("axios");

router.get("/", (req, res) => {
  db.monster
    .findAll({
      where: {userId: req.user.id}
    })
    .then((monsters) => {
      console.log("LINE 11 mFave.js", monsters);
      res.render("mFave", { monsters });
    })
    .catch((error) => {
      console.log("ERROR Line 14 mFave.js 🐵🙈🙉🙊", error);
    });
});

router.post("/", (req, res) => {
  //db.pokemon is the name of the data table
  db.monster
    .findOrCreate({
      where: {
        name: req.body.name,
        userId: req.user.id,
        apiId: req.body.apiId,
      },
    })
    .then(() => {
      res.redirect("mFave");
    })
    .catch((err) => {
      console.log("mFave.js LINE 33 ERROR 🐷", err);
      res.render("error");
    });
});

router.put("/:id", (req, res) => {
  db.monster
    .update({ name: req.body.name }, { where: { id: req.params.id } })
    .then(() => {
      res.redirect("/mFave");
    })
    .catch((error) => {
      console.log("mFave.js LINE 45 ERROR 🐷", error);
    });
});

router.delete("/:id", (req, res) => {
    db.monster.destroy({
        where: {id: req.params.id}
    })
    .then(()=>{
        res.redirect("/mFave")
    })
    .catch(error =>{
        console.log("mFave.js LINE 57 ERROR 🐷", error)
        res.render("error", error)
    })
})

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
