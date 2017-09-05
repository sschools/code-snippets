const express = require("express");
const mustacheExpress = require("mustache-express");
const {checkPasswordConfirm, addUser, verifyUser, getUserByName, getSnippetsByLang, getSnippetsByTag, addSnippet} = require("./dal");
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
     let message = "Success";
     addUser(req.body).then(function(user) {
       return res.render("menu", user);
     })

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

app.post("/snippets/menu", function (req, res) {
  console.log(req.body);
  if (req.body.addButton) {
    let currentUserName = req.body.addButton;
    getUserByName(currentUserName).then(function(coder) {
      let current = coder[0];
      return res.render("addSnippet", current);
    });
  } else if (req.body.language) {
    let chosenLangauge = req.body.language;
    getSnippetsByLang(chosenLangauge);
  } else {
    let chosenTag = req.body.tag;
    getSnippetsByTag(chosenTag);
  }
});

app.post("/snippets/addSnippet", function(req, res) {
  console.log(req.body);
  let snippet = req.body;
  addSnippet(snippet).then(function(newSnip) {
    console.log(newSnip);
  });
  res.render("home");
});

app.listen(3000, function () {
  console.log("Code Snippet App is running on: 3000");
});
