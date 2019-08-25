const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const AdminactivitiesController = require("../controllers/adminactivities");

// Admin: Handle all GET requests to /admin profile
router.get(
  "/admingetalladminprofile",
  checkAuth,
  AdminactivitiesController.adminprofile_get_adminprofile
);

module.exports = router;
