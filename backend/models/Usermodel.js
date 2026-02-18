import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,   // ❗ you wrote "require" before — fixed here
    },
  },
  { timestamps: true }
);

const Usermodel = mongoose.model("User", userSchema);

export default Usermodel;
