const express = require("express");
const router = express.Router();


router.get("/article", (req, res) => {
  console.log(req.query);
  res.send("article");
});

router.get("/article/:id", (req, res) => {
  res.send(`Create article`);
});

router.post("/article", (req, res) => {
  console.log(req.body);
  res.send(`show article ${req.params.id}`);
});

router.put("/article/:id", (req, res) => {
  console.log(req.body);
  res.send(`update article`);
});

router.delete("/article/:id", (req, res) => {
  res.send(`Delete article`);
});

module.exports = router;
