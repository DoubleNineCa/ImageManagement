const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
const app = express();
const port = process.env.PORT || 4000;
const router = require("./router");

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use("/upload", router);

app.listen(port, () => {
  console.log("Server is running on PORT", port);
});
