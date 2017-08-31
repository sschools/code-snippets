const Snippet = require('./models/Snippet');
const Coder = require("./models/Coder");

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
  console.log(coder);
}

module.exports = {
  checkPasswordConfirm,
  addUser
}
