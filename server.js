const express = require("express");
const mustacheExpress = require("mustache-express");
const {checkPasswordConfirm} = require("./dal");
const { MONGO_URI, TOKEN_SECRET } = require('./config');
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

mongoose.connect(MONGO_URI, { useMongoClient: true });

app.get("/", function (req, res) {
  res.redirect("/snippets/home");
});

app.get("/snippets/home", function (req, res) {
  res.render("home");
});

app.get("/snippets/signup", function (req, res) {
  res.render("signup");
});

app.get("/snippets/addSnippet", function (req, res) {
  res.render("addSnippet");
});

app.post("/snippets/signup", function (req, res) {
  console.log(req.body);
   if (!checkPasswordConfirm(req.body.password, req.body.passwordCon)) {
     let message = "Passwords Do Not Match";
     return res.render("signup", {message});
   } else {
     let message = "Success"
     return res.render("signup", {message});
   }
});

app.listen(3000, function () {
  console.log("Code Snippet App is running on: 3000");
});
