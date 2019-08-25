const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const Adminuser = require("../models/adminuser");

// Load input validation
const validateAdminRegisterInput = require("../validation/adminregister");
const validateLoginInput = require("../validation/login");

// Create Admin Profile
exports.adminuser_create_adminuser = (req, res, next) => {
  console.log(req.body);
  const { errors, isValid } = validateAdminRegisterInput(req.body);

  //Check Validation
  if (!isValid) {
    return res.status(999).json(errors);
  }
  Adminuser.find({
    email: req.body.email
  })
    .exec()
    .then(adminprofile => {
      console.log(adminprofile);
      if (adminprofile.length >= 1) {
        return res.status(409).json({
          message: "EMail exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const adminprofile = new Adminuser({
              _id: new mongoose.Types.ObjectId(),
              adminFName: req.body.adminFName,
              adminLName: req.body.adminLName,
              email: req.body.email,
              password: hash
            });
            console.log(adminprofile);
            adminprofile
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "A New Admin Profile Created Successfully",
                  admin: result
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
};

//Login
exports.adminuser_login = (req, res, next) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  Adminuser.findOne({
    email: email
  })
    .then(user => {
      if (!user) {
        const error = new Error("An Admin with this email could not be found.");
        error.statusCode = 801;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error("Wrong password!");
        error.statusCode = 901;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        },
        "somesupersecretsecret",
        {
          expiresIn: "300d"
        }
      );
      res.status(200).json({
        message: "Auth successful, you are now logged in as Admin",
        token: token,
        AdminUser: {
          userId: loadedUser._id.toString(),
          adminFName: loadedUser.adminFName,
          adminLName: loadedUser.adminLName,
          email: loadedUser.email
        }
      });
    })
    .catch(err => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// get all Admin profile
exports.adminuser_get_all_adminuser = (req, res, next) => {
  Adminuser.find()
    .select("adminFName adminLName email _id")
    .exec()
    .then(docs => {
      console.log("From database", docs);
      res.status(200).json({
        message: "All admin profile fetched successfully",
        count: docs.length,
        admin: docs
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

//getbyId
exports.adminuser_get_an_adminuser_adminuser = (req, res, next) => {
  const id = req.params.adminuserId;
  Adminuser.findById(id)
    .select("adminFName adminLName email _id")

    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({
          message: "All admin profile fetched successfully",
          adminprofile: doc
        });
      } else {
        res.status(404).json({
          message: "No valid entry found for provided ID"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "error querying admin profile",
        error: err
      });
    });
};
