const express = require("express");

const apiRouter = require("./routes/apiRouter");
const indexRouter = require("./routes/indexRouter");

const app = express();

app.use("/api", apiRouter);

const port = 5000;
app.listen(port, () => console.log("the server has started at port 5000"));












