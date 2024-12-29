const { Schema, model } = require("mongoose");

const AdditionalSchema = new Schema(
  {
    type: String,
    value: String,
  },
  {
    timestamps: true,
  }
);

const Additional = model("Additional", AdditionalSchema);
module.exports = Additional;
