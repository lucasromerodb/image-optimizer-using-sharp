const path = require("path");
const express = require("express");
const sharp = require("sharp");
const multer = require("multer");

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/page.html"));
});

app.post("/api/upload", multer().single("file"), async (req, res) => {
  console.log(req.file, req.body);
  await sharp(req.file.buffer)
    .resize(256, 256)
    .jpeg({ quality: 80 })
    .toBuffer()
    .then((data) => res.type("jpeg").send(data));
});

app.listen(port);
console.log("Server started at http://localhost:" + port);
