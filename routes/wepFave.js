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
      res.redirect("wepFave");
    })
    .catch((err) => {
      console.log("favorites.js Line 49 error", err);
      res.render("error");
    });
});

// router.get('/edit', async(req, res)=>{
//     try {
//         const wepFave = await weapon.findById(req.params.id)
//         res.render('wepFave.js', {wepFave: wepFave})

//     } catch {
//         res.redirect('/wepfFave')
//     }
// })

// router.delete('/:id', (req, res)=>{
//     db.weapon.destory({
//       //still have access this params in l.then
//       where: {id: req.params.id}
//     })
//     //delete the project but not the category
//     .then(desroyedProject =>{
//       res.redirect('/wepFave')
//     }).catch((error)=>{
//       res.status(400).render('main/404')
//     })
//   })
module.exports = router;
