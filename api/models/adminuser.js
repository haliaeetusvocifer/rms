const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminuserSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    adminFName: {
      type: String,
      required: false,
      trim: true
    },
    adminLName: {
      type: String,
      required: false,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
      type: String,
      required: true
    },
    resetPasswordToken: {
      type: String
    },
    resetPasswordExpires: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("AdminUser", adminuserSchema);
