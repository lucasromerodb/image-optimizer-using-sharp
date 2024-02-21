const path = require("path");
const express = require("express");
const sharp = require("sharp");
const multer = require("multer");

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/page.html"));
});

app.post("/api/optimized", multer().single("file"), async (req, res) => {
  await sharp(req.file.buffer)
    .resize(512, 512)
    .jpeg({ quality: 80 })
    .toBuffer()
    .then((data) => res.type("jpeg").send(data));
});

app.listen(port);
console.log("Server started at http://localhost:" + port);
