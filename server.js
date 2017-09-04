const express = require("express");
const mustacheExpress = require("mustache-express");
const {checkPasswordConfirm, addUser, verifyUser} = require("./dal");
const { MONGO_URI, TOKEN_SECRET } = require('./config');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Snippet = require('./models/Snippet');
const Coder = require("./models/Coder");
const bcrypt = require('bcrypt');
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
   if (!checkPasswordConfirm(req.body.password, req.body.passwordCon)) {
     let message = "Passwords Do Not Match";
     return res.render("signup", {message});
   } else {
     let message = "Success"
     currentUser = addUser(req.body);
     return res.render("menu", {currentUser});
   }
});

app.post("/snippets/home", function (req, res) {
  let current;
  verifyUser(req.body).then(function(coder) {
    current = coder[0];
    bcrypt.compare(req.body.password, current.password, function(err, results) {
      if (!results) {
        let message = "Incorrect password or username.";
        return res.render("home", {message});
      }
      if (results) {
        return res.render("menu", current)
      }
    })

  });
});

app.listen(3000, function () {
  console.log("Code Snippet App is running on: 3000");
});
