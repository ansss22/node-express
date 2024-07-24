const express = require("express");
const mongoose = require("mongoose");
const app = express();
const authRouter = require("./authRouter");
const articleRouter = require("./articleRouter");
const uploadRouter = require("./uploadRouter");
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
  console.log("Time", Date.now());
  //return res.status(403).send('foribbden');
  next();
});


app.use("/api", authRouter);
app.use("/api", articleRouter);
app.use("/", uploadRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

mongoose.connect("mongodb://localhost:27017/express");
