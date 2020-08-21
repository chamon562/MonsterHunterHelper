const express = require("express");
const router = express.Router();
const db = require("../models");
const axios = require("axios");

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

router.put("/:id", (req, res) => {
  db.weapon.update(
      {name: req.body.name},
      {where: {id: req.params.id}
    })
    .then(() => {
    res.redirect("/wepFave")
    })
    .catch((error) => {
      console.log("wepFave.js Line 47 error", error);
      res.render("error")
    })
});

router.delete('/:id', (req, res)=>{
    db.weapon.destory({
      //still have access this params in l.then
      where: {id: req.params.id}
    })
    //delete the project but not the category
    .then(() =>{
      res.redirect('/wepFave')
    }).catch((error)=>{
    console.log("wepFave.js Line 65 error", error)
     res.render('error', error)
    })
  })

// router.put db.model.update req.body where all the keys of the kcolumsn name apiId userId
// use method override

// router.get('/edit', async(req, res)=>{
//     try {
//         const wepFave = await weapon.findById(req.params.id)
//         res.render('wepFave.js', {wepFave: wepFave})

//     } catch {
//         res.redirect('/wepfFave')
//     }
// })


module.exports = router;
