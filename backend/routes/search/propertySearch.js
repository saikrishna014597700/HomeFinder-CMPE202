var express = require("../../node_modules/express");
var router = express.Router();
const Property = require("../../Models/property.model");
const User = require("../../Models/UserModel");
const SavedSearch = require("../../Models/savedSearches.model");
var ObjectId = require("../../node_modules/mongodb").ObjectID;


router.post('/home', async (req, res) => {
    let minPrice = 0;
    let maxPrice = 10000000;
    let area = 100000;
    let noOfBedrooms = 0;
    let noOfBathrooms = 0;
    let addressInput = "";
    let flooring = "";
    let homeType = "";
    let parkingType = "";
    let yearBuilt = 1995;
    let otherAmenities = "";
    let propertyType = ""
    if (req.body.addressInput) {
        addressInput = req.body.addressInput
    }
    if (req.body.propertyType) {
        propertyType = req.body.propertyType
    }
    if (req.body.flooringType) {
        flooring = req.body.flooringType
    }
    if (req.body.homeType) {
        homeType = req.body.homeType
    }
    if (req.body.parkingType) {
        parkingType = req.body.parkingType
    }
    if (req.body.otherAmenities) {
        otherAmenities = req.body.otherAmenities
    }
    if (req.body.minPrice) {
        minPrice = parseInt(req.body.minPrice)
    }
    if (req.body.yearBuilt) {
        yearBuilt = parseInt(req.body.yearBuilt)
    }
    if (req.body.maxPrice) {
        maxPrice = parseInt(req.body.maxPrice)
    }
    if (req.body.area) {
        area = parseInt(req.body.area)
    }
    if (req.body.beds) {
        noOfBedrooms = parseInt(req.body.beds)
    }
    if (req.body.baths) {
        noOfBathrooms = parseInt(req.body.baths)
    }
    Property.find({
        $and: [{
            $or: [{ addressLine1: { $regex: addressInput, $options: "i" } },
            { addressLine2: { $regex: addressInput, $options: "i" } },
            { city: { $regex: addressInput, $options: "i" } },
            { propertyName: { $regex: addressInput, $options: "i" } },
            { state: { $regex: addressInput, $options: "i" } },
            { zipcode: { $regex: addressInput, $options: "i" } }]
        },
        { price: { $gte: minPrice, $lte: maxPrice } },
        { area: { $lte: area } },
        { noOfBedrooms: { $gte: noOfBedrooms } },
        { noOfBathrooms: { $gte: noOfBathrooms } },
        { flooring: { $regex: flooring, $options: "i" } },
        { homeType: { $regex: homeType, $options: "i" } },
        { parkingType: { $regex: parkingType, $options: "i" } },
        { propertyType: { $regex: propertyType, $options: "i" } },
        { yearBuilt: { $gte: yearBuilt } },
        { otherAmenities: { $regex: otherAmenities, $options: "i" } }
        ]
    }, (error, properties) => {
        if (error) {
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            })
            res.end();
        }
        res.status(200).json(properties);
    });
});


router.post('/saveSearch', async (req, res) => {
    let minPrice = 0;
    let maxPrice = 10000000;
    let area = 100000;
    let noOfBedrooms = 0;
    let noOfBathrooms = 0;
    let addressInput = "";
    let flooring = "";
    let homeType = "";
    let parkingType = "";
    let yearBuilt = 1995;
    let otherAmenities = "";
    let propertyType = ""
    if (req.body.addressInput) {
        addressInput = req.body.addressInput
    }
    if (req.body.propertyType) {
        propertyType = req.body.propertyType
    }
    if (req.body.flooringType) {
        flooring = req.body.flooringType
    }
    if (req.body.homeType) {
        homeType = req.body.homeType
    }
    if (req.body.parkingType) {
        parkingType = req.body.parkingType
    }
    if (req.body.otherAmenities) {
        otherAmenities = req.body.otherAmenities
    }
    if (req.body.minPrice) {
        minPrice = parseInt(req.body.minPrice)
    }
    if (req.body.yearBuilt) {
        yearBuilt = parseInt(req.body.yearBuilt)
    }
    if (req.body.maxPrice) {
        maxPrice = parseInt(req.body.maxPrice)
    }
    if (req.body.area) {
        area = parseInt(req.body.area)
    }
    if (req.body.beds) {
        noOfBedrooms = parseInt(req.body.beds)
    }
    if (req.body.baths) {
        noOfBathrooms = parseInt(req.body.baths)
    }
    if (req.body.baths) {
        propertyType = req.body.propertyType
    }
    var saveSearchID = new ObjectId();
    var savedSearchh = new SavedSearch({
        userId: req.body.userId,
        searchName: req.body.saveSearchText,
        minPrice: minPrice,
        _id: saveSearchID,
        maxPrice: maxPrice,
        area: area,
        noOfBedrooms: noOfBedrooms,
        noOfBathrooms: noOfBathrooms,
        addressInput: addressInput,
        flooring: flooring,
        homeType: homeType,
        parkingType: parkingType,
        yearBuilt: yearBuilt,
        otherAmenities: otherAmenities,
        propertyType: propertyType
    });
    savedSearchh.save((error, properties) => {
        if (error) {
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            })
            res.end();
        }
        res.status(200).json("success");
    });
});

router.post('/getsaveSearch', async (req, res) => {
    SavedSearch.find({ "userId": req.body.userId }, (error, savedSearch) => {
        if (error) {
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            })
            res.end();
        }
        res.status(200).json(savedSearch);
    });
});

router.get('/favouriteProperties/:id', async (req, res) => {
    User.findById(
        req.params.id
    ).then(response => {
        Property.find(
            { _id: { $in: response.favouriteProperties } }
        ).then(ress => {
            res.status(200).json(ress);
        })
            .catch(err => {
                return res.status(500).json({ error: err });
            });
    })
        .catch(err => {
            return res.status(500).json({ error: err });
        });
});

router.post('/favourite', async (req, res) => {
    User.updateOne(
        { _id: req.body.user },
        { $push: { favouriteProperties: req.body._id } },
        { upsert: true }
    ).then(response => {
        res.status(200).json("Saved");
    })
        .catch(err => {
            return res.status(500).json({ error: err });
        });
});

module.exports = router;