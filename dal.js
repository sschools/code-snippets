const Snippet = require('./models/Snippet');
const Coder = require("./models/Coder");

function checkPasswordConfirm(pass, confirm) {
  return pass === confirm;
}

module.exports = {
  checkPasswordConfirm
}
