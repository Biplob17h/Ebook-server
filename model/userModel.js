import mongoose from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: [3, "First name is too short"],
      maxLength: [20, "Name too large"],
      trim: true,
      default: "First name",
    },
    lastName: {
      type: String,
      minLength: [3, "Last name is too short"],
      maxLength: [20, "Name too large"],
      trim: true,
      default: "Last name",
    },
    email: {
      type: String,
      validate: [validator.isEmail, "Please provide is valide email"],
      required: [true, "Please provide a email"],
      unique: [true, "Email alredy in use"],
    },
    phone: {
      type: String,
      // validate: [
      //   validator.isMobilePhone,
      //   "Please provide a valide phone number ",
      // ],
      default: "+880",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "blocked", "not-active"],
      default: "not-active",
    },
    password: {
      type: String,
      required: [true, "please provide a password"],
    },
    address: {
      type: Object,
      default: {
        adddress: "",
        city: "",
        country: "",
        zipCode: "",
      },
    },
    confirmToken: String,
  },
  {
    timeStamps: true,
  }
);

const User = mongoose.model("users", userSchema);

export default User;
