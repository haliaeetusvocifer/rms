const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const AdminController = require("../controllers/adminusers");

// handles  create admin profile
router.post("/createadmin", AdminController.adminuser_create_adminuser);

//Login
router.post("/login", AdminController.adminuser_login);

// Handle all GET requests to /patient profile
router.get(
  "/getalladmin",
  checkAuth,
  AdminController.adminuser_get_all_adminuser
);

//getbyId + checkauth
router.get(
  "/getanadminuser/:adminuserId",
  checkAuth,
  AdminController.adminuser_get_an_adminuser_adminuser
);

module.exports = router;
