const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var renterSchema = new Schema(
  {
    Firstname: { type: String, required: true },
    Lastname: { type: String, required: true },
    Email: { type: String, required: true },
    MoveInDate: { type: String },
    Mobile: { type: Number },
    CurrentAddress: { type: String },
    CreditScore: { type: Number },
    ApprovalStatus: { type: String },
    LeaseTerm: { type: Number },
    Employer: { type: String },
    EmployerAddress: { type: String },
    EmergencyContact: { type: Number },
    Salary: { type: Number },
    PropertyID: { type: String },
    PropertyName: { type: String },
    ApplicantType: { type: String },
    ApplicantStatus: { type: String },
    propertyType: { type: String },
    SellerEmail: { type: String },
    offerAmount: { type: String }, //only buyer and realtor
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("renter", renterSchema);
