const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateAdminRegisterInput(data) {
  let errors = {};

  // Doctor First Name
  data.adminFName = !isEmpty(data.adminFName) ? data.adminFName : "";

  //Doctor's First Name Minimum Characted
  if (
    !Validator.isLength(data.adminFName, {
      min: 2
    })
  ) {
    errors.adminFName = "Admin First Name must be a minimum of 2 characters";
  }

  //Doctor's First Name field Cannot be empty
  if (Validator.isEmpty(data.adminFName)) {
    errors.adminFName = "Admin First Name is required";
  }

  // Doctor Last Name
  data.adminLName = !isEmpty(data.adminLName) ? data.adminLName : "";

  //Doctor's Last Name Minimum Characted
  if (
    !Validator.isLength(data.adminLName, {
      min: 2
    })
  ) {
    errors.adminLName = "Admin Last Name must be a minimum of 2 characters";
  }

  //Doctor's Last Name field Cannot be empty
  if (Validator.isEmpty(data.adminLName)) {
    errors.adminLName = "Admin Last Name is required";
  }

  // Doctor Email
  data.email = !isEmpty(data.email) ? data.email : "";
  //Validate email
  if (!Validator.isEmail(data.email)) {
    errors.email = "Admin Email is invalid";
  }

  //Doctor's email field cannot be empty
  if (Validator.isEmpty(data.email)) {
    errors.email = "Admin Email field is required";
  }

  // Doctor password
  data.password = !isEmpty(data.password) ? data.password : "";

  //Doctor's password field cannot be empty
  if (Validator.isEmpty(data.password)) {
    errors.password = "Admin Password field is required";
  }

  //Doctor's password minimum characted
  if (
    !Validator.isLength(data.password, {
      min: 8
    })
  ) {
    errors.password = "Admin Password must be at least 8 characters";
  }

  // Doctor confirm password
  data.confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword
    : "";

  //Doctor's confirm password field cannot be empty
  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Admin confirm Password field is required";
  }

  //Doctor's password matching
  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "Admin Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
