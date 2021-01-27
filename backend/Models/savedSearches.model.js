var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var property = new Schema(
    {
        userId: { type: String, max: 100 },
        searchName: { type: String, max: 100 },
        addressInput: { type: String, max: 100 },
        // addressLine2: { type: String, max: 100 },
        // city: { type: String, max: 100 },
        // state: { type: String, max: 100 },
        // zipcode: { type: String, max: 1000 },
        maxPrice: { type: Number, max: 1000000000 },
        minPrice: { type: Number, max: 1000000000 },
        area: { type: Number, max: 1000000 },
        noOfBedrooms: { type: Number, max: 100 },
        noOfBathrooms: { type: Number, max: 100 },
        flooring: { type: String, max: 100 },
        homeType: { type: String, max: 100 },
        parkingType: { type: String, max: 100 },
        yearBuilt: { type: Number, max: 6000 },
        otherAmenities: { type: String, max: 200 },
        propertyType: { type: String, max: 200 }

    },
    { collection: "savedSearch" }

);

// Export the model
module.exports = mongoose.model("SavedSearch", property);
