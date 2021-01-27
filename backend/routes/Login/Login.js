"use strict";
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt-nodejs");
const { secret } = require("../../Utils/config");
const Users = require("../../Models/UserModel");
const { auth } = require("../../Utils/passport");
auth();

//Route to handle Post Request Call
router.post("/login", async (req, res) => {
  console.log("Request Body:", req.body);

  try {
    console.log("user", req.body.Email, req.body.Role, req.body.Password);
    await Users.findOne(
      { Email: req.body.Email, Role: req.body.Role },
      (error, user) => {
        if (user === null) {
          console.log("Error: Null Value in User", error);
          return res.status(401).json({ message: "Invalid credentials" });
        }
        console.log("user", user);
        console.log("user pws", user.Password);
        console.log(bcrypt.compareSync(req.body.Password, user.Password));
        console.log("db pwd", user.Password);

        if (user) {
          const payload = {
            _id: user._id,
            email: user.Email,
            role: user.Role,
            approvedStatus: user.IsApproved,
          };
          const token = jwt.sign(payload, secret, {
            expiresIn: 1008000,
          });
          res.status(200).end("JWT " + token);
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


router.post("/register", async (req, res) => {
  console.log("Inside Register");
  console.log("body", req.body);
  let hashp = bcrypt.hashSync(req.body.Password);
  console.log(hashp);
  var newuser = new Users({
    Name: req.body.Name,
    Email: req.body.Email,
    Password: hashp,
    Role: req.body.Role,
  });
  try {
    Users.findOne({ Email: req.body.Email }, async (error, user) => {
      if (error) {
        console.log("DB Connection Error: ", error);
        return res.status(400).json({ message: "DB Connection Error" });
      }
      if (user) {
        console.log("Email already Exist");
        return res.status(400).json({ message: "Email already Exist" });
      } else {
        await newuser.save((error, data) => {
          console.log("Inside new User Save");
          if (error) {
            console.log("Error in Adding Data: ", error);
            return res.status(400).json({ message: "Error in Adding Data" });
          } else {
            console.log("registered");
            res.send(200).end();
          }
        });
      }
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;
