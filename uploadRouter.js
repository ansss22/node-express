const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const name = Date.now();
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + name + ext);
    if (ext !== ".png") {
      return cb(new Error("Invalid file extension type"));
    }
    cb(null , true);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 1,
  },
});

router.post("/upload/photo", upload.single("photo"), async (req, res, next) => {
  res.status(200).json({
    success: true,
  });
});

module.exports = router;
