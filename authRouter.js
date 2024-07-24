const express = require("express");
const router = express.Router();
const User = require("./models/user");
const authJWT = require("./utils/authJWT");

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.password != password) {
    return res.status(401).json({
      message: "Invalid username or password",
    });
  }
  const accessToken = authJWT.sign({ sub: user.id });
  res.status(200).json({
    success: true,
    data: {
      id: user.id,
      name: user.name,
      accessToken,
    },
  });
});

router.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = User({
    name,
    email,
    password,
  });
  try {
    await user.save();
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong" });
  }
  res.status(200).json({ success: true });
});

router.get("/user/me", authJWT.verify, async (req, res, next) => {
  const user = await User.findById(req.userId);
  res.status(200).json({
    success: true,
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});
module.exports = router;
