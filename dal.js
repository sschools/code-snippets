const mongoose = require('mongoose');
const Snippet = require('./models/Snippet');
const Coder = require("./models/Coder");
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken')
const { TOKEN_SECRET } = require('./config')
const moment = require('moment')


mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/CodeSnippets');

function checkPasswordConfirm(pass, confirm) {
  return pass === confirm;
}

function addUser(user) {
  const coder = new Coder({
    name: user.name,
    username: user.username,
    password: user.password
  });
  createToken(coder);
  return coder.save();
}

function createToken({ _id, name, username }) {
  const payload = {
    sub: _id,
    name,
    username,
    iat: moment().unix(),
    exp: moment().add(1, 'day').unix()
  }
  return jwt.sign(payload, TOKEN_SECRET)
}

function verifyUser(user) {
  return Coder.find({ username: user.username }, '+password');
}

function getUserByName(name) {
  return Coder.find({ username: name });
}

function addSnippet(snip) {
  const snippet = new Snippet({
    username: snip.addSnipButton,
    title: snip.title,
    language: snip.language,
    tags: snip.tag,
    code: snip.code,
    notes: snip.notes
  });
  return snippet.save();
}

function getSnippetsByLang(lang) {

}

function getSnippetsByTag(tag) {

}

module.exports = {
  checkPasswordConfirm,
  addUser,
  createToken,
  verifyUser,
  getUserByName,
  getSnippetsByLang,
  getSnippetsByTag,
  addSnippet
}
