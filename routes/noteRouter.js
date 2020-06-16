const noteConrtoller = require("../controllers/noteController");
const express = require("express");
const router = express.Router();

//router.route("/")S

router.use(function(req, res, next){
        console.log("Noterouter middleware")
        req.user ? next() : res.redirect("/user/login");
})

router.post("/create", noteConrtoller.createNote);

router.get("/getall", noteConrtoller.getAllNotes);

router.put("/update", noteConrtoller.updateNote);

router.delete("/delete", noteConrtoller.deleteNote);

module.exports = router;