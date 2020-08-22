const express = require("express");
const router = express.Router();
const db = require("../models");
const axios = require("axios");

router.get("/", (req, res) => {
  // console.log('armors route')

  let armorsUrl = "https://mhw-db.com/armor/sets";
  axios
    .get(armorsUrl)
    .then(function (apiResponse) {
      let armors = apiResponse.data;
      // console.log('--------------------')
      // console.log(armors)
      // console.log('--------------------')
      // render from views folder and name of exact ejs file
      res.render("armor/armors", { armors });
    })
    .catch((error) => {
      console.log("error", error);
      res.render("error");
    });
});

router.get("/:id", (req, res) => {
    let id = req.params.id;
    console.log('LINE 29 armor.js 🐱',id)
    let armorUrl = `https://mhw-db.com/armor/${id}`;
    axios
      .get(armorUrl)
      .then(function (apiRepsonse) {
        let armors = apiRepsonse.data;
        // console.log(armors)
        console.log("+++++++++++++++++++++++++++++++++++++++", armors)
        db.comment.findAll({
            where: { armorId: id },
          })
          .then((foundComments) => {
            console.log("armor.js LINE 40", foundComments);
            res.render("armor/show", { armors, comments: foundComments });
          });
      })
      .catch((error) => {
        console.log("ERROR LINE 36 armors.js", error);
        res.render("error");
      });
  });
  
  router.post('/:id', (req, res)=>{
      console.log("armor.js LINE 51 🅰️")
    db.comment.create({
      name: req.body.name,
      content: req.body.content,
      armorId: req.params.id
    })
    .then(comment =>{
      console.log('armor.js LINE 55')
      res.redirect(`/armor/${req.params.id}`)
    })
    .catch(error =>{
      console.log('ERROR LINE 59 armor.js', error)
      res.render(error)
    })
  })


  
module.exports = router;
