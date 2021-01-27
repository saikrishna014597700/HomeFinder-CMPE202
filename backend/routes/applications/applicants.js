var express = require("../../node_modules/express");
var router = express.Router();
const User = require("../../Models/UserModel");
const application = require("../../Models/RenterModel");
const Property = require("../../Models/property.model");
const Config = require("../../Utils/config");

router.get('/:propertyID', async (req, res) => {
    console.log("In get application")
    let PropertyID = req.params.propertyID;
    let applicants = await application.find({ PropertyID });
    if (applicants) {
        res.status(200).send({ status: 200, payload: { applicants } });
    } else {
        res.status(404).send({ status: 404, payload: { status: 404 } })
    }
});

router.put('/accept/:applicationID', async (req, res) => {
    console.log("In put application accept")
    let applicationID = req.params.applicationID;
    let data = { ApplicantStatus: "Approved" };
    let app = await application.findByIdAndUpdate(applicationID, data, { new: true });
    let PropertyID = app.PropertyID
    let prop = await Property.findByIdAndUpdate(PropertyID, { propertyStatus: "Sold" }, { new: true });
    let sellerEmailId = prop.sellerEmailId;
    let properties = await Property.find({ sellerEmailId });
    let applicants = await application.find({ PropertyID });
    if (applicants) {
        res.status(200).send({ status: 200, payload: { applicants, properties, propertyToEdit: prop } });
    } else {
        res.status(404).send({ status: 404, payload: { status: 404 } })
    }
});

router.put('/reject/:applicationID', async (req, res) => {
    console.log("In put application reject")
    let applicationID = req.params.applicationID;
    let data = { ApplicantStatus: "Rejected" };
    let app = await application.findByIdAndUpdate(applicationID, data, { new: true });
    let PropertyID = app.PropertyID
    // let prop = await Property.findByIdAndUpdate(PropertyID, { propertyStatus: "Sold" });
    // let sellerEmailId = prop.sellerEmailId;
    // let properties = Property.find({ sellerEmailId });
    let applicants = await application.find({ PropertyID });
    if (applicants) {
        res.status(200).send({ status: 200, payload: { applicants } });
    } else {
        res.status(404).send({ status: 404, payload: { status: 404 } })
    }
});

module.exports = router;