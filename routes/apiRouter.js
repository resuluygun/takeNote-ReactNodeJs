
const express = require("express");
const router = express.Router();



router.get('/customers',(req, res, next)=> {

    const customers = [
        {id: 1, firstName: "Resul", lastName: "Uygun"},
        {id: 2, firstName: "Hesna", lastName: "Uygun"},
        {id: 3, firstName: "Faruk", lastName: "Arslan"}
    ];
    res.json(customers);

});

module.exports = router;