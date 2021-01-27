var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var property = new Schema(
  {
    // _id: { type: Number, required: true, max: 100 },
    sellerId: { type: mongoose.Schema.Types.ObjectId },
    sellerEmailId: { type: String },
    propertyName: { type: String },
    imageUrl: { type: String },
    addressLine1: { type: String },
    addressLine2: { type: String },
    city: { type: String },
    state: { type: String },
    zipcode: { type: String, max: 1000 },
    price: { type: Number },
    area: { type: Number },
    noOfBedrooms: { type: Number },
    noOfBathrooms: { type: Number },
    flooring: { type: String },
    homeType: { type: String },
    parkingType: { type: String },
    yearBuilt: { type: Number },
    otherAmenities: { type: String },
    propertyType: { type: String },
    leaseTerm: { type: String },
    leaseStartDate: { type: String },
    leaseEndDate: { type: String },
    securityDeposit: { type: Number },
    openHouseDateTime: { type: String },
    propertyStatus: { type: String }
  },
  { collection: "properties" }
);

// Export the model
module.exports = mongoose.model("Property", property);
