const express = require("express");

const app = express();

app.get("/api/customers", (req, res) => {

    const customers = [
        {id: 1, firstName: "Resul", lastName: "Uygun"},
        {id: 2, firstName: "Hesna", lastName: "Uygun"},
        {id: 3, firstName: "Faruk", lastName: "Arslan"}
    ];
    res.json(customers);
});

const port = 5000;
app.listen(port, () => console.log("the server has started at port 5000"));












