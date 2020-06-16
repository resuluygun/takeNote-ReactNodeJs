const express = require("express");

const router = express.Router();

router.get("/", (req, res)=> {

    if(req.user) res.send(`Index - GET - User ${req.user}`);
    else res.send("Index - GET")

});

router.get("/success", (req, res)=>{

    res.send(true);
})

router.get("/failure", (req, res)=> {

    res.send(false)
})
module.exports = router;