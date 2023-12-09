const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      trim: true, //it will remove the space
    },
    lastName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      trim: true, //it will remove the space
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true, //it will remove the space
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true, //it will remove the space
    },
    hashPassowrd: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    contactNumber: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

//hashing the password in db
userSchema.virtual("password").set(function (password) {
  this.hashPassowrd = bcrypt.hashSync(password, 10);
});
//Load hash from your password DB
userSchema.methods = {
  authenticate: function (password) {
    return bcrypt.compareSync(password, this.hashPassowrd);
  },
};

module.exports = mongoose.model("User", userSchema);
