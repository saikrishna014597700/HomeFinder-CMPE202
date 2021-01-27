const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DEFAULTUSERSTATUS } = require("../constant/Constant");
var usersSchema = new Schema(
  {
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    Password: { type: String, required: true },
    Role: { type: String, required: true },
    IsApproved: { type: Number, default: DEFAULTUSERSTATUS },
    propertyCount: { type: Number, default: 0 },
    favouriteProperties: {type: Array}
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("user", usersSchema);
