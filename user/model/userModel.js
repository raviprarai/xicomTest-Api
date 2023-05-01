const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    dob: {
      type: Date,
    },
    residentialAddressStreet1: {
      type: String,
    },
    residentialAddressStreet2: {
      type: String,
    },
    permanentAddressStreet1: {
      type: String,
    },
    permanentAddressStreet2: {
      type: String,
    },
    fileName1: {
      type: String,
    },
    fileType1: {
      type: String,
    },
    uploadDocument1: {
      type: String,
    },
    fileName2: {
      type: String,
    },
    fileType2: {
      type: String,
    },
    uploadDocument2: {
      type: String,
    },
    userType:{
        type:String,
        enum:["ADMIN","USER"],
        default:"USER"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
