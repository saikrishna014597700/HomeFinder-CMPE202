var express = require("../../node_modules/express");
const Renter = require("../../Models/RenterModel");
const nodemailer = require("nodemailer");
var router = express.Router();

router.post("/application", async (req, res) => {
  console.log("Inside Application Submission Form");
  console.log("Listing Body Content", req.body);
  var newrenter = new Renter({
    Firstname: req.body.Firstname,
    Lastname: req.body.Lastname,
    Email: req.body.Email,
    MoveInDate: req.body.MoveInDate,
    Mobile: req.body.Mobile,
    CreditScore: req.body.CreditScore,
    CurrentAddress: req.body.CurrentAddress,
    LeaseTerm: req.body.LeaseTerm,
    Employer: req.body.Employer,
    EmployerAddress: req.body.EmployerAddress,
    EmergencyContact: req.body.EmergencyContact,
    Salary: req.body.Salary,
    PropertyID: req.body.PropertyID,
    PropertyName: req.body.PropertyName,
    ApplicantStatus: "New",
    ApplicantType: req.body.ApplicantType,
    propertyType: req.body.propertyType,
    offerAmount: req.body.offerAmount,
    SellerEmail:req.body.SellerEmail,
  });
  console.log("New Renter Application Data", newrenter);
  try {
    Renter.findOne(
      { Email: req.body.Email, PropertyID: req.body.PropertyID },
      async (error, renter) => {
        if (error) {
          console.log("DB Connection Error: ", error);
          return res.status(400).json({ message: "DB Connection Error" });
        }
        if (renter) {
          console.log("Email already Exist");
          return res.status(400).json({ message: "Applicant already Exist" });
        } else {
          await newrenter.save((error, data) => {
            console.log("Inside new User Save");
            if (error) {
              console.log("Error in Adding Data: ", error);
              return res.status(400).json({ message: "Error in Adding Data" });
            } else {
              console.log("Applied Sucessfully");
              let transport = nodemailer.createTransport({
                host: "smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: "8820981b0bc5cd",
                  pass: "daa5705c0d7b90",
                },
              });
              if (req.body.propertyType === "Rentable") {
                var message = {
                  from: req.body.Email, // Sender address
                  to: req.body.SellerEmail, // List of recipients

                  subject: "New Lease Application", // Subject line
                  text:
                    "New Lease Application "  + "\n" +
                    "Applicant Email Address:  "  + req.body.Email  + "\n" +
                    "Firstname: " + req.body.Firstname + "\n" +
                    "Lastname: " + req.body.Lastname + "\n" +
                    "Email: " + req.body.Email + "\n" +
                    "MoveInDate: " + req.body.MoveInDate + "\n" +
                    "Mobile: " + req.body.Mobile + "\n" +
                    "Credit Score: " + req.body.CreditScore + "\n" +
                    "Current Address: " + req.body.CurrentAddress + "\n" +
                    "Lease Term: " + req.body.LeaseTerm + "\n" +
                    "Employer: " + req.body.Employer + "\n" +
                    "Employer Address: " + req.body.EmployerAddress + "\n" +
                    "Emergency Contact: " + req.body.EmergencyContact + "\n" +
                    "Salary: " + req.body.Salary + "\n" +
                    "PropertyID: " + req.body.PropertyID + "\n" +
                    "Property Name: " + req.body.PropertyName + "\n" +
                    "Applicant Type: " + req.body.ApplicantType + "\n" 
                };
              } else if (req.body.propertyType === "Sellable") {
                var message = {
                  from: req.body.Email, // Sender address
                  to: req.body.SellerEmail, // List of recipients

                  subject: "Application Offer", // Subject line
                  text:
                    "New Lease Application " +
                    "Firstname:" + req.body.Firstname +  "\n" +
                    "Lastname:" + req.body.Lastname + "\n" +
                    "Email: " + req.body.Email + "\n" +
                    "Proposed Offer " + req.body.offerAmount + "\n" +
                    "PropertyID " + req.body.PropertyID + "\n" +
                    "Property Name " + req.body.PropertyName + "\n" +
                    "Applicant Type " + req.body.ApplicantType 
                };
              }

              transport.sendMail(message, function (err, info) {
                if (err) {
                  console.log(err);
                } else {
                  //res.send(response);
                  //res.status(200);
                  res.send(200).end();
                }
              });
              res.send(200).end();
            }
          });
        }
      }
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;
