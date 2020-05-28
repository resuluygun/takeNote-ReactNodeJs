//import apiController from "../controllers/apiController";


const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController")




router.get('/test', apiController.getTestData);

// router.get('/customers', (req, res) => {
    
//     res.send(apiController.getCustomers());
// });


module.exports = router;