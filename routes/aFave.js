let express = require("express");
let router = express.Router();
let db = require("../models");
const armor = require("../models/weapon");
const axios = require("axios");

router.get("/", (req, res) => {
  db.armor.findAll()
    .then((armors) => {
      console.log("LINE 10 favorite.js", armors);
      res.render("aFave", { armors });
    })
    .catch((error) => {
      console.log("ERROR Line 14 aFave.js 🐵🙈🙉🙊", error);
      res.render("error")
    });
});

router.post("/", (req, res) => {
  //db.pokemon is the name of the data table
  db.armor.findOrCreate({
      where: {
        name: req.body.name,
        userId: req.user.id,
        apiId: req.body.apiId
      }
    })
    .then(() => {
      //redirected to my pokemon page
      res.redirect("aFave");
    })
    .catch((error) => {
      console.log("aFave.js Line 31 error", error);
      res.render("error");
    });
});

router.put("/:id", (req, res) =>{
    db.armor.update({name: req.body.name}, {where: {id: req.params.id}})
    .then(()=>{
        res.redirect('/aFave')
    })
    .catch(error =>{
        console.log("aFave.js Line 43 error 🐯", error)
        res.render("error")
    })
})

router.delete("/:id", (req, res) => {
    db.armor.destroy({
        //still have access this params in .then
        where: {id: req.params.id}
      })
      //delete the project but not the category
      .then(() => {
        res.redirect("/aFave");
      })
      .catch((error) => {
        console.log("wepFave.js Line 66 error 🐯", error);
        res.render("error", error);
      });
  });
module.exports = router;
