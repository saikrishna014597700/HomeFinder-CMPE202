var express = require("../../node_modules/express");
const Users = require("../../Models/UserModel");
var router = express.Router();

router.get("/", async (req, res) => {
  const users = await Users.find();
  console.log(users);
  let response = {};
  response.data = users;
  response.status = 200;
  res.status(response.status).send(response);
});

module.exports = router;
