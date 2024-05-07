const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required."],
    },
    middleName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      required: [true, "Last name is required."],
    },
    birthDate: {
      type: String,
      required: [true, "Birthdate is required."],
    },
    province: {
      type: String,
      required: [true, "Province is required."],
    },
    city: {
      type: String,
      required: [true, "Province is required."],
    },
    brgy: {
      type: String,
      required: [true, "Province is required."],
    },
    street: {
      type: String,
      required: [true, "Province is required."],
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
