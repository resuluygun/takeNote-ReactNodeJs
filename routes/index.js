// Main router entry point, sets up all route modules

const express = require("express");

const router = express.router();

const apiRouter = require("./apiRouter");


router.use("/api/customers",apiRouter);



module.exports(router);