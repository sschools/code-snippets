const express = require("express");
const mustacheExpress = require("mustache-express");
const {} = require("./dal");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Snippet = require('./models/Snippet');
const Coder = require("./models/Coder");
const app = express();

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.redirect("/snippets/home");
});

app.get("/snippets/home", function (req, res) {
  res.render("home");
});

app.get("/snippets/signup", function (req, res) {
  res.render("signup");
});

app.listen(3000, function () {
  console.log("Code Snippet App is running on: 3000");
});
