let express = require("express");
let db = require("../models");
let router = express.Router();
const weapon = require("../models/weapon");

// router.post("/", (req, res) => {
//   let name = req.body.name;
//   console.log(name);
//   let comment = req.body.comment;
//   console.log(comment);
//   let weaponId = req.body.weaponId;
//   let monsterId = req.body.monsterId;
//   let armorId = req.body.armorId;
//   console.log("wepComment.js Line 15 🐸", weaponId);
//   //you can pass in req.body
//   db.comment
//     .create({
//       name: name,
//       content: comment,
//       weaponId: weaponId,
//       monsterId: monsterId,
//       armorId: armorId,
//     })
//     // get back a comment
//     .then((comment) => {
//       console.log("wepComment.js Line 23 🐝", comment);
//       res.redirect(`/weapon/${weaponId}`);
//     })
//     .catch((error) => {
//       console.log("error", error);
//     });
// });

module.exports = router;
