let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bycrypt = require('bcrypt-nodejs');


let UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
    required: true,
  }
});

UserSchema.pre('save', function(next) {
  let user = this;
  if (this.isModified('password') || this.isNew) {
    bycrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
      bycrypt.hash(user.password, salt, null, (err, hash) => {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});


UserSchema.methods.comparePassword = function (passw, cb) {
  bycrypt.compare(passw, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
}

module.exports = mongoose.model("User", UserSchema);