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

  coder.save();
  createToken(coder);
  console.log(coder);
  return coder;
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
  let isMatch = false;
  let current;
  Coder.find({ username: user.username }, '+password', function (err, coder) {
    console.log(coder);
    bcrypt.compare(user.password, coder.password, (err, res) => {
      isMatch = res;
    });
  });
  if (isMatch) {
    current= coder;
  }
  return current;
}


module.exports = {
  checkPasswordConfirm,
  addUser,
  createToken,
  verifyUser
}
