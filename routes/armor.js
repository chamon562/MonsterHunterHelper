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

router.get("/:slug", (req, res) => {
  let slug = req.params.slug;
  let armorUrl = `https://mhw-db.com/armor/${slug}`;
  axios
    .get(armorUrl)
    .then(function (apiRepsonse) {
      let armors = apiRepsonse.data;
      res.render("armor/show", { armors });
    })
    .catch((error) => {
      console.log("ERROR LINE 33 armor.js", error);
      res.render("error");
    });
});

module.exports = router;
