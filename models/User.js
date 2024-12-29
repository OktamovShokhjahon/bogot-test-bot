const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    userId: Number,
    action: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const User = model("User", UserSchema);
module.exports = User;
