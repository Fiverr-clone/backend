
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User= require('../models/user');

exports.join = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
      (hash) => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save().then(
          () => {
            res.status(201).json({
              message: 'User added successfully!'
            });
          }
        ).catch(
          (error) => {
            res.status(500).json({
              error: error
            });
          }
        );
      }
    );
  };


  exports.signin = (req, res, next) => {
    User.findOne({ email: req.body.email }).then(
      (user) => {
        if (!user) {
          return res.status(401).json({
            error: new Error('User not found!')
          });
        }
//        bcrypt.compare(req.body.password, user.password).then(
//          (valid) => {
            if (password !== verifPassword) {
              return res.status(401).json({
                error: new Error('Incorrect verifPassword!')
              });
            } else {
            const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN });
              return res.status(200).json({
                userId: user._id,
                token: token
            });
          }
         }
//        ).catch(
//          (error) => {
//            res.status(500).json({
//              error: error
//            });
//          }
//        );
//      }
    ).catch(
      (error) => {
        res.status(500).json({
          error: error
        });
      }
    );
  }



  // redo later when "join" added to check the bcrypt function
/*
  exports.signin = (req, res, next) => {
    User.findOne({ email: req.body.email }).then(
      (user) => {
        if (!user) {
          return res.status(401).json({
            error: new Error('User not found!')
          });
        }
        bcrypt.compare(req.body.password, user.password).then(
          (valid) => {
            if (!valid) {
              return res.status(401).json({
                error: new Error('Incorrect password!')
              });
            }
            const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN });
              res.status(200).json({
                userId: user._id,
                token: token
            });
          }
        ).catch(
          (error) => {
            res.status(500).json({
              error: error
            });
          }
        );
      }
    ).catch(
      (error) => {
        res.status(500).json({
          error: error
        });
      }
    );
  }
  */
