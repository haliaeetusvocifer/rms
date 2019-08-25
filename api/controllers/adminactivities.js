const mongoose = require("mongoose");
const AdminProfile = require("../models/adminuser");

//Admin get all admin profile
exports.adminprofile_get_adminprofile = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 10;
  let totalItems;
  AdminProfile.find()
    .countDocuments()

    .then(count => {
      totalItems = count;
      return AdminProfile.find()
        .sort({
          createdAt: -1
        })
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
        .select("adminFName adminLName email createdAt _id");
    })
    .then(docs => {
      res.status(200).json({
        message: "All Admin profile fetched successfully",
        count: docs.length,
        totalItems: totalItems,
        totalPages: Math.ceil(totalItems / perPage),
        currentPage: currentPage,
        adminprofile: docs
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
