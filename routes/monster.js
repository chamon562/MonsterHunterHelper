const express = require("express");
const router = express.Router();
const db = require("../models");
const axios = require("axios");

router.get("/", (req, res) => {
  // console.log('monster route')

  let monstersUrl = "https://mhw-db.com/monsters";
  axios
    .get(monstersUrl)
    .then(function (apiResponse) {
      let monsters = apiResponse.data;
      // console.log('--------------------')
      // console.log(monsters)
      // console.log('--------------------')
      // render from views folder and name of exact ejs file
      res.render("monster/monsters", { monsters });
    })
    .catch((error) => {
      console.log("error", error);
      res.render("error");
    });
});

router.get("/:id", (req, res) => {
  let id = req.params.id;
  let armorUrl = `https://mhw-db.com/monsters/${id}`;
  axios
    .get(armorUrl)
    .then(function (apiRepsonse) {
      let monsters = apiRepsonse.data;
      // console.log(monsters)
      db.comment.findAll({
          where: { monsterId: id },
        })
        .then((foundComments) => {
          console.log("monster.js LINE 37", foundComments);
          res.render("monster/show", { monsters, comments: foundComments });
        });
    })
    .catch((error) => {
      console.log("ERROR LINE 36 monsters.js", error);
      res.render("error");
    });
});

router.post('/:id', (req, res)=>{
  db.comment.create({
    name: req.body.name,
    content: req.body.content,
    monsterId: req.params.id
  })
  .then(comment =>{
    console.log('monster.js LINE 55')
    res.redirect(`/monster/${req.params.id}`)
  })
  .catch(error =>{
    console.log('ERROR LINE 59 monster.js', error)
    res.render(error)
  })
})

module.exports = router;
