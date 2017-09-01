const mongoose = require('mongoose');
const Snippet = require('./models/Snippet');
const Coder = require("./models/Coder");
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/CodeSnippets');

let idNum = 2;

function checkPasswordConfirm(pass, confirm) {
  return pass === confirm;
}

function addUser(user) {
  const coder = new Coder({
    _id: idNum,
    name: user.name,
    username: user.username,
    password: user.password
  });
  idNum += 1;
  coder.save();
  console.log(coder);
}

module.exports = {
  checkPasswordConfirm,
  addUser
}
