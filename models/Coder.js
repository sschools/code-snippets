const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const CoderSchema = new mongoose.Schema({
  id: {type: Number, require:true},
  name: { type: String },
  username: { type: String },
  password: {type: String, select: false}
});

CoderSchema.pre('save', function (next) {
  const user = this
  if (!user.isModified('password')) {
    next()
  }

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(user.password, salt, function (err, hash) {
      user.password = hash
      user.updated_at = new Date().toISOString()
      next()
    })
  })
})

CoderSchema.methods.comparePassword = function (pwd, dbPass, done) {
  bcrypt.compare(pwd, dbPass, (err, isMatch) => {
    done(err, isMatch)
  })
}

const Coder = mongoose.model('Coder', CoderSchema);

module.exports = Coder;
