const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

//load ENV Variables from config file
const config = require("./config/local");
process.env.JWT_KEY = config.JWT_KEY;

//Body parser
app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// ROutes
const adminuserRoutes = require("./api/routes/adminusers");
const adminActivitiesRoutes = require("./api/routes/adminactivities");
const studentRoutes = require("./api/routes/students");

//app.use('/user', userRoutes);
app.use("/adminuser", adminuserRoutes);
app.use("/adminactivities", adminActivitiesRoutes);
app.use("/students", studentRoutes);

//Error handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

//error handling
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
