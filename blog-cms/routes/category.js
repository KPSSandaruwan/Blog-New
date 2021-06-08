const passport = require('passport');
// const config = require('../config/database');
require('../config/passport')(passport);
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Category = require("../models/category");
const { route } = require('.');


router.get('/', passport.authenticate("jwt", { session: false }), (req, res) => {
  const token = getToken(req.headers); // check

  if (token) {
    Category.find((err, categories) => {
      if (err) return next(err);
      res.json(categories);
    });
  } else {
    return res.status(403).send({
      success: false,
      msg: "Unauthorized."
    });
  }
});


router.get('/:id', passport.authenticate("jwt", { session: false }), (req, res, next) => {
  const token = getToken(req.headers);
  if (token) {
    Category.findById(req.params.id, (err, category) => {
      if (err) return next(err);
      res.json(category);
    });
  } else {
    return res.status(403).send({
      success: false,
      msg: "Unauthorized"
    });
  }
});


router.put('/:id', passport.authenticate("jwt", { session: false}), (req, res, next) => {
  const token = getToken(req.headers);
  if (token) {
    Category.findByIdAndUpdate(req.params.id, req.body, (err, category) => {
      if (err) return next(err);
      res.json(category);
    });
  } else {
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
});

router.delete('/:id', passport.authenticate("jwt", { session: false }), (req, res, next) => {
  const token = getToken(req.headers);
  if (token) {
    Category.findByIdAndRemove(req.params.id, req.body, (err, category) => {
      if (err) return next(err);
      res.json(category);
    });
  } else {
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
});

getToken = (headers) => {
  if (headers && headers.authorization) {
    const parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
}


module.exports = router;