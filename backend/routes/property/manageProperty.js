var express = require("../../node_modules/express");
var router = express.Router();
const User = require("../../Models/UserModel");
const Property = require("../../Models/property.model");
const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const Config = require("../../Utils/config");
const { SOLD } = require("../../constant/Constant");

const s3 = new AWS.S3({
    apiVersion: "2006-03-01",
    accessKeyId: Config.AWS_ACCESS_KEY_ID,
    secretAccessKey: Config.AWS_SECRET_ACCESS_KEY,
    region: Config.AWS_REGION,
});

const propertyImageUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: Config.AWS_BUCKET_NAME,
        key: function (req, file, cb) {
            cb(
                null,
                "propertyImage/" +
                Date.now() +
                file.originalname
            );
        },
    }),
});
router.get('/property/:sellerId', async (req, res) => {
    console.log("In get property")
    let sellerId = req.params.sellerId;
    let properties = await Property.find({ sellerId });
    if (properties) {
        res.status(200).send({ status: 200, payload: { properties } });
    } else {
        res.status(404).send({ status: 404, payload: { status: 404 } })
    }
});

router.post('/propertyImage', propertyImageUpload.single("file"), async (req, res) => {
    console.log("In post property image");
    let url = "";
    if (req.file)
        url = req.file.location;
    let property = await Property.create({ imageUrl: url });

    if (property) {
        res.status(200).send({ status: 200, payload: { propertyId: property._id } });
    } else {
        res.status(404).send({ status: 404, payload: { status: 404 } })
    }
})

router.get('/sell/property/:propertyId', async (req, res) => {
    console.log("get property");
    let propertyId = req.params.propertyId;
    let property;
    if (propertyId) {
        property = await Property.findById(propertyId);
    }
    if (property) {
        res.status(200).send({ status: 200, payload: { property } });
    } else {
        res.status(404).send({ status: 404, payload: { status: 404 } })
    }
})
router.post('/property/:propertyId', async (req, res) => {
    console.log("In post property");
    let propertyId = req.params.propertyId;
    let data = req.body;
    if (propertyId) {
        let property = await Property.findById(propertyId);
        if (property) {
            await Property.findByIdAndUpdate(propertyId, data);
        }
    } else {
        console.log(data)
        await Property.create(data);
    }
    let sellerId = data.sellerId;
    let properties = await Property.find({ sellerId });
    if (properties) {
        res.status(200).send({ status: 200, payload: { properties } });
    } else {
        res.status(404).send({ status: 404, payload: { status: 404 } })
    }
})

router.put('/property/:propertyId', async (req, res) => {
    console.log("In put property");
    let data = req.body;
    let propertyId = req.params.propertyId
    let property = await Property.findByIdAndUpdate(propertyId, data, { new: true });
    let sellerId = property.sellerId;
    let properties = await Property.find({ sellerId });
    if (properties) {
        res.status(200).send({ status: 200, payload: { properties, property } });
    } else {
        res.status(404).send({ status: 404, payload: { status: 404 } })
    }
})

router.delete('/property/:sellerId/:propertyId', async (req, res) => {
    console.log("In delete property");
    let propertyId = req.params.propertyId
    let sellerId = req.params.sellerId;
    console.log(sellerId)
    let property = await Property.deleteOne({ _id: propertyId });

    let properties = await Property.find({ sellerId });
    if (properties) {
        res.status(200).send({ status: 200, payload: { properties } });
    } else {
        res.status(404).send({ status: 404, payload: { status: 404 } })
    }
})

router.put('applicants/:sellerId/:propertyId/:applicantId', async (req, res) => {
    console.log("In put/approve applicant");
    let { sellerId, propertyId, applicantId } = req.params;

    //update applicants table after puneet and shiva

    await Property.findByIdAndUpdate(propertyId, { propertyStatus: SOLD });
    let properties = Property.find({ sellerId });
    if (properties) {
        res.status(200).send({ status: 200, payload: { properties } });
    } else {
        res.status(404).send({ status: 404, payload: { status: 404 } })
    }
})

module.exports = router;