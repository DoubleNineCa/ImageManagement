const express = require("express");
const path = require("path");
const fs = require("fs");
const AWS = require("aws-sdk");

const app = express();
const router = express.Router();
const upload = require("./uploadMiddleware");
const Resize = require("./Resize");
const ImageUpload = require("./ImageUpload");

router.get("/", async (req, res) => {
  await res.render("index");
});

router.post("/post", upload.single("image"), async (req, res) => {
  const imagePath = path.join(__dirname, "/public/images");
  const fileUpload = new Resize(imagePath);
  if (!req.file) {
    res.status(401).json({ error: "Please provide an image" });
  }
  const fileInfo = await fileUpload.save(req.file.buffer);

  return res.status(200).json(fileInfo);
});
module.exports = router;
