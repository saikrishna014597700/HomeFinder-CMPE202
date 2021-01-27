var express = require("../../node_modules/express");
const Users = require("../../Models/UserModel");
//import { APPROVEUSER, REJECTUSER } from "../../constant/Constant";
// const APPROVEUSER = require("../../constant/Constant");
const { APPROVEUSER, REJECTUSER } = require("../../constant/Constant");

var router = express.Router();

//approve users by admin
try {
  router.post("/approve/:userId", async (req, res) => {
    console.log(req.params.userId);

    const user = await Users.findOne({ _id: req.params.userId });
    console.log(user);

    const filter = { _id: req.params.userId };
    const update = { IsApproved: APPROVEUSER };
    const updatedUser = await Users.findOneAndUpdate(filter, update, {
      new: true,
      useFindAndModify: true,
    });
    //console.log(updatedUser);
    res.status(200).send(updatedUser);
  });
} catch (err) {
  res.status(403).send({ error: "error in updating user" });
}
// reject users by admin
try {
  router.post("/reject/:userId", async (req, res) => {
    console.log(req.params.userId);

    const user = await Users.findOne({ _id: req.params.userId });
    console.log(user);

    const filter = { _id: req.params.userId };
    const update = { IsApproved: REJECTUSER };
    const updatedUser = await Users.findOneAndUpdate(filter, update, {
      new: true,
      useFindAndModify: true,
    });
    //console.log(updatedUser);
    res.status(200).send(updatedUser);
  });
} catch (err) {
  res.status(403).send({ error: "error in updating user" });
}

// remove users by admin
try {
  router.post("/remove/:userId", async (req, res) => {
    console.log(req.params.userId);

    const user = await Users.findOne({ _id: req.params.userId });
    console.log(user);

    const filter = { _id: req.params.userId };
    const update = { IsApproved: REJECTUSER };
    const updatedUser = await Users.findOneAndUpdate(filter, update, {
      new: true,
      useFindAndModify: true,
    });
    //console.log(updatedUser);
    res.status(200).send(updatedUser);
  });
} catch (err) {
  res.status(403).send({ error: "error in updating user" });
}

module.exports = router;
