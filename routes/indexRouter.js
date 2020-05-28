const express = require("express");

const router = express.Router();

router.get("/", (req, res)=> {

    if(req.user) res.send(`Index - GET - User ${req.user}`);
    else res.send("Index - GET")

});

module.exports = router;