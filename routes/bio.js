let express = require("express");
let router = express.Router();
let db = require("../models");

router.get("/", (req, res) =>{
    db.bio.findALl({
        where: {id: req.user.id}
    })
    .then(() =>{
        res.render("")
    })
})


module.exports = router;
