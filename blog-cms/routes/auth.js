const mongoose = require('mongoose');
const passport = require('passport');
// const config = require('../config/databsae');
require('../config/passport')(passport);
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require("../models/user");

// register is migh be the route
router.post('/register', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.json({
      sucess: false,
      msg: "Please check username and password."
    });
  } else {
    let newUser = new User({
      username: req.body.username,
      password: req.body.password
    });

    newUser.save((err) => {
      if (err) {
        return res.json({
          success: false,
          msg: "Username already exists."
        });
      }
      res.json({
        success: true,
        msg: "Successfully created new user."
      });
    });
  }
});

router.post('/login', (req, res) => {
  User.findOne({
    username: req.body.username
  }, (err, user) => {
    if (err) {
      throw err;
    }
    if (!user) {
      res.status(401).send({
        success: false,
        msg: "Authentication failed. User not found."
      });
    } else {
      user.comparePassword(req.res.body, (err, isMatch) => {
        if (isMatch && !err) {
          let token = jwt.sign(user.toJSON(), config.secret); //Check this line
          res.json({
            success: true,
            token: "JWT" + token
          });
        } else {
          res.status(401).send({
            success: false,
            msg: 'Authentication failed. Wrong password.'
          });
        }
      });
    }
  });
});

router.post('/logout', passport.authenticate("jwt", { session: false }), (req, res) => {
  req.logout();
  res.json({ success: true });
});


module.exports = router;